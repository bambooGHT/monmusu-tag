import type { IAnimation, ITimeline } from 'pixi-spine';
import { Spine, SpineDebugRenderer } from "pixi-spine";
import { Assets } from "pixi.js";
import tickerTransition from '../tickerTransition';
import type { DebugDraws, LoadOptions, SpineData } from './types';

type TransitionParams = {
  startAlpha?: number,
  endAlpha?: number;
  fn?: () => void;
};

class Spine2d {
  private debug: SpineDebugRenderer | null = null;
  private _spine!: Spine;

  get animations(): IAnimation<ITimeline>[] {
    return this._spine.skeleton.data.animations;
  }

  get spine() {
    return this._spine;
  }

  private constructor(spine: Spine) {
    this._spine = spine;
  }

  static async load(src: string, options: LoadOptions) {
    // if (!Assets.cache.has(src)) {
    //   Assets.add({ src, alias: src, data: { imageMetadata: { alphaMode: ALPHA_MODES.PMA } } });
    // }

    const res = await Assets.load<SpineData>(src);
    const spine = new Spine(res.spineData);
    spine.autoUpdate = true;

    if (options.event) {
      spine.eventMode = "static";
      spine.cursor = 'pointer';
    } else {
      spine.eventMode = "none";
    }

    const name = typeof options.animation === "string" ? options.animation : Spine2d.getCurrentAnimation(spine, "wait");
    spine.state.setAnimation(0, name, !!options.animationLoop);

    return new Spine2d(spine);
  }
  static getCurrentAnimation(spine: Spine, hasName?: string) {
    let animaName = (<any>spine.state.tracks)[0]?.animation.name;
    if (!animaName) {
      animaName = (hasName && spine.state.hasAnimation(hasName)) ? hasName : spine.skeleton.data.animations[0].name;
    }
    return animaName;
  }
  getCurrentAnimation() {
    return Spine2d.getCurrentAnimation(this._spine, "wait");
  }

  updateAnimationSpeed = (value: number): void => {
    this._spine.state.timeScale = value;
  };

  toggleAnimation(name: string, loop: boolean): void {
    this._spine.state.setAnimation(0, name, loop);
  }

  onRptAnimation = (): void => {
    const name = this.getCurrentAnimation();
    this._spine.state.addAnimation(0, name, true, 0);
  };

  offRptAnimation = (): void => {
    if (this._spine) {
      const name = this.getCurrentAnimation();
      this._spine.state.addAnimation(0, name, false, 0);
    }
  };

  updateDebug = (debug: DebugDraws): void => {
    if (Object.values(debug).includes(true)) {
      if (!this.debug) {
        this.debug = new SpineDebugRenderer();
        this.debug.lineWidth = 4;
        this.debug.drawDebug = true;
      }

      (<(keyof DebugDraws)[]>Object.keys(debug)).forEach((p) => {
        this.debug![p] = debug[p];
      });
      this._spine.debug ??= this.debug;
      return;
    }
    this.unDebug();
  };

  unDebug = () => {
    this._spine.debug = null as any;
    this.debug = null;
  };

  addTransition(params?: TransitionParams): Promise<string> {
    const { spine } = this;
    const { startAlpha = 0, endAlpha = 1, fn } = params || {};

    spine.alpha = startAlpha;
    return new Promise((res) => {
      tickerTransition.add((dt, remove) => {
        spine.alpha += 0.08 * dt;

        if (spine.alpha >= endAlpha) {
          remove();
          fn?.();
          res("add");
        }
      });
    });
  }

  removeTransition(params?: TransitionParams): Promise<string> {
    const { spine } = this;
    const { startAlpha = 1, endAlpha = 0, fn } = params || {};

    spine.alpha = startAlpha;
    return new Promise(async (res) => {
      tickerTransition.add(async (dt, remove) => {
        spine.alpha -= 0.05 * dt;

        if (spine.alpha <= endAlpha) {
          spine.destroy({ children: true });
          fn?.();
          remove();
          res("remove");
        }
      });
    });
  }

  destroy() {
    this.spine.destroy({ children: true });
  }
}

export default Spine2d;
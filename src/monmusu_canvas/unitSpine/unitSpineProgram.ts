import PixiApp from '@/pixi1/pixiApp';
import { UnitSpineConfig, designConfig } from "./config";
import Spine2d from "@/pixi1/spine2d";
import { SpineType, SpineEvents } from "./types";
import { DebugDraws } from "@/pixi1/spine2d/types";
import StageBackground from "./stageBackground";
import { UnitSpine } from "./unitSpine";
import { AppConfig } from '../appConfig';

type SpineEventKeys = keyof SpineEvents;

class unitSpineProgram {
  readonly pixiApp: PixiApp;
  readonly spineConfig: UnitSpineConfig;

  private unitSpine!: UnitSpine;
  private appConfig!: AppConfig;
  private stageBackground: StageBackground;

  get backgrounds() {
    return StageBackground.backgrounds;
  }
  get spine2d(): Spine2d {
    return this.unitSpine.spine2d!;
  }

  constructor() {
    const pixiApp = new PixiApp({
      width: designConfig.canvas_width,
      height: designConfig.canvas_height,
      // 抗锯齿
      antialias: true,
      backgroundAlpha: 0,
    });
    const appConfig = new AppConfig(designConfig.canvas_width, designConfig.canvas_height);
    const spineConfig = new UnitSpineConfig();
    const stageBackground = new StageBackground(appConfig);
    const unitSpine = new UnitSpine(appConfig, spineConfig);

    stageBackground.updateBlur(spineConfig.bgBlur);
    pixiApp.addChildAt(stageBackground, 0);
    pixiApp.addChild(unitSpine.view);

    this.pixiApp = pixiApp;
    this.appConfig = appConfig;
    this.unitSpine = unitSpine;
    this.spineConfig = spineConfig;
    this.stageBackground = stageBackground;
  }

  async load(src: string, spineType: SpineType) {
    const { unitSpine, spineConfig } = this;

    if (!this.stageBackground.children.length) {
      this.updateBackground(spineConfig.background);
    }

    this.spineConfig.currentSpineType = spineType;
    await unitSpine.load(src);
  }

  updateEvent(key: SpineEventKeys, is: boolean) {
    const { spineConfig, unitSpine } = this;
    spineConfig.events[key] = is;
    unitSpine.updateEvent(key, is);
  }

  updateDebug(key: keyof DebugDraws, is: boolean) {
    const { spineConfig, spine2d } = this;
    spineConfig.debug[key] = is;
    spine2d.updateDebug(spineConfig.debug);
  }

  hasAnimation(name: string): boolean {
    return this.spine2d.spine.state.hasAnimation(name);
  }
  /** 切换動畫 */
  toggleAnimation(name: string) {
    const { spineConfig, spine2d } = this;
    spine2d.toggleAnimation(name, spineConfig.events.repeatAnimation);
  }

  updateAnimationSpeed(value: number) {
    const { spineConfig, spine2d } = this;
    spineConfig.animationSpeed = value > 5 ? 5 : value;
    spine2d.updateAnimationSpeed(spineConfig.animationSpeed);
  }

  updateBackground(value: string) {
    const { spineConfig, stageBackground } = this;
    spineConfig.background = value;
    stageBackground.loadBg(StageBackground.backgrounds[value]);
  }

  updateBgBlur(value: number) {
    this.spineConfig.bgBlur = value;
    this.stageBackground.updateBlur(value);
  }

  destroy(): void {
    this.stageBackground.removeBg();
    if (this.spine2d.spine) {
      this.unitSpine.destroy();
    }
  };
};

export default unitSpineProgram;
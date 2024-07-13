import Spine2d from "@/pixi1/spine2d";
import { Container } from "pixi.js";
import type { SpineEvents, SpineType } from "./types";
import { type UnitSpineConfig } from "./config";
import type { Spine } from "pixi-spine";
import { ClickAnimation, Slider, KeyboardControl, PointerMove } from "./unitSpineEvent";
import PixiApp from "@/pixi1/pixiApp";
import type { AppConfig } from "../appConfig";

export class UnitSpine {
  view: Container;
  spine2d!: Spine2d;
  private event: {
    clickAnimation: ClickAnimation;
    slider: Slider;
    keyboardControl: KeyboardControl,
    pointerMove: PointerMove;
    repeatAnimation: { open: () => void; closure: () => void; updateSpine?: () => void; };
  };

  constructor(private appConfig: AppConfig, private config: UnitSpineConfig) {
    const view = this.view = new Container();
    view.sortableChildren = true;
    this.event = {
      slider: new Slider(appConfig, config),
      pointerMove: new PointerMove(appConfig, config),
      clickAnimation: new ClickAnimation(appConfig, config),
      keyboardControl: new KeyboardControl(appConfig, config),
      repeatAnimation: { open() { }, closure() { } }
    };
  }

  async load(src: string) {
    const { spine2d: oldSpine2d, config } = this;

    this.#removeEvents();
    if (oldSpine2d) {
      await Promise.all([
        oldSpine2d.removeTransition()
      ]);
    }
    const spineConfig = {
      event: true,
      animation: true,
      animationLoop: config.events.repeatAnimation,
    };
    const spine2d = this.spine2d = await Spine2d.load(src, spineConfig);

    const { width, height } = this.appConfig;
    const scale = config.slider[config.currentSpineType].scale;
    const baseScale = UnitSpine.getBaseScaleSize(spine2d.spine, config.currentSpineType);

    spine2d.spine.zIndex = 1;
    spine2d.spine.scale.set(scale + baseScale);
    spine2d.spine.position.set(width / 2, height / 2);

    spine2d.updateDebug(config.debug);
    this.view.addChild(spine2d.spine);

    this.event.repeatAnimation = {
      open: spine2d.onRptAnimation,
      closure: spine2d.offRptAnimation,
    };
    this.#updateEventSpine();
    this.#initEvents();
    spine2d.addTransition();
  }

  updateEvent(key: keyof SpineEvents, is: boolean) {
    const { event } = this;
    event[key][is ? "open" : "closure"]();
    if (is && key === "slider") {
      this.view.addChild(event.slider.slider!);
    }
  };

  destroy() {
    this.#removeEvents();
    PixiApp.destroy(this.view.removeChildren());
    this.spine2d = null as any;
  }

  #initEvents() {
    const { event, config } = this;
    for (const item of Object.keys(event) as (keyof SpineEvents)[]) {
      if (config.events[item]) event[item].open();
    };
    const slider = event.slider.slider;
    if (slider) {
      slider.zIndex = 3;
      this.view.addChild(slider);
    }
  }

  #removeEvents() {
    const { event, config } = this;
    for (const item of Object.keys(event).slice(0, -1) as (keyof SpineEvents)[]) {
      if (config.events[item]) event[item].closure();
    }
  }

  #updateEventSpine() {
    const { event, spine2d } = this;
    for (const item of Object.keys(event).slice(0, -1) as (keyof SpineEvents)[]) {
      event[item].updateSpine?.(spine2d.spine);
    }
  }

  static getBaseScaleSize(spine: Spine, spineType: SpineType): number {
    const originalWidth = spine.skeleton.data.width;

    let result: number = spineType === "_s" ? 1 : (originalWidth > 1000 ? 1200 : 900) / originalWidth;

    return result;
  }
}
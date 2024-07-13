import type { FederatedPointerEvent } from "pixi.js";
import { Graphics } from "pixi.js";
import SpineEvent from "./spineEvent";
import { UnitSpine } from "../unitSpine";
import { clamp } from "@/pixi1/utils";

export class Slider extends SpineEvent {
  slider: Graphics | undefined;

  open(): void {
    const { slider, handle } = this.#createSliderControl();
    handle.onpointerdown = this.#getHandleEvent(slider, handle);
    this.slider = slider;
  }

  closure() {
    this.slider?.destroy(true);
    this.slider = null as any;
    super.closure();
  };

  #getHandleEvent(slider: Graphics, handle: Graphics) {
    const { spine } = this;
    const { width: originalWidth } = spine.skeleton.data;
    const { sliderValue, sliderHeight, halfHandleWidth: minY, baseScale } = this.#initCoordinateAndScale(handle);
    const scaleRatio = originalWidth > 1000 ? 1.1 : 1.8;
    const maxY = sliderHeight - minY;

    return (e: FederatedPointerEvent) => {
      const yDistance = slider.toLocal((<FederatedPointerEvent>e.originalEvent).global).y - handle.y;
      const move = function () {
        //计算滚动位置
        sliderValue.y = clamp(slider.toLocal((<FederatedPointerEvent>e.originalEvent).global).y - yDistance, minY, maxY);
        sliderValue.scale = scaleRatio * (1 - (sliderValue.y / maxY));

        handle.y = sliderValue.y;
        spine.scale.set(baseScale + sliderValue.scale);
      };

      document.onpointermove = move;
      document.onpointerup = () => {
        document.onpointermove = null;
        document.onpointerup = null;
      };
    };
  }

  #createSliderControl() {
    const { height } = this.appConfig;
    const sliderHeight = height / 1.5;

    const slider = new Graphics()
      .beginFill(0x707070, 0.6)
      .drawRect(0, 0, 18, sliderHeight);

    const handle = new Graphics()
      .lineStyle({ color: 0, width: 2 })
      .beginFill(0xffffff)
      .drawCircle(0, 0, 28);

    slider.position.set(26, (height - sliderHeight) / 2);
    handle.x = slider.width / 2;
    handle.eventMode = "static";
    handle.cursor = 'pointer';

    slider.addChild(handle);
    return { slider, handle };
  }

  #initCoordinateAndScale(handle: Graphics) {
    const { config, spine, appConfig } = this;

    const sliderValue = config.slider[config.currentSpineType];
    const sliderHeight = appConfig.height / 1.5;
    const halfHandleWidth = handle.width / 2;
    const baseScale = UnitSpine.getBaseScaleSize(spine, config.currentSpineType);

    sliderValue.y ||= sliderHeight - halfHandleWidth;
    handle.y = sliderValue.y;

    return { sliderValue, sliderHeight, halfHandleWidth, baseScale };
  }
}
import { FederatedPointerEvent } from "pixi.js";
import SpineEvent from "./spineEvent";
import { clamp } from "@/pixi1/utils";

export class PointerMove extends SpineEvent {
  open() {
    this.spine.onpointerdown = this.#getMove();
  }

  closure() {
    const spine = this.spine;
    if (spine) spine.onpointerdown = null;
    super.closure();
  }

  #getMove() {
    const { spine, appConfig } = this;
    const { width, height } = appConfig;

    return function (e: FederatedPointerEvent) {
      const X = e.screenX - spine.x;
      const Y = e.screenY - spine.y;
      const original = <FederatedPointerEvent>e.originalEvent;

      const moveFn = () => {

        spine.x = clamp(original.screenX - X, 0, width);
        spine.y = clamp(original.screenY - Y, 0, height);
      };

      document.onpointermove = moveFn;
      document.onpointerup = () => {
        document.onpointermove = null;
        document.onpointerup = null;
      };
    };
  };
}
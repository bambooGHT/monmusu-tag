import type { Spine } from "pixi-spine";
import type { UnitSpineConfig } from "../config";
import type { AppConfig } from "@/monmusu_canvas/appConfig";

abstract class SpineEvent {
  spine!: Spine;
  constructor(protected appConfig: AppConfig, protected config: UnitSpineConfig) { }
  //開啓
  abstract open(...args: any[]): void;
  //關閉
  closure() {
    this.spine = null as any;

  };

  updateSpine(spine: Spine) {
    this.spine = spine;
  };
}
export default SpineEvent;
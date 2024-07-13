import { Container } from "pixi.js";
import { designConfig } from "../../config";

export class Layer extends Container {
  layerParams: STORY.Setting_Layer;

  constructor(params: STORY.Setting_Layer) {
    super();

    this.layerParams = params;
    this.init();
  }

  reset() {
    this.init();
  }

  private init() {
    const { X = 0, Y = 0, ScaleX = 1, ScaleY = 1, Order } = this.layerParams;
    let xs = 0.8878571391105652 * ScaleX;
    let ys = 0.8878571391105652 * ScaleY;

    this.zIndex = Order;
    this.scale.set(xs, ys);
    this.x = (designConfig.canvas_width * (1 - xs)) / 2 + X;
    this.y = (designConfig.canvas_height * (1 - ys)) / 2 + Y;
  }
}
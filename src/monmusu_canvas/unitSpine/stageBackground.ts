import { Sprite, Graphics, Assets, BlurFilter, Container } from "pixi.js";
import stageBackgroundUrls from "@/assets/stageBackgroundUrls.json";
import PixiApp from "@/pixi1/pixiApp";
import type { AppConfig } from "../appConfig";

class StageBackground extends Container<Graphics | Sprite> {
  readonly #blur!: BlurFilter;
  static readonly backgrounds: Record<string, string> = stageBackgroundUrls;

  constructor(private appConfig: AppConfig) {
    super();
    this.#blur = new BlurFilter(1, 2);
    this.updateBlur(0);
    this.filters = [this.#blur];
  }

  updateBlur(value: number) {
    this.#blur.blur = value;
  }

  async loadBg(background: string): Promise<void>;
  async loadBg(background: string[]): Promise<void>;
  async loadBg(background: string | string[]) {
    this.removeBg();
    const { width, height } = this.appConfig;

    if (typeof background === "string" && background.startsWith("0x")) {
      const bg = new Graphics().clear().beginFill(+background).drawRect(0, 0, width, height);
      this.addChild(bg);
    } else {
      const backgrounds = (Array.isArray(background) ? background : [background]).entries();
      for (const [index, src] of backgrounds) {
        const texture = await Assets.load({ src, alias: src, data: { alphaMode: 0 } });
        const bg = Sprite.from(texture);
        const scale = height / bg.height;

        bg.scale.set(scale);
        bg.position.set((width - bg.width) / 2, 0);
        this.addChildAt(bg, index);
      }
    }
  }

  removeBg() {
    PixiApp.destroy(this.removeChildren());
  }
}

export default StageBackground;
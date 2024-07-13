import { Assets, Sprite } from "pixi.js";
import { BaseCommand } from "../baseCommand";
import { designConfig, displayEl, layerEl, type DisplayElType } from "../adcCommandSetting";
import gsap from "gsap";

export abstract class CommandBaseBg extends BaseCommand {
  async execute(params: STORY.CommandParams) {
    const layer = params.Arg3 ? layerEl.getLayer(params.Arg3, true) : layerEl.getLayerContainer("Bg");
    const picture = AdvGlobal.advStorySettingData.getSettingValue(params.Command as "Bg", params.Arg1);
    const bg = await CommandBaseBg.createBg(picture);

    if (params.Arg6) {
      bg.alpha = 0;
      gsap.to(bg, { alpha: 1, duration: params.Arg6 });
    }
    layer.addChild(bg);
    displayEl.set(params.Command as DisplayElType, params.Arg1, bg);
  }

  static async createBg(params: STORY.Setting_Picture) {
    const texture = await Assets.load(params.FileName);
    const sprite = Sprite.from(texture);

    sprite.scale.set(params.Scale);
    const x = (designConfig.canvas_width - sprite.width) / 2 + (params.X || 0);
    const y = (designConfig.canvas_height - sprite.height) / 2 + (params.Y || 0);
    sprite.position.set(x, y);
    return sprite;
  }
}
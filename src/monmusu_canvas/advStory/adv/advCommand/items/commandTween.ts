import { Tween } from "@/monmusu_canvas/advStory/adv/advCommand/utils/advCommandTween";
import { BaseCommand } from "../baseCommand";
import { layerEl, displayEl } from "../adcCommandSetting";

export class CommandTween extends BaseCommand {
  static targetType: Record<string, string> = {
    BG: "Bg"
  };
  async execute(params: STORY.CommandParams): Promise<void> {
    const key = CommandTween.targetType[params.Arg1] || params.Arg1;
    const target = layerEl.getLayerContainer(key as any)
      || layerEl.getLayer(key)
      || displayEl.get("Character", key)
      || displayEl.get("Sprite", key);

    if (!target) {
      throw new Error("no tween target.");

    }

    await Tween[(params.Arg2 as keyof typeof EStory.CommandTweenType)](target, params);
  }
}
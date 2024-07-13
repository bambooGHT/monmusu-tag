import { displayEl, layerEl } from "../adcCommandSetting";
import { BaseCommand } from "../baseCommand";

export class CommandCharacterOff extends BaseCommand {
  async execute(params: STORY.CommandParams): Promise<void> {
    const layer = layerEl.getLayerContainer("Character");

    params.Arg6 && await gsap.to(layer, {
      alpha: 0,
      duration: params.Arg6,
    });

    displayEl[params.Arg1 ? "delete" : "clearDisplayEl"]("Character", params.Arg1);
    layer.alpha = 1;
  }
}
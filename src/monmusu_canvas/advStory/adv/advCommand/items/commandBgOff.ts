import { displayEl, layerEl } from "../adcCommandSetting";
import { CommandBaseBg } from "../commandBase";

export class CommandBgOff extends CommandBaseBg {
  async execute(params: STORY.CommandParams) {
    const layer = layerEl.getLayerContainer("Bg");

    params.Arg6 && await gsap.to(layer, {
      alpha: 0,
      duration: params.Arg6,
      onComplete() {
      }
    });

    displayEl.clearDisplayEl("Bg");
    layer.alpha = 1;
  }
}
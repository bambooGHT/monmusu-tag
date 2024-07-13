import gsap from "gsap";
import { CommandBaseBg } from "../commandBase";
import { layerEl, displayEl } from "../adcCommandSetting";

export class CommandBgEventOff extends CommandBaseBg {
  async execute(params: STORY.CommandParams) {
    const layer = layerEl.getLayerContainer("Bg");

    params.Arg6 && await gsap.to(layer, {
      alpha: 0,
      duration: params.Arg6,
    });

    displayEl.clearDisplayEl("BgEvent");
    layer.alpha = 1;

  }
}
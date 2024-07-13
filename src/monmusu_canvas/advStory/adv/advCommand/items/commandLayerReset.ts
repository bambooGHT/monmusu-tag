import { layerEl } from "../adcCommandSetting";
import { BaseCommand } from "../baseCommand";

export class CommandLayerReset extends BaseCommand {
  execute(params: STORY.CommandParams) {
    layerEl.getLayer(params.Arg1)?.reset();
  }
}
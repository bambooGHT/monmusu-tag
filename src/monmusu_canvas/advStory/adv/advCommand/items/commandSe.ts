import { BaseCommand } from "../baseCommand";
import { audio } from "../adcCommandSetting";

export class CommandSe extends BaseCommand {
  async execute(params: STORY.CommandParams): Promise<void> {
    const sound = AdvGlobal.advStorySettingData.getSettingValue("Se", params.Arg1);
    return audio.play("Se", sound.FileName);
  }
}
import { BaseCommand } from "../baseCommand";
import { audio } from "../adcCommandSetting";

export class CommandBgm extends BaseCommand {
  async execute(params: STORY.CommandParams) {
    const data = AdvGlobal.advStorySettingData.getSettingValue("Bgm", params.Arg1);
    return audio.play("Bgm", data.FileName);
  }
}
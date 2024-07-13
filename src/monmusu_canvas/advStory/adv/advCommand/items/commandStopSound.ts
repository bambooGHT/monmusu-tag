import { BaseCommand } from "../baseCommand";
import { audio, type SoundCategory } from "../adcCommandSetting";

export class CommandStopSound extends BaseCommand {
  execute(params: STORY.CommandParams) {
    params.Arg1.split(",").forEach((p) => {
      audio.stop(p as SoundCategory, params.Arg6);
    });
  }
}
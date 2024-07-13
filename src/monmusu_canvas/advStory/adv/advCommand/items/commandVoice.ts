import { CommandBaseVoice } from "../commandBase";
import { audio } from "../adcCommandSetting";

export class CommandVoice extends CommandBaseVoice {
  async execute(params: STORY.CommandParams): Promise<void> {
    const url = params.Voice;
    await audio.play("Voice", url);
  }
}
import { BaseCommand } from "../baseCommand";

export class CommandWait extends BaseCommand {
  execute(params: STORY.CommandParams): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, params.Arg6 * 1000));
  }
}
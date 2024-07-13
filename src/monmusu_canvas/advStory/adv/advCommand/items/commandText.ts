import { BaseCommand } from "../baseCommand";

export class CommandText extends BaseCommand {
  execute(params: STORY.CommandParams): void {
    console.log("text: ", params.Text);
  }
}
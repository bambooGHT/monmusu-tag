import { advCommandControl } from "./advCommandControl";
import * as commandItems from "./items";

type CommandBaseKeys = keyof typeof EStory.CommandBase;
type CommandOtherKeys = keyof typeof EStory.CommandOther;

export class AdvCommandFactory {
  static createCommand(command: CommandBaseKeys | CommandOtherKeys) {
    const key = EStory.CommandBase[command as CommandBaseKeys]
      || EStory.CommandOther[command as CommandOtherKeys];
    const commandConcrete = commandItems[key];

    return {
      async execute(params: any) {
        const command = new commandConcrete();

        advCommandControl.addCommand(command);
        await command.execute(params);
      }
    };
  }
}
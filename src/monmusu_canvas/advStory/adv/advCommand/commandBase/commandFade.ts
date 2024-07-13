import { BaseCommand } from "../baseCommand";
import { getView } from "../adcCommandSetting";

export abstract class CommandFade extends BaseCommand {
  view = getView("Fade");
}
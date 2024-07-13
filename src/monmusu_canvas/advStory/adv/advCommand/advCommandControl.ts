import type { BaseCommand } from "./baseCommand";

class AdvCommandControl {
  undoStack: BaseCommand[] = [];

  addCommand(command: BaseCommand) {
    // this.undoStack.push(command);

  };

  undo() {
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
    }
  }
}

export const advCommandControl = new AdvCommandControl();
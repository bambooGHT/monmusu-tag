export interface Command {
  execute(params: STORY.CommandParams): void | Promise<void>;
  undo(): void;
  redo(): void;
}

export class BaseCommand implements Command {
  protected _params = {} as STORY.CommandParams;

  execute(params: STORY.CommandParams): void | Promise<void> {
    this._params = params;
  }

  undo(): void {
    throw new Error("Method not implemented.");
  }

  redo(): void {
    throw new Error("Method not implemented.");
  }
}
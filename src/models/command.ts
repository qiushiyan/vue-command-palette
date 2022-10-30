export interface Command {
  id: string;
  title: string;
  description?: string;
  alias?: string[];
  hotkeys?: string[];
  command?: Function;
}

export type ICommand = Omit<Command, "id">;

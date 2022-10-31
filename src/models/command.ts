export interface Command {
  id: number;
  title: string;
  priority: number;
  description?: string;
  alias?: string[];
  hotkeys?: string[];
  command?: Function;
}

export type ICommand = Omit<Command, "id" | "priority">;

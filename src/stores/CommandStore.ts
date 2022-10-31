import { defineStore } from "pinia";
import { Command, ICommand } from "../models/command";

const hashCode = (s: string) => {
  for (var i = 0, h = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
};

export const useCommandStore = defineStore("CommandPalette", {
  state: () => {
    return {
      commandPaletteVisible: false,
      commandFilterText: "",
      activeIdx: 0,
      commandList: [] as Command[],
    };
  },

  getters: {
    filteredCommandList: (state): Command[] => {
      if (state.commandFilterText === "") {
        return state.commandList;
      }

      return state.commandList.filter((command) => {
        return command.title
          .toLowerCase()
          .includes(state.commandFilterText.toLowerCase());
      });
    },
  },

  actions: {
    registerCommands(commands: ICommand[]) {
      this.commandList = commands.map((command) => {
        return { id: hashCode(command.title), priority: 0, ...command };
      });
      this.sortCommands();
    },
    registerCommand(command: ICommand) {
      this.commandList.push({
        id: hashCode(command.title),
        priority: 0,
        ...command,
      });
    },
    sortCommands() {
      this.commandList.sort((a, b) => {
        return b.priority - a.priority || a.title.localeCompare(b.title);
      });
    },
    executeActiveCommand() {
      const activeCommand = this.filteredCommandList[this.activeIdx];
      if (activeCommand.command) {
        activeCommand.command();
        this.filteredCommandList[this.activeIdx]["priority"] += 1;
      }
      this.sortCommands();
      this.activeIdx = this.commandList.indexOf(activeCommand);
      this.commandPaletteVisible = false;
      this.commandFilterText = "";
    },
    setCommandFilterText(text: string) {
      this.commandFilterText = text;
    },
    toggleCommandPalette() {
      this.commandPaletteVisible = !this.commandPaletteVisible;
    },
    incrementActiveIdx() {
      if (this.activeIdx >= this.filteredCommandList.length - 1) {
        this.activeIdx = 0;
      } else {
        this.activeIdx++;
      }
    },
    decrementActiveIdx() {
      if (this.activeIdx <= 0) {
        this.activeIdx = this.filteredCommandList.length - 1;
      } else {
        this.activeIdx--;
      }
    },
  },
});

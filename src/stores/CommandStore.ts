import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { Command, ICommand } from "../models/command";

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
      const sortedCommands = commands.sort((a, b) =>
        a.title < b.title ? -1 : 1
      );
      this.commandList = sortedCommands.map((command) => {
        return { ...command, id: uuid() };
      });
    },
    registerCommand(command: ICommand) {
      this.commandList.push({ id: uuid(), ...command });
    },
    executeActiveCommand() {
      if (this.activeIdx >= 0) {
        this.filteredCommandList[this.activeIdx].command?.();
      }
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

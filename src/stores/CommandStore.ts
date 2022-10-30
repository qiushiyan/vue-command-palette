import { defineStore } from "pinia";

export const useCommandStore = defineStore("CommandPalette", {
  state: () => {
    return {
      commandPaletteVisible: false,
      commandFilterText: "",
      activeIdx: 0,
      commandList: [
        { id: 1, title: "command 1", alias: [], hotkeys: [] },
        { id: 2, title: "command 2", alias: [], hotkeys: [] },
        { id: 3, title: "command 3", alias: [], hotkeys: [] },
      ],
    };
  },

  getters: {
    filteredCommandList: (state) => {
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

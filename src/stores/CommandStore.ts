import { defineStore } from "pinia";

export const useCommandStore = defineStore("CommandPalette", {
  state: () => {
    return {
      showCommandPalette: false,
      commandList: [
        { id: 1, title: "command 1", alias: [], hotkeys: [] },
        { id: 2, title: "command 2", alias: [], hotkeys: [] },
        { id: 3, title: "command 3", alias: [], hotkeys: [] },
      ],
    };
  },

  actions: {
    toggleCommandPalette() {
      this.showCommandPalette = !this.showCommandPalette;
    },
  },
});

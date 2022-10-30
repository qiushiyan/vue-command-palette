<script setup lang = 'ts'>
import { useMagicKeys, whenever } from '@vueuse/core';
import { nextTick, ref } from "vue";
import { useCommandStore } from "../stores/CommandStore";

const commandStore = useCommandStore();
const searchBar = ref<HTMLInputElement | null>(null)

const handleInput = (e: Event) => {
    commandStore.setCommandFilterText((e.target as HTMLInputElement).value)
}

const keys = useMagicKeys()
const CtrlShiftP = keys["ctrl+shift+p"]


whenever(CtrlShiftP, async () => {
    commandStore.toggleCommandPalette()
    await nextTick()
    searchBar.value?.focus()
})

whenever(keys.down, () => {
    if (commandStore.commandPaletteVisible) {
        commandStore.incrementActiveIdx()
    }
})

whenever(keys.up, () => {
    if (commandStore.commandPaletteVisible) {
        commandStore.decrementActiveIdx()
    }
})

whenever(keys.enter, () => {
    if (commandStore.commandPaletteVisible) {
        commandStore.executeActiveCommand()
    }
})

whenever(keys.escape, () => {
    if (commandStore.commandPaletteVisible) {
        commandStore.toggleCommandPalette()
        commandStore.setCommandFilterText("")
    }
})

</script>

<template>
    <Teleport to="body">
        <div class="command-palette-overlay " v-show="commandStore.commandPaletteVisible">
            <section class="command-palette rounded-xl w-6/12 m-auto bg-white text-gray-900 p-1">
                <div class="relative w-full">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="search" :value="commandStore.commandFilterText" @input="handleInput"
                        ref="searchBar" class=" border border-gray-300 text-sm block w-full pl-10 p-2.5 text-white "
                        placeholder="Search for commands here" autocomplete="off">
                </div>
                <div class="commands">
                    <ul class="bg-white">
                        <li v-for="(command, idx) in commandStore.filteredCommandList" :key="command.id"
                            class="p-2 text-left" :class="commandStore.activeIdx === idx ? 'is-hovered' : ''">
                            {{ command.title }}</li>
                    </ul>
                </div>
                <footer class="command-palette-footer">
                    hello
                </footer>
            </section>
        </div>

    </Teleport>

</template>

<style scoped>
input:focus {
    border-color: #FFD859
}

.command-palette-overlay {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: black;
    opacity: 0.6;
    z-index: 999;
}

.command-palette {
    position: relative;
    width: 60%;
    max-height: 80%;
    margin-top: 50px;
}

.is-hovered {
    background-color: #7686a1;
}
</style>
<script setup lang = 'ts'>
import { useMagicKeys, whenever } from '@vueuse/core';
import { nextTick, ref, watch } from "vue";
import { useCommandStore } from "../stores/CommandStore";

const commandStore = useCommandStore();
const searchBar = ref<HTMLInputElement | null>(null)
const searchBarFocused = ref(false)

const handleInput = (e: Event) => {
    commandStore.setCommandFilterText((e.target as HTMLInputElement).value)
}

const keys = useMagicKeys()
const CtrlShiftP = keys["ctrl+shift+p"]

watch(commandStore, async () => {
    if (commandStore.commandPaletteVisible && !searchBarFocused.value) {
        await nextTick()
        searchBar.value?.focus()
        searchBarFocused.value = true
    }
})

whenever(CtrlShiftP, () => {
    commandStore.toggleCommandPalette()
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

</script>

<template>
    <Teleport to="body">
        <div class="w-6/12 m-auto" v-show="commandStore.commandPaletteVisible">
            <h2 class="text-white text-2xl">command palette</h2>
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
                    ref="searchBar"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search" required>
            </div>
            <div class="commands">
                <ul>
                    <li v-for="(command, idx) in commandStore.filteredCommandList" :key="command.id" class="rounded p-2"
                        :class="commandStore.activeIdx === idx ? 'is-hovered' : ''">
                        {{ command.title }}</li>
                </ul>
            </div>
        </div>
    </Teleport>

</template>

<style scoped>
.is-hovered {
    background-color: #4a5568;
}
</style>
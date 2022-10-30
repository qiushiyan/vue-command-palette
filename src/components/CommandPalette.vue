<script setup lang = 'ts'>
import { useMagicKeys, whenever } from '@vueuse/core';
import { nextTick, ref } from "vue";
import { useCommandStore } from "../stores/CommandStore";
import CommandKey from "./CommandKey.vue";

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
            <section class="command-palette rounded-xl w-6/12 m-auto bg-white text-gray-900 p-2">
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
                            class="flex justify-between p-2 rounded-lg"
                            :class="commandStore.activeIdx === idx ? 'is-hovered' : ''">
                            <h3>
                                {{ command.title }}
                            </h3>
                            <p v-if="command.description" class="text-sm">{{ command.description }}</p>
                        </li>
                    </ul>
                </div>
                <footer class="command-palette-footer border-t-2 text-sm">
                    <div class="pl-2 py-2 flex">
                        <CommandKey>
                            <template #icon>
                                <svg width="15" height="15" aria-label="Enter key" role="img">
                                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="1.2">
                                        <path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path>
                                    </g>
                                </svg>
                            </template>
                            <template #text>
                                <span>to select</span>
                            </template>
                        </CommandKey>

                        <CommandKey>
                            <template #icon>
                                <svg width="15" height="15" aria-label="Arrow up" role="img">
                                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="1.2">
                                        <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path>
                                    </g>
                                </svg>
                                <svg width="15" height="15" aria-label="Arrow down" role="img">
                                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="1.2">
                                        <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path>
                                    </g>
                                </svg>
                            </template>
                            <template #text>
                                <span>to navigate</span>
                            </template>
                        </CommandKey>

                        <CommandKey>
                            <template #icon>
                                <svg width="15" height="15" aria-label="Escape key" role="img">
                                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="1.2">
                                        <path
                                            d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956">
                                        </path>
                                    </g>
                                </svg>
                            </template>
                            <template #text>
                                <span>to exit</span>
                            </template>
                        </CommandKey>
                    </div>
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
    background-color: rgba(0, 0, 0, 0.6);
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
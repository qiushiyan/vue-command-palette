<script setup lang = "ts">
import { useCommandStore } from '../stores/CommandStore';

const commandStore = useCommandStore()
</script>

<template>
    <h2>Available commands</h2>
    <div class="commands grid grid-cols-3 gap-3">
        <div class="command-info block p-6 max-w-sm  rounded-lg border shadow-md bg-gray-800 border-gray-700 hover:bg-gray-700"
            v-for="command in commandStore.commandList" :key="command.id">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ command.title }}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400" v-if="command.description">{{ command.description }}
            </p>
        </div>
    </div>

</template>
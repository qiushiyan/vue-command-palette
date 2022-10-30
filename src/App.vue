<script setup lang="ts">
import { useRouter } from 'vue-router';
import Layout from './components/Layout.vue';
import { count, increment } from "./counter";
import { useCommandStore } from './stores/CommandStore';

const router = useRouter();
const commandStore = useCommandStore()
commandStore.registerCommands([
  {
    title: 'Home',
    description: "Navigate to home page",
    command: () => router.push('/'),
  },
  {
    title: 'About',
    description: "Navigate to about page",
    command: () => router.push('/about'),
  }, {
    title: 'Commands',
    description: "Show all commands",
    command: () => router.push('/commands'),
  },
  {
    title: 'Increment counter',
    command: increment
  },
  {
    title: 'Reset counter',
    command: () => count.value = 0
  }
])
</script>

<template>
  <Layout>
  </Layout>
</template>

<style scoped>

</style>

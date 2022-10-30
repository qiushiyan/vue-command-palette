<script setup lang="ts">
import { useRouter } from 'vue-router';
import Layout from './components/Layout.vue';
import { useCommandStore } from './stores/CommandStore';

const router = useRouter();
const commandStore = useCommandStore()
commandStore.registerCommand({
  title: 'Home',
  command: () => router.push('/home'),
})
commandStore.registerCommand({
  title: 'About',
  command: () => router.push('/about'),
})
</script>

<template>
  <Layout>
  </Layout>
</template>

<style scoped>

</style>

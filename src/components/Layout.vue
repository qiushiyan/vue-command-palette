<script setup lang = 'ts'>
import CommandPalette from "./CommandPalette.vue";
import Navbar from "./Navbar.vue";
</script>

<template>
    <Navbar />
    <CommandPalette></CommandPalette>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}
</style>
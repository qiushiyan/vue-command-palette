<script setup lang = 'ts'>
import { count, increment } from "../counter";
</script>

<template>
    <h2>Home page</h2>

    <div class="counter">
        <span>count is </span>
        <button @click="increment">{{ count }}</button>
    </div>
</template>

<style scoped>

</style>
<template>
    <TheHeader />
    <RouterView />
    <TheFooter />
</template>

<script setup>
import TheFooter from './components/TheFooter.vue';
import TheHeader from './components/TheHeader.vue';
</script>

<style lang="scss">
@use '@/assets/abstracts' as *;

html,
body {
    color: $c-text;
    background-color: $c-main;
}

main.page {
    height: 100lvh;
    overflow-y: hidden;

    &::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
    > section {
        padding: rem(128) rem(32);
    }
}

.layout {
    min-width: max-content;
    min-height: 100lvh;
    overflow-x: auto;
    overflow-y: hidden;
    display: grid;
    grid-auto-flow: column;
}
</style>

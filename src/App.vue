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
}

.layout {
    min-width: max-content;
    min-height: 100lvh;
    overflow-x: auto;
    overflow-y: hidden;
    display: grid;
    grid-auto-flow: column;
}

.fade-bottom {
    opacity: 0;
    translate: 0 rem(64);
    animation: fade-bottom $td $tf forwards;
    @keyframes fade-bottom {
        from {
            opacity: 0;
            translate: 0 rem(64);
        }
        to {
            opacity: 1;
            translate: 0 0;
        }
    }
}
.fade-right {
    opacity: 0;
    translate: rem(64) 0;
    animation: fade-right $td $tf forwards;
    @keyframes fade-right {
        from {
            opacity: 0;
            translate: rem(64) 0;
        }
        to {
            opacity: 1;
            translate: 0 0;
        }
    }
}
</style>

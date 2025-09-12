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
    font-family: 'Fira', sans-serif;
    color: $c-text;
    background-color: $c-main;
}

main.page {
    width: 100vw;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
    &--horizontal {
        height: 100lvh;
        min-height: fit-content;
        display: grid;
        grid-auto-flow: column;
        overflow-x: auto;
        overflow-y: hidden;
    }
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
.fade-bottom-rotate {
    opacity: 0;
    translate: 0 rem(64);
    transform-origin: top left;
    animation: fade-bottom-rotate $td $tf-spring forwards;
    @keyframes fade-bottom-rotate {
        from {
            opacity: 0;
            translate: 0 rem(64);
            rotate: 45deg;
        }
        to {
            opacity: 1;
            translate: 0 0;
            rotate: 0;
        }
    }
}
.fade-scale {
    opacity: 0;
    animation: fade-scale $td $tf-spring forwards;
    @keyframes fade-scale {
        from {
            opacity: 0;
            scale: 1.5;
        }
        to {
            opacity: 1;
            scale: 1;
        }
    }
}
</style>

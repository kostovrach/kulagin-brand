<template>
    <main :class="['page-horizontal', props.class]" ref="containerRef">
        <ScrollProgressBar :progress="scrollProgress" position="top" :show-when-scrolling="isScrolling" />
        <slot></slot>
    </main>
</template>

<script setup>
import { useHorizontalScroll } from '@/composables/useHorizontalScroll';
import ScrollProgressBar from '@/components/ProgressBar/ProgressBar.vue';

const { containerRef, scrollProgress, isScrolling } = useHorizontalScroll();

const props = defineProps({
    class: { type: String },
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.page-horizontal {
    width: 100vw;
    height: 100lvh;
    // min-height: fit-content;

    display: grid;
    grid-auto-flow: column;

    overflow-x: auto;
    overflow-y: hidden;

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 768px) {
        height: initial;

        display: flex;
        flex-direction: column;

        overflow-x: clip;
        overflow-y: initial;
    }
}
</style>

<template>
    <main
        :class="['page', 'page--horizontal', props.forceMode ? 'page--horizontal-forced' : '', props.class]"
        ref="containerRef"
    >
        <ScrollProgressBar :progress="scrollProgress" position="top" :show-when-scrolling="isScrolling" />
        <slot></slot>
    </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useHorizontalScroll } from '@/composables/useHorizontalScroll';
import ScrollProgressBar from '@/components/ProgressBar/ProgressBar.vue';

const { containerRef, scrollProgress, isScrolling, setForceMode } = useHorizontalScroll();

const props = defineProps({
    class: { type: String },
    forceMode: { type: Boolean },
});

onMounted(() => {
    if (props.forceMode) {
        setForceMode(true);
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.page--horizontal {
    width: 100vw;
    height: 100lvh;

    display: grid;
    grid-auto-flow: column;

    overflow-x: auto;
    overflow-y: hidden;

    @include hide-scrollbar;
}

@media (max-width: 768px) {
    .page--horizontal:not(.page--horizontal-forced) {
        height: initial;

        display: flex;
        flex-direction: column;

        overflow-x: clip;
    }
}
</style>

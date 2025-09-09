<template>
    <main class="page" ref="containerRef">
        <ScrollProgressBar :progress="scrollProgress" position="top" :show-when-scrolling="isScrolling" />
        <HomeHero />
    </main>
</template>

<script setup>
import { useHorizontalScroll } from '@/composables/useHorizontalScroll';
import ScrollProgressBar from '@/components/ProgressBar/ProgressBar.vue';
import HomeHero from './layout/HomeHero.vue';

const { containerRef, scrollProgress, isScrolling } = useHorizontalScroll({
    easing: 0.05, // Smoothness of animation (0.01 - 0.2)
    inertiaDecay: 0.95, // Inertia decay rate (0.8 - 0.98)
    minInertiaVelocity: 0.1, // Minimum velocity to continue inertia
    wheelSensitivity: 1.2, // Wheel scroll sensitivity
    touchSensitivity: 1.5, // Touch scroll sensitivity
    keyboardStepRatio: 0.8, // Keyboard step as ratio of viewport width
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;
</style>

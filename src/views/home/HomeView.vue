<template>
    <main class="page" ref="containerRef">
        <ScrollProgressBar :progress="scrollProgress" position="top" :show-when-scrolling="isScrolling" />
        <HomeHero />
        <HomeBrand />
    </main>
</template>

<script setup>
import { useHorizontalScroll } from '@/composables/useHorizontalScroll';
import ScrollProgressBar from '@/components/ProgressBar/ProgressBar.vue';
import HomeHero from './layout/HomeHero.vue';
import HomeBrand from './layout/HomeBrand.vue';

const { containerRef, scrollProgress, isScrolling } = useHorizontalScroll();
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;
</style>

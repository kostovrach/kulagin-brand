<template>
    <main class="page" ref="containerRef">
        <ScrollProgressBar :progress="scrollProgress" position="top" :show-when-scrolling="isScrolling" />
        <HomeHero />
        <HomeBrand />
        <HomeProjects />
        <PageNavigator to="/" image="/img/content/singing.gif">
            <template #tag>Далее</template>
            <template #title>Услуги</template>
        </PageNavigator>
    </main>
</template>

<script setup>
import { useHorizontalScroll } from '@/composables/useHorizontalScroll';
import ScrollProgressBar from '@/components/ProgressBar/ProgressBar.vue';

import HomeHero from './layout/HomeHero.vue';
import HomeBrand from './layout/HomeBrand.vue';
import HomeProjects from './layout/HomeProjects.vue';
import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';

const { containerRef, scrollProgress, isScrolling } = useHorizontalScroll();
</script>

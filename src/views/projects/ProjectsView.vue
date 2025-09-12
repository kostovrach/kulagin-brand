<template>
    <main class="page page--horizontal" ref="containerRef">
        <ScrollProgressBar :progress="scrollProgress" position="top" :show-when-scrolling="isScrolling" />
        <ProjectsMain />
        <PageNavigator to="/hobby" image="/img/content/flower.gif">
            <template #tag>Далее</template>
            <template #title>хобби</template>
        </PageNavigator>
    </main>
</template>

<script setup>
import { useHorizontalScroll } from '@/composables/useHorizontalScroll';
import ScrollProgressBar from '@/components/ProgressBar/ProgressBar.vue';
import ProjectsMain from './layout/ProjectsMain.vue';
import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';

const { containerRef, scrollProgress, isScrolling } = useHorizontalScroll();
</script>

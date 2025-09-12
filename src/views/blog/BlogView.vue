<template>
    <main class="page page--horizontal" ref="containerRef">
        <ScrollProgressBar :progress="scrollProgress" position="top" :show-when-scrolling="isScrolling" />
        <section class="blog">
            <div class="blog__container">
                <div class="blog__body">
                    <div class="blog__titlebox">
                        <h1 class="blog__title">Личный блог</h1>
                        <div class="blog__filterbox">
                            <button v-for="category in categories" :key="category.value">{{ category.name }}</button>
                        </div>
                    </div>
                    <ul class="blog__list">
                        <li class="blog__item">
                            <router-link to="/" class="blog__item-wrapper"></router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { useHorizontalScroll } from '@/composables/useHorizontalScroll';
import ScrollProgressBar from '@/components/ProgressBar/ProgressBar.vue';

const { containerRef, scrollProgress, isScrolling } = useHorizontalScroll();

const categories = [
    {
        name: 'Все',
        value: 'all',
    },
    {
        name: 'Обучение',
        value: 'training',
    },
    {
        name: 'Интересное',
        value: 'topical',
    },
    {
        name: 'Студия',
        value: 'studio',
    },
    {
        name: 'СМИ',
        value: 'media',
    },
    {
        name: 'Прочее',
        value: 'other',
    },
];
</script>

<style lang="scss" scoped></style>

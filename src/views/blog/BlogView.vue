<template>
    <HorizontalLayout>
        <section class="blog">
            <div class="blog__container">
                <div class="blog__titlebox">
                    <h1 class="blog__title fade-bottom">Личный блог</h1>
                </div>
                <div class="blog__list">
                    <div class="blog__item" v-for="(article, index) in list" :key="article.slug">
                        <router-link
                            class="blog__item-wrapper fade-bottom"
                            :style="`animation-delay: ${0.1 * (index + 1)}s`"
                            :to="`/article/${article.slug}`"
                        >
                            <picture class="blog__item-image-container">
                                <img class="blog__item-image" :src="article.cover" :alt="article.title" />
                            </picture>
                            <h2 class="blog__item-title">{{ article.title }}</h2>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        <PageNavigator to="/contact" image="/img/content/personal-views/temp1.jpg">
            <template #tag>Далее</template>
            <template #title>Связаться</template>
        </PageNavigator>
    </HorizontalLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useBlogStore } from '@/stores/blog';

import HorizontalLayout from '@/components/HorizontalLayout/HorizontalLayout.vue';
import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';

const blogStore = useBlogStore();

onMounted(() => {
    if (!blogStore.articles.length) {
        blogStore.fetchList();
    }
});

const { list } = storeToRefs(blogStore);
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.blog {
    $p: &;

    position: relative;
    &__container {
        @include horizontal-layout;
    }
    &__titlebox {
        position: fixed;
        z-index: 0;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
    }
    &__title {
        text-transform: uppercase;
        font-family: 'Fira-Extra', sans-serif;
        color: $c-accent;
        font-size: lineScale(256, 72, 480, 1440);
        font-weight: $fw-semi;
        white-space: nowrap;
        mask-image: linear-gradient(to top, transparent 30%, #000 30%);
    }
    &__list {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        grid-auto-flow: column dense;
        gap: 0 rem(128);
    }
    &__item {
        grid-row: span 2;
        width: fit-content;
        height: fit-content;
        transition: opacity $td $tf;
        opacity: 0.95;
        @media (pointer: fine) {
            &:hover {
                opacity: 1;
                #{$p}__item-image-container::before {
                    opacity: 0;
                }
            }
        }
        &-wrapper {
            display: flex;
            flex-direction: column;
            gap: rem(16);
        }
        &-image-container {
            position: relative;
            width: 100%;
            height: 100%;
            &::before {
                content: '';
                position: absolute;
                z-index: 2;
                inset: 0;
                backdrop-filter: blur(5px) saturate(0);
                background-image: url('img/patterns/noise.png');
                pointer-events: none;
                transition: opacity $td $tf;
            }
        }
        &-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &-title {
            text-transform: uppercase;
            font-family: 'Fira-Extra', sans-serif;
            font-size: lineScale(20, 18, 480, 1440);
            font-weight: $fw-bold;
        }
        &:nth-child(6n + 1) {
            width: rem(230);
            #{$p}__item-image-container {
                height: rem(232);
            }
        }
        &:nth-child(6n + 2) {
            width: rem(230);
            #{$p}__item-image-container {
                height: rem(307);
            }
        }
        &:nth-child(6n + 3) {
            width: rem(420);
            translate: 0 calc($py * -1);
            #{$p}__item-image-container {
                height: rem(360);
            }
        }
        &:nth-child(6n + 4) {
            width: rem(230);
            translate: 0 calc($py * -1);
            #{$p}__item-image-container {
                height: rem(232);
            }
        }
        &:nth-child(6n + 5) {
            width: rem(375);
            translate: 0 $py;
            #{$p}__item-image-container {
                height: rem(226);
            }
        }
        &:nth-child(6n + 6) {
            width: rem(420);
            translate: 0 calc($py * -1.5);
            #{$p}__item-image-container {
                height: rem(460);
            }
        }
        &:nth-child(even) {
            align-self: end;
        }
    }
}
</style>

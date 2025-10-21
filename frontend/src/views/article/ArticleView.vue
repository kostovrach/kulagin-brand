<template>
    <VerticalLayout class="article">
        <div class="article__container">
            <div class="article__loader" v-if="isLoading">
                <ArticleLoader />
            </div>

            <article class="article__body" v-else>
                <header class="article__header" v-if="article">
                    <div class="article__titlebox">
                        <time class="article__date" v-if="article.date_created" :datetime="article.date_created">
                            {{ formattedDate }}
                        </time>
                        <h1 class="article__title">{{ article.title }}</h1>
                        <router-link to="/blog" class="article__back-link">
                            <span class="article__back-link-icon"><TheSvgSprite type="arrow" :size="14" /> </span>
                            <span class="article__back-link-text">Назад</span>
                        </router-link>
                    </div>

                    <picture class="article__cover" v-if="article.cover_url">
                        <img :src="article.cover_url" :alt="article.title" />
                    </picture>
                </header>
                <div class="article__main">
                    <ArticleContent :content="article?.content" :summary="article?.summary" />
                </div>
            </article>

            <div class="article__suggest">
                <div class="article__suggest-container">
                    <div class="article__suggest-title">Читать далее</div>
                    <div class="article__suggest-list">
                        <router-link
                            :to="`/article/${article.slug}`"
                            class="article__suggest-item"
                            v-for="article in list.slice(0, 4)"
                            :key="article.slug"
                        >
                            <picture class="article__suggest-item-image-container">
                                <img
                                    class="article__suggest-item-image"
                                    :src="article.cover_url"
                                    :alt="article.title"
                                />
                            </picture>
                            <p class="article__suggest-item-title">{{ article.title }}</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </VerticalLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useBlogStore } from '@/stores/blog';

import VerticalLayout from '@/components/VerticalLayout/VerticalLayout.vue';
import TheSvgSprite from '@/components/TheSvgSprite.vue';
import ArticleLoader from './components/ArticleLoader.vue';
import ArticleContent from './components/ArticleContent.vue';

const route = useRoute();
const blog = useBlogStore();

const article = ref(null);
const isLoading = ref(false);
const error = ref(null);

async function loadArticle(slug) {
    if (!slug) {
        article.value = null;
        return;
    }
    isLoading.value = true;
    error.value = null;
    try {
        article.value = await blog.fetchArticle(slug);
    } catch (err) {
        error.value = err && err.message ? err.message : 'Ошибка загрузки статьи';
        article.value = null;
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    loadArticle(route.params.slug);
    if (!blog.articles.length) {
        blog.fetchList();
    }
});

const { list } = storeToRefs(blog);

onBeforeRouteUpdate((to) => {
    loadArticle(to.params.slug);
});

const formattedDate = computed(() => {
    if (!article.value?.date_created) return '';
    try {
        return new Date(article.value.date_created).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch {
        return article.value.date_created;
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;
.article {
    $p: &;

    &__header {
        display: flex;
        flex-direction: column;
        gap: rem(64);
    }
    &__titlebox {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: rem(24);
        @include vertical-layout;
    }
    &__date {
        align-self: flex-end;
        font-family: 'Inter', sans-serif;
        text-transform: uppercase;
        font-size: rem(14);
        font-weight: $fw-med;
        color: $c-323232;
    }
    &__title {
        font-family: 'Fira-Extra', sans-serif;
        text-transform: uppercase;
        font-weight: $fw-bold;
        font-size: lineScale(96, 32, 480, 1440);
        text-wrap: balance;
    }
    &__back-link {
        width: fit-content;
        display: flex;
        align-items: center;
        gap: rem(8);
        font-family: 'Inter', sans-serif;
        color: $c-accent;
        font-size: rem(14);
        font-weight: $fw-med;
        &-icon {
            rotate: 180deg;
            overflow: hidden;
        }
        @media (pointer: fine) {
            &:hover {
                > span svg {
                    animation: arrow-translate calc($td * 1.2) $tf;
                }
            }
        }
        @keyframes arrow-translate {
            0% {
                translate: 0 0;
                opacity: 1;
            }
            45% {
                translate: 100% 0;
                opacity: 0;
            }
            55% {
                translate: -100% 0;
                opacity: 0;
            }
            100% {
                translate: 0 0;
                opacity: 1;
            }
        }
    }
    &__cover {
        width: 100%;
        height: rem(480);
        margin: 0 auto;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &__main {
        width: 100%;
        @include vertical-layout;
    }
    &__suggest {
        color: $c-main;
        background-color: $c-111111;
        padding: rem(64) 0 $py 0;
        &-container {
            display: flex;
            flex-direction: column;
            gap: rem(32);
            @include vertical-layout;
        }
        &-title {
            text-transform: uppercase;
            color: $c-9E9595;
            font-size: lineScale(32, 24, 480, 1440);
            font-weight: $fw-bold;
        }
        &-list {
            display: flex;
            flex-wrap: wrap;
            gap: rem(32);
        }
        &-item {
            flex: 1 0 22%;
            min-width: rem(180);
            display: flex;
            flex-direction: column;
            gap: rem(16);
            @media (pointer: fine) {
                &:hover {
                    #{$p}__suggest-item-image-container::before {
                        opacity: 0;
                    }
                }
            }
            &-image-container {
                position: relative;
                width: 100%;
                height: rem(278);
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
                font-size: rem(20);
                font-weight: $fw-bold;
                @include lineClamp(2);
            }
        }
    }
}
</style>

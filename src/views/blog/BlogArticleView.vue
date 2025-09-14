<template>
    <VerticalLayout class="article">
        <div class="article__container">
            <header class="article__header" v-if="article">
                <div class="article__titlebox">
                    <time class="article__date" v-if="article.date" :datetime="article.date">
                        {{ formattedDate }}
                    </time>
                    <h1 class="article__title">{{ article.title }}</h1>
                    <router-link to="/blog" class="article__back-link">
                        <span class="article__back-link-icon"><TheSvgSprite type="arrow" :size="14" /> </span>
                        <span class="article__back-link-text">Назад</span>
                    </router-link>
                </div>

                <picture class="article__cover" v-if="article.cover">
                    <img :src="article.cover" :alt="article.title" />
                </picture>
            </header>

            <div class="article__loading" v-if="isLoading">Загрузка...</div>

            <div class="article__error" v-else-if="error">Ошибка: {{ error }}</div>

            <div
                class="article__body"
                v-else-if="article && article.blocks && article.blocks.length"
                aria-labelledby="article-title"
            >
                <ArticleRenderer :blocks="article.blocks" />
            </div>

            <div class="article__empty" v-else-if="article && (!article.blocks || !article.blocks.length)">
                Статья пуста.
            </div>

            <div v-else class="article__notfound">Статья не найдена.</div>
        </div>
    </VerticalLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useBlogStore } from '@/stores/blog';
import ArticleRenderer from './components/ArticleRenderer.vue';
import VerticalLayout from '@/components/VerticalLayout/VerticalLayout.vue';
import TheSvgSprite from '@/components/TheSvgSprite.vue';

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
});

onBeforeRouteUpdate((to) => {
    loadArticle(to.params.slug);
});

const formattedDate = computed(() => {
    if (!article.value?.date) return '';
    try {
        return new Date(article.value.date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch {
        return article.value.date;
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;
.article {
    &__container {
    }
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
    &__body {
        width: 100%;
        @include vertical-layout;
    }
}
</style>

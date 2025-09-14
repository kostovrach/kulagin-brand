<template>
    <main class="blog">
        <h1 class="blog__title">Блог</h1>

        <section class="blog__list">
            <article v-for="article in list" :key="article.slug" class="blog__card" @click="goToArticle(article.slug)">
                <img class="blog__cover" :src="article.cover" :alt="article.title" />
                <h2 class="blog__card-title">{{ article.title }}</h2>
            </article>
        </section>
    </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useBlogStore } from '@/stores/blog';

const blogStore = useBlogStore();
const router = useRouter();

onMounted(() => {
    if (!blogStore.articles.length) {
        blogStore.fetchList();
    }
});

const { list } = storeToRefs(blogStore);

function goToArticle(slug) {
    router.push({ name: 'blog-article', params: { slug } });
}
</script>

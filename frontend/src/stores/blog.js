import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { getArticlesList, getArticleBySlug, clearListCache as clearRepoListCache } from '@/repositories/blogRepository';

export const useBlogStore = defineStore('blog', () => {
    // state
    const list = ref([]);
    const articles = reactive({});
    const isLoadingList = ref(false);
    const loadingArticles = reactive({});
    const errors = reactive({ list: null, articles: {} });

    const pendingFetches = {};

    // --- LIST ---
    async function fetchList({ force = false, fields } = {}) {
        if (list.value.length && !force) return list.value;

        isLoadingList.value = true;
        errors.list = null;

        try {
            const data = await getArticlesList({ fields, force });
            list.value = (data || []).map((item) => ({
                ...item,
                slug:
                    item.slug ?? (item.title ? String(item.title).toLowerCase().replace(/\s+/g, '-') : String(item.id)),
            }));
            return list.value;
        } catch (err) {
            console.error('[BlogStore] fetchList error', err);
            errors.list = err?.message ?? String(err);
            throw err;
        } finally {
            isLoadingList.value = false;
        }
    }

    // --- SINGLE ARTICLE ---
    async function fetchArticle(slug, { force = false } = {}) {
        if (!slug) throw new Error('fetchArticle: slug required');

        if (articles[slug] && !force) return articles[slug];

        if (pendingFetches[slug]) return pendingFetches[slug];

        loadingArticles[slug] = true;
        errors.articles[slug] = null;

        const promise = (async () => {
            try {
                const data = await getArticleBySlug(slug, { force });
                if (!data) throw new Error(`Article "${slug}" not found`);

                articles[slug] = data;

                const idx = list.value.findIndex((i) => i.slug === slug);
                if (idx !== -1) {
                    list.value[idx] = {
                        ...list.value[idx],
                        id: data.id,
                        title: data.title,
                        cover: data.cover ?? null,
                        summary: data.summary ?? null,
                        date_created: data.date_created ?? null,
                    };
                }

                return data;
            } catch (err) {
                console.error('[BlogStore] fetchArticle error', err);
                errors.articles[slug] = err?.message ?? String(err);
                articles[slug] = null;
                throw err;
            } finally {
                loadingArticles[slug] = false;
                delete pendingFetches[slug];
            }
        })();

        pendingFetches[slug] = promise;
        return promise;
    }

    async function prefetchArticle(slug) {
        try {
            await fetchArticle(slug);
        } catch (err) {
            // silent
        }
    }

    function getArticle(slug) {
        return articles[slug] ?? null;
    }
    function isArticleLoading(slug) {
        return !!loadingArticles[slug];
    }

    function clearArticle(slug) {
        if (slug) {
            delete articles[slug];
            delete loadingArticles[slug];
            delete errors.articles[slug];
        } else {
            Object.keys(articles).forEach((k) => delete articles[k]);
            Object.keys(loadingArticles).forEach((k) => delete loadingArticles[k]);
            errors.articles = {};
        }
    }

    function clearList() {
        list.value = [];
        isLoadingList.value = false;
        errors.list = null;
        try {
            clearRepoListCache();
        } catch (e) {
            // ignore
        }
    }

    return {
        // state
        list,
        articles,
        isLoadingList,
        loadingArticles,
        errors,

        // actions
        fetchList,
        fetchArticle,
        prefetchArticle,
        getArticle,
        isArticleLoading,
        clearArticle,
        clearList,
    };
});

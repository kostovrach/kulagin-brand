import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { directus, assetUrl } from '@/services/directus';
import { readItems } from '@directus/sdk';

// helpers
function normalizeListResponse(r) {
    if (!r) return [];
    if (Array.isArray(r)) return r;
    if (r && Array.isArray(r.data)) return r.data;
    return [];
}
function normalizeSingleResponse(r) {
    if (!r) return null;
    if (Array.isArray(r)) return r[0] ?? null;
    if (r && Array.isArray(r.data)) return r.data[0] ?? null;
    if (r && typeof r === 'object') return r;
    return null;
}

function addFileUrls(obj) {
    if (!obj) return;
    const FILE_NAMES = new Set([
        'video',
        'poster',
        'logo',
        'image',
        'file',
        'media',
        'files',
        'avatar',
        'cover',
        'thumbnail',
        'attachment',
        'poster_image',
    ]);
    const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const walk = (node) => {
        if (!node) return;
        if (Array.isArray(node)) {
            node.forEach(walk);
            return;
        }
        if (typeof node !== 'object') return;

        for (const [k, v] of Object.entries(node)) {
            if (typeof v === 'string' && UUID_RE.test(v) && FILE_NAMES.has(k)) {
                if (!node[`${k}_url`]) node[`${k}_url`] = assetUrl(v);
            } else if (v && typeof v === 'object') {
                walk(v);
            }
        }
    };

    walk(obj);
}

export const useBlogStore = defineStore('blog', () => {
    // state
    const list = ref([]);
    const articles = reactive({});
    const isLoadingList = ref(false);
    const loadingArticles = reactive({});
    const errors = reactive({ list: null, articles: {} });

    const pendingFetches = {};

    // --- LIST ---
    async function fetchList({ force = false } = {}) {
        if (list.value.length && !force) return list.value;

        isLoadingList.value = true;
        errors.list = null;

        try {
            const res = await directus.request(
                readItems('article', {
                    fields: ['id', 'title', 'slug', 'cover', 'date_created', 'summary'],
                    sort: ['-date_created'],
                }),
            );

            const data = normalizeListResponse(res);

            data.forEach((item) => addFileUrls(item));

            list.value = data.map((item) => ({
                ...item,
                slug: item.slug ?? (item.title ? String(item.title).toLowerCase().replace(/\s+/g, '-') : item.id),
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
                const res = await directus.request(
                    readItems('article', {
                        filter: { slug: { _eq: slug } },
                        limit: 1,
                        fields: ['id', 'title', 'slug', 'cover', 'date_created', 'summary', 'content'],
                    }),
                );

                const data = normalizeSingleResponse(res);
                if (!data) throw new Error(`Article "${slug}" not found`);

                addFileUrls(data);

                articles[slug] = data;

                const idx = list.value.findIndex((i) => i.slug === slug);
                const preview = {
                    id: data.id,
                    title: data.title,
                    slug: data.slug,
                    cover: data.cover ?? null,
                    summary: data.summary ?? null,
                    date_created: data.date_created ?? null,
                };
                if (idx !== -1) list.value[idx] = { ...list.value[idx], ...preview };

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
            console.error(err);
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

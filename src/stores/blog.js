import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

const RAW_BASE = import.meta.env.VITE_BLOG_URL;
const BASE = RAW_BASE.replace(/\/$/, '');

function slugify(value = '') {
    return String(value)
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, '-')
        .replace(/[^a-z0-9\-]+/g, '')
        .replace(/\-+/g, '-')
        .replace(/^\-+|\-+$/g, '');
}
export const useBlogStore = defineStore('blog', () => {
    // state
    const list = ref([]); // [{ id, title, cover, date, summary, slug }]
    const articles = reactive({}); // { [slug]: fullArticleObject }
    const isLoadingList = ref(false);
    const loadingArticles = reactive({}); // { [slug]: boolean }
    const errors = reactive({
        list: null,
        articles: {}, // { [slug]: message }
    });

    // internal map to reuse concurrent fetches: slug -> Promise
    const pendingFetches = {};

    // helper: extract preview info from full article
    function extractPreview(article) {
        if (!article) return null;
        return {
            id: article.id ?? article.slug ?? slugify(article.title ?? ''),
            title: article.title ?? '',
            cover: article.cover ?? null,
            date: article.date ?? null,
            summary: article.summary ?? null,
            slug: article.slug ?? slugify(article.title ?? article.id ?? ''),
        };
    }

    /**
     * @param {Object} options
     * @param {boolean} options.force - форсированная перезагрузка
     */
    async function fetchList({ force = false } = {}) {
        if (list.value.length && !force) return list.value;

        isLoadingList.value = true;
        errors.list = null;

        try {
            const res = await fetch(`${BASE}/index.json`);
            if (!res.ok) throw new Error(`Ошибка загрузки списка: ${res.status} ${res.statusText}`);

            const data = await res.json();
            // нормализуем: если у элемента нет slug — создаём из title
            list.value = (Array.isArray(data) ? data : []).map((item) => ({
                ...item,
                slug: item.slug ?? slugify(item.title ?? item.id ?? ''),
            }));
            return list.value;
        } catch (err) {
            errors.list = (err && err.message) || String(err);
            throw err;
        } finally {
            isLoadingList.value = false;
        }
    }

    /**
     * Загрузить полную статью по slug.
     * Кэшируется в articles[slug]. Повторные вызовы вернут кэш (если не force).
     * Одновременные параллельные запросы на один slug будут слиты (pendingFetches).
     * @param {string} slug
     * @param {Object} options
     * @param {boolean} options.force - форсированная перезагрузка
     */
    async function fetchArticle(slug, { force = false } = {}) {
        if (!slug) throw new Error('fetchArticle: slug required');

        // вернуть кэш
        if (articles[slug] && !force) return articles[slug];

        // если уже идет запрос — вернуть его promise
        if (pendingFetches[slug]) return pendingFetches[slug];

        loadingArticles[slug] = true;
        errors.articles[slug] = null;

        const promise = (async () => {
            try {
                const res = await fetch(`${BASE}/${slug}.json`);
                if (!res.ok) {
                    // пытаемся получить текст ошибки для диагностики
                    const txt = await res.text().catch(() => '');
                    throw new Error(`Ошибка загрузки статьи "${slug}": ${res.status} ${res.statusText} ${txt}`);
                }
                const data = await res.json();
                // гарантия наличия slug и id
                data.slug = data.slug ?? slug;
                data.id = data.id ?? data.slug;

                // сохранить в кэш
                articles[slug] = data;

                // если в списке (index.json) есть элемент с тем же slug — обновить превью (чтобы summary/cover собрался)
                const idx = list.value.findIndex((i) => i.slug === slug);
                const preview = extractPreview(data);
                if (idx !== -1) {
                    list.value[idx] = { ...list.value[idx], ...preview };
                } else {
                    // не обязательно добавлять в список, но можно — опционально:
                    // list.value.push(preview)
                }

                return data;
            } catch (err) {
                errors.articles[slug] = (err && err.message) || String(err);
                // на случай неуспеха – не хранить мусор
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

    /**
     * Convenience: prefetch (без выбрасывания ошибки — просто логируем)
     */
    async function prefetchArticle(slug) {
        try {
            await fetchArticle(slug);
        } catch (err) {
            // swallow — но можно логировать в консоль
            // console.warn('prefetchArticle failed', slug, err)
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
            // clear all
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

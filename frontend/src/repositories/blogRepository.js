import { fetchList } from '@/services/directusData';
import { clearPersistCache, clearMemoryCache } from '@/services/directusData';

const DEFAULT_LIST_FIELDS = ['id', 'title', 'slug', 'cover', 'date_created', 'summary'];
const DEFAULT_ARTICLE_FIELDS = ['id', 'title', 'slug', 'cover', 'date_created', 'summary', 'content'];
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function getArticlesList({
    fields = DEFAULT_LIST_FIELDS,
    force = false,
    persist = true,
    persistTtl,
} = {}) {
    return fetchList(
        'article',
        { fields, sort: ['-date_created'] },
        { resolveFiles: true, force, persist, persistTtl },
    );
}

export async function getArticleBySlug(slug, { fields = DEFAULT_ARTICLE_FIELDS, force = false } = {}) {
    if (!slug) return null;
    const filter = UUID_RE.test(String(slug)) ? { id: { _eq: slug } } : { slug: { _eq: slug } };
    const rows = await fetchList('article', { fields, filter, limit: 1 }, { resolveFiles: true, force });
    return rows[0] ?? null;
}

export function clearListCache() {
    clearPersistCache('list:article');
    clearMemoryCache('list:article');
}

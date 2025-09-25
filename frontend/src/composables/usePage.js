import { ref, onMounted } from 'vue';
import { directus, assetUrl } from '@/services/directus';
import { readItems } from '@directus/sdk';

export function usePage(pageCollection, withRelations = [], opts = {}) {
    const page = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const _normalizeResponse = (res) => {
        if (!res) return null;
        if (Array.isArray(res)) return res[0] ?? null;
        if (res && Array.isArray(res.data)) return res.data[0] ?? null;
        if (res && typeof res === 'object') return res;
        return null;
    };

    const _addFileUrls = (obj) => {
        if (!obj) return;
        const FILE_NAMES = new Set([
            'video',
            'poster',
            'image',
            'file',
            'files',
            'avatar',
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
    };

    const fetchPage = async () => {
        loading.value = true;
        error.value = null;

        try {
            const res = await directus.request(
                readItems(pageCollection, {
                    limit: 1,
                    fields: ['*', 'sections.collection', 'sections.item.*', ...withRelations],
                }),
            );

            const data = _normalizeResponse(res);
            if (!data) {
                page.value = null;
                return;
            }

            const normalized = { ...data };

            if (Array.isArray(data.sections)) {
                for (const section of data.sections) {
                    const collection = section?.collection;
                    const item = section?.item ?? null;

                    if (!collection) continue;

                    normalized[collection] = item;
                }
            }

            if (opts.resolveFiles) {
                _addFileUrls(normalized);
            }

            page.value = normalized;
        } catch (e) {
            console.error('[usePage] fetch error', e);
            error.value = e;
            page.value = null;
        } finally {
            loading.value = false;
        }
    };

    onMounted(fetchPage);

    return {
        page,
        loading,
        error,
        refresh: fetchPage,
    };
}

import { directus, assetUrl } from '@/services/directus';
import { readItems } from '@directus/sdk';

/* ---------- file detection ---------- */
const FILE_NAMES = new Set([
    'video',
    'poster',
    'logo',
    'image',
    'image1',
    'image2',
    'image3',
    'image4',
    'image5',
    'image6',
    'image7',
    'image8',
    'image9',
    'file',
    'media',
    'files',
    'avatar',
    'cover',
    'thumbnail',
    'attachment',
    'poster_image',
    'footer_image',
]);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function addFileUrls(obj) {
    if (!obj) return;
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

/* ---------- normalizers ---------- */
export function normalizeSingleResponse(res) {
    if (!res) return null;
    if (Array.isArray(res)) return res[0] ?? null;
    if (res && Array.isArray(res.data)) return res.data[0] ?? null;
    if (res && typeof res === 'object') return res;
    return null;
}
export function normalizeListResponse(res) {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
    return [];
}

/* ---------- memory cache ---------- */
const memoryCache = new Map();
function memGet(key, ttl) {
    const rec = memoryCache.get(key);
    if (!rec) return null;
    if (ttl && Date.now() - rec.ts > ttl) {
        memoryCache.delete(key);
        return null;
    }
    return rec.data;
}
function memSet(key, data) {
    memoryCache.set(key, { data, ts: Date.now() });
}
export function clearMemoryCache(prefix) {
    if (!prefix) return memoryCache.clear();
    for (const k of Array.from(memoryCache.keys())) {
        if (k.startsWith(prefix)) memoryCache.delete(k);
    }
}

/* ---------- persist cache (localStorage) ---------- */
const PERSIST_PREFIX = 'directus:persist:';
function persistKey(key) {
    return `${PERSIST_PREFIX}${key}`;
}
function persistSave(key, data) {
    try {
        localStorage.setItem(persistKey(key), JSON.stringify({ data, ts: Date.now() }));
    } catch (e) {
        console.warn('[directusData] persistSave failed', e);
    }
}
function persistLoad(key, ttl) {
    try {
        const raw = localStorage.getItem(persistKey(key));
        if (!raw) return null;
        const rec = JSON.parse(raw);
        if (ttl && Date.now() - rec.ts > ttl) {
            localStorage.removeItem(persistKey(key));
            return null;
        }
        return rec.data;
    } catch (e) {
        console.warn('[directusData] persistLoad failed', e);
        return null;
    }
}
export function clearPersistCache(prefix) {
    if (!prefix) {
        for (const k of Object.keys(localStorage)) {
            if (k.startsWith(PERSIST_PREFIX)) localStorage.removeItem(k);
        }
        return;
    }
    for (const k of Object.keys(localStorage)) {
        if (k.startsWith(`${PERSIST_PREFIX}${prefix}`)) localStorage.removeItem(k);
    }
}

/* ---------- key builders ---------- */
function buildItemKey(collection, params = {}) {
    return `item:${collection}:${JSON.stringify(params || {})}`;
}
function buildListKey(collection, params = {}) {
    return `list:${collection}:${JSON.stringify(params || {})}`;
}
function buildParams({ fields, filter, sort, limit }) {
    const params = {};
    if (fields) params.fields = fields;
    if (filter) params.filter = filter;
    if (sort) params.sort = sort;
    if (limit !== undefined) params.limit = limit;
    return params;
}

/* ---------- fetch functions ---------- */

export async function fetchItem(collection, params = {}, opts = {}) {
    const fields = params.fields ?? ['*', ...(params.relations ?? [])];
    const limit = params.limit ?? 1;

    const key = buildItemKey(collection, { fields, filter: params.filter, sort: params.sort, limit });

    if (!opts.force) {
        const cached = memGet(key, opts.memoryTtl);
        if (cached !== null) return cached;
    }

    try {
        const query = buildParams({ fields, filter: params.filter, sort: params.sort, limit });
        const res = await directus.request(readItems(collection, query));

        const data = normalizeSingleResponse(res);
        if (data && opts.resolveFiles !== false) addFileUrls(data);

        memSet(key, data);
        return data;
    } catch (err) {
        console.error('[directusData] fetchItem error', err);
        throw err;
    }
}

export async function fetchList(collection, params = {}, opts = {}) {
    const fields = params.fields ?? ['*'];

    const key = buildListKey(collection, { fields, filter: params.filter, sort: params.sort, limit: params.limit });

    if (!opts.force) {
        if (opts.persist) {
            const p = persistLoad(key, opts.persistTtl ?? 24 * 60 * 60 * 1000);
            if (p) return p;
        }
        const m = memGet(key, opts.memoryTtl);
        if (m) return m;
    }

    try {
        const query = buildParams({ fields, filter: params.filter, sort: params.sort, limit: params.limit });
        const res = await directus.request(readItems(collection, query));

        const data = normalizeListResponse(res);
        if (data && opts.resolveFiles !== false) data.forEach(addFileUrls);

        memSet(key, data);
        if (opts.persist) persistSave(key, data);

        return data;
    } catch (err) {
        console.error('[directusData] fetchList error', err);
        throw err;
    }
}

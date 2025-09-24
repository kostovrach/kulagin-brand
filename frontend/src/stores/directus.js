import { defineStore } from 'pinia';
import { directus, assetUrl, fetchFilesMetaBulk } from '@/services/directus';
import { readItems, readItem } from '@directus/sdk';

const DEFAULT_FILE_FIELD_NAMES = new Set([
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

export const useDirectusStore = defineStore('directus', {
    state: () => ({
        collections: {},
        loading: {},
        error: {},
        fileMetaCache: {},
    }),

    actions: {
        async fetch(
            collection,
            options = {},
            id = null,
            resolveFiles = { enabled: false, fetchMeta: false, fields: [] },
        ) {
            this.loading[collection] = true;
            this.error[collection] = null;

            try {
                const raw =
                    id !== null
                        ? await directus.request(readItem(collection, id, options))
                        : await directus.request(readItems(collection, options));

                const normalized = raw && raw.data !== undefined ? raw.data : raw;

                if (resolveFiles && resolveFiles.enabled) {
                    await this._resolveAssetsInDataBatch(normalized, resolveFiles);
                }

                this.collections[collection] = normalized;
                return normalized;
            } catch (err) {
                this.error[collection] = err?.message || String(err);
                throw err;
            } finally {
                this.loading[collection] = false;
            }
        },

        async _resolveAssetsInDataBatch(data, { fetchMeta = false, fields = [] } = {}) {
            if (!data) return;

            const explicitPaths = Array.isArray(fields) && fields.length ? new Set(fields) : null;
            const idsSet = new Set();
            const locations = [];

            const collect = (node, path = '') => {
                if (!node) return;
                if (Array.isArray(node)) {
                    node.forEach((item) => collect(item, path));
                    return;
                }
                if (typeof node === 'object') {
                    for (const [k, v] of Object.entries(node)) {
                        const currentPath = path ? `${path}.${k}` : k;

                        if (typeof v === 'string' && UUID_RE.test(v)) {
                            const matchesExplicit = explicitPaths
                                ? explicitPaths.has(currentPath) || explicitPaths.has(k)
                                : DEFAULT_FILE_FIELD_NAMES.has(k);
                            if (matchesExplicit) {
                                idsSet.add(v);
                                locations.push({ parent: node, key: k, id: v });
                                continue;
                            }
                        }

                        if (typeof v === 'object' && v !== null) {
                            collect(v, currentPath);
                        }
                    }
                }
            };

            collect(data);

            for (const loc of locations) {
                loc.parent[`${loc.key}_url`] = assetUrl(loc.id);
            }

            if (!fetchMeta || idsSet.size === 0) return;

            const missing = [];
            const metaMap = {};

            for (const id of idsSet) {
                if (this.fileMetaCache[id]) {
                    metaMap[id] = this.fileMetaCache[id];
                } else {
                    missing.push(id);
                }
            }

            if (missing.length) {
                const metas = await fetchFilesMetaBulk(missing);
                for (const m of metas) {
                    this.fileMetaCache[m.id] = m;
                    metaMap[m.id] = m;
                }
            }

            for (const loc of locations) {
                loc.parent[`${loc.key}_meta`] = metaMap[loc.id] || null;
            }
        },

        getAssetUrl(id, params = {}) {
            return assetUrl(id, params);
        },

        async getFileMetaCached(id) {
            if (!id) return null;
            if (this.fileMetaCache[id]) return this.fileMetaCache[id];
            const metas = await fetchFilesMetaBulk([id]);
            const m = metas?.[0] ?? null;
            if (m) this.fileMetaCache[m.id] = m;
            return m;
        },
    },
});

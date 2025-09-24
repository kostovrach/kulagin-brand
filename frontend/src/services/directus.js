import { createDirectus, rest, staticToken, readItems, readItem } from '@directus/sdk';

const API_URL = import.meta.env.VITE_DIRECTUS_URL;
const TOKEN = import.meta.env.VITE_DIRECTUS_TOKEN;

export const directus = createDirectus(API_URL).with(rest()).with(staticToken(TOKEN));

export function assetUrl(id, params = {}) {
    if (!id) return null;
    const qs = new URLSearchParams(params).toString();
    return `${API_URL}/assets/${id}${qs ? `?${qs}` : ''}`;
}

export async function fetchFileMeta(
    id,
    fields = ['id', 'filename_download', 'type', 'filesize', 'title', 'description', 'metadata'],
) {
    if (!id) return null;
    const r = await directus.request(readItem('directus_files', id, { fields }));
    return r && r.data !== undefined ? r.data : r;
}

export async function fetchFilesMetaBulk(
    ids = [],
    fields = ['id', 'filename_download', 'type', 'filesize', 'title', 'description', 'metadata'],
) {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    const uniq = Array.from(new Set(ids));
    const r = await directus.request(
        readItems('directus_files', {
            filter: { id: { _in: uniq } },
            fields,
            limit: uniq.length,
        }),
    );
    return r && r.data !== undefined ? r.data : r;
}

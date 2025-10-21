import { createDirectus, rest, staticToken, readFile, readFiles } from '@directus/sdk';

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
    try {
        return await directus.request(readFile(id, { fields }));
    } catch (err) {
        console.error('fetchFileMeta failed', err);
        return null;
    }
}

export async function fetchFilesMetaBulk(
    ids = [],
    fields = ['id', 'filename_download', 'type', 'filesize', 'title', 'description', 'metadata'],
) {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    const uniq = Array.from(new Set(ids));
    try {
        return await directus.request(
            readFiles({
                filter: { id: { _in: uniq } },
                fields,
                limit: uniq.length,
            }),
        );
    } catch (err) {
        console.error('fetchFilesMetaBulk failed', err);
        return [];
    }
}

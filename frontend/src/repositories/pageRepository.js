import { fetchItem } from '@/services/directusData';

export async function getPage(collection, withRelations = [], opts = {}) {
    const fields = ['*', ...((Array.isArray(withRelations) ? withRelations : []) || [])];
    const data = await fetchItem(collection, { fields }, opts);
    if (!data) return null;

    const normalized = { ...data };

    if (Array.isArray(data.sections)) {
        for (const section of data.sections) {
            const coll = section?.collection;
            const item = section?.item ?? null;
            if (coll) normalized[coll] = item;
        }
    }

    return normalized;
}

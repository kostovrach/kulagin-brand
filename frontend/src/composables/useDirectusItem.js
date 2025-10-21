import { ref, onMounted } from 'vue';
import { getCache, setCache } from '@/utils/cache';

export function useDirectusItem(fetcher, key, opts = {}) {
    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const cacheTtl = opts.cacheTtl ?? Infinity;

    const fetchData = async () => {
        loading.value = true;
        error.value = null;

        try {
            const cached = getCache(key, cacheTtl);
            if (cached) {
                data.value = cached;
                return;
            }

            const fresh = await fetcher();
            data.value = fresh;
            setCache(key, fresh);
        } catch (e) {
            console.error('[useDirectusItem] fetch error', e);
            error.value = e;
            data.value = null;
        } finally {
            loading.value = false;
        }
    };

    onMounted(fetchData);

    return {
        data,
        loading,
        error,
        refresh: fetchData,
    };
}

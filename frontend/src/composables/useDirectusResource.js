import { ref, computed, onMounted } from 'vue';
import { useDirectusStore } from '@/stores/directus';

export function useDirectusResource(collection, options = {}, id = null, opts = {}) {
    const store = useDirectusStore();
    const immediate = opts.immediate !== false;
    const resolveFiles = opts.resolveFiles || { enabled: false, fetchMeta: false, fields: [] };

    const data = ref(null);

    const fetchFn = async () => {
        const res = await store.fetch(collection, options, id, resolveFiles);
        data.value = res;
        return res;
    };

    if (immediate)
        onMounted(() => {
            fetchFn().catch(() => {});
        });

    const loading = computed(() => !!store.loading[collection]);
    const error = computed(() => store.error[collection]);

    const first = computed(() => {
        if (!data.value) return null;
        if (id !== null) return data.value;
        if (Array.isArray(data.value)) return data.value[0] ?? null;
        return data.value;
    });

    return {
        data,
        first,
        loading,
        error,
        refresh: fetchFn,
        getAssetUrl: store.getAssetUrl,
        getFileMeta: store.getFileMetaCached,
    };
}

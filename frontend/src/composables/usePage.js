import { useDirectusItem } from './useDirectusItem';
import { getPage } from '@/repositories/pageRepository';

export function usePage(pageCollection, withRelations = [], opts = {}) {
    const key = JSON.stringify({ pageCollection, withRelations });
    const { data, loading, error, refresh } = useDirectusItem(
        () => getPage(pageCollection, withRelations, opts),
        key,
        opts,
    );

    return {
        page: data,
        loading,
        error,
        refresh,
    };
}

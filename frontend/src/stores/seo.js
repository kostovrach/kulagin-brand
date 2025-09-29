import { defineStore } from 'pinia';
import { fetchItem } from '@/services/directusData';

export const useSeoStore = defineStore('seo', {
    state: () => ({
        seo: null,
        loaded: false,
    }),

    actions: {
        async loadSeo(force = false) {
            if (this.loaded && !force) return;

            const data = await fetchItem('seo_settings', { fields: ['*'] });

            this.seo = data;
            this.loaded = true;
        },
    },
});

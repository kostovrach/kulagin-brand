import { defineStore } from 'pinia'
import { getPage } from '@/services/directus'

export const usePagesStore = defineStore('pages', {
  state: () => ({
    currentPage: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPage(slug) {
      this.loading = true
      this.error = null
      try {
        this.currentPage = await getPage(slug)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
  },
})

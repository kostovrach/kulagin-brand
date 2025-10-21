<template>
    <PageLoader v-if="loading" />
    <HorizontalLayout v-else>
        <ContactMain :content="page" />
    </HorizontalLayout>
</template>

<script setup>
import HorizontalLayout from '@/components/HorizontalLayout/HorizontalLayout.vue';
import PageLoader from '@/components/PageLoader/PageLoader.vue';
import ContactMain from './layout/ContactMain.vue';

// content management
import { usePage } from '@/composables/usePage';

const { page, loading } = usePage('contact', ['links.*', 'links.contact_links_id.*', 'adress.*'], {
    resolveFiles: true,
});
</script>

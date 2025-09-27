<template>
    <HorizontalLayout>
        <ContactMain :content="page" />
    </HorizontalLayout>
</template>

<script setup>
import HorizontalLayout from '@/components/HorizontalLayout/HorizontalLayout.vue';
import ContactMain from './layout/ContactMain.vue';

// content management
import { usePage } from '@/composables/usePage';

const { page, loading, error } = usePage('contact', ['links.*', 'links.contact_links_id.*', 'adress.*'], {
    resolveFiles: true,
});
</script>

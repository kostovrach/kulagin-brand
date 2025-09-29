<template>
    <PageLoader v-if="loading" />
    <VerticalLayout v-else>
        <MarketersMain :content="page?.sections" />
        <section class="contacts">
            <div class="contacts__container">
                <Contact orientation="vertical" />
            </div>
        </section>
        <PageNavigator to="/blog" image="/img/content/snapshot.gif" orientation="horizontal">
            <template #tag>Далее</template>
            <template #title>Блог</template>
        </PageNavigator>
    </VerticalLayout>
</template>

<script setup>
import VerticalLayout from '@/components/VerticalLayout/VerticalLayout.vue';
import PageLoader from '@/components/PageLoader/PageLoader.vue';
import MarketersMain from './layout/MarketersMain.vue';
import Contact from '@/components/Contact/Contact.vue';
import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';

// content management
import { usePage } from '@/composables/usePage';

const { page, loading } = usePage(
    'marketers',
    [
        'sections.*',
        'sections.marketers_sections_id.*',
        'sections.marketers_sections_id.gallery.*',
        'sections.marketers_sections_id.gallery.images.*',
        'sections.marketers_sections_id.gallery.images.marketers_setions_gallery_image_id.*',
    ],
    {
        resolveFiles: true,
    },
);
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.contacts {
    @include vertical-layout;
    &__container {
        padding: $py 0;
    }
}
</style>

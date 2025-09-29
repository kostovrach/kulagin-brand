<template>
    <PageLoader v-if="loading" />
    <HorizontalLayout v-else>
        <AboutHero :content="page?.about_hero" />
        <AboutBrand :content="page?.about_brand" />
        <AboutProjects :content="page?.about_projects" />
        <PageNavigator to="/services" image="/img/content/personal-views/singing.gif">
            <template #tag>Далее</template>
            <template #title>Услуги</template>
        </PageNavigator>
    </HorizontalLayout>
</template>

<script setup>
import HorizontalLayout from '@/components/HorizontalLayout/HorizontalLayout.vue';
import PageLoader from '@/components/PageLoader/PageLoader.vue';

// layout
import AboutHero from './layout/AboutHero.vue';
import AboutBrand from './layout/AboutBrand.vue';
import AboutProjects from './layout/AboutProjects.vue';
import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';

// content management
import { usePage } from '@/composables/usePage';

const { page, loading } = usePage(
    'about',
    [
        'about_hero.*',
        'about_hero.hint.*',

        'about_brand.*',
        'about_brand.hint.*',
        'about_brand.collage.*',

        'about_projects.*',
        'about_projects.arabeska.*',
        'about_projects.theplace.*',
    ],
    {
        resolveFiles: true,
    },
);
</script>

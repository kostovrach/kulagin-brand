<template>
    <HorizontalLayout>
        <AboutHero :content="page?.about_hero" />
        <AboutBrand />
        <AboutProjects />
        <PageNavigator to="/services" image="/img/content/personal-views/singing.gif">
            <template #tag>Далее</template>
            <template #title>Услуги</template>
        </PageNavigator>
    </HorizontalLayout>
</template>

<script setup>
import HorizontalLayout from '@/components/HorizontalLayout/HorizontalLayout.vue';

// layout
import AboutHero from './layout/AboutHero.vue';
import AboutBrand from './layout/AboutBrand.vue';
import AboutProjects from './layout/AboutProjects.vue';
import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';

// content management
import { usePage } from '@/composables/usePage';

const { first: page } = usePage('about', [
    { section: 'about_hero', with: ['hint'] },
    { section: 'about_brand' },
    { section: 'about_projects' },
]);
</script>

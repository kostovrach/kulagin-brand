<template>
    <HorizontalLayout>
        <AboutHero />
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

import AboutHero from './layout/AboutHero.vue';
import AboutBrand from './layout/AboutBrand.vue';
import AboutProjects from './layout/AboutProjects.vue';

import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';
</script>

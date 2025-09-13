<template>
    <HorizontalLayout>
        <HomeHero />
        <HomeBrand />
        <HomeProjects />
        <PageNavigator to="/" image="/img/content/personal-views/singing.gif">
            <template #tag>Далее</template>
            <template #title>Услуги</template>
        </PageNavigator>
    </HorizontalLayout>
</template>

<script setup>
import HorizontalLayout from '@/components/HorizontalLayout/HorizontalLayout.vue';

import HomeHero from './layout/HomeHero.vue';
import HomeBrand from './layout/HomeBrand.vue';
import HomeProjects from './layout/HomeProjects.vue';

import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';
</script>

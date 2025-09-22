<template>
    <HorizontalLayout>
        <ProjectsMain />
        <PageNavigator to="/hobby" image="/img/content/flower.gif">
            <template #tag>Далее</template>
            <template #title>хобби</template>
        </PageNavigator>
    </HorizontalLayout>
</template>

<script setup>
import HorizontalLayout from '@/components/HorizontalLayout/HorizontalLayout.vue';

import ProjectsMain from './layout/ProjectsMain.vue';
import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';
</script>

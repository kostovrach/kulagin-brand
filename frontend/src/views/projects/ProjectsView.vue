<template>
    <PageLoader v-if="loading" />
    <HorizontalLayout v-else>
        <ProjectsMain :content="page" />
        <PageNavigator to="/hobby" image="/img/content/flower.gif">
            <template #tag>Далее</template>
            <template #title>хобби</template>
        </PageNavigator>
    </HorizontalLayout>
</template>

<script setup>
import HorizontalLayout from '@/components/HorizontalLayout/HorizontalLayout.vue';
import PageLoader from '@/components/PageLoader/PageLoader.vue';

import ProjectsMain from './layout/ProjectsMain.vue';
import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';

// content management
import { usePage } from '@/composables/usePage';

const { page, loading } = usePage(
    'projects',
    [
        'projects_item.*',
        'projects_item.projects_item_id.*',
        'projects_item.projects_item_id.services.*',
        'projects_item.projects_item_id.services.projects_item_list_id.*',
    ],
    {
        resolveFiles: true,
    },
);
</script>

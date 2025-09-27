<template>
    <HorizontalLayout>
        <HobbySlider :content="page" />
        <PageNavigator to="/marketers" image="/img/content/personal-views/temp.jpg">
            <template #tag>Далее</template>
            <template #title>Маркетологам</template>
        </PageNavigator>
    </HorizontalLayout>
</template>

<script setup>
import HorizontalLayout from '@/components/HorizontalLayout/HorizontalLayout.vue';
import HobbySlider from './layout/HobbySlider.vue';
import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';

// content management
import { usePage } from '@/composables/usePage';

const { page, loading, error } = usePage('hobby', ['hobby_item.*', 'hobby_item.hobby_item_id.*'], {
    resolveFiles: true,
});
</script>

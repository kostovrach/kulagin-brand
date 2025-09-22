<template>
    <HorizontalLayout>
        <HobbySlider />
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
</script>

<style lang="scss" scoped></style>

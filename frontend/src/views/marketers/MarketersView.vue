<template>
    <VerticalLayout>
        <MarketersMain />
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
import MarketersMain from './layout/MarketersMain.vue';
import Contact from '@/components/Contact/Contact.vue';
import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';
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

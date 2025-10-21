<template>
    <PageLoader v-if="loading" />
    <HorizontalLayout v-else>
        <ServicesSlider :content="page?.services_list" />
        <ServicesFeedback :content="page?.services_feedback" />
        <section class="hint">
            <div class="hint__container">
                <SectionHint
                    class="hero__hint"
                    :video="page?.services_hint.video_url"
                    :modal-media="page?.services_hint.video_url"
                >
                    <template #title>{{ page?.services_hint.title }}</template>
                    <template #text>{{ page?.services_hint.description }}</template>
                    <template #media-description>{{ page?.services_hint.button_text }}</template>
                </SectionHint>
                <ButtonPrimary class="hint__button" type="a" href="https://kulaginbrand.ru" target="_blank"
                    >Сайт студии</ButtonPrimary
                >
            </div>
        </section>
        <section class="contacts">
            <div class="contacts__container">
                <Contact />
            </div>
        </section>
        <PageNavigator to="/projects" image="/img/content/snapshot.gif">
            <template #tag>Далее</template>
            <template #title>Проекты</template>
        </PageNavigator>
    </HorizontalLayout>
</template>

<script setup>
import HorizontalLayout from '@/components/HorizontalLayout/HorizontalLayout.vue';
import PageLoader from '@/components/PageLoader/PageLoader.vue';

import SectionHint from '@/components/SectionHint/SectionHint.vue';
import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';
import Contact from '@/components/Contact/Contact.vue';

import ServicesSlider from './layout/ServicesSlider.vue';
import ServicesFeedback from './layout/ServicesFeedback.vue';
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary.vue';

// content management
import { usePage } from '@/composables/usePage';

const { page, loading } = usePage(
    'services',
    [
        'services_list.*',
        'services_list.item.*',
        'services_list.item.item_id.*',

        'services_feedback.*',
        'services_feedback.feedback_item.*',
        'services_feedback.feedback_item.feedback_item_id.*',

        'services_hint.*',
    ],
    {
        resolveFiles: true,
    },
);
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.hint {
    @include horizontal-layout;
    @media (max-width: 512px) {
        display: flex;
        flex-direction: column;
    }
    &__container {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: rem(32);
    }
    &__button {
        position: absolute;
        top: 35%;
        left: 85%;
        @media (max-width: 512px) {
            position: relative;
            top: auto;
            left: auto;
            align-self: flex-end;
            // bottom: -50%;
            // right: 0;
        }
    }
}
.contacts {
    @include horizontal-layout;
}
</style>

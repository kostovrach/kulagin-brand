<template>
    <HorizontalLayout>
        <ServicesSlider />
        <ServicesFeedback />
        <section class="hint">
            <div class="hint__container">
                <ButtonPrimary
                    type="a"
                    href="https://kulaginbrand.ru"
                    target="_blank"
                    style="position: absolute; top: 35%; left: 65%"
                    >Сайт студии</ButtonPrimary
                >
                <SectionHint image="/img/content/personal-views/temp1.jpg">
                    <template #title>Хотите развить свой бренд, но не знаете с чего начать?</template>
                    <template #text>
                        Мой опыт и&nbsp;знания смогут сократить путь к&nbsp;результатам, экономя несколько лет усилий.
                    </template>
                    <template #media-description>Про уникальный опыт</template>
                </SectionHint>
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

import SectionHint from '@/components/SectionHint/SectionHint.vue';

import ServicesSlider from './layout/ServicesSlider.vue';
import ServicesFeedback from './layout/ServicesFeedback.vue';
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary.vue';
import Contact from '@/components/Contact/Contact.vue';
import PageNavigator from '@/components/PageNavigator/PageNavigator.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.hint {
    @include horizontal-layout;
    &__container {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.contacts {
    @include horizontal-layout;
}
</style>

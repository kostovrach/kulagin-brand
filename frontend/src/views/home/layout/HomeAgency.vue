<template>
    <div class="agency">
        <ButtonPrimary
            class="agency__follower"
            v-follow-cursor="{ bound: true }"
            type="a"
            href="https://kulaginbrand.ru"
            target="_blank"
            variant="grey"
            logic="noanim"
            style="font-size: 20px; cursor: none"
            >Заказать&nbsp;проект</ButtonPrimary
        >
        <div class="agency__wrapper">
            <div class="agency__titlebox">
                <h2 class="agency__title">{{ content?.title }}</h2>
                <p class="agency__subtitle">{{ content?.description }}</p>
                <a class="agency__link" :href="`tel:${content?.phone}`">{{ content?.phone }}</a>
            </div>
            <ButtonPrimary
                class="agency__button"
                type="a"
                href="https://kulaginbrand.ru"
                target="_blank"
                variant="grey"
                style="font-size: 20px"
                >Заказать&nbsp;проект</ButtonPrimary
            >
            <AutoAccordion class="agency__list" :interval="5000">
                <li class="agency__item">
                    <h3 class="agency__item-title">{{ content?.title1 }}</h3>
                    <picture class="agency__item-image-container">
                        <img class="agency__item-image" :src="content?.image1_url" alt="#" />
                    </picture>
                </li>
                <li class="agency__item">
                    <h3 class="agency__item-title">{{ content?.title2 }}</h3>
                    <picture class="agency__item-image-container">
                        <img class="agency__item-image" :src="content?.image2_url" alt="#" />
                    </picture>
                </li>
                <li class="agency__item">
                    <h3 class="agency__item-title">{{ content?.title3 }}</h3>
                    <picture class="agency__item-image-container">
                        <img class="agency__item-image" :src="content?.image3_url" alt="#" />
                    </picture>
                </li>
            </AutoAccordion>
        </div>
    </div>
</template>

<script setup>
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary.vue';
import AutoAccordion from '../components/AutoAccordion.vue';

defineProps({
    content: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.agency {
    $p: &;

    position: relative;
    background-color: $c-main;
    border-radius: rem(24);
    padding: rem(16);
    overflow: hidden;
    &__follower {
        @media (pointer: coarse) {
            display: none;
        }
    }
    &__wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: rem(64);
    }
    &__titlebox {
        display: flex;
        flex-direction: column;
        gap: rem(16);
    }
    &__title {
        text-transform: uppercase;
        font-family: 'Fira-Extra', sans-serif;
        font-size: lineScale(64, 32, 480, 1440);
        font-weight: $fw-bold;
    }
    &__subtitle {
        max-width: 45ch;
        font-family: 'Inter', sans-serif;
        font-size: rem(16);
        line-height: 1.4;
        margin-top: rem(16);
    }
    &__link {
        width: fit-content;
        font-family: 'Inter', sans-serif;
        @include gradient-text-hover;
    }
    &__button {
        position: absolute;
        top: 25%;
        right: 0;
        rotate: -7deg;
        display: none;
        scale: 0.8;
        @media (pointer: coarse) {
            display: flex;
        }
    }
    &__list {
        display: flex;
        gap: rem(8);
    }
    &__item {
        flex: 1 1 10%;
        position: relative;
        height: 100%;
        height: rem(430);
        overflow: hidden;
        transition: flex 1.2s $tf;
        &.active {
            flex: 1 1 65%;
            #{$p}__item-title {
                transform: scaleX(1);
                opacity: 1;
            }
        }
        &-title {
            position: absolute;
            z-index: 1;
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            text-transform: uppercase;
            color: $c-main;
            font-family: 'Fira-Extra', sans-serif;
            font-size: lineScale(48, 18, 480, 1440);
            font-weight: $fw-med;
            white-space: nowrap;

            transform: scaleX(0.5);
            opacity: 0;
            transition: all 1.5s $tf-spring;
        }
        &-image-container {
            width: 100%;
            height: 100%;
            border-radius: rem(16);
            overflow: hidden;
            filter: brightness(60%);
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}
</style>

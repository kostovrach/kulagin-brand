<template>
    <section class="hero">
        <div class="hero__container">
            <div class="hero__head">
                <div class="layout__titlebox">
                    <h1 class="hero__title fade-bottom-rotate">{{ content?.title }}</h1>
                    <p class="hero__subtitle fade-bottom-rotate" style="animation-delay: 0.2s">
                        {{ content?.subtitle }}
                    </p>
                </div>
                <!-- Временное изображение -->

                <picture class="hero__image-container fade-scale" style="animation-delay: 0.3s">
                    <img class="hero__image" src="/img/content/personal-views/face.png" alt="Игорь Кулагин" />
                </picture>

                <!-- -->
            </div>
            <div class="hero__body fade-right" style="animation-delay: 0.8s">
                <ButtonPrimary
                    class="hero__sticker"
                    style="position: absolute; left: 12%; top: 15%"
                    type="router-link"
                    to="/services"
                    variant="red"
                    >Услуги
                </ButtonPrimary>
                <ButtonPrimary
                    class="hero__sticker"
                    style="position: absolute; left: 20%; top: 45%"
                    type="button"
                    variant="grey"
                    logic="double-line"
                    @click="openInterviews"
                    >Упоминания в&nbsp;СМИ
                </ButtonPrimary>
                <ButtonPrimary
                    class="hero__sticker"
                    style="position: absolute; left: 45%; top: 5%"
                    type="a"
                    href="https://kulaginbrand.ru"
                    target="_blank"
                    variant="grey"
                    >Студия
                </ButtonPrimary>
                <ButtonPrimary
                    class="hero__sticker"
                    style="position: absolute; right: 10%; top: 55%"
                    type="router-link"
                    to="/hobby"
                    variant="red"
                    >Мои хобби
                </ButtonPrimary>
                <img
                    class="hero__sticker"
                    v-draggable="{ top: -5, left: 75 }"
                    src="/img/stickers/igor.png"
                    style="pointer-events: auto; width: 220px; rotate: 9deg"
                    alt="#"
                />
                <img
                    class="hero__sticker"
                    v-draggable="{ top: 30, left: 55 }"
                    src="/img/stickers/theplace-white.png"
                    style="pointer-events: auto; width: 220px; rotate: 5deg"
                    alt="#"
                />
                <Sticker
                    class="hero__sticker"
                    v-draggable="{ left: -3, top: 65 }"
                    style="rotate: -10deg"
                    variant="default"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <Sticker
                    class="hero__sticker"
                    v-draggable="{ left: 25, top: 35 }"
                    style="rotate: 5deg"
                    variant="black"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <Sticker
                    class="hero__sticker"
                    v-draggable="{ left: 35, top: 80 }"
                    style="rotate: -15deg"
                    variant="red"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <picture class="hero__text-image-container">
                    <source media="(max-width: 768px)" srcset="/img/kulagin-y.svg" />
                    <img class="hero__text-image" src="/img/kulagin-x.svg" alt="КУЛАГИН" />
                </picture>
                <!-- <div class="hero__interactive hero__interactive--face">
                    <picture v-draggable="{ axis: 'y', container: 'parent' }" class="hero__interactive--face-container">
                        <img src="/img/content/personal-views/face.png" alt="#" />
                    </picture>
                </div> -->
            </div>
            <div class="hero__footer">
                <Sticker
                    v-draggable="{ left: 0, top: 15 }"
                    class="hero__sticker--hide"
                    style="rotate: -5deg"
                    variant="black"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <SectionHint
                    class="hero__hint"
                    :video="content?.hint?.video_url"
                    :modal-media="content?.hint?.video_url"
                >
                    <template #title>{{ content?.hint?.title }}</template>
                    <template #text>{{ content?.hint?.description }}</template>
                    <template #media-description>{{ content?.hint?.button_text }}</template>
                </SectionHint>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useModal } from '@/composables/useModal';

import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary.vue';
import SectionHint from '@/components/SectionHint/SectionHint.vue';
import Sticker from '@/components/Sticker/Sticker.vue';

defineProps({
    content: { type: Object, default: () => ({}) },
});

const { openModal } = useModal();

function openInterviews() {
    openModal('interviews');
}
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.hero {
    position: relative;
    &__container {
        @include horizontal-layout;
    }
    &__head {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @include horizontal-max-height;
    }
    &__titlebox {
        display: flex;
        flex-direction: column;
        gap: rem(32);
    }
    &__title {
        @include block-title;
    }
    &__subtitle {
        font-size: lineScale(22, 18, 480, 1440);
        font-weight: $fw-semi;
        line-height: 1.2;
        text-transform: uppercase;
        max-width: 40ch;
        margin-top: rem(32);
    }
    // Временное изображение
    //
    &__image-container {
        position: relative;
        bottom: calc($py * -1);
        max-width: rem(640);
        min-height: rem(340);
        max-height: 100%;
        overflow: hidden;
        margin-top: rem(32);
        &::before {
            content: '';
            position: absolute;
            top: 25%;
            left: 50%;
            translate: -50% 0;
            width: 100%;
            aspect-ratio: 1;
            border-radius: 50%;
            background-color: $c-accent;
            pointer-events: none;
        }
    }
    &__image {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    //
    /////
    &__body {
        position: relative;
    }
    &__text-image-container {
        width: 100%;
        height: 100%;
        user-select: none;
    }
    &__text-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    &__interactive {
        &--face {
            position: absolute;
            top: rem(-330);
            right: rem(480);
            width: rem(415);
            height: rem(800);
            pointer-events: none;
            &-container {
                width: rem(415);
                height: rem(485);
                pointer-events: auto;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    rotate: 5deg;
                    transform: scaleY(-1);
                }
            }
        }
    }
    &__footer {
        position: relative;
        display: flex;
    }
    &__hint {
        grid-row: 2;
        align-self: flex-end;
    }
}

@media (max-width: 768px) {
    .hero {
        &__image-container {
            position: initial;
        }
        img.hero__sticker {
            display: none;
        }
        &__sticker--hide {
            display: none;
        }
    }
}
</style>

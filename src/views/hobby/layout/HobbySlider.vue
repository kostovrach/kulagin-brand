<template>
    <section class="hobby">
        <div class="hobby__container">
            <div class="hobby__titlebox">
                <h1 class="hobby__title fade-bottom-rotate">Факты обо мне вне&nbsp;формата.</h1>
            </div>
            <Swiper
                class="hobby__slider fade-bottom"
                style="animation-delay: 0.4s"
                :modules="modules"
                :slides-per-view="3"
                :space-between="96"
                loop
                centered-slides
                :speed="800"
                :navigation="{
                    nextEl: '.hobby__button--next',
                    prevEl: '.hobby__button--prev',
                }"
                wrapper-class="hobby__slider-wrapper"
            >
                <SwiperSlide class="hobby__slide">
                    <div class="hobby__slide-wrapper">
                        <h2 class="hobby__slide-title">Музыка — ритм души и&nbsp;источник энергии</h2>
                        <picture class="hobby__slide-image-container" style="--mask: url('/img/masks/guitar.svg')">
                            <img class="hobby__slide-image" src="/img/content/personal-views/singing.gif" alt="" />
                        </picture>
                        <p class="hobby__slide-desc">
                            МУЗЫКА ПОМОГАЕТ НАХОДИТЬСЯ В ГАРМОНИИ С&nbsp;СОБОЙ, ДАРИТ СВОБОДУ И ВДОХНОВЕНИЕ, КОТОРЫЕ
                            Я&nbsp;ПЕРЕНОШУ В СВОЮ РАБОТУ С&nbsp;КЛИЕНТАМИ.
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide class="hobby__slide">
                    <div class="hobby__slide-wrapper">
                        <h2 class="hobby__slide-title">Рыцарь дорог: негласное прозвище</h2>
                        <picture class="hobby__slide-image-container" style="--mask: url('/img/masks/helmet.svg')">
                            <img class="hobby__slide-image" src="/img/content/personal-views/smiling.gif" alt="" />
                        </picture>
                        <p class="hobby__slide-desc">
                            МУЗЫКА ПОМОГАЕТ НАХОДИТЬСЯ В ГАРМОНИИ С&nbsp;СОБОЙ, ДАРИТ СВОБОДУ И ВДОХНОВЕНИЕ, КОТОРЫЕ
                            Я&nbsp;ПЕРЕНОШУ В СВОЮ РАБОТУ С&nbsp;КЛИЕНТАМИ.
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide class="hobby__slide">
                    <div class="hobby__slide-wrapper">
                        <h2 class="hobby__slide-title">Музыка — ритм души и&nbsp;источник энергии</h2>
                        <picture class="hobby__slide-image-container" style="--mask: url('/img/masks/guitar.svg')">
                            <img class="hobby__slide-image" src="/img/content/personal-views/singing.gif" alt="" />
                        </picture>
                        <p class="hobby__slide-desc">
                            МУЗЫКА ПОМОГАЕТ НАХОДИТЬСЯ В ГАРМОНИИ С&nbsp;СОБОЙ, ДАРИТ СВОБОДУ И ВДОХНОВЕНИЕ, КОТОРЫЕ
                            Я&nbsp;ПЕРЕНОШУ В СВОЮ РАБОТУ С&nbsp;КЛИЕНТАМИ.
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide class="hobby__slide">
                    <div class="hobby__slide-wrapper">
                        <h2 class="hobby__slide-title">Рыцарь дорог: негласное прозвище</h2>
                        <picture class="hobby__slide-image-container" style="--mask: url('/img/masks/helmet.svg')">
                            <img class="hobby__slide-image" src="/img/content/personal-views/smiling.gif" alt="" />
                        </picture>
                        <p class="hobby__slide-desc">
                            МУЗЫКА ПОМОГАЕТ НАХОДИТЬСЯ В ГАРМОНИИ С&nbsp;СОБОЙ, ДАРИТ СВОБОДУ И ВДОХНОВЕНИЕ, КОТОРЫЕ
                            Я&nbsp;ПЕРЕНОШУ В СВОЮ РАБОТУ С&nbsp;КЛИЕНТАМИ.
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide class="hobby__slide">
                    <div class="hobby__slide-wrapper">
                        <h2 class="hobby__slide-title">Музыка — ритм души и&nbsp;источник энергии</h2>
                        <picture class="hobby__slide-image-container" style="--mask: url('/img/masks/guitar.svg')">
                            <img class="hobby__slide-image" src="/img/content/personal-views/singing.gif" alt="" />
                        </picture>
                        <p class="hobby__slide-desc">
                            МУЗЫКА ПОМОГАЕТ НАХОДИТЬСЯ В ГАРМОНИИ С&nbsp;СОБОЙ, ДАРИТ СВОБОДУ И ВДОХНОВЕНИЕ, КОТОРЫЕ
                            Я&nbsp;ПЕРЕНОШУ В СВОЮ РАБОТУ С&nbsp;КЛИЕНТАМИ.
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide class="hobby__slide">
                    <div class="hobby__slide-wrapper">
                        <h2 class="hobby__slide-title">Рыцарь дорог: негласное прозвище</h2>
                        <picture class="hobby__slide-image-container" style="--mask: url('/img/masks/helmet.svg')">
                            <img class="hobby__slide-image" src="/img/content/personal-views/smiling.gif" alt="" />
                        </picture>
                        <p class="hobby__slide-desc">
                            МУЗЫКА ПОМОГАЕТ НАХОДИТЬСЯ В ГАРМОНИИ С&nbsp;СОБОЙ, ДАРИТ СВОБОДУ И ВДОХНОВЕНИЕ, КОТОРЫЕ
                            Я&nbsp;ПЕРЕНОШУ В СВОЮ РАБОТУ С&nbsp;КЛИЕНТАМИ.
                        </p>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div class="hobby__controls">
                <button class="hobby__button hobby__button--prev">
                    <TheSvgSprite type="arrow" :size="32" />
                </button>
                <button class="hobby__button hobby__button--next">
                    <TheSvgSprite type="arrow" :size="32" />
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import TheSvgSprite from '@/components/TheSvgSprite.vue';

const modules = [Navigation];
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.hobby {
    $p: &;

    @include horizontal-layout;
    &__container {
        position: relative;
        // display: flex;
        // flex-direction: column;
        // gap: rem(28);
    }
    &__titlebox {
        position: absolute;
        top: 0;
        left: 0;
    }
    &__title {
        @include block-title;
    }
    &__slider {
        height: 100%;
        max-width: calc(100vw - ($px * 2));
        @include horizontal-max-height;
        &-wrapper {
            align-items: center;
        }
    }
    &__slide {
        position: relative;
        height: 100%;
        will-change: scale;
        transition: scale $td $tf;
        &:not(.swiper-slide-active) {
            scale: 0.5;
            #{$p}__slide-title,
            #{$p}__slide-desc {
                opacity: 0;
                translate: -50% 0;
            }
        }
        &-wrapper {
            width: 100%;
            height: 100%;
        }
        &-image-container {
            width: 100%;
            height: 100%;
            mask-image: var(--mask);
            mask-size: 100% 100%;
            mask-repeat: no-repeat;
            user-select: none;
        }
        &-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &-title {
            min-width: 25ch;
            position: absolute;
            top: 20%;
            left: 90%;
            text-transform: uppercase;
            font-size: lineScale(22, 18, 480, 1440);
            line-height: 1.2;
            font-weight: $fw-med;
            will-change: opacity;
            transition:
                opacity $td $tf,
                translate $td $tf;
        }
        &-desc {
            min-width: 45ch;
            position: absolute;
            bottom: 10%;
            left: 100%;
            text-transform: uppercase;
            font-size: rem(16);
            line-height: 1.4;
            font-weight: $fw-med;
            will-change: opacity;
            transition:
                opacity $td $tf,
                translate $td $tf;
        }
    }
    &__controls {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: rem(32);
    }
    &__button {
        cursor: pointer;
        &--prev {
            transform: scaleX(-1);
        }
    }
}
</style>

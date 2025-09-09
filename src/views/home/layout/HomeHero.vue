<template>
    <section class="home-hero">
        <div class="home-hero__container layout">
            <div class="home-hero__head">
                <div class="layout__titlebox">
                    <h1 class="home-hero__title" v-animateonscroll="{ enterClass: 'fade-bottom' }">
                        Помогаю бизнесу зарабатывать
                    </h1>
                    <p
                        class="home-hero__subtitle"
                        v-animateonscroll="{ enterClass: 'fade-bottom' }"
                        style="animation-delay: 0.2s"
                    >
                        Консультации по&nbsp;рекламе и&nbsp;брендингу, по&nbsp;личностному росту и ведению бизнеса.
                    </p>
                </div>
                <picture class="home-hero__image-container">
                    <img class="home-hero__image" src="/img/content/face.png" alt="Игорь Кулагин" />
                </picture>
            </div>
            <div class="home-hero__body fade-right" style="animation-delay: 0.3s;">
                <Sticker
                    v-draggable="{ left: 50, top: 400 }"
                    style="rotate: -10deg"
                    variant="default"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <Sticker
                    v-draggable="{ left: 1040, top: 300 }"
                    style="rotate: 5deg"
                    variant="black"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <Sticker
                    v-draggable="{ left: 1300, top: 600 }"
                    style="rotate: -15deg"
                    variant="red"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <Sticker
                    v-draggable="{ left: 2100, top: 250 }"
                    style="rotate: 2deg"
                    variant="grey"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <span class="home-hero__decorative-text">Кулагин</span>
            </div>
        </div>
    </section>
</template>

<script setup>
import Sticker from '@/components/Sticker/Sticker.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.home-hero {
    min-width: fit-content;
    &__container {
        @include block;
    }
    &__head {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-height: calc(100lvh - rem(128));
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
    &__image-container {
        position: relative;
        max-width: rem(640);
        min-height: rem(340);
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
        }
    }
    &__image {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    &__body {
        position: relative;
    }
    &__decorative-text {
        @include decorative-text;
    }
}
</style>

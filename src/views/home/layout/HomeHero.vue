<template>
    <section class="home-hero">
        <div class="home-hero__container layout">
            <div class="home-hero__head">
                <div class="layout__titlebox">
                    <h1 class="home-hero__title">Помогаю бизнесу зарабатывать</h1>
                    <p class="home-hero__subtitle">
                        Консультации по&nbsp;рекламе и&nbsp;брендингу, по&nbsp;личностному росту и ведению бизнеса.
                    </p>
                </div>
                <picture class="home-hero__image-container">
                    <img class="home-hero__image" src="/img/content/face.png" alt="Игорь Кулагин" />
                </picture>
            </div>
            <div class="home-hero__body">
                <div class="home-hero__decorative-text">Кулагин</div>
                <Sticker
                    class="home-hero__sticker"
                    variant="default"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <Sticker
                    class="home-hero__sticker"
                    variant="black"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <Sticker
                    class="home-hero__sticker"
                    variant="red"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <Sticker
                    class="home-hero__sticker"
                    variant="grey"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
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
    // &__container {
    // }
    &__head {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
        height: 100%;
        overflow: hidden;
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
    &__sticker {
        position: absolute;
        &:nth-child(4n) {
            bottom: 45%;
            rotate: -10deg;
        }
        &:nth-child(4n+1) {
            bottom: 60%;
            rotate: 5deg;
        }
        &:nth-child(4n+2) {
            bottom: 0%;
            rotate: -15deg;
        }
    }
}
</style>

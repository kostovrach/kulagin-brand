<template>
    <section class="home-brand">
        <div class="home-brand__container">
            <div class="home-brand__body">
                <picture class="home-brand__sticker-container" v-draggable="{ left: -60, top: -75 }">
                    <img class="home-brand__sticker" src="/img/stickers/theplace.png" alt="ThePlace" />
                </picture>

                <ButtonPrimary
                    style="position: absolute; left: 10%; bottom: -10%"
                    type="router-link"
                    to="/"
                    variant="red"
                >
                    Блог
                </ButtonPrimary>
                <ButtonPrimary style="position: absolute; left: 70%; top: -10%" type="router-link" to="/" variant="red">
                    Маркетологам
                </ButtonPrimary>
                <picture class="home-brand__image-container" style="--mask: url('/img/masks/b.svg'); --ratio: 457/692">
                    <img class="home-brand__image" src="/img/content/singing.gif" alt="#" />
                </picture>
                <picture class="home-brand__image-container" style="--mask: url('/img/masks/ra.svg'); --ratio: 256/173">
                    <img class="home-brand__image" src="/img/content/temp.jpg" alt="#" />
                </picture>
                <picture
                    class="home-brand__image-container"
                    style="--mask: url('/img/masks/nd.svg'); --ratio: 1087/692"
                >
                    <img class="home-brand__image" src="/img/content/singing.jpg" alt="#" />
                </picture>
            </div>
        </div>
    </section>
</template>

<script setup>
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary.vue';
// import SectionHint from '@/components/SectionHint/SectionHint.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.home-brand {
    min-width: fit-content;
    background-color: $c-111111;
    &__container {
        @include horizontal-layout;
    }
    &__body {
        position: relative;
        display: flex;
        align-items: center;
        gap: lineScale(32, 16, 480, 1440);
    }
    &__sticker-container {
        max-width: rem(180);
        aspect-ratio: 1;
        z-index: 2;
        rotate: -10deg;
        user-select: none;
    }
    &__sticker {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    &__image-container {
        position: relative;
        z-index: 1;
        height: 100%;
        aspect-ratio: var(--ratio);
        mask-image: var(--mask);
        mask-repeat: no-repeat;
        mask-size: 100% 100%;
        @include horizontal-max-height;
    }
    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>

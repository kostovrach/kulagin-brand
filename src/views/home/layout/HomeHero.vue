<template>
    <section class="hero">
        <div class="hero__container">
            <div class="hero__head">
                <div class="layout__titlebox">
                    <h1 class="hero__title fade-bottom-rotate">Помогаю бизнесу зарабатывать</h1>
                    <p class="hero__subtitle fade-bottom-rotate" style="animation-delay: 0.2s">
                        Консультации по&nbsp;рекламе и&nbsp;брендингу, по&nbsp;личностному росту и ведению бизнеса.
                    </p>
                </div>
                <!-- Временное изображение -->

                <picture class="hero__image-container fade-scale">
                    <img class="hero__image" src="/img/content/personal-views/face.png" alt="Игорь Кулагин" />
                </picture>

                <!-- -->
            </div>
            <div class="hero__body fade-right" style="animation-delay: 0.6s">
                <ButtonPrimary style="position: absolute; left: 12%; top: 15%" type="router-link" to="/" variant="red">
                    Услуги
                </ButtonPrimary>
                <ButtonPrimary
                    style="position: absolute; left: 45%; top: 5%"
                    type="a"
                    href="https://kulaginbrand.ru"
                    target="_blank"
                    variant="grey"
                >
                    Студия
                </ButtonPrimary>
                <ButtonPrimary
                    style="position: absolute; left: 66%; top: 55%"
                    type="router-link"
                    to="/hobby"
                    variant="grey"
                >
                    Мои хобби
                </ButtonPrimary>
                <img
                    v-draggable="{ top: -5, left: 75 }"
                    src="/img/stickers/youtube.png"
                    style="pointer-events: auto; width: 264px; rotate: -19deg"
                    alt="#"
                />
                <Sticker
                    v-draggable="{ left: -3, top: 55 }"
                    style="rotate: -10deg"
                    variant="default"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <Sticker
                    v-draggable="{ left: 25, top: 35 }"
                    style="rotate: 5deg"
                    variant="black"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <Sticker
                    v-draggable="{ left: 35, top: 80 }"
                    style="rotate: -15deg"
                    variant="red"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <Sticker
                    v-draggable="{ left: 55, top: 40 }"
                    style="rotate: 2deg"
                    variant="grey"
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
                    v-draggable="{ left: 0, top: 5 }"
                    style="rotate: -5deg"
                    variant="black"
                    textAccent="от 120%"
                    textMain="средний рост конверсии"
                />
                <SectionHint class="hero__hint" image="/img/content/personal-views/smiling.gif">
                    <template #title>Как превратить свой бренд в источник дохода?</template>
                    <template #text>
                        Мой опыт и&nbsp;знания смогут сократить путь к&nbsp;результатам, экономя несколько лет усилий.
                    </template>
                    <template #media-description>Про уникальный опыт</template>
                </SectionHint>
            </div>
        </div>
    </section>
</template>

<script setup>
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary.vue';
import SectionHint from '@/components/SectionHint/SectionHint.vue';
import Sticker from '@/components/Sticker/Sticker.vue';
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
    }
}
</style>

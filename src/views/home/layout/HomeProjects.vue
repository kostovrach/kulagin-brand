<template>
    <section class="projects">
        <div class="projects__container">
            <div class="projects__section">
                <h2 class="projects__title">собственные проекты.</h2>
                <div class="projects__item--type1">
                    <img
                        class="projects__item--type1-interactive"
                        v-draggable="{ left: 95, top: -20 }"
                        style="width: 297px; max-height: 136px; object-fit: cover; pointer-events: auto"
                        src="/img/content/arabeska/image2.jpg"
                        alt="#"
                    />
                    <img
                        class="projects__item--type1-interactive"
                        v-draggable="{ left: 50, top: 70 }"
                        style="rotate: -12deg; max-width: 120px; pointer-events: auto"
                        src="/img/content/flower.gif"
                        alt="#"
                    />
                    <Sticker
                        class="projects__item--type1-interactive"
                        v-draggable="{ left: 18, top: 60 }"
                        style="rotate: 7deg"
                        variant="red"
                        textMain="средний рост конверсии"
                    />
                    <div class="projects__item--type1-wrapper">
                        <h3 class="projects__item--type1-title">Арабеска: <br />цветочный магазин</h3>
                        <picture class="projects__item--type1-image-container">
                            <img
                                class="projects__item--type1-image"
                                src="/img/content/arabeska/mockup.jpg"
                                alt="Arabeska"
                            />
                        </picture>
                        <picture class="projects__item--type1-image-container">
                            <img
                                class="projects__item--type1-image"
                                src="/img/content/arabeska/logo.png"
                                alt="Arabeska"
                            />
                        </picture>
                        <picture class="projects__item--type1-image-container">
                            <img
                                class="projects__item--type1-image"
                                src="/img/content/arabeska/image.jpg"
                                alt="Arabeska"
                            />
                        </picture>
                        <p class="projects__item--type1-desc">
                            работы, в которых творчество встречается с&nbsp;результатом
                        </p>
                        <picture class="projects__item--type1-image-container">
                            <img
                                class="projects__item--type1-image"
                                src="/img/content/arabeska/image1.jpg"
                                alt="Arabeska"
                            />
                        </picture>
                        <picture class="projects__item--type1-image-container">
                            <img
                                class="projects__item--type1-image"
                                src="/img/content/arabeska/image3.jpg"
                                alt="Arabeska"
                            />
                        </picture>
                    </div>
                </div>
            </div>
            <div class="projects__divider--type1">
                <img class="projects__divider--type1-arrow" src="/img/arrow.svg" />
                <picture class="projects__divider--type1-image-container">
                    <img
                        class="projects__divider--type1-image"
                        src="/img/content/personal-views/igor.png"
                        alt="Игорь Кулагин"
                    />
                </picture>
            </div>
            <div class="projects__item--type2">
                <img
                    class="projects__item--type2-interactive"
                    v-draggable="{ left: 25, top: 20 }"
                    style="rotate: 5deg; max-width: 120px; pointer-events: auto"
                    src="/img/content/temp.jpg"
                    alt="#"
                />
                <img
                    class="projects__item--type2-interactive"
                    v-draggable="{ left: 55, top: 0 }"
                    style="rotate: -12deg; max-width: 160px; pointer-events: auto"
                    src="/img/content/personal-views/singing.gif"
                    alt="#"
                />
                <img
                    class="projects__item--type2-interactive"
                    v-draggable="{ left: 57, top: 65 }"
                    style="rotate: -12deg; max-width: 96px; pointer-events: auto"
                    src="/img/content/temp.jpg"
                    alt="#"
                />
                <Sticker
                    class="projects__item--type2-interactive"
                    v-draggable="{ left: 75, top: 80 }"
                    style="rotate: -12deg"
                    variant="red"
                    textMain="средний рост конверсии"
                />
                <div class="projects__item--type2-wrapper">
                    <picture class="projects__item--type2-image-container">
                        <img class="projects__item--type2-image" src="/img/content/theplace/temp.jpg" alt="ThePlace" />
                    </picture>
                    <picture class="projects__item--type2-image-container">
                        <img class="projects__item--type2-image" src="/img/content/theplace/temp.jpg" alt="ThePlace" />
                    </picture>
                    <h3 class="projects__item--type2-title">The place: веб-студия</h3>
                    <picture class="projects__item--type2-image-container">
                        <img class="projects__item--type2-image" src="/img/content/theplace/temp.jpg" alt="ThePlace" />
                    </picture>
                    <p class="projects__item--type2-desc">
                        работы, в которых творчество встречается с&nbsp;результатом
                    </p>
                    <picture class="projects__item--type2-image-container">
                        <img class="projects__item--type2-image" src="/img/content/theplace/temp.jpg" alt="ThePlace" />
                    </picture>
                    <picture class="projects__item--type2-image-container">
                        <img class="projects__item--type2-image" src="/img/content/theplace/temp.jpg" alt="ThePlace" />
                    </picture>
                </div>
            </div>
            <div class="projects__divider--type2">
                <ButtonPrimary type="router-link" to="/projects" variant="black">Все проекты</ButtonPrimary>
                <img class="projects__divider--type2-arrow" src="/img/arrow-small.svg" />
            </div>
            <div class="projects__footer">
                <div class="projects__interactive">
                    <img v-draggable="{ container: 'parent', axis: 'y', top: 64 }" src="/img/flag.png" alt="#" />
                </div>
                <Contact />
            </div>
        </div>
    </section>
</template>

<script setup>
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary.vue';
import Sticker from '@/components/Sticker/Sticker.vue';
import Contact from '@/components/Contact/Contact.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.projects {
    position: relative;
    // min-width: fit-content;
    &__container {
        @include horizontal-layout($gap: 0);
    }
    &__section {
        display: flex;
        flex-direction: column;
        gap: rem(48);
    }
    &__title {
        @include block-title;
    }
    &__item {
        &--type1 {
            position: relative;
            width: fit-content;
            height: 100%;
            &-wrapper {
                height: 100%;
                display: grid;
                grid-template-columns: repeat(13, auto);
                grid-template-rows: repeat(6, auto);
                gap: 0 rem(16);
                grid-template-areas:
                    'title title title title image-1 image-1 image-1 image-1 image-2 image-3 . . .'
                    '. . . . image-1 image-1 image-1 image-1 desc desc desc desc desc'
                    '. . . . image-1 image-1 image-1 image-1 image-4 image-4 image-4 image-4 .'
                    '. . . . image-1 image-1 image-1 image-1 image-4 image-4 image-4 image-4 .'
                    '. . . . image-1 image-1 image-1 image-1 image-4 image-4 image-4 image-4 .'
                    '. . . . image-1 image-1 image-1 image-1 image-4 image-4 image-4 image-4 image-5';
            }
            &-title {
                grid-area: title;
                text-transform: uppercase;
                font-size: lineScale(32, 24, 480, 1440);
                line-height: 1.2;
                font-weight: $fw-bold;
            }
            &-desc {
                grid-area: desc;
                max-width: 30ch;
                text-transform: uppercase;
                font-size: lineScale(32, 24, 480, 1440);
                line-height: 1.2;
                font-weight: $fw-bold;
            }
            &-image-container {
                height: 100%;
                &:nth-of-type(1) {
                    grid-area: image-1;
                    max-width: rem(380);
                }
                &:nth-of-type(2) {
                    grid-area: image-2;
                    max-width: rem(82);
                    max-height: rem(60);
                    mix-blend-mode: darken;
                }
                &:nth-of-type(3) {
                    grid-area: image-3;
                    max-width: rem(82);
                    max-height: rem(60);
                }
                &:nth-of-type(4) {
                    grid-area: image-4;
                    max-width: rem(380);
                }
                &:nth-of-type(5) {
                    grid-area: image-5;
                    max-width: rem(154);
                }
            }
            &-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &--type2 {
            position: relative;
            width: fit-content;
            height: 100%;
            &-wrapper {
                height: 100%;
                display: grid;
                grid-template-columns: repeat(10, auto);
                grid-template-rows: repeat(4, auto);
                grid-template-areas:
                    '. image-2 image-2 image-2 . . . . . .'
                    '. image-2 image-2 image-2 image-3 image-3 image-3 image-3 desc desc'
                    'image-1 image-2 image-2 image-2 image-3 image-3 image-3 image-3 image-4 .'
                    'title title title title image-3 image-3 image-3 image-3 image-4 image-5'
                    '. . . . image-3 image-3 image-3 image-3 . image-5';
                gap: rem(24);
            }
            &-image-container {
                max-height: 100%;
                &:nth-of-type(1) {
                    grid-area: image-1;
                    max-width: rem(81);
                }
                &:nth-of-type(2) {
                    grid-area: image-2;
                    max-width: rem(227);
                }
                &:nth-of-type(3) {
                    grid-area: image-3;
                    max-width: rem(343);
                }
                &:nth-of-type(4) {
                    grid-area: image-4;
                    max-width: rem(260);
                }
                &:nth-of-type(5) {
                    grid-area: image-5;
                    max-width: rem(154);
                }
            }
            &-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            &-title {
                grid-area: title;
                text-transform: uppercase;
                font-size: lineScale(32, 24, 480, 1440);
                line-height: 1.2;
                font-weight: $fw-bold;
            }
            &-desc {
                grid-area: desc;
                height: fit-content;
                max-width: 25ch;
                text-transform: uppercase;
                font-size: lineScale(32, 24, 480, 1440);
                line-height: 1.2;
                font-weight: $fw-bold;
            }
        }
    }
    &__divider {
        &--type1 {
            width: fit-content;
            height: fit-content;
            align-self: flex-end;
            position: relative;
            left: rem(-96);
            bottom: calc($py * -1);
            user-select: none;
            &-arrow {
                translate: 20% 100%;
            }
        }
        &--type2 {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            &-arrow {
                translate: rem(32) rem(-48);
            }
        }
    }
    &__footer {
        position: relative;
    }
    &__interactive {
        width: rem(282);
        height: rem(950);
        position: absolute;
        left: 0;
        bottom: rem(-390);
        img {
            width: 100%;
            height: rem(515);
            object-fit: contain;
            pointer-events: auto;
        }
    }
}

@media (max-width: 768px) {
    .projects {
        &__interactive {
            display: none;
        }
        &__item {
            &--type1-interactive,
            &--type2-interactive {
                display: none;
            }
            &--type1-wrapper {
                width: fit-content;
                grid-template-columns: repeat(9, auto);
                grid-template-rows: repeat(5, auto);
                grid-template-areas:
                    ' title title title title image-2 image-3 .'
                    'image-1 image-1 image-1 image-1 desc desc desc'
                    'image-1 image-1 image-1 image-1 image-4 image-4 .'
                    'image-1 image-1 image-1 image-1 image-4 image-4 .'
                    'image-1 image-1 image-1 image-1 image-4 image-4 image-5';
            }
            &--type2-wrapper {
                width: fit-content;
                grid-template-columns: repeat(7, auto); //10
                grid-template-rows: repeat(5, auto); // 4
                gap: rem(8);
                grid-template-areas:
                    '. image-2 image-2 image-2 . . . . . .'
                    '. image-2 image-2 image-2 image-3 image-3 image-3 image-3 desc desc'
                    'image-1 image-2 image-2 image-2 image-3 image-3 image-3 image-3 image-4 .'
                    'title title title title image-3 image-3 image-3 image-3 image-4 image-5'
                    '. . . . image-3 image-3 image-3 image-3 . image-5';
                grid-template-areas:
                    '. image-2 image-2 desc desc desc'
                    'image-1 image-2 image-2 image-3 image-3 image-3'
                    'title title title image-3 image-3 image-3'
                    '. image-4 image-4 image-3 image-3 image-3'
                    '. . . image-5 image-5 .';
            }
        }
        &__divider {
            &--type1 {
                display: none;
            }
        }
    }
}
</style>

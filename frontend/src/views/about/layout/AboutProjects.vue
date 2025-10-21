<template>
    <section class="projects">
        <div class="projects__container">
            <div class="projects__body">
                <div class="projects__titlebox">
                    <h2 class="projects__title">{{ content?.title }}</h2>
                </div>
                <div class="projects__content">
                    <div class="projects__item projects__item--type1">
                        <img
                            class="projects__item--type1-interactive"
                            v-draggable="{ left: 85, top: 50 }"
                            style="width: 154px; rotate: 12deg; object-fit: cover; pointer-events: auto"
                            src="/img/content/arabeska/image2.jpg"
                            alt="#"
                        />
                        <img
                            class="projects__item--type1-interactive"
                            v-draggable="{ left: 50, top: 70 }"
                            style="rotate: -12deg; max-width: 220px; pointer-events: auto"
                            src="/img/content/arabeska/flower.png"
                            alt="#"
                        />
                        <Sticker
                            class="projects__item--type1-interactive"
                            v-draggable="{ left: 10, top: 60 }"
                            style="rotate: 7deg"
                            variant="black-2"
                            textAccent="от 120%"
                            textMain="средний рост конверсии"
                        />
                        <div class="projects__item--type1-wrapper">
                            <h3 class="projects__item--type1-title">{{ content?.arabeska?.title }}</h3>
                            <picture class="projects__item--type1-image-container">
                                <img
                                    class="projects__item--type1-image"
                                    :src="content?.arabeska?.image1_url"
                                    alt="Arabeska"
                                />
                            </picture>
                            <picture class="projects__item--type1-image-container">
                                <img
                                    class="projects__item--type1-image"
                                    :src="content?.arabeska?.logo_url"
                                    alt="Arabeska"
                                />
                            </picture>
                            <p class="projects__item--type1-desc">{{ content?.arabeska?.subtitle }}</p>
                            <picture class="projects__item--type1-image-container">
                                <img
                                    class="projects__item--type1-image"
                                    :src="content?.arabeska?.image2_url"
                                    alt="Arabeska"
                                />
                            </picture>
                            <a
                                class="projects__item--type1-link"
                                :href="content?.arabeska?.link"
                                target="_blank"
                                rel="noopener noreferrer"
                                ><TheSvgSprite type="arrow" :size="72"
                            /></a>
                        </div>
                    </div>
                    <div class="projects__item projects__divider--type1">
                        <img class="projects__divider--type1-arrow" src="/img/arrow.svg" alt="#" />
                        <picture class="projects__divider--type1-image-container">
                            <img
                                class="projects__divider--type1-image"
                                src="/img/content/personal-views/igor.png"
                                alt="Игорь Кулагин"
                            />
                        </picture>
                    </div>
                    <div class="projects__item projects__item--type2">
                        <img
                            class="projects__item--type2-interactive"
                            v-draggable="{ left: 15, top: -10 }"
                            style="rotate: -5deg; max-width: 220px; pointer-events: auto"
                            src="/img/stickers/youtube.png"
                            alt="#"
                        />
                        <img
                            class="projects__item--type2-interactive"
                            v-draggable="{ left: 15, top: 55 }"
                            style="rotate: -15deg; max-width: 220px; pointer-events: auto"
                            src="/img/stickers/like.png"
                            alt="#"
                        />
                        <img
                            class="projects__item--type2-interactive"
                            v-draggable="{ left: 55, top: 70 }"
                            style="max-width: 100px"
                            src="/img/stickers/since.png"
                            alt="#"
                        />
                        <div class="projects__item--type2-wrapper">
                            <picture class="projects__item--type2-image-container">
                                <img
                                    class="projects__item--type2-image"
                                    :src="content?.theplace?.image1_url"
                                    alt="ThePlace"
                                />
                            </picture>
                            <picture class="projects__item--type2-image-container">
                                <img
                                    class="projects__item--type2-image"
                                    :src="content?.theplace?.logo_url"
                                    alt="ThePlace"
                                />
                            </picture>
                            <picture class="projects__item--type2-image-container">
                                <img
                                    class="projects__item--type2-image"
                                    :src="content?.theplace?.image2_url"
                                    alt="ThePlace"
                                />
                            </picture>
                            <p class="projects__item--type2-desc">{{ content?.theplace?.title }}</p>
                            <picture class="projects__item--type2-image-container">
                                <img
                                    class="projects__item--type2-image"
                                    :src="content?.theplace?.image3_url"
                                    alt="ThePlace"
                                />
                            </picture>
                            <picture class="projects__item--type2-image-container">
                                <img
                                    class="projects__item--type2-image"
                                    :src="content?.theplace?.image4_url"
                                    alt="ThePlace"
                                />
                            </picture>
                            <a
                                class="projects__item--type2-link"
                                :href="content?.theplace?.link"
                                target="_blank"
                                rel="noopener noreferrer"
                                ><TheSvgSprite type="arrow" :size="72"
                            /></a>
                        </div>
                    </div>
                    <div class="projects__item projects__divider--type2">
                        <ButtonPrimary type="router-link" to="/projects" variant="red">Все проекты</ButtonPrimary>
                        <img class="projects__divider--type2-arrow" src="/img/arrow-small.svg" />
                    </div>
                </div>
            </div>

            <div class="projects__footer">
                <div class="projects__interactive">
                    <img v-draggable="{ container: 'parent', axis: 'y', top: 64 }" src="/img/flag.png" alt="#" />
                </div>
                <Contact />
                <div class="projects__footer-runline">
                    <span v-for="n in 2" :key="n">
                        Для лиц 21+. сайт несет развлекательный характер. все совпадения случайны, персонажи вымышлены,
                        перед употреблением проконсультируйтесь со специалистом
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary.vue';
import Sticker from '@/components/Sticker/Sticker.vue';
import Contact from '@/components/Contact/Contact.vue';
import TheSvgSprite from '@/components/TheSvgSprite.vue';

defineProps({
    content: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.projects {
    position: relative;
    &__container {
        @include horizontal-layout($gap: 0);
    }
    &__body {
        @include horizontal-max-height;
    }
    &__content {
        display: flex;
        margin-top: rem(48);
    }
    &__title {
        @include block-title;
    }
    &__item {
        height: 100%;
        &--type1 {
            position: relative;
            width: fit-content;
            &-wrapper {
                height: 100%;
                display: grid;
                grid-template-columns: repeat(12, auto);
                grid-template-rows: repeat(6, auto);
                gap: 0 rem(16);
                grid-template-areas:
                    'title title title title image-1 image-1 image-1 image-1 image-2 image-2 image-2 image-2'
                    '. . . . image-1 image-1 image-1 image-1 desc desc desc desc'
                    '. . . . image-1 image-1 image-1 image-1 image-3 image-3 image-3 link'
                    '. . . . image-1 image-1 image-1 image-1 image-3 image-3 image-3 .'
                    '. . . . image-1 image-1 image-1 image-1 image-3 image-3 image-3 .'
                    '. . . . image-1 image-1 image-1 image-1 image-3 image-3 image-3 .';
            }
            &-title {
                grid-area: title;
                max-width: 18ch;
                text-transform: uppercase;
                font-size: lineScale(32, 24, 480, 1440);
                line-height: 1.2;
                font-weight: $fw-bold;
            }
            &-desc {
                grid-area: desc;
                max-width: 30ch;
                text-transform: uppercase;
                color: $c-9E9595;
                font-size: lineScale(32, 18, 480, 1440);
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
                    max-width: rem(380);
                    img {
                        object-fit: contain;
                    }
                }
                &:nth-of-type(3) {
                    grid-area: image-3;
                    max-width: rem(380);
                    aspect-ratio: 1;
                }
            }
            &-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            &-link {
                grid-area: link;
                width: fit-content;
                height: fit-content;
                rotate: -45deg;
                overflow: hidden;
                @media (pointer: fine) {
                    &:hover svg {
                        animation: arrow-translate $td $tf;
                    }
                }
                @keyframes arrow-translate {
                    0% {
                        translate: 0 0;
                        opacity: 1;
                    }
                    45% {
                        translate: 100% 0;
                        opacity: 0;
                    }
                    55% {
                        translate: -100% 0;
                        opacity: 0;
                    }
                    100% {
                        translate: 0 0;
                        opacity: 1;
                    }
                }
            }
        }
        &--type2 {
            translate: 0 -20%;
            position: relative;
            width: fit-content;
            &-wrapper {
                height: 100%;
                display: grid;
                grid-template-columns: repeat(8, auto);
                grid-template-rows: repeat(4, auto);
                grid-template-areas:
                    'image-1 image-1 . image-2 image-2 . . .'
                    'image-1 image-1 image-3 image-3 image-3 desc desc desc'
                    '. . image-3 image-3 image-3 image-4 image-4 link'
                    '. image-5 image-3 image-3 image-3 image-4 image-4 link';
                gap: rem(16);
            }
            &-image-container {
                max-height: 100%;
                &:nth-of-type(1) {
                    grid-area: image-1;
                    max-width: rem(277);
                }
                &:nth-of-type(2) {
                    grid-area: image-2;
                    max-width: rem(273);
                    max-height: rem(99);
                    align-self: center;
                    img {
                        object-fit: contain;
                    }
                }
                &:nth-of-type(3) {
                    grid-area: image-3;
                    position: relative;
                    max-width: rem(380);
                    aspect-ratio: 1;
                }
                &:nth-of-type(4) {
                    grid-area: image-4;
                    max-width: rem(322);
                    img {
                        scale: 1.3;
                        object-fit: contain;
                    }
                }
                &:nth-of-type(5) {
                    grid-area: image-5;
                    max-width: rem(160);
                    aspect-ratio: 1;
                }
            }
            &-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            &-desc {
                grid-area: desc;
                align-self: flex-end;
                height: fit-content;
                max-width: 25ch;
                text-transform: uppercase;
                color: $c-9E9595;
                font-size: lineScale(32, 18, 480, 1440);
                line-height: 1.2;
                font-weight: $fw-bold;
            }
            &-link {
                grid-area: link;
                width: fit-content;
                height: fit-content;
                rotate: -45deg;
                overflow: hidden;
                @media (pointer: fine) {
                    &:hover svg {
                        animation: arrow-translate $td $tf;
                    }
                }
                @keyframes arrow-translate {
                    0% {
                        translate: 0 0;
                        opacity: 1;
                    }
                    45% {
                        translate: 100% 0;
                        opacity: 0;
                    }
                    55% {
                        translate: -100% 0;
                        opacity: 0;
                    }
                    100% {
                        translate: 0 0;
                        opacity: 1;
                    }
                }
            }
        }
    }
    &__divider {
        &--type1 {
            position: relative;
            width: fit-content;
            height: fit-content;
            left: rem(-96);
            bottom: calc($py * -0.5);
            user-select: none;
            pointer-events: none;
            &-arrow {
                translate: 20% 100%;
            }
            &-image-container {
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }
        &--type2 {
            display: flex;
            flex-direction: column;
            align-items: center;
            &-arrow {
                translate: rem(32) rem(-48);
            }
        }
    }
    &__footer {
        position: relative;
        &-runline {
            position: absolute;
            top: 0;
            right: -117%;
            rotate: -90deg;
            height: 1em;
            white-space: nowrap;
            text-transform: uppercase;
            font-family: 'Fira-Extra', sans-serif;
            font-size: rem(22);
            color: $c-9E9595;
            display: flex;
            > span {
                display: block;
                will-change: translate;
                animation: runline 15s linear infinite;
            }
        }
        @keyframes runline {
            0% {
                translate: 0 0;
            }
            100% {
                translate: -100% 0;
            }
        }
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
        &__content {
            flex-direction: column;
            gap: rem(128);
        }
        &__item {
            &--type1-interactive,
            &--type2-interactive {
                display: none;
            }
            &--type1 {
                &-wrapper {
                    width: fit-content;
                    grid-template-columns: repeat(7, auto);
                    grid-template-rows: repeat(7, auto);
                    gap: rem(16);
                    grid-template-areas:
                        'title title title title title title link'
                        'image-1 image-1 image-1 image-1 image-2 image-2 image-2'
                        'image-1 image-1 image-1 image-1 desc desc desc'
                        'image-1 image-1 image-1 image-1 image-3 image-3 image-3'
                        'image-1 image-1 image-1 image-1 image-3 image-3 image-3'
                        'image-1 image-1 image-1 image-1 image-3 image-3 image-3'
                        'image-1 image-1 image-1 image-1 image-3 image-3 image-3';
                }
                &-link {
                    scale: 0.6;
                }
                &-image-container {
                    &:nth-of-type(3) {
                        aspect-ratio: initial;
                    }
                }
            }
            &--type2 {
                translate: 0 0;
                &-wrapper {
                    width: fit-content;
                    grid-template-areas:
                        'desc desc desc link'
                        'image-1 image-1 . .'
                        'image-1 image-1 image-2 image-2'
                        'image-3 image-3 image-3 image-5'
                        'image-3 image-3 image-3 image-4';
                }
                &-link {
                    scale: 0.6;
                }
            }
        }
        &__divider {
            &--type1 {
                display: none;
            }
            &--type2 {
                &-arrow {
                    width: 100%;
                    translate: 0 0;
                }
            }
        }
    }
}
</style>

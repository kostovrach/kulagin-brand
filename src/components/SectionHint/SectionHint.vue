<template>
    <div class="section-hint">
        <h3 class="section-hint__title">
            <slot name="title"></slot>
        </h3>
        <p class="section-hint__text">
            <slot name="text"></slot>
        </p>
        <button class="section-hint__media">
            <span class="section-hint__media-icon"><TheSvgSprite type="arrow" :size="30" /></span>

            <picture v-if="props.image" class="section-hint__media-image-container">
                <img class="section-hint__media-image" :src="props.image" alt="" />
            </picture>
            <video v-if="props.video" class="section-hint__media-video">
                <source :src="props.video" type="video/mp4" />
            </video>

            <div class="section-hint__media-button">
                <span> <TheSvgSprite type="play" :size="11" /></span>
                <p>
                    <slot name="media-description"></slot>
                </p>
            </div>
        </button>
    </div>
</template>

<script setup>
import TheSvgSprite from '../TheSvgSprite.vue';

const props = defineProps({
    image: { type: String },
    video: { type: String },
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.section-hint {
    $p: &;

    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    &__title {
        max-width: 23ch;
        text-transform: uppercase;
        font-size: lineScale(32, 24, 480, 1440);
        font-weight: $fw-bold;
    }
    &__text {
        max-width: 30ch;
        font-family: 'Inter', sans-serif;
        font-size: rem(14);
        font-weight: $fw-med;
        margin-top: rem(18);
    }
    &__media {
        cursor: pointer;
        width: fit-content;
        display: grid;
        grid-template-areas:
            'icon .'
            'media button';
        gap: rem(16);
        margin-top: rem(32);

        @media (pointer: fine) {
            &:hover {
                #{$p}__media {
                    &-icon svg {
                        animation: arrow-translate calc($td * 1.2) $tf;
                    }
                }
                > svg {
                    animation: arrow-translate calc($td * 1.2) $tf;
                }
                #{$p}__media-image-container,
                #{$p}__media-video {
                    &::before {
                        opacity: 0;
                    }
                }
            }
        }
        &-icon {
            grid-area: icon;
            width: fit-content;
            rotate: 45deg;
            overflow: hidden;
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
        &-image-container,
        &-video {
            grid-area: media;
            position: relative;
            width: rem(160);
            aspect-ratio: 1;
            height: 100%;
            object-fit: cover;
            &::before {
                content: '';
                position: absolute;
                z-index: 2;
                inset: 0;
                backdrop-filter: blur(5px) saturate(0);
                background-image: url('img/patterns/noise.png');
                pointer-events: none;
                transition: opacity $td $tf;
            }
        }
        &-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &-button {
            grid-area: button;
            align-self: flex-end;
            display: flex;
            flex-direction: column;
            gap: rem(8);
            > span {
                display: flex;
                align-items: center;
                justify-content: center;
                width: rem(48);
                aspect-ratio: 1;
                border: rem(2) solid currentColor;
                border-radius: 50%;
            }
            > p {
                max-width: 15ch;
                text-transform: uppercase;
                font-family: 'Fira-Extra', sans-serif;
                font-size: lineScale(18, 16, 480, 1440);
                font-weight: $fw-med;
            }
        }
    }
}

@media (max-width: 768px) {
    .section-hint {
        width: 100%;
        &__title {
            max-width: initial;
        }
    }
}
</style>

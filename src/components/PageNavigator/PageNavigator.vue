<template>
    <router-link :to="to" class="navigator">
        <div class="navigator__container">
            <div class="navigator__body">
                <div class="navigator__titlebox">
                    <div class="navigator__tag"><slot name="tag"></slot></div>
                    <h2 class="navigator__title"><slot name="title"></slot></h2>
                </div>
                <picture v-if="props.image" class="navigator__image-container">
                    <img class="navigator__image" :src="props.image" alt="#" />
                </picture>
                <div class="navigator__icon">
                    <TheSvgSprite type="arrow" :size="96" />
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import TheSvgSprite from '../TheSvgSprite.vue';

const props = defineProps({
    image: { type: String },
    to: { type: String },
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.navigator {
    $p: &;

    min-width: fit-content;
    color: $c-main;
    background-color: $c-111111;
    @media (pointer: fine) {
        &:hover {
            #{$p}__icon svg {
                animation: arrow-translate calc($td * 1.2) $tf;
            }
        }
    }
    &__container {
        @include horizontal-layout;
    }
    &__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    &__titlebox {
        display: flex;
        flex-direction: column;
        gap: rem(16);
        text-transform: uppercase;
    }
    &__tag {
        color: $c-9E9595;
        font-size: lineScale(32, 24, 480, 1440);
        line-height: 1;
        font-weight: $fw-bold;
    }
    &__title {
        @include block-title;
    }
    &__image-container {
        width: rem(200);
        height: rem(300);
    }
    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    &__icon {
        rotate: 45deg;
        overflow: hidden;
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
</style>

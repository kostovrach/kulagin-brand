<template>
    <section class="feedback">
        <div class="feedback__container">
            <h2 class="feedback__title">{{ content?.title }}</h2>
            <ul class="feedback__list">
                <li class="feedback__item" v-for="item in content?.feedback_item" :key="item.id">
                    <span class="feedback__item-tag">{{ item.feedback_item_id.company }}</span>
                    <h3 class="feedback__item-title">{{ item.feedback_item_id.name }}</h3>
                    <p class="feedback__item-text">{{ item.feedback_item_id.text }}</p>
                </li>
            </ul>
            <Sticker
                class="feedback__sticker"
                v-draggable="{ left: 50, top: 15 }"
                style="rotate: 15deg"
                variant="red"
                textAccent="250+"
                textMain="компаний по всему миру"
            />
            <Sticker
                class="feedback__sticker"
                v-draggable="{ left: 20, top: 90 }"
                style="rotate: -15deg"
                variant="black"
                textAccent="65+"
                textMain="российских компаний"
            />
        </div>
    </section>
</template>

<script setup>
import Sticker from '@/components/Sticker/Sticker.vue';

defineProps({
    content: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.feedback {
    @include horizontal-layout;
    &__container {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: rem(24);
    }
    &__title {
        @include block-title;
    }
    &__list {
        height: 100%;
        display: grid;
        grid-auto-flow: column dense;
        grid-template-rows: repeat(2, 1fr);
        gap: rem(24);
        margin-left: lineScale(196, 0, 768, 1440);
        &-loader {
            width: rem(320);
            display: flex;
            flex-direction: column;
            gap: rem(24);
            :nth-child(3n + 1) {
                max-height: rem(48);
            }
            :nth-child(3n + 2) {
                max-height: rem(16);
            }
            :nth-child(3n + 3) {
                max-height: rem(16);
            }
        }
    }
    &__item {
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        padding: rem(24);
        border-left: rem(2) dotted $c-111111;
        max-width: rem(320);
        &-tag {
            font-size: rem(14);
            font-weight: $fw-med;
            line-height: 1.4;
            opacity: 0.8;
        }
        &-title {
            text-transform: uppercase;
            font-family: 'Fira-Extra', sans-serif;
            font-size: lineScale(22, 18, 480, 1440);
            font-weight: $fw-bold;
            margin-top: rem(4);
        }
        &-text {
            font-size: rem(14);
            font-weight: $fw-med;
            line-height: 1.5;
            margin-top: rem(16);
            opacity: 0.8;
            @include lineClamp(7);
        }
    }
}

@media (max-width: 768px) {
    .feedback {
        &__sticker {
            display: none;
        }
        &__list {
            overflow-x: auto;
        }
        &__item {
            width: rem(240);
        }
    }
}
</style>

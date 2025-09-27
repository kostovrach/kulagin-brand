<template>
    <section class="projects">
        <div class="projects__container">
            <div class="projects__body">
                <Sticker
                    class="projects__sticker"
                    v-draggable="{ left: 50, top: 15 }"
                    style="rotate: 15deg"
                    variant="red"
                    textAccent="250+"
                    textMain="компаний по всему миру"
                />
                <Sticker
                    class="projects__sticker"
                    v-draggable="{ left: 20, top: 90 }"
                    style="rotate: -15deg"
                    variant="black"
                    textAccent="65+"
                    textMain="российских компаний"
                />
                <div class="projects__titlebox">
                    <h1 class="projects__title fade-bottom-rotate">{{ content?.title }}</h1>
                </div>
                <div class="projects__content">
                    <div class="projects__map fade-scale" style="animation-delay: 0.4s">
                        <img
                            v-for="point in points"
                            :key="point.id"
                            class="projects__map-icon"
                            :style="{
                                position: 'absolute',
                                top: `${point.position.top}%`,
                                left: `${point.position.left}%`,
                            }"
                            src="/img/icon-fire.gif"
                            alt="Точка"
                        />
                        <picture class="projects__map-image-container">
                            <img class="projects__map-image" src="/img/map.svg" alt="Карта мира" />
                        </picture>
                    </div>
                    <ul class="projects__list fade-right" style="animation-delay: 0.6s">
                        <li class="projects__item" v-for="item in content?.projects_item" :key="item.id">
                            <div class="projects__item-titlebox">
                                <span class="projects__item-tag">{{ item.projects_item_id?.country }}</span>
                                <h2 class="projects__item-title">{{ item.projects_item_id?.title }}</h2>
                            </div>
                            <div class="projects__item-body">
                                <ul class="projects__item-list">
                                    <li
                                        v-for="service in item.projects_item_id?.services"
                                        :key="service.projects_item_list_id?.id"
                                    >
                                        {{ service.projects_item_list_id?.title }}
                                    </li>
                                </ul>
                                <p class="projects__item-desc">{{ item.projects_item_id?.description }}</p>
                            </div>
                            <a
                                class="projects__item-button"
                                :href="item.projects_item_id?.link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span class="projects__item-button-text">Открыть проект</span>
                                <span class="projects__item-button-icon">
                                    <TheSvgSprite type="arrow" :size="10" />
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import TheSvgSprite from '@/components/TheSvgSprite.vue';
import Sticker from '@/components/Sticker/Sticker.vue';

defineProps({
    content: { type: Object, default: () => ({}) },
});

const points = [
    {
        id: 1,
        position: {
            top: 25,
            left: 17,
        },
    },
    {
        id: 2,
        position: {
            top: 40,
            left: 20,
        },
    },
    {
        id: 3,
        position: {
            top: 35,
            left: 50,
        },
    },
    {
        id: 4,
        position: {
            top: 30,
            left: 55,
        },
    },
    {
        id: 5,
        position: {
            top: 32,
            left: 59,
        },
    },
    {
        id: 6,
        position: {
            top: 20,
            left: 70,
        },
    },
    {
        id: 7,
        position: {
            top: 30,
            left: 75,
        },
    },
    {
        id: 8,
        position: {
            top: 40,
            left: 75,
        },
    },
    {
        id: 9,
        position: {
            top: 34,
            left: 80,
        },
    },
];
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.projects {
    &__container {
        @include horizontal-layout;
    }
    &__body {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: rem(24);
        min-width: calc(100vw - $px * 2);
    }
    &__titlebox {
        position: relative;
        width: 100%;
    }
    &__title {
        position: sticky;
        left: $px;
        @include block-title($max-width: 20ch);
    }
    &__content {
        width: fit-content;
        max-width: 100%;
        display: grid;
        grid-auto-flow: column;
        gap: rem(128);
    }
    &__map {
        position: relative;
        width: 100%;
        max-height: 100%;
        &-image-container {
            width: 100%;
            max-width: rem(800);
            max-height: rem(470);
        }
        &-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    &__list {
        height: 100%;
        display: grid;
        grid-auto-flow: column dense;
        grid-template-rows: repeat(2, 1fr);
        gap: rem(24);
    }
    &__item {
        max-width: rem(230);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: rem(16);
        box-sizing: border-box;
        padding: rem(24);
        border-left: rem(2) dotted $c-111111;
        &-titlebox {
            display: flex;
            flex-direction: column;
            gap: rem(4);
        }
        &-tag {
            width: fit-content;
            text-transform: uppercase;
            color: $c-main;
            font-size: rem(14);
            font-weight: $fw-semi;
            line-height: 1;
            padding: rem(4) rem(8);
            background-color: $c-111111;
        }
        &-title {
            text-transform: uppercase;
            font-family: 'Fira-Extra', sans-serif;
            font-size: lineScale(22, 18, 480, 1440);
            font-weight: $fw-bold;
        }
        &-body {
            display: flex;
            flex-direction: column;
            gap: rem(8);
        }
        &-list {
            display: flex;
            flex-wrap: wrap;
            gap: rem(8);
            text-transform: uppercase;
            font-size: rem(12);
            line-height: 1.4;
            font-weight: $fw-med;
            li {
                position: relative;
                display: flex;
                align-items: center;
                gap: rem(8);
                text-decoration: underline;
                &:not(:last-child)::after {
                    content: '';
                    display: block;
                    width: rem(2);
                    height: 100%;
                    background-color: currentColor;
                }
            }
        }
        &-desc {
            font-family: 'Inter', sans-serif;
            font-size: rem(12);
            font-weight: $fw-med;
            line-height: 1.4;
            opacity: 0.8;
        }
        &-button {
            width: fit-content;
            display: flex;
            align-items: center;
            gap: rem(4);
            border-bottom: rem(2) solid currentColor;
            transition: gap $td $tf;
            @media (pointer: fine) {
                &:hover {
                    gap: rem(12);
                }
            }
            &-text {
                text-transform: uppercase;
                font-family: 'Fira-Extra', sans-serif;
                font-size: rem(14);
                font-weight: $fw-bold;
            }
        }
    }
}

@media (max-width: 768px) {
    .projects {
        &__sticker {
            display: none;
        }
        &__body {
            gap: rem(64);
        }
        &__content {
            display: flex;
            flex-direction: column;
        }
        &__list {
            width: 100%;
            overflow-x: auto;
        }
        &__item {
            width: rem(320);
        }
    }
}
</style>

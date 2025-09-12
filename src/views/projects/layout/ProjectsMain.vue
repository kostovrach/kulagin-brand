<template>
    <section class="hero">
        <div class="hero__container">
            <div class="hero__body">
                <Sticker
                    v-draggable="{ left: 900, top: 120 }"
                    style="rotate: 15deg"
                    variant="red"
                    textAccent="250+"
                    textMain="компаний по всему миру"
                />
                <Sticker
                    v-draggable="{ left: 650, top: 600 }"
                    style="rotate: -15deg"
                    variant="black"
                    textAccent="65+"
                    textMain="российских компаний"
                />
                <div class="hero__titlebox">
                    <h1 class="hero__title fade-bottom-rotate">Ускоряю развитие&nbsp;бизнеса.</h1>
                </div>
                <div class="hero__content">
                    <div class="hero__map fade-scale" style="animation-delay: 0.4s">
                        <img
                            v-for="point in points"
                            :key="point.id"
                            class="hero__map-icon"
                            :style="{
                                position: 'absolute',
                                top: `${point.position.top}%`,
                                left: `${point.position.left}%`,
                            }"
                            src="/img/icon-fire.gif"
                            alt="Точка"
                        />
                        <picture class="hero__map-image-container">
                            <img class="hero__map-image" src="/img/map.svg" alt="Карта мира" />
                        </picture>
                    </div>
                    <ul class="hero__list fade-right" style="animation-delay: 0.6s">
                        <li v-for="item in cases" :key="item.id" class="hero__item">
                            <div class="hero__item-titlebox">
                                <span class="hero__item-tag">{{ item.location }}</span>
                                <h2 class="hero__item-title">{{ item.title }}</h2>
                            </div>
                            <div class="hero__item-body">
                                <ul class="hero__item-list">
                                    <li v-for="service in item.services" :key="service">{{ service }}</li>
                                </ul>
                                <p class="hero__item-desc">{{ item.description }}</p>
                            </div>
                            <a class="hero__item-button" :href="item.link" target="_blank" rel="noopener noreferrer">
                                <span class="hero__item-button-text">Открыть проект</span>
                                <span class="hero__item-button-icon">
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

const cases = [
    {
        id: 1,
        location: 'КАНАДА',
        title: 'Home wright',
        services: ['Брендинг', 'Сайт', 'Поддержка'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
    {
        id: 2,
        location: 'Китай',
        title: 'Современный Дом',
        services: ['Поддержка'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
    {
        id: 3,
        location: 'Россия, москва',
        title: 'квадратика',
        services: ['Брендинг', 'Сайт'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
    {
        id: 4,
        location: 'германия',
        title: 'SolidHome',
        services: ['Брендинг', 'Сайт', 'Поддержка'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
    {
        id: 5,
        location: 'Россия, Самара',
        title: 'TrustBuild',
        services: ['Брендинг', 'Сайт'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
    {
        id: 6,
        location: 'КАНАДА',
        title: 'Дом Строй',
        services: ['Брендинг', 'Сайт'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
    {
        id: 7,
        location: 'Казахстан',
        title: 'ModernHome',
        services: ['Брендинг', 'Сайт'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
    {
        id: 8,
        location: 'КАНАДА',
        title: 'Home wright',
        services: ['Брендинг', 'Сайт', 'Поддержка'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
    {
        id: 9,
        location: 'Китай',
        title: 'Современный Дом',
        services: ['Поддержка'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
    {
        id: 10,
        location: 'Россия, москва',
        title: 'квадратика',
        services: ['Брендинг', 'Сайт'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
    {
        id: 11,
        location: 'германия',
        title: 'SolidHome',
        services: ['Брендинг', 'Сайт', 'Поддержка'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
    {
        id: 12,
        location: 'Россия, Самара',
        title: 'TrustBuild',
        services: ['Брендинг', 'Сайт'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
    {
        id: 13,
        location: 'КАНАДА',
        title: 'Дом Строй',
        services: ['Брендинг', 'Сайт'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
    {
        id: 14,
        location: 'Казахстан',
        title: 'ModernHome',
        services: ['Брендинг', 'Сайт'],
        description: 'Сайт для инспекторов недвижимости',
        link: '/',
    },
];
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.hero {
    &__container {
        @include horizontal-layout;
    }
    &__body {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: rem(24);
    }
    &__titlebox {
        position: relative;
        width: 100%;
    }
    &__title {
        position: sticky;
        left: $px;
        @include block-title;
    }
    &__content {
        width: fit-content;
        display: grid;
        grid-auto-flow: column;
        gap: rem(128);
    }
    &__map {
        position: relative;
        max-height: 100%;
        &-image-container {
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
</style>

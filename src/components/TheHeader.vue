<template>
    <header class="header">
        <div class="header__container">
            <div class="header__logo-container">
                <router-link class="header__logo" to="/">игорь кулагин</router-link>
                <router-link :class="['header__sublogo', { current: currentRoute == 'billboard' }]" to="/billboard"
                    >KULAGIN GROUP</router-link
                >
            </div>
            <div class="header__controls">
                <nav class="header__nav">
                    <router-link :class="['header__nav-link', { current: currentRoute == 'home' }]" to="/"
                        >Обо мне</router-link
                    >
                    <router-link :class="['header__nav-link', { current: currentRoute == 'services' }]" to="/services"
                        >Услуги</router-link
                    >
                    <router-link :class="['header__nav-link', { current: currentRoute == 'projects' }]" to="/projects"
                        >Все Проекты</router-link
                    >
                    <router-link :class="['header__nav-link', { current: currentRoute == 'hobby' }]" to="/hobby"
                        >Хобби</router-link
                    >
                    <router-link :class="['header__nav-link', { current: currentRoute == 'blog' }]" to="/blog"
                        >Блог</router-link
                    >
                    <router-link :class="['header__nav-link', { current: currentRoute == 'marketers' }]" to="/marketers"
                        >Маркетологам</router-link
                    >
                    <router-link :class="['header__nav-link', { current: currentRoute == 'contact' }]" to="/contact"
                        >Контакты</router-link
                    >
                </nav>
                <router-link class="header__button" to="/contact">Связаться со мной</router-link>
                <div class="header__menu">
                    <Burger />
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Burger from './Burger/Burger.vue';

const route = useRoute();

const currentRoute = computed(() => route.name);
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.header {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100vw;
    padding: rem(16) $px;
    pointer-events: none;
    mix-blend-mode: difference; // <-----
    &__container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: rem(32);
        white-space: nowrap;
    }
    &__logo-container {
        display: flex;
        align-items: center;
        gap: rem(32);
        color: $c-F3F2EE; // <-----
    }
    &__logo {
        text-transform: uppercase;
        font-size: lineScale(32, 24, 480, 1440);
        line-height: 1;
        font-weight: $fw-bold;
        pointer-events: auto;
    }
    &__sublogo {
        cursor: pointer;
        text-transform: uppercase;
        font-size: rem(14);
        font-weight: $fw-semi;
        pointer-events: auto;
        @include gradient-text-hover($main-color: $c-FFFFFF, $accent-color: $c-0FD2D3); // <-----
        &.current {
            background-position: -160% -200%;
            pointer-events: none;
        }
    }
    &__controls {
        display: flex;
        align-items: center;
        gap: rem(32);
    }
    &__nav {
        display: flex;
        align-items: center;
        gap: rem(32);
        &-link {
            cursor: pointer;
            text-transform: uppercase;
            font-size: rem(14);
            font-weight: $fw-semi;
            pointer-events: auto;
            @include gradient-text-hover($main-color: $c-FFFFFF, $accent-color: $c-0FD2D3); // <-----
            &.current {
                background-position: -160% -200%;
                pointer-events: none;
            }
        }
    }
    &__button {
        cursor: pointer;
        position: relative;
        text-transform: uppercase;
        color: $c-FFFFFF; // <-----
        font-size: rem(14);
        font-weight: $fw-med;
        padding: rem(14) rem(32);
        border-radius: rem(32);
        box-shadow:
            0 0 15px rgba($c-FFFFFF, 0.1),
            // <-----
            inset 0 0 15px rgba($c-FFFFFF, 0.1); // <-----
        border: rem(1) solid $c-000000; // <-----
        overflow: hidden;
        transition: color $td $tf;
        pointer-events: auto;
        &::before {
            content: '';
            position: absolute;
            z-index: -1;
            inset: 0;
            pointer-events: none;
            border-radius: inherit;
            background-image: linear-gradient(90deg, $c-0FD2D3 40%, $c-000000 50%); // <-----
            background-size: 250% 200%;
            background-position: -80% -100%;
            transition: background-position $td $tf;
        }
        @media (pointer: fine) {
            &:hover {
                color: $c-111111;
                &::before {
                    background-position: -165% -200%;
                }
            }
        }
        &:active {
            color: $c-000000; // <-----
            background-color: $c-FFFFFF; // <-----
            scale: 0.95;
            &::before {
                display: none;
            }
        }
    }
    &__menu {
        pointer-events: auto;
        display: none;
    }
}

@media (max-width: 1260px) {
    .header {
        &__sublogo {
            display: none;
        }
        &__nav {
            &-link {
                display: none;
            }
        }
        &__button {
            display: none;
        }
        &__menu {
            display: initial;
        }
    }
}
</style>

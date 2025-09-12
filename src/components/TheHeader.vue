<template>
    <header class="header">
        <div class="header__container">
            <div class="header__logo-container">
                <router-link class="header__logo" to="/">игорь кулагин</router-link>
                <router-link class="header__sublogo" to="/">KULAGIN GROUP</router-link>
            </div>
            <div class="header__controls">
                <nav class="header__nav">
                    <router-link class="header__nav-link" to="/">Обо мне</router-link>
                    <router-link class="header__nav-link" to="/">Услуги</router-link>
                    <router-link class="header__nav-link" to="/">Все Проекты</router-link>
                    <router-link class="header__nav-link" to="/">Хобби</router-link>
                    <router-link class="header__nav-link" to="/">Блог</router-link>
                    <router-link class="header__nav-link" to="/">Маркетологам</router-link>
                    <router-link class="header__nav-link" to="/">Контакты</router-link>
                </nav>
                <button class="header__button">Связаться со мной</button>
            </div>
        </div>
    </header>
</template>

<script setup></script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.header {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100vw;
    padding: rem(16) rem(64);
    pointer-events: none;
    mix-blend-mode: difference; // <-----
    &__container {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
}
</style>

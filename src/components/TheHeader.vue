<template>
    <header class="header">
        <div class="header__container">
            <div class="header__logo-container">
                <router-link class="header__logo" to="/">игорь кулагин</router-link>
                <a class="header__sublogo" href="/">KULAGIN GROUP</a>
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
    top: 0;
    left: 0;
    width: 100vw;
    padding: rem(16) rem(32);
    pointer-events: none;
    &__container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &__logo-container {
        display: flex;
        align-items: center;
        gap: rem(32);
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
        @include gradient-text-hover;
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
            @include gradient-text-hover;
        }
    }
    &__button {
        cursor: pointer;
        position: relative;
        text-transform: uppercase;
        font-size: rem(14);
        font-weight: $fw-semi;
        padding: rem(14) rem(32);
        border-radius: rem(32);
        box-shadow:
            0 0 15px rgba($c-111111, 0.1),
            inset 0 0 15px rgba($c-111111, 0.1);
        border: rem(1) solid $c-FFFFFF;
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
            background-image: linear-gradient(90deg, $c-accent 40%, $c-FFFFFF 50%);
            background-size: 250% 200%;
            background-position: -80% -100%;
            transition: background-position $td $tf;
        }
        @media (pointer: fine) {
            &:hover {
                color: $c-main;
                &::before {
                    background-position: -165% -200%;
                }
            }
        }
        &:active {
            color: $c-main;
            background-color: $c-111111;
            scale: 0.95;
            &::before {
                display: none;
            }
        }
    }
}
</style>

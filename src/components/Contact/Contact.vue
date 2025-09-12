<template>
    <div class="contact">
        <div class="contact__container">
            <div class="contact__body">
                <a
                    v-for="item in socials"
                    :key="item.name"
                    :class="['contact__link', item.modifier ? `contact__link--${item.modifier}` : '']"
                    :href="item.href"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <picture class="contact__link-image-container">
                        <img class="contact__link-image" :src="item.image" :alt="item.name" />
                    </picture>
                </a>
                <p class="contact__desc">Ваша уникальность — ваш главный актив. Инвестируйте в неё мудро!</p>
                <ul class="contact__title">
                    <li>Начнём</li>
                    <li>работать Вместе</li>
                </ul>
                <img class="contact__arrow" src="/img/arrow-italic.svg" alt="#" />
                <router-link to="/" class="contact__button">
                    <span class="contact__button-text">Напиши мне, я не кусаюсь!</span>
                    <span class="contact__button-icon"><TheSvgSprite type="arrow" /></span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import TheSvgSprite from '../TheSvgSprite.vue';

const socials = [
    {
        name: 'instagram',
        image: '/img/stickers/instagram.png',
        href: '/',
        modifier: 'tagging',
    },
    {
        name: 'whatsapp',
        image: '/img/stickers/whatsapp.png',
        href: '/',
    },
    {
        name: 'tiktok',
        image: '/img/stickers/tiktok.png',
        href: '/',
    },
    {
        name: 'vk',
        image: '/img/stickers/vk.png',
        href: '/',
    },
    {
        name: 'tg',
        image: '/img/stickers/tg.png',
        href: '/',
    },
    {
        name: 'ok',
        image: '/img/stickers/ok.png',
        href: '/',
    },
];
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.contact {
    &__container {
        @include horizontal-layout($padding: 0);
    }
    &__body {
        display: grid;
        grid-template-columns: repeat(7, auto);
        grid-template-rows: repeat(4, auto);
        grid-template-areas:
            'link-1 link-2 . . desc desc .'
            '. title title title title link-3 .'
            '. . arrow button button button .'
            '. . link-4 . link-5 . link-6';
    }
    &__link {
        display: block;
        aspect-ratio: 1;
        transition: transform $td $tf;
        @media (pointer: fine) {
            &:hover {
                transform: translateY(rem(-16));
            }
        }
        &-image-container {
            width: 100%;
            height: 100%;
        }
        &-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &--tagging {
            position: relative;
            &::before {
                content: '*';
                position: absolute;
                top: 0;
                right: 0;
                font-size: rem(40);
                font-family: 'Inter', sans-serif;
                color: $c-9E9595;
                pointer-events: none;
            }
        }
        &:nth-of-type(1) {
            grid-area: link-1;
            max-width: rem(160);
            align-self: flex-end;
            justify-self: flex-end;
            rotate: -9deg;
            translate: rem(48) rem(48);
        }
        &:nth-of-type(2) {
            grid-area: link-2;
            max-width: rem(128);
            align-self: flex-end;
            justify-self: flex-end;
            rotate: 5deg;
        }
        &:nth-of-type(3) {
            grid-area: link-3;
            max-width: rem(200);
            rotate: 8deg;
            translate: rem(-40) 0;
        }
        &:nth-of-type(4) {
            grid-area: link-4;
            max-width: rem(160);
            rotate: 11deg;
            translate: 0 rem(64);
        }
        &:nth-of-type(5) {
            grid-area: link-5;
            max-width: rem(200);
            rotate: -5deg;
        }
        &:nth-of-type(6) {
            grid-area: link-6;
            max-width: rem(128);
            rotate: 4deg;
        }
    }
    &__title {
        grid-area: title;
        @include block-title($max-width: initial, $font-size: lineScale(120, 32, 480, 1440));
        :nth-child(2) {
            padding-left: lineScale(96, 32, 480, 1440);
        }
    }
    &__desc {
        grid-area: desc;
        align-self: center;
        justify-self: flex-end;
        max-width: 30ch;
        font-family: 'Inter', sans-serif;
        font-style: italic;
        font-size: lineScale(22, 18, 480, 1440);
        line-height: 1.2;
        text-align: right;
        opacity: 0.5;
    }
    &__arrow {
        grid-area: arrow;
        justify-self: flex-end;
    }
    &__button {
        grid-area: button;
        align-self: flex-end;
        margin: rem(32) 0 0 rem(32);
        @include button-secondary($width: fit-content);
    }
}
</style>

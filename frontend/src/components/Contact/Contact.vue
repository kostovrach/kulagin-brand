<template>
    <div :class="['contact', `contact--${props.orientation}`]">
        <div class="contact__container">
            <div class="contact__body">
                <a class="contact__link contact__link--tagging" :href="page?.instagram?.link">
                    <picture class="contact__link-image-container">
                        <img class="contact__link-image" src="/img/stickers/instagram.png" alt="instagram" />
                    </picture>
                </a>
                <a class="contact__link" :href="page?.whatsapp?.link">
                    <picture class="contact__link-image-container">
                        <img class="contact__link-image" src="/img/stickers/whatsapp.png" alt="whatsapp" />
                    </picture>
                </a>
                <a class="contact__link" :href="page?.tiktok?.link">
                    <picture class="contact__link-image-container">
                        <img class="contact__link-image" src="/img/stickers/tiktok.png" alt="tiktok" />
                    </picture>
                </a>
                <a class="contact__link" :href="page?.vk?.link">
                    <picture class="contact__link-image-container">
                        <img class="contact__link-image" src="/img/stickers/vk.png" alt="vk" />
                    </picture>
                </a>
                <a class="contact__link" :href="page?.telegram?.link">
                    <picture class="contact__link-image-container">
                        <img class="contact__link-image" src="/img/stickers/tg.png" alt="tg" />
                    </picture>
                </a>
                <a class="contact__link" :href="page?.ok?.link">
                    <picture class="contact__link-image-container">
                        <img class="contact__link-image" src="/img/stickers/ok.png" alt="ok" />
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
                <p class="contact__caption">
                    *Instagram принадлежит компании Meta, которая признана экстремистской организацией и запрещена
                    на&nbsp;территории РФ
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import TheSvgSprite from '../TheSvgSprite.vue';

// content management
import { usePage } from '@/composables/usePage';

const { page } = usePage('socials', ['vk.*', 'instagram.*', 'whatsapp.*', 'tiktok.*', 'telegram.*', 'ok.*'], {
    resolveFiles: true,
});
//

const props = defineProps({
    orientation: {
        type: String,
        default: 'horizontal',
        validator: (val) => ['horizontal', 'vertical'].includes(val),
    },
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.contact {
    $p: &;

    height: 100%;
    &--horizontal {
        #{$p}__container {
            @include horizontal-layout($padding: 0);
        }
    }
    &__body {
        display: grid;
        grid-template-columns: repeat(7, auto);
        grid-template-rows: repeat(4, auto);
        grid-template-areas:
            'link-1 . link-2 . desc desc .'
            '. title title title title link-3 .'
            '. . arrow button button button .'
            'caption caption link-4 . link-5 . link-6';
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
            max-width: rem(180);
            rotate: 8deg;
            translate: -10% 0;
        }
        &:nth-of-type(4) {
            grid-area: link-4;
            max-width: rem(160);
            rotate: 11deg;
            translate: 0 rem(32);
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
        @include block-title($max-width: initial, $font-size: lineScale-y(120, 32, 480, 1080));
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
    &__caption {
        grid-area: caption;
        max-width: 50ch;
        align-self: flex-end;
        font-family: 'Inter', sans-serif;
        font-style: italic;
        font-size: rem(14);
        font-weight: $fw-med;
        opacity: 0.25;
    }
    &__button {
        grid-area: button;
        align-self: flex-end;
        margin: rem(32) 0 0 rem(32);
        @include button-secondary($width: fit-content, $font-size: lineScale(32, 18, 480, 1440));
    }
}

@media (max-width: 768px) {
    .contact {
        &__body {
            grid-template-columns: repeat(5, auto); // 7
            grid-template-rows: repeat(7, auto); // 4
            grid-template-areas:
                'desc desc desc desc desc'
                'link-1 link-2 link-3 . .'
                'title title title . .'
                'arrow . . . . '
                'button button button button button'
                'link-4 link-5 link-6 . .'
                'caption caption caption caption caption';
            gap: rem(32) 0;
        }
        &__desc {
            justify-self: initial;
        }
        &__button {
            margin: 0;
        }
        &__link {
            &:nth-of-type(1) {
                max-width: rem(120);
                justify-self: initial;
                translate: 0 0;
            }
            &:nth-of-type(2) {
                max-width: rem(100);
                justify-self: initial;
                translate: 15% 40%;
            }
            &:nth-of-type(3) {
                max-width: rem(120);
                translate: 25% 0;
            }
            &:nth-of-type(4) {
                max-width: rem(120);
            }
            &:nth-of-type(5) {
                translate: 10% -20%;
            }
            &:nth-of-type(6) {
                align-self: flex-end;
                justify-self: flex-end;
                max-width: rem(90);
            }
        }
    }
}
</style>

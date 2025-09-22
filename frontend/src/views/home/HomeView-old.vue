<template>
    <VerticalLayout style="background-color: #dfdddd">
        <section class="billboard">
            <div class="billboard__container">
                <div class="billboard__item billboard__item--agency fade-bottom">
                    <ButtonPrimary
                        type="a"
                        href="https://kulaginbrand.ru"
                        target="_blank"
                        variant="black"
                        logic="double-line"
                        style="font-size: 1.125rem; position: absolute; top: -5%; right: -25px; rotate: 7deg"
                        >Заказать проект</ButtonPrimary
                    >
                    <div class="billboard__item--agency-wrapper">
                        <div class="billboard__item--agency-titlebox">
                            <h2 class="billboard__item-title billboard__item--agency-title">digital Agency</h2>
                            <p class="billboard__item-desc billboard__item--agency-desc">
                                Симбиоз талантливых и неординарных личностей, создающих нечто более, чем просто продукт
                            </p>
                        </div>
                        <ul class="billboard__item--agency-list" v-accordion="{ hover: true, defaultIndex: 0 }">
                            <li class="billboard__item--agency-item">
                                <h3 class="billboard__item--agency-item-title">Брендинг</h3>
                                <picture class="billboard__item--agency-item-image-container">
                                    <img
                                        class="bilboard__item--agency-item-image"
                                        src="/img/content/theplace/temp1.jpg"
                                        alt="#"
                                    />
                                </picture>
                            </li>
                            <li class="billboard__item--agency-item">
                                <h3 class="billboard__item--agency-item-title">Создание сайтов</h3>
                                <picture class="billboard__item--agency-item-image-container">
                                    <img
                                        class="bilboard__item--agency-item-image"
                                        src="/img/content/theplace/temp.jpg"
                                        alt="#"
                                    />
                                </picture>
                            </li>
                            <li class="billboard__item--agency-item">
                                <h3 class="billboard__item--agency-item-title">Продвижение</h3>
                                <picture class="billboard__item--agency-item-image-container">
                                    <img
                                        class="bilboard__item--agency-item-image"
                                        src="/img/content/theplace/mockup1.jpg"
                                        alt="#"
                                    />
                                </picture>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="billboard__item billboard__item--view fade-bottom">
                    <ButtonPrimary
                        type="router-link"
                        to="/about"
                        variant="red"
                        style="font-size: 1rem; position: absolute; top: 50%; left: 50%; rotate: -7deg"
                        >Познакомиться</ButtonPrimary
                    >
                    <div class="billboard__item--view-wrapper">
                        <div class="billboard__item--view-body">
                            <div class="billboard__item--view-titlebox">
                                <h1 class="billboard__item-title billboard__item--view-title">
                                    Привет, я Игорь&nbsp;Кулагин
                                </h1>
                                <p class="billboard__item-desc billboard__item--view-desc">
                                    Мой опыт и&nbsp;знания смогут сократить путь к&nbsp;результатам, экономя несколько
                                    лет усилий
                                </p>
                            </div>
                            <div class="billboard__item--view-contact">
                                <a class="billboard__item--view-link" href="tel:" target="_blank">+7 927 714-33-39</a>
                                <a class="billboard__item--view-link" href="mailto:" target="_blank">kulagin@mail.ru</a>
                            </div>
                        </div>
                        <picture class="billboard__item--view-image-container">
                            <img class="billboard__item--view-image" src="/img/content/personal-views/igor1.png" />
                        </picture>
                    </div>
                </div>
                <a
                    class="billboard__item billboard__item--project billboard__item--primary fade-bottom"
                    href="https://cvety63.ru"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div class="billboard__item--primary-wrapper">
                        <div class="billboard__item--primary-content">
                            <h2 class="billboard__item-title billboard__item--primary-title">Arabeska</h2>
                            <span class="billboard__item--primary-icon"><TheSvgSprite type="arrow" :size="48" /></span>
                        </div>
                        <picture class="billboard__item--primary-image-container">
                            <img
                                class="billboard__item--primary-image"
                                src="/img/content/arabeska/arabeska.gif"
                                alt="arabeska"
                            />
                        </picture>
                    </div>
                </a>
                <a
                    class="billboard__item billboard__item--club billboard__item--primary fade-bottom"
                    href="https://gt-business.ru"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div class="billboard__item--primary-wrapper">
                        <div class="billboard__item--primary-content">
                            <h2 class="billboard__item-title billboard__item--primary-title">GT-club</h2>
                            <span class="billboard__item--primary-icon"><TheSvgSprite type="arrow" :size="48" /></span>
                        </div>

                        <picture class="billboard__item--primary-image-container">
                            <img class="billboard__item--primary-image" src="/img/content/gt-club.gif" alt="gt-club" />
                        </picture>
                    </div>
                </a>
                <div class="billboard__item billboard__item--contact fade-bottom">
                    <div class="billboard__item--contact-wrapper">
                        <h2 class="billboard__item-title billboard__item--contact-title">Соцсети</h2>
                        <div class="billboard__item--contact-list">
                            <a
                                class="billboard__item--contact-item"
                                href="https://example.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/img/stickers/vk.png" alt="vk" />
                            </a>
                            <a
                                class="billboard__item--contact-item"
                                href="https://example.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/img/stickers/tg.png" alt="tg" />
                            </a>
                            <a
                                class="billboard__item--contact-item"
                                href="https://example.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/img/stickers/whatsapp.png" alt="whatsapp" />
                            </a>
                            <a
                                class="billboard__item--contact-item"
                                href="https://example.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/img/stickers/ok.png" alt="ok" />
                            </a>
                            <a
                                class="billboard__item--contact-item"
                                href="https://example.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/img/stickers/tiktok.png" alt="tiktok" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </VerticalLayout>
</template>

<script setup>
import TheSvgSprite from '@/components/TheSvgSprite.vue';
import VerticalLayout from '@/components/VerticalLayout/VerticalLayout.vue';
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.billboard {
    $p: &;

    height: calc(100lvh - $py);
    min-height: fit-content;
    @include vertical-layout;
    &__container {
        height: 100%;
        width: 100%;
        padding-bottom: $py;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(5, minmax(rem(128), 1fr));
        grid-template-areas:
            'agency agency view view'
            'agency agency view view'
            'agency agency view view'
            'project club contact contact'
            'project club contact contact';
        gap: rem(16) lineScale(16, 8, 480, 1440);
        @for $i from 0 through 5 {
            :nth-child(5n + #{$i}) {
                $delay: calc($i / 10);
                animation-delay: #{$delay}s;
            }
        }
    }
    &__item {
        background-color: $c-main;
        border-radius: rem(20);
        padding: rem(18);
        &-title {
            text-transform: uppercase;
            font-family: 'Fira-Extra', sans-serif;
            font-size: lineScale(64, 32, 480, 1440);
            font-weight: $fw-bold;
        }
        &-desc {
            font-family: 'Inter', sans-serif;
            font-size: rem(16);
            line-height: 1.4;
            margin-top: rem(16);
        }
        &--agency {
            grid-area: agency;
            position: relative;
            z-index: 1;
            &-wrapper {
                width: 100%;
                height: 100%;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                gap: rem(32);
            }
            &-titlebox {
                flex: 0 0 30%;
                max-width: 80%;
            }
            &-list {
                flex: 1 1 60%;
                display: flex;
                gap: lineScale(16, 8, 480, 1440);
                min-height: 0;
                will-change: flex;
            }
            &-item {
                flex: 1 1 10%;
                position: relative;
                height: 100%;
                min-height: rem(180);
                overflow: hidden;
                transition: flex 1.5s $tf-spring;
                &.active {
                    flex: 1 1 65%;
                    #{$p}__item--agency-item-title {
                        transform: scaleX(1);
                        opacity: 1;
                    }
                }
                &-title {
                    position: absolute;
                    z-index: 1;
                    top: 50%;
                    left: 50%;
                    translate: -50% -50%;
                    text-transform: uppercase;
                    color: $c-main;
                    font-family: 'Fira-Extra', sans-serif;
                    font-size: lineScale(48, 18, 480, 1440);
                    font-weight: $fw-med;
                    white-space: nowrap;

                    transform: scaleX(0.5);
                    opacity: 0;
                    transition: all 1.5s $tf-spring;
                }
                &-image-container {
                    width: 100%;
                    height: 100%;
                    border-radius: rem(16);
                    overflow: hidden;
                    filter: brightness(60%);
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
        }
        &--view {
            grid-area: view;
            overflow: hidden;
            &-wrapper {
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
            }
            &-body {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: rem(64);
            }
            &-contact {
                display: flex;
                flex-direction: column;
                gap: rem(24);
            }
            &-link {
                width: fit-content;
                text-transform: uppercase;
                font-size: lineScale(32, 18, 480, 1440);
                font-weight: $fw-bold;
                @include gradient-text-hover;
            }
            &-image-container {
                position: relative;
                width: 100%;
                height: 100%;
                user-select: none;
                img {
                    position: absolute;
                    inset: 0;
                    width: 110%;
                    height: 105%;
                    object-fit: cover;
                }
            }
        }
        &--primary {
            padding: initial;
            &#{$p}__item--project {
                grid-area: project;
            }
            &#{$p}__item--club {
                grid-area: club;
            }
            @media (pointer: fine) {
                &:hover {
                    #{$p}__item--primary-icon svg {
                        animation: arrow-translate $td $tf;
                    }
                }
            }
            &-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
                border-radius: inherit;
                padding: rem(18);
            }
            &-content {
                position: relative;
                z-index: 1;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                color: $c-main;
            }
            &-image-container {
                position: absolute;
                z-index: 0;
                inset: 0;
                filter: brightness(60%);
            }
            &-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            &-icon {
                width: fit-content;
                height: fit-content;
                rotate: -45deg;
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
        }
        &--contact {
            grid-area: contact;
            padding: 0;
            &-wrapper {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: rem(18);
                overflow: hidden;
            }
            &-list {
                display: flex;
                translate: 0 50%;
            }
            &-item {
                max-width: rem(300);
                aspect-ratio: 1;
                scale: 1.7;
                transition: translate $td $tf;
                @media (pointer: fine) {
                    &:hover {
                        translate: 0 rem(-40);
                    }
                }
                &:nth-child(3n + 1) {
                    rotate: -7deg;
                }
                &:nth-child(3n + 2) {
                    rotate: 5deg;
                }
                &:nth-child(3n + 3) {
                    rotate: -2deg;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }
    }
}

@media (max-width: 1024px) {
    .billboard {
        height: initial;
        &__container {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(4, auto);
            grid-template-areas:
                'view view'
                'project club'
                'agency agency'
                'contact contact';
        }
        &__item {
            min-height: rem(256);
        }
    }
}
</style>

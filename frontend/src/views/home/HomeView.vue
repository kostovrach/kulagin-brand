<template>
    <main class="homepage">
        <section class="home">
            <div class="home__container">
                <ul class="home__body fade-bottom">
                    <li class="home__project">
                        <ButtonPrimary
                            v-follow-cursor="{ bound: true }"
                            type="a"
                            href="https://kulaginbrand.ru"
                            target="_blank"
                            variant="grey"
                            logic="noanim"
                            style="font-size: 20px; cursor: none"
                            >Заказать&nbsp;проект</ButtonPrimary
                        >
                        <div class="home__project-wrapper">
                            <div class="home__project-titlebox">
                                <h2 class="home__project-title">digital Agency</h2>
                                <p class="home__project-subtitle">
                                    Симбиоз талантливых и неординарных личностей, создающих нечто более, чем просто
                                    продукт
                                </p>
                                <a class="home__project-link" href="tel:">+7 927 714-33-39</a>
                            </div>
                            <ButtonPrimary
                                class="home__project-button"
                                type="a"
                                href="https://kulaginbrand.ru"
                                target="_blank"
                                variant="grey"
                                style="font-size: 20px"
                                >Заказать&nbsp;проект</ButtonPrimary
                            >
                            <AutoAccordion class="home__project-list" :interval="5000">
                                <li class="home__project-item">
                                    <h3 class="home__project-item-title">Брендинг</h3>
                                    <picture class="home__project-item-image-container">
                                        <img
                                            class="home__project-item-image"
                                            src="/img/content/theplace/temp1.jpg"
                                            alt="#"
                                        />
                                    </picture>
                                </li>
                                <li class="home__project-item">
                                    <h3 class="home__project-item-title">Создание сайтов</h3>
                                    <picture class="home__project-item-image-container">
                                        <img
                                            class="home__project-item-image"
                                            src="/img/content/theplace/temp.jpg"
                                            alt="#"
                                        />
                                    </picture>
                                </li>
                                <li class="home__project-item">
                                    <h3 class="home__project-item-title">Продвижение</h3>
                                    <picture class="home__project-item-image-container">
                                        <img
                                            class="home__project-item-image"
                                            src="/img/content/theplace/mockup1.jpg"
                                            alt="#"
                                        />
                                    </picture>
                                </li>
                            </AutoAccordion>
                        </div>
                    </li>
                    <li class="home__navigator">
                        <ButtonPrimary
                            v-follow-cursor="{ bound: true }"
                            type="router-link"
                            to="/about"
                            variant="red"
                            logic="noanim"
                            style="font-size: 20px; cursor: none"
                            >Познакомиться</ButtonPrimary
                        >
                        <div class="home__navigator-wrapper">
                            <div class="home__navigator-titlebox">
                                <h1 class="home__navigator-title">Привет, я Игорь&nbsp;Кулагин</h1>
                                <p class="home__navigator-subtitle">
                                    Мой опыт и&nbsp;знания смогут сократить путь к&nbsp;результатам, экономя несколько
                                    лет усилий
                                </p>
                            </div>
                            <picture class="home__navigator-image-container">
                                <img
                                    class="home__navigator-image"
                                    src="/img/content/personal-views/igor2.png"
                                    alt="Игорь Кулагин"
                                />
                            </picture>
                            <ButtonPrimary
                                class="home__navigator-button"
                                type="router-link"
                                to="/about"
                                variant="red"
                                style="font-size: 20px"
                                >Познакомиться</ButtonPrimary
                            >
                            <div class="home__navigator-socials">
                                <h3 class="home__navigator-socials-title">Публикую творчество в соцсетях</h3>
                                <div class="home__navigator-socials-list">
                                    <a
                                        class="home__navigator-socials-item"
                                        href="https://example.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src="/img/stickers/vk.png" alt="vk" />
                                    </a>
                                    <a
                                        class="home__navigator-socials-item"
                                        href="https://example.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src="/img/stickers/tg.png" alt="tg" />
                                    </a>
                                    <a
                                        class="home__navigator-socials-item"
                                        href="https://example.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src="/img/stickers/whatsapp.png" alt="whatsapp" />
                                    </a>
                                    <a
                                        class="home__navigator-socials-item"
                                        href="https://example.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src="/img/stickers/ok.png" alt="ok" />
                                    </a>
                                    <a
                                        class="home__navigator-socials-item"
                                        href="https://example.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src="/img/stickers/tiktok.png" alt="tiktok" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </main>
</template>

<script setup>
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary.vue';
import AutoAccordion from './components/AutoAccordion.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.home {
    $p: &;

    min-height: 100lvh;
    padding: rem(32) lineScale(32, 0, 480, 1440);
    background-color: #dfdddd;
    &__container {
        height: 100%;
    }
    &__body {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: rem(16);
    }
    &__project {
        position: relative;
        background-color: $c-main;
        border-radius: rem(24);
        padding: rem(16);
        overflow: hidden;
        &-wrapper {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: rem(64);
        }
        &-titlebox {
            display: flex;
            flex-direction: column;
            gap: rem(16);
        }
        &-title {
            text-transform: uppercase;
            font-family: 'Fira-Extra', sans-serif;
            font-size: lineScale(64, 32, 480, 1440);
            font-weight: $fw-bold;
        }
        &-subtitle {
            max-width: 45ch;
            font-family: 'Inter', sans-serif;
            font-size: rem(16);
            line-height: 1.4;
            margin-top: rem(16);
        }
        &-link {
            width: fit-content;
            font-family: 'Inter', sans-serif;
            @include gradient-text-hover;
        }
        &-button {
            position: absolute;
            top: 25%;
            right: 0;
            rotate: -7deg;
            display: none;
            scale: 0.8;
            @media (pointer: coarse) {
                display: flex;
            }
        }
        &-list {
            display: flex;
            gap: rem(8);
        }
        &-item {
            flex: 1 1 10%;
            position: relative;
            height: 100%;
            height: rem(430);
            overflow: hidden;
            transition: flex 1.2s $tf;
            &.active {
                flex: 1 1 65%;
                #{$p}__project-item-title {
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
    &__navigator {
        position: relative;
        background-color: $c-main;
        border-radius: rem(24);
        overflow: hidden;
        &-wrapper {
            height: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, auto);
            grid-template-areas:
                'titlebox titlebox socials'
                'image image socials'
                'image image socials';
        }
        &-titlebox {
            grid-area: titlebox;
            display: flex;
            flex-direction: column;
            gap: rem(16);
            padding: rem(16);
        }
        &-title {
            text-transform: uppercase;
            font-family: 'Fira-Extra', sans-serif;
            font-size: lineScale(64, 32, 480, 1440);
            font-weight: $fw-bold;
        }
        &-desc {
            max-width: 45ch;
            font-family: 'Inter', sans-serif;
            font-size: rem(16);
            line-height: 1.4;
            margin-top: rem(16);
        }
        &-button {
            position: absolute;
            right: 30%;
            bottom: -2.5%;
            rotate: 7deg;
            display: none;
            scale: 0.8;
            @media (pointer: coarse) {
                display: flex;
            }
        }
        &-image-container {
            grid-area: image;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &-socials {
            grid-area: socials;
            justify-self: flex-end;
            position: relative;
            &-title {
                position: absolute;
                top: 50%;
                right: lineScale(48, 0, 480, 1440);
                text-transform: uppercase;
                font-family: 'Fira-Extra', sans-serif;
                font-size: lineScale(22, 18, 480, 1440);
                font-weight: $fw-med;
                white-space: nowrap;
                rotate: -90deg;
            }
            &-list {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                :nth-child(3n + 1) {
                    rotate: -7deg;
                }
                :nth-child(3n + 2) {
                    rotate: 5deg;
                }
                :nth-child(3n + 3) {
                    rotate: -2deg;
                }
            }
            &-item {
                position: relative;
                z-index: 7;
                max-width: lineScale(150, 96, 480, 1440);
                aspect-ratio: 1;
                scale: 1.2;
                transition: translate $td $tf-spring;
                @media (pointer: fine) {
                    &:hover {
                        translate: -15% 0;
                    }
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    user-select: none;
                }
            }
        }
    }
}

@media (max-width: 1024px) {
    .home {
        &__body {
            display: flex;
            flex-direction: column-reverse;
        }
    }
}
</style>

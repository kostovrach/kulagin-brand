<template>
    <section class="services">
        <div class="services__container">
            <h1 class="services__title fade-bottom-rotate">Развиваю ваш личный&nbsp;бренд.</h1>
            <Swiper
                v-if="!servicesLoading"
                class="services__slider fade-bottom"
                style="animation-delay: 0.4s"
                :modules="modules"
                :slides-per-view="1"
                :breakpoints="{
                    1024: {
                        slidesPerView: 3,
                    },
                }"
                :space-between="96"
                loop
                centered-slides
                :speed="800"
                :navigation="{
                    nextEl: '.services__button--next',
                    prevEl: '.services__button--prev',
                }"
                wrapper-class="services__slider-wrapper"
            >
                <SwiperSlide class="services__slide" v-for="card in services" :key="card.key">
                    <div class="services__slide-wrapper">
                        <div class="services__slide-header">
                            <h2 class="services__slide-title">{{ card.title }}</h2>
                            <p class="services__slide-desc" v-if="card.description">{{ card.description }}</p>
                        </div>
                        <picture class="services__slide-media services__slide-media--image" v-if="card.image">
                            <img class="services__slide-image" :src="card.image" :alt="card.title" />
                        </picture>
                        <video
                            class="services__slide-media services__slide-media--video"
                            v-else-if="card.video"
                            autoplay
                            muted
                            loop
                            playsinline
                        >
                            <source :src="card.video.src" :type="card.video.type || 'video/mp4'" />
                        </video>
                        <div class="services__slide-footer">
                            <ul class="services__slide-list">
                                <li
                                    class="services__slide-list-value services__slide-list-value--crossed"
                                    v-if="card.price && typeof card.price === 'number'"
                                >
                                    {{
                                        typeof card.price === 'number'
                                            ? ((card.price / 100) * 160).toLocaleString('ru-RU')
                                            : ''
                                    }}
                                    &#8381;
                                </li>
                                <li class="services__slide-list-value" v-if="card.price">
                                    {{
                                        typeof card.price === 'number' ? card.price.toLocaleString('ru-RU') : card.price
                                    }}
                                    &#8381;
                                </li>
                            </ul>
                        </div>
                        <div class="services__slide-button">
                            <ButtonPrimary type="router-link" to="/contact" variant="red" logic="double-line"
                                >Обсудить детали</ButtonPrimary
                            >
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div class="services__controls">
                <button class="services__button services__button--prev">
                    <TheSvgSprite type="arrow" :size="32" />
                </button>
                <button class="services__button services__button--next">
                    <TheSvgSprite type="arrow" :size="32" />
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import TheSvgSprite from '@/components/TheSvgSprite.vue';
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary.vue';
// import Skeleton from 'primevue/skeleton';

const modules = [Navigation];

const SERVICES_URL = import.meta.env.VITE_SERVICES_URL;

const services = ref([]);
const servicesLoading = ref(false);

async function fetchServices() {
    servicesLoading.value = true;

    try {
        const response = await fetch(SERVICES_URL);

        if (!response.ok) throw new Error(response.status);

        services.value = await response.json();
    } catch (err) {
        console.error('Ошибка загрузки списка услуг', err);
    } finally {
        servicesLoading.value = false;
    }
}

onMounted(() => {
    fetchServices();
});
</script>

<style lang="scss">
@use '@/assets/abstracts' as *;

.services {
    $p: &;

    @include horizontal-layout;
    &__container {
        display: flex;
        flex-direction: column;
        gap: rem(28);
        min-width: calc(100vw - $px * 2);
    }
    &__title {
        @include block-title;
    }
    &__slider {
        height: 100%;
        max-width: calc(100vw - ($px * 2));
        padding: rem(32);
        &-wrapper {
            align-items: center;
        }
    }
    &__slide {
        position: relative;
        height: 80%;
        max-height: rem(285);
        color: $c-main;
        transition: scale $td $tf;
        &.swiper-slide-active {
            @media (min-width: 1024px) {
                scale: 1.2;
            }
            #{$p}__slide-media::before {
                opacity: 0;
            }
            #{$p}__slide-button {
                opacity: 1;
                scale: 0.9;
            }
        }
        &-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: rem(64);
            padding: rem(24);
        }
        &-media {
            position: absolute;
            z-index: -1;
            inset: 0;
            pointer-events: none;
            &::before {
                content: '';
                position: absolute;
                inset: 0;
                pointer-events: none;
                backdrop-filter: blur(10px) saturate(0);
                background-image: url('img/patterns/noise.png');
                transition: opacity $td $tf;
            }
            &--image {
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            &--video {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &-title {
            max-width: 15ch;
            text-transform: uppercase;
            font-family: 'Fira-Extra', sans-serif;
            font-size: lineScale(40, 24, 480, 1440);
            font-weight: $fw-med;
            text-shadow: 1px 1px 5px $c-111111;
        }
        &-desc {
            font-family: 'Inter', sans-serif;
            font-size: rem(14);
            left: 1.25;
        }
        &-list {
            font-family: 'Fira-Extra', sans-serif;
            font-weight: $fw-med;
            font-size: lineScale(32, 24, 480, 1440);
            &-value {
                &--crossed {
                    text-decoration: line-through;
                    font-size: lineScale(18, 14, 480, 1440);
                    opacity: 0.8;
                }
            }
        }
        &-button {
            position: absolute;
            z-index: 5;
            right: 0;
            bottom: 0;
            translate: 20% 20%;
            opacity: 0;
            scale: 0.7;
            transition:
                scale $td $tf-spring,
                opacity $td $tf;
        }
    }
    &__controls {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: rem(32);
    }
    &__button {
        cursor: pointer;
        &--prev {
            transform: scaleX(-1);
        }
    }
}

@media (max-width: 1024px) {
    .services {
        &__slider {
            max-width: rem(640);
        }
    }
}
@media (max-width: 768px) {
    .services {
        &__slider {
            max-width: 100%;
        }
    }
}
</style>

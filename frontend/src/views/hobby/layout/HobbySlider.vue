<template>
    <section class="hobby">
        <div class="hobby__container">
            <div class="hobby__titlebox">
                <h1 class="hobby__title fade-bottom-rotate">{{ props.content?.title }}</h1>
            </div>

            <Swiper
                v-if="props.content?.hobby_item?.length"
                class="hobby__slider fade-bottom"
                :modules="modules"
                :slides-per-view="1"
                :breakpoints="{ 1100: { slidesPerView: 3 } }"
                :space-between="96"
                :mousewheel="true"
                loop
                centered-slides
                :speed="800"
                :navigation="{ nextEl: '.hobby__button--next', prevEl: '.hobby__button--prev' }"
                wrapper-class="hobby__slider-wrapper"
            >
                <SwiperSlide class="hobby__slide" v-for="(slide, index) in props.content.hobby_item" :key="slide.id">
                    <div class="hobby__slide-wrapper">
                        <h2 class="hobby__slide-title">{{ slide.hobby_item_id?.title }}</h2>
                        <picture
                            v-if="isImage(slide.hobby_item_id?.media)"
                            class="hobby__slide-image-container"
                            :style="{ '--mask': `url('${masks[index % masks.length]}')` }"
                        >
                            <img
                                class="hobby__slide-image"
                                :src="slide.hobby_item_id?.media_url"
                                :alt="slide.hobby_item_id?.title"
                            />
                        </picture>
                        <div
                            v-else-if="isVideo(slide.hobby_item_id?.media)"
                            class="hobby__slide-video-container"
                            :style="{ '--mask': `url('${masks[index % masks.length]}')` }"
                        >
                            <video class="hobby__slide-video" muted autoplay loop playsinline>
                                <source
                                    :src="slide.hobby_item_id?.media_url"
                                    :type="getFileType(slide.hobby_item_id?.media)"
                                />
                            </video>
                        </div>

                        <p class="hobby__slide-desc">{{ slide.hobby_item_id?.description }}</p>
                    </div>
                </SwiperSlide>
            </Swiper>

            <div class="hobby__controls">
                <button class="hobby__button hobby__button--prev">
                    <TheSvgSprite type="arrow" :size="32" />
                </button>
                <button class="hobby__button hobby__button--next">
                    <TheSvgSprite type="arrow" :size="32" />
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { Navigation } from 'swiper/modules';
import { Mousewheel } from 'swiper/modules';

import TheSvgSprite from '@/components/TheSvgSprite.vue';
import { fetchFilesMetaBulk } from '@/services/directus';

import 'swiper/css';
import 'swiper/css/navigation';

const modules = [Navigation, Mousewheel];

const masks = ['/img/masks/guitar.svg', '/img/masks/helmet.svg'];

// content management
const props = defineProps({
    content: { type: Object, default: () => ({}) },
});

const fileMetas = ref({});
const metasLoading = ref(false);

watch(
    () => props.content,
    async (newContent, oldContent, onInvalidate) => {
        fileMetas.value = {};
        metasLoading.value = false;

        if (!newContent?.hobby_item?.length) return;

        const ids = Array.from(new Set(newContent.hobby_item.map((i) => i?.hobby_item_id?.media).filter(Boolean)));

        if (!ids.length) return;

        metasLoading.value = true;
        let cancelled = false;
        onInvalidate(() => {
            cancelled = true;
        });

        try {
            const metas = await fetchFilesMetaBulk(ids, ['id', 'type']);
            if (cancelled) return;
            fileMetas.value = Object.fromEntries((metas || []).map((m) => [m.id, m]));
        } catch (err) {
            console.error('fetchFilesMetaBulk failed', err);
            if (!cancelled) fileMetas.value = {};
        } finally {
            if (!cancelled) metasLoading.value = false;
        }
    },
    { immediate: true, deep: false },
);

// helpers
function getFileType(id) {
    if (!id) return null;
    return fileMetas.value[id]?.type || null;
}
function isImage(id) {
    return getFileType(id)?.startsWith('image/');
}
function isVideo(id) {
    return getFileType(id)?.startsWith('video/');
}
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.hobby {
    $p: &;

    @include horizontal-layout;
    &__container {
        position: relative;
    }
    &__titlebox {
        position: absolute;
        top: 0;
        left: 0;
    }
    &__title {
        @include block-title;
    }
    &__slider {
        height: 100%;
        max-width: calc(100vw - ($px * 2));
        @include horizontal-max-height;
        &-wrapper {
            align-items: center;
        }
    }
    &__slide {
        position: relative;
        height: 100%;
        will-change: scale;
        transition: scale $td $tf;
        user-select: none;
        &:not(.swiper-slide-active) {
            scale: 0.5;
            #{$p}__slide-title,
            #{$p}__slide-desc {
                opacity: 0;
                translate: -50% 0;
            }
        }
        &-wrapper {
            width: 100%;
            height: 100%;
        }
        &-image-container,
        &-video-container {
            width: 100%;
            height: 100%;
            mask-image: var(--mask);
            mask-size: 100% 100%;
            mask-repeat: no-repeat;
            user-select: none;
        }
        &-image,
        &-video {
            width: 100%;
            height: 100%;
            min-height: rem(480);
            aspect-ratio: 2/1; // <-----
            object-fit: cover;
        }
        &-title {
            min-width: 25ch;
            position: absolute;
            top: 20%;
            left: 90%;
            text-transform: uppercase;
            font-size: lineScale(22, 18, 480, 1440);
            line-height: 1.2;
            font-weight: $fw-med;
            will-change: opacity;
            transition:
                opacity $td $tf,
                translate $td $tf;
        }
        &-desc {
            min-width: 45ch;
            position: absolute;
            bottom: 10%;
            left: 100%;
            text-transform: uppercase;
            font-size: rem(16);
            line-height: 1.4;
            font-weight: $fw-med;
            will-change: opacity;
            transition:
                opacity $td $tf,
                translate $td $tf;
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

@media (max-width: 1100px) {
    .hobby {
        &__container {
            display: flex;
            flex-direction: column;
            gap: rem(64);
        }
        &__titlebox {
            position: initial;
        }
        &__slider {
            height: fit-content;
            &-wrapper {
                height: fit-content;
            }
        }
        &__slide {
            &-wrapper {
                display: grid;
                grid-template-areas:
                    'image title'
                    'image . '
                    'image desc';
            }
            &-image-container {
                grid-area: image;
                width: rem(320);
                height: rem(480);
            }
            &-title,
            &-desc {
                position: static;
                min-width: initial;
            }
            &-title {
                grid-area: title;
            }
            &-desc {
                grid-area: desc;
            }
        }
    }
}

@media (max-width: 560px) {
    .hobby {
        &__slide {
            &-wrapper {
                display: flex;
                flex-direction: column;
                gap: rem(24);
            }
            &-image-container {
                align-self: center;
            }
        }
    }
}
</style>

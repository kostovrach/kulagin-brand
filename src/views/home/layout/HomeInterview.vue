<template>
    <section class="interviews">
        <div class="interviews__container">
            <div class="interviews__titlebox">
                <h2 class="interviews__title">Интервью</h2>
                <img class="interviews__arrow" src="/img/arrow-italic.svg" alt="↓" />
            </div>
            <div class="interviews__body">
                <ScrollBox>
                    <ul class="interviews__list">
                        <li v-for="(item, index) in interviews" :key="index" class="interviews__item">
                            <picture class="interviews__item-image-container">
                                <img class="interviews__item-image" :src="item.image" :alt="item.title" />
                            </picture>
                            <div class="interviews__item-content">
                                <h3 class="interviews__item-title">{{ item.title }}</h3>
                                <a
                                    class="interviews__item-button"
                                    :href="item.link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="interviews__item-button-text">Смотреть</span>
                                    <span class="interviews__item-button-icon">
                                        <TheSvgSprite type="arrow" :size="12" />
                                    </span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </ScrollBox>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import TheSvgSprite from '@/components/TheSvgSprite.vue';
import ScrollBox from '../components/ScrollBox.vue';

const INTERVIEWS_URL = import.meta.env.VITE_INTERVIEWS_URL;

const interviews = ref([]);
const isLoading = ref(false);
const error = ref(false);

async function fetchInterviews() {
    isLoading.value = true;

    try {
        const response = await fetch(INTERVIEWS_URL);

        if (!response.ok) {
            error.value = true;
        }

        interviews.value = await response.json();
    } catch (err) {
        console.error(err);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    fetchInterviews();
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.interviews {
    @include horizontal-layout;
    &__container {
        display: flex;
        flex-direction: column;
        gap: rem(64);
    }
    &__titlebox {
        display: flex;
        align-items: flex-end;
        gap: rem(32);
    }
    &__title {
        @include block-title;
    }
    &__arrow {
        transform: scaleY(-1) rotate(-75deg) translate(30%, -30%);
        user-select: none;
    }
    &__body {
        margin-left: rem(164);
        @include horizontal-max-height;
        @include hide-scrollbar;
    }
    &__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: rem(32) rem(128);
    }
    &__item {
        display: flex;
        align-items: center;
        gap: rem(16);
        &-image-container {
            width: rem(80);
            aspect-ratio: 1;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        &-content {
            display: flex;
            flex-direction: column;
            gap: rem(8);
        }
        &-title {
            text-transform: uppercase;
            font-family: 'Fira-Extra', sans-serif;
            font-size: lineScale(22, 18, 480, 1440);
            font-weight: $fw-bold;
        }
        &-button {
            display: flex;
            align-items: center;
            gap: rem(8);
            text-transform: uppercase;
            font-family: 'Fira-Extra', sans-serif;
            font-size: rem(14);
            font-weight: $fw-semi;
            color: $c-9E9595;
            @include hover-underline;
        }
    }
}
</style>

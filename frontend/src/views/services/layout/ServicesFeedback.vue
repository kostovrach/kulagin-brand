<template>
    <section class="feedback">
        <div class="feedback__container">
            <h2 class="feedback__title">Вместе приходим к&nbsp;успеху.</h2>
            <ul class="feedback__list">
                <template v-if="feedbackLoading">
                    <li class="feedback__list-loader" v-for="loader in 10" :key="loader">
                        <Skeleton
                            v-for="n in 3"
                            :key="n"
                            height="100%"
                            borderRadius="1rem"
                            :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                        />
                    </li>
                </template>
                <template v-else>
                    <li class="feedback__item" v-for="(item, index) in feedbackList" :key="index">
                        <span class="feedback__item-tag">{{ item.company }}</span>
                        <h3 class="feedback__item-title">{{ item.name }}</h3>
                        <p class="feedback__item-text">{{ item.text }}</p>
                    </li>
                </template>
            </ul>
            <Sticker
                class="feedback__sticker"
                v-draggable="{ left: 50, top: 15 }"
                style="rotate: 15deg"
                variant="red"
                textAccent="250+"
                textMain="компаний по всему миру"
            />
            <Sticker
                class="feedback__sticker"
                v-draggable="{ left: 20, top: 90 }"
                style="rotate: -15deg"
                variant="black"
                textAccent="65+"
                textMain="российских компаний"
            />
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Skeleton from 'primevue/skeleton';
import Sticker from '@/components/Sticker/Sticker.vue';

const FEEDBACK_URL = import.meta.env.VITE_FEEDBACK_URL;

const feedbackList = ref([]);
const feedbackLoading = ref(false);

async function fetchFeedback() {
    feedbackLoading.value = true;
    try {
        const response = await fetch(FEEDBACK_URL);

        if (!response.ok) throw new Error(response.status);

        feedbackList.value = await response.json();
    } catch (err) {
        console.error('Ошибка загрузки отзывов:', err);
    } finally {
        feedbackLoading.value = false;
    }
}

onMounted(() => {
    fetchFeedback();
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.feedback {
    @include horizontal-layout;
    &__container {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: rem(24);
    }
    &__title {
        @include block-title;
    }
    &__list {
        height: 100%;
        display: grid;
        grid-auto-flow: column dense;
        grid-template-rows: repeat(2, 1fr);
        gap: rem(24);
        margin-left: lineScale(196, 0, 768, 1440);
        &-loader {
            width: rem(320);
            display: flex;
            flex-direction: column;
            gap: rem(24);
            :nth-child(3n + 1) {
                max-height: rem(48);
            }
            :nth-child(3n + 2) {
                max-height: rem(16);
            }
            :nth-child(3n + 3) {
                max-height: rem(16);
            }
        }
    }
    &__item {
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        padding: rem(24);
        border-left: rem(2) dotted $c-111111;
        max-width: rem(320);
        &-tag {
            font-size: rem(14);
            font-weight: $fw-med;
            line-height: 1.4;
            opacity: 0.8;
        }
        &-title {
            text-transform: uppercase;
            font-family: 'Fira-Extra', sans-serif;
            font-size: lineScale(22, 18, 480, 1440);
            font-weight: $fw-bold;
            margin-top: rem(4);
        }
        &-text {
            font-size: rem(14);
            font-weight: $fw-med;
            line-height: 1.5;
            margin-top: rem(16);
            opacity: 0.8;
            @include lineClamp(7);
        }
    }
}

@media (max-width: 768px) {
    .feedback {
        &__sticker {
            display: none;
        }
        &__list {
            overflow-x: auto;
        }
        &__item {
            width: rem(240);
        }
    }
}
</style>

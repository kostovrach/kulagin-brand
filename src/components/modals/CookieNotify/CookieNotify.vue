<template>
    <dialog class="cookie-notify" ref="dialog">
        <div class="cookie-notify__container">
            <button class="cookie-notify__button" aria-label="Закрыть" @click="closeDialog">
                <TheSvgSprite type="cross" :size="20" />
            </button>

            <div class="cookie-notify__header">
                <div class="cookie-notify__icon">
                    <TheSvgSprite type="cookie" :size="18" />
                </div>
                <h3 class="cookie-notify__title">Сайт сохраняет файлы cookie</h3>
            </div>
            <p class="cookie-notify__text">
                Они необходимы для быстрой и&nbsp;удобной работы сайта. Используя сайт, вы&nbsp;принимаете условия
                <button @click="openPrivacy">обработки персональных данных</button>
            </p>
        </div>
    </dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useModal } from '@/composables/useModal';

import TheSvgSprite from '@/components/TheSvgSprite.vue';

const { openModal } = useModal();

function openPrivacy() {
    openModal('privacy');
}

const dialog = ref(null);

const openDialog = () => {
    dialog.value?.show();
};
const closeDialog = () => {
    dialog.value?.close();
    localStorage.setItem('cookie', 'accepted');
};

function cookie() {
    if (!localStorage.getItem('cookie')) {
        openDialog();
    } else return;
}

onMounted(() => {
    cookie();
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.cookie-notify {
    position: fixed;
    z-index: 10;
    top: auto;
    left: auto;
    bottom: rem(32);
    right: rem(32);
    width: 100%;
    max-width: rem(440);
    border-radius: rem(4);
    background-color: $c-main;
    box-shadow: 1px 1px 5px rgba($c-111111, 0.3);
    &__container {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: rem(16);
        font-family: 'Inter', sans-serif;
        padding: rem(24);
    }
    &__button {
        cursor: pointer;
        position: absolute;
        top: rem(10);
        right: rem(10);
        width: fit-content;
        height: fit-content;
        > svg {
            will-change: rotate;
            transition: rotate $td $tf-spring;
        }
        @media (pointer: fine) {
            &:hover svg {
                rotate: 90deg;
            }
        }
    }
    &__header {
        display: flex;
        align-items: center;
        gap: rem(8);
    }
    &__title {
        font-size: lineScale(16, 14, 480, 1440);
        font-weight: $fw-med;
    }
    &__text {
        font-size: lineScale(14, 12, 480, 1440);
        line-height: 1.4;
        opacity: 0.8;
        > button,
        a {
            cursor: pointer;
            color: $c-accent;
            text-decoration: underline;
            @media (pointer: fine) {
                &:hover {
                    text-decoration: none;
                }
            }
        }
    }
}
</style>

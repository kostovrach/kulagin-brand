<template>
    <transition name="slide-up">
        <div class="modal-video">
            <div class="modal-video__header">
                <h2 class="modal-video__title">{{ payload.title }}</h2>
                <button class="modal-video__button" aria-label="Закрыть" @click="close">
                    <TheSvgSprite type="cross" :size="32" />
                </button>
            </div>
            <div class="modal-video__body">
                <video class="modal-video__video" v-if="payload.url" controls playsinline>
                    <source :src="payload.url" type="video/mp4" />
                </video>
                <p class="modal-video__error" v-else>Кажется видео потерялось 🔍</p>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { useModal } from '@/composables/useModal';
import TheSvgSprite from '../TheSvgSprite.vue';

const props = defineProps({
    payload: { type: Object, default: () => ({}) },
    modalId: { type: Number, required: true },
});

const { closeModal } = useModal();

function close() {
    closeModal(props.modalId);
}
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.modal-video {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: 100%;
    max-width: rem(512);
    background-color: $c-main;
    animation: translateIn $td $tf-spring;
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // display: grid;
        // grid-template-columns: auto 10%;
        border-bottom: rem(1) solid $c-111111;
    }
    &__title {
        text-transform: uppercase;
        font-family: 'Fira-Extra', sans-serif;
        font-size: rem(18);
        font-weight: $fw-med;
        line-height: 1;
        padding: rem(12) rem(24);
    }
    &__button {
        cursor: pointer;
        width: fit-content;
        border-left: rem(1) solid $c-111111;
        padding: rem(8);
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
    &__body {
        padding: rem(24);
    }
    &__video {
        width: 100%;
        min-height: rem(730);
        max-height: 80lvh;
        object-fit: cover;
    }
    &__error {
        font-size: lineScale(24, 18, 480, 1440);
        line-height: 1.5;
        text-align: center;
        padding: rem(64) rem(32);
    }
    @keyframes translateIn {
        from {
            transform: translate(0, 100%);
        }
        to {
            transform: translate(0, 0);
        }
    }
}

// .slide-up-enter-active,
// .slide-up-leave-active {
//     transition: all $td $tf;
// }

// .slide-up-enter-from,
// .slide-up-leave-to {
//     translate: 0 100%;
//     opacity: 0;
// }
</style>

<template>
    <div class="menu-modal">
        <div class="menu-modal__container">
            <button class="menu-modal__button" @click="close" aria-label="Закрыть">
                <TheSvgSprite type="cross" :size="32" />
            </button>
            <nav class="menu-modal__nav">
                <router-link
                    :class="['menu-modal__link', { current: currentRoute == 'billboard' }]"
                    to="/billboard"
                    @click="close"
                    >Kulagin brand</router-link
                >
                <router-link :class="['menu-modal__link', { current: currentRoute == 'home' }]" to="/" @click="close"
                    >Обо мне</router-link
                >
                <router-link
                    :class="['menu-modal__link', { current: currentRoute == 'services' }]"
                    to="/services"
                    @click="close"
                    >Услуги</router-link
                >
                <router-link
                    :class="['menu-modal__link', { current: currentRoute == 'projects' }]"
                    to="/projects"
                    @click="close"
                    >Все проекты</router-link
                >
                <router-link
                    :class="['menu-modal__link', { current: currentRoute == 'hobby' }]"
                    to="/hobby"
                    @click="close"
                    >Хобби</router-link
                >
                <router-link
                    :class="['menu-modal__link', { current: currentRoute == 'marketers' }]"
                    to="/marketers"
                    @click="close"
                    >Маркетологам</router-link
                >
                <router-link
                    :class="['menu-modal__link', { current: currentRoute == 'blog' }]"
                    to="/blog"
                    @click="close"
                    >Блог</router-link
                >
                <router-link
                    :class="['menu-modal__link', { current: currentRoute == 'contact' }]"
                    to="/contact"
                    @click="close"
                    >Контакты</router-link
                >
            </nav>
            <div class="menu-modal__footer">
                <div class="menu-modal__socials">
                    <a
                        class="menu-modal__socials-item"
                        style="--mask: url(/img/icons/vk.svg)"
                        :href="page?.vk?.link"
                        target="_blank"
                        rel="noopener noreferrer"
                    ></a>
                    <a
                        class="menu-modal__socials-item"
                        style="--mask: url(/img/icons/tg.svg)"
                        :href="page?.telegram?.link"
                        target="_blank"
                        rel="noopener noreferrer"
                    ></a>
                    <a
                        class="menu-modal__socials-item"
                        style="--mask: url(/img/icons/ok.svg)"
                        :href="page?.ok?.link"
                        target="_blank"
                        rel="noopener noreferrer"
                    ></a>
                    <a
                        class="menu-modal__socials-item"
                        style="--mask: url(/img/icons/instagram.svg)"
                        :href="page?.instagram?.link"
                        target="_blank"
                        rel="noopener noreferrer"
                    ></a>
                </div>
                <div class="menu-modal__links">
                    <button class="menu-modal__links-item" @click="openPolicy('privacy')">Конфиденциальность</button>
                    <button class="menu-modal__links-item" @click="openPolicy('offer')">Оферта</button>
                    <button class="menu-modal__links-item" @click="openPolicy('agreement')">
                        Пользовательское соглашение
                    </button>
                </div>
                <div class="menu-modal__label">
                    <p class="menu-modal__label-text">Сайт разработали:</p>
                    <a
                        class="menu-modal__label-link"
                        href="https://kulaginbrand.ru"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        kulaginbrand.ru
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useModal } from '@/composables/useModal';

import TheSvgSprite from '@/components/TheSvgSprite.vue';

// content management
import { usePage } from '@/composables/usePage';

const { page } = usePage('socials', ['vk.*', 'instagram.*', 'telegram.*', 'ok.*'], {
    resolveFiles: true,
});
//

const props = defineProps({
    modalId: { type: Number, required: true },
});

const { closeModal, openModal } = useModal();
const route = useRoute();

const currentRoute = computed(() => route.name);

function openPolicy(name) {
    openModal(name);
}

function close() {
    closeModal(props.modalId);
}
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.menu-modal {
    position: fixed;
    z-index: 10;
    top: 0;
    right: 0;
    width: 100%;
    max-width: rem(360);
    height: 100vh;
    color: $c-main;
    background-color: $c-111111;
    padding: rem(16) rem(16) rem(64);
    animation: translateIn $td $tf;

    @keyframes translateIn {
        from {
            transform: translate(100%, 0);
        }
        to {
            transform: translate(0, 0);
        }
    }
    &__container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    &__button {
        align-self: flex-end;
        cursor: pointer;
        width: fit-content;
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
    &__nav {
        flex: 1 1 100%;
        display: flex;
        flex-direction: column;
        gap: rem(16);
        overflow-y: auto;
        overflow-x: hidden;
        padding: rem(32) 0;
        mask-image: linear-gradient(to bottom, $c-111111 70%, transparent 100%);
    }
    &__link {
        text-transform: uppercase;
        font-family: 'Fira-Extra', sans-serif;
        font-size: rem(48);
        font-weight: $fw-med;
        &.current {
            pointer-events: none;
            opacity: 0.5;
        }
    }
    &__footer {
        display: flex;
        flex-direction: column;
        gap: rem(24);
    }
    &__socials {
        display: flex;
        align-items: center;
        gap: rem(16);
        &-item {
            width: rem(28);
            aspect-ratio: 1;
            background-color: $c-9E9595;
            mask-image: var(--mask);
            mask-size: cover;
            mask-repeat: no-repeat;
            pointer-events: auto;
            will-change: rotate;
            @media (pointer: fine) {
                &:hover {
                    background-color: $c-main;
                    translate: 0 -5%;
                    &:nth-of-type(4n + 1) {
                        rotate: -6deg;
                    }
                    &:nth-of-type(4n + 2) {
                        rotate: -9deg;
                    }
                    &:nth-of-type(4n + 3) {
                        rotate: -5deg;
                    }
                    &:nth-of-type(4n + 4) {
                        rotate: -13deg;
                    }
                }
            }
        }
    }
    &__links {
        display: flex;
        flex-wrap: wrap;
        gap: rem(16);
        &-item {
            cursor: pointer;
            text-transform: uppercase;
            font-family: 'Inter', sans-serif;
            font-size: rem(12);
            @include gradient-text-hover($main-color: $c-main);
        }
    }
    &__label {
        display: flex;
        align-items: center;
        gap: rem(8);
        text-transform: uppercase;
        &-text {
            color: $c-main;
            font-family: 'Inter', sans-serif;
            font-weight: $fw-med;
            font-size: rem(12);
            opacity: 0.5;
        }
        &-link {
            pointer-events: auto;
            font-size: rem(14);
            font-weight: $fw-semi;
            @include gradient-text-hover($main-color: $c-FFFFFF, $accent-color: $c-0FD2D3);
        }
    }
}
</style>

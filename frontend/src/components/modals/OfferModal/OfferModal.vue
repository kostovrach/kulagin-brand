<template>
    <div class="privacy-modal">
        <article class="privacy-modal__container">
            <header>
                <h1 v-if="page?.title">{{ page?.title }}</h1>
                <p v-if="page?.date_updated">Последнее обновление: {{ formatDate(page?.date_updated) }}</p>
                <button @click="close"><TheSvgSprite type="cross" :size="32" /></button>
            </header>

            <div v-if="loading">
                <div class="privacy-modal__loader" v-for="n in 6" :key="n">
                    <Skeleton
                        width="30%"
                        borderRadius="1rem"
                        :dt="{ root: { background: '#d6d6d66e', animationBackground: '#f7f9f7' } }"
                    />
                    <Skeleton
                        width="100%"
                        borderRadius="1rem"
                        :dt="{ root: { background: '#d6d6d66e', animationBackground: '#f7f9f7' } }"
                    />
                    <Skeleton
                        width="100%"
                        borderRadius="1rem"
                        :dt="{ root: { background: '#d6d6d66e', animationBackground: '#f7f9f7' } }"
                    />
                </div>
            </div>

            <div v-else-if="error">
                <p>Ошибка загрузки: {{ error }}</p>
            </div>

            <div class="privacy-modal__content" v-html="page?.content"></div>
        </article>
    </div>
</template>

<script setup>
import { formatDate } from '@/utils/date';
import { useModal } from '@/composables/useModal';

import TheSvgSprite from '@/components/TheSvgSprite.vue';
import Skeleton from 'primevue/skeleton';

// content management
import { usePage } from '@/composables/usePage';

const { page, loading, error } = usePage('offer', [], {
    resolveFiles: true,
});
//

const props = defineProps({
    modalId: { type: Number, required: true },
});

const { closeModal } = useModal();

function close() {
    closeModal(props.modalId);
}
</script>

<style lang="scss">
@use '@/assets/abstracts' as *;

.privacy-modal {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-width: rem(754);
    height: 100lvh;
    overflow-y: auto;
    color: $c-main;
    background-color: $c-111111;
    padding: rem(32) rem(32) rem(128) rem(32);
    animation: translateIn $td $tf;

    @keyframes translateIn {
        from {
            transform: translate(100%, 0);
        }
        to {
            transform: translate(0, 0);
        }
    }
    &__loader {
        display: flex;
        flex-direction: column;
        gap: rem(16);
        margin-bottom: rem(48);
        opacity: 0.3;
    }
    &__container {
        display: flex;
        flex-direction: column;
        gap: lineScale(40, 24, 480, 1440);
        header {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: rem(32);
            h1 {
                max-width: 90%;
                text-transform: uppercase;
                font-family: 'Fira-Extra', sans-serif;
                font-size: lineScale(64, 24, 480, 1440);
                font-weight: $fw-bold;
            }
            p {
                font-family: 'Inter', sans-serif;
                color: $c-accent;
            }
            button {
                cursor: pointer;
                position: absolute;
                top: 0;
                right: 0;
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
        }
    }
    &__content {
        h2 {
            text-transform: uppercase;
            font-size: lineScale(32, 18, 480, 1440);
            font-weight: $fw-bold;
            margin: rem(32) 0 rem(8);
        }
        h3,
        h4,
        h5,
        h6 {
            font-family: 'Inter', sans-serif;
            font-size: rem(16);
            font-weight: $fw-bold;
            margin: rem(24) 0 rem(8);
        }

        p {
            font-family: 'Inter', sans-serif;
            font-size: rem(14);
            line-height: 1.4;
            font-weight: $fw-med;
            color: $c-9E9595;
            margin: rem(16) 0 rem(8);
            > a {
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
}
</style>

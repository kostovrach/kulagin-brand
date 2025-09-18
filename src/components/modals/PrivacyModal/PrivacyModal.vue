<template>
    <div class="privacy-modal">
        <article class="privacy-policy">
            <header v-if="data">
                <h1>Политика<br />конфиденциальности</h1>
                <p v-if="data.date">Последнее обновление: {{ formatDate(data.date) }}</p>
                <button @click="close"><TheSvgSprite type="cross" :size="32" /></button>
            </header>

            <div v-if="loading">
                <p>Загрузка...</p>
            </div>

            <div v-else-if="error">
                <p>{{ error }}</p>
            </div>

            <div v-else>
                <PolicyItem
                    v-for="(item, index) in data.points"
                    :key="index"
                    :item="item"
                    :prefix="String(index + 1)"
                    :level="2"
                />
            </div>
        </article>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { formatDate } from '@/utils/date';
import { useModal } from '@/composables/useModal';

import PolicyItem from './components/PrivacyItem.vue';
import TheSvgSprite from '@/components/TheSvgSprite.vue';

const props = defineProps({
    modalId: { type: Number, required: true },
});

const { closeModal } = useModal();

function close() {
    closeModal(props.modalId);
}

const url = import.meta.env.VITE_PRIVACY_URL;

const data = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка загрузки JSON');
        data.value = await response.json();
    } catch (e) {
        error.value = e.message;
    } finally {
        loading.value = false;
    }
});
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
}

.privacy-policy {
    display: flex;
    flex-direction: column;
    gap: rem(64);
    header {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: rem(32);
        h1 {
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

    section {
        h2 {
            text-transform: uppercase;
            font-size: lineScale(32, 18, 480, 1440);
            font-weight: $fw-bold;
            margin: rem(64) 0 rem(8);
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
        }
    }
}
</style>

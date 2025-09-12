<template>
    <section class="form-primary">
        <div class="form-primary__container">
            <h2 class="form-primary__title"><slot name="title"></slot></h2>
            <div class="form-primary__body">
                <div class="form-primary__subtitle">
                    <picture class="form-primary__subtitle-image-container">
                        <img class="form-primary__subtitle-image" :src="props.image" alt="#" />
                    </picture>
                    <p class="form-primary__subtitle-text"><slot name="description"></slot></p>
                </div>
                <form class="form-primary__form" @submit.prevent="submitForm">
                    <div class="form-primary__inputbox">
                        <input
                            id="name"
                            v-model="form.name"
                            type="text"
                            placeholder="Иван Иванович"
                            autocomplete="name"
                        />
                        <label for="name">Ваше имя</label>
                        <span class="form-primary__error">{{ errors.name }}</span>
                    </div>
                    <div class="form-primary__inputbox">
                        <InputMask
                            id="tel"
                            v-model="form.tel"
                            mask="+9 (999) 999-99-99"
                            placeholder="+_ (___) ___-__-__"
                            autocomplete="tel"
                        />
                        <label for="tel">Телефон</label>
                        <span class="form-primary__error">{{ errors.tel }}</span>
                    </div>
                    <div class="form-primary__inputbox">
                        <input
                            id="email"
                            v-model="form.email"
                            type="email"
                            placeholder="example@yandex.ru"
                            autocomplete="email"
                        />
                        <label for="email">Электронная почта</label>
                        <span class="form-primary__error">{{ errors.email }}</span>
                    </div>
                    <button class="form-primary__button" type="submit" :disabled="isSubmitting">
                        <span class="form-primary__button-text">{{ isSubmitting ? 'Отправка...' : 'Отправить' }}</span>
                        <span class="form-primary__button-icon"><TheSvgSprite type="arrow" /></span>
                    </button>
                    <span class="form-primary__error--general">{{ errors.general }}</span>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { reactive, ref } from 'vue';

import InputMask from 'primevue/inputmask';
import TheSvgSprite from '../TheSvgSprite.vue';

const props = defineProps({
    image: { type: String },
});

const form = reactive({
    name: '',
    tel: '',
    email: '',
});

const errors = reactive({
    name: '',
    email: '',
    message: '',
    general: '',
});

const isSubmitting = ref(false);

function validate() {
    let valid = true;

    errors.email = form.email ? (/\S+@\S+\.\S+/.test(form.email) ? '' : 'Неверный e-mail') : '';
    errors.general = !form.tel && !form.email ? 'Заполните хотя бы одно из полей контактной информации' : '';

    if (errors.email || errors.general) valid = false;

    return valid;
}

async function submitForm() {
    if (!validate()) return;

    isSubmitting.value = true;

    const API_URL = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (!response.ok) throw new Error('Ошибка отправки данных');

        form.name = '';
        form.tel = '';
        form.email = '';
    } catch (e) {
        console.error(e);
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<style lang="scss">
@use '@/assets/abstracts' as *;

.form-primary {
    min-width: fit-content;
    color: inherit;
    background-color: inherit;
    &__container {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-content: space-between;
        @include horizontal-max-height;
    }
    &__title {
        grid-column: span 4;
        @include block-title($max-width: 20ch);
    }
    &__body {
        grid-column: 2 / span 3;
        grid-row: 2;
    }
    &__subtitle {
        display: flex;
        align-items: flex-start;
        gap: rem(16);
        &-image-container {
            max-width: rem(105);
            aspect-ratio: 1;
        }
        &-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &-text {
            max-width: 40ch;
            text-transform: uppercase;
            font-size: lineScale(32, 24, 480, 1440);
            font-weight: $fw-bold;
            line-height: 1.2;
            > a {
                color: $c-accent;
                @media (pointer: fine) {
                    &:hover {
                        opacity: 0.8;
                    }
                }
            }
        }
    }
    &__form {
        max-width: rem(480);
        display: flex;
        flex-direction: column;
        gap: rem(16);
        margin-top: rem(32);
    }
    &__inputbox {
        position: relative;
        width: 100%;
        height: rem(48);
        transition: opacity $td $tf;
        &::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: rem(2);
            background-color: currentColor;
            transition: width $td $tf;
        }
        @media (pointer: fine) {
            &:hover {
                &::before {
                    width: 100%;
                }
                input,
                label {
                    opacity: 0.5;
                }
            }
        }
        &:has(input:focus),
        &:has(input:not(:placeholder-shown)) {
            &::before {
                width: 100%;
            }
            input,
            label {
                opacity: 1;
            }
        }
        input,
        label {
            opacity: 0.25;
        }
        input {
            width: 100%;
            height: 100%;
            color: inherit;
            text-transform: uppercase;
            font-size: lineScale(24, 18, 480, 1440);
            font-weight: $fw-semi;
            background-color: transparent;
            &::placeholder {
                opacity: 0;
                transition: opacity $td $tf;
            }
            &:focus::placeholder,
            &:not(:placeholder-shown)::placeholder {
                opacity: 1;
            }
        }
        label {
            position: absolute;
            left: 0;
            top: 50%;
            translate: 0 -50%;
            text-transform: uppercase;
            color: $c-9E9595;
            font-size: lineScale(32, 24, 480, 1440);
            font-weight: $fw-semi;
            will-change: font-size, translate;
            pointer-events: none;
            transition: all $td $tf;
        }
        &:has(input:focus) label,
        &:has(input:not(:placeholder-shown)) label {
            font-size: rem(12);
            translate: 0 rem(-32);
        }
    }
    &__error {
        position: absolute;
        top: rem(0);
        right: 0;
        text-transform: uppercase;
        font-size: rem(12);
        white-space: nowrap;
        letter-spacing: rem(1);
        color: red;
        font-weight: $fw-semi;
        pointer-events: none;
        &--general {
            height: 1em;
            text-align: center;
            align-self: center;
            text-transform: uppercase;
            font-size: rem(12);
            white-space: nowrap;
            letter-spacing: rem(1);
            color: red;
            font-weight: $fw-semi;
            pointer-events: none;
        }
    }
    &__button {
        @include button-secondary($padding: rem(14) rem(32), $border-color: $c-accent, $background: transparent);
    }
}
</style>

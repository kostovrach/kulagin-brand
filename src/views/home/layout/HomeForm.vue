<template>
    <section class="home-form">
        <div class="home-form__container">
            <h2 class="home-form__title">Ваш бренд не приносит прибыль?</h2>
            <div class="home-form__body">
                <div class="home-form__subtitle">
                    <picture class="home-form__subtitle-image-container">
                        <img class="home-form__subtitle-image" src="/img/content/temp.jpg" alt="#" />
                    </picture>
                    <p class="home-form__subtitle-text">
                        Заполните форму и я свяжусь с&nbsp;вами, чтобы обсудить вашу точку «А». Ещё можно
                        <a href="tel:">позвонить</a> или <a href="mailto:">написать</a>.
                    </p>
                </div>
                <form class="home-form__form" action="" method="post">
                    <div class="home-form__inputbox">
                        <input id="name" v-model="form.name" type="text" />
                        <label for="name">Ваше имя</label>
                    </div>
                    <div class="home-form__inputbox">
                        <InputMask id="tel" v-model="form.tel" mask="+9 (999) 999-99-99" />
                        <label for="tel">Телефон</label>
                    </div>
                    <div class="home-form__inputbox">
                        <input id="email" v-model="form.email" type="email"/>
                        <label for="email">Электронная почта</label>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { reactive, ref } from 'vue';

import InputMask from 'primevue/inputmask';
import FloatLabel from 'primevue/floatlabel';

const form = reactive({
    name: '',
    tel: '',
    email: '',
});

const isSubmitting = ref(false);
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.home-form {
    min-width: fit-content;
    color: $c-F3F2EE;
    background-color: $c-111111;
    &__container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: lineScale(128,32,480,1440);
        @include horizontal-layout;
    }
    &__title {
        grid-column: span 4;
        max-width: 20ch;
        text-transform: uppercase;
        font-family: 'Fira-Extra', sans-serif;
        font-size: lineScale(96,40,480,1440);
        font-weight: $fw-bold;
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
            font-size: lineScale(32,24,480,1440);
            font-weight: $fw-bold;
            line-height: 1.2;
            > a {
                color: $c-accent;
                @media (pointer: fine){
                    &:hover{
                        opacity: 0.8;
                    }
                }
            }
        }
    }
    &__form {
        max-width: rem(480);
        margin-top: rem(32);
    }
    &__inputbox {
        position: relative;
        width: 100%;
        height: rem(48);
        input {
            width: 100%;
            height: 100%;
            color: inherit;
            background-color: transparent;
        }
        label {
            position: absolute;
            left: 0;
            top: 50%;
            translate: 0 -50%;
        }
    }
}
</style>

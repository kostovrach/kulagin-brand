<template>
    <section class="brand">
        <div class="brand__container">
            <div class="brand__body">
                <picture class="brand__sticker-container" v-draggable="{ left: -2, top: -5 }">
                    <img class="brand__sticker" src="/img/stickers/theplace.png" alt="ThePlace" />
                </picture>

                <ButtonPrimary
                    style="position: absolute; left: 12%; bottom: -5%"
                    type="router-link"
                    to="/blog"
                    variant="grey"
                >
                    Блог
                </ButtonPrimary>
                <img
                    v-draggable="{ top: -5, left: 35 }"
                    src="/img/stickers/smile.png"
                    alt="#"
                    style="pointer-events: auto; width: 288px; rotate: 15deg"
                />
                <img
                    v-draggable="{ top: 70, left: 55 }"
                    src="/img/stickers/thunder.png"
                    alt="#"
                    style="pointer-events: auto; width: 180px; rotate: 7deg"
                />
                <ButtonPrimary
                    style="position: absolute; left: 75%; top: -10%; rotate: -5deg"
                    type="router-link"
                    to="/marketers"
                    variant="grey"
                >
                    Маркетологам
                </ButtonPrimary>
                <picture
                    class="brand__image-container"
                    style="--mask: url('/img/masks/b.svg'); --break-mask: url('/img/masks/b-rotate.svg')"
                >
                    <img class="brand__image" src="/img/content/personal-views/singing.gif" alt="#" />
                </picture>
                <picture
                    class="brand__image-container"
                    style="--mask: url('/img/masks/r.svg'); --break-mask: url('/img/masks/r-rotate.svg')"
                >
                    <img class="brand__image" src="/img/content/personal-views/temp4.jpg" alt="#" />
                </picture>
                <picture
                    class="brand__image-container"
                    style="--mask: url('/img/masks/a.svg'); --break-mask: url('/img/masks/a-rotate.svg')"
                >
                    <img class="brand__image" src="/img/content/personal-views/temp2.jpg" alt="#" />
                </picture>
                <picture
                    class="brand__image-container"
                    style="--mask: url('/img/masks/n.svg'); --break-mask: url('/img/masks/n-rotate.svg')"
                >
                    <img class="brand__image" src="/img/content/personal-views/temp5.jpg" alt="#" />
                </picture>
                <picture
                    class="brand__image-container"
                    style="--mask: url('/img/masks/d.svg'); --break-mask: url('/img/masks/d-rotate.svg')"
                >
                    <img class="brand__image" src="/img/content/personal-views/temp6.jpg" alt="#" />
                </picture>
            </div>
            <div class="brand__hint">
                <SectionHint class="home-hero__hint" image="/img/content/personal-views/singing.jpg">
                    <template #title>Пир для маркетологов</template>
                    <template #text>
                        Мы обсудим эффективность и&nbsp;скорость бизнес-процессов. Мы поговорим о том, как принести
                        и&nbsp;удержать больше лидов.
                    </template>
                    <template #media-description>уникальный опыт</template>
                </SectionHint>
            </div>
            <div class="brand__services">
                <ButtonPrimary
                    style="position: absolute; left: 55%; bottom: 10%; rotate: -6deg"
                    type="router-link"
                    to="/services"
                    variant="red"
                >
                    Услуги
                </ButtonPrimary>
                <h2 class="brand__services-title">Развиваю личные бренды</h2>
                <p class="brand__services-subtitle">На личность — идет&nbsp;наличность</p>

                <picture class="brand__services-image-container">
                    <img class="brand__services-image" src="/img/content/temp.jpg" alt="#" />
                </picture>
                <picture class="brand__services-image-container">
                    <img class="brand__services-image" src="/img/content/personal-views/angry.jpg" alt="#" />
                </picture>
                <picture class="brand__services-image-container">
                    <img class="brand__services-image" src="/img/content/snapshot.gif" alt="#" />
                </picture>
                <picture class="brand__services-image-container">
                    <img class="brand__services-image" src="/img/content/blog/temp5.jpg" alt="#" />
                </picture>
                <picture class="brand__services-image-container">
                    <img class="brand__services-image" src="/img/content/personal-views/circle.jpg" alt="#" />
                </picture>
                <picture class="brand__services-image-container">
                    <img class="brand__services-image" src="/img/content/gt-club.gif" alt="#" />
                </picture>
                <picture class="brand__services-image-container">
                    <img class="brand__services-image" src="/img/content/blog/temp1.jpg" alt="#" />
                </picture>
                <picture class="brand__services-image-container">
                    <img class="brand__services-image" src="/img/content/personal-views/eating.jpg" alt="#" />
                </picture>
                <picture class="brand__services-image-container">
                    <img class="brand__services-image" src="/img/content/arabeska/arabeska.gif" alt="#" />
                </picture>
            </div>

            <FormPrimary image="/img/content/temp.jpg">
                <template #title>Ваш бренд не приносит прибыль?</template>
                <template #description>
                    Заполните форму и я свяжусь с&nbsp;вами, чтобы обсудить вашу точку «А». Ещё можно
                    <a href="tel:">позвонить</a> или <a href="mailto:">написать</a>.
                </template>
            </FormPrimary>
            <div class="brand__footer">
                <ButtonPrimary
                    style="position: absolute; left: 0%; bottom: 0%"
                    type="router-link"
                    to="/contact"
                    variant="grey"
                >
                    Контакты
                </ButtonPrimary>
                <picture class="brand__footer-image-container">
                    <img
                        class="brand__footer-image"
                        src="/img/content/personal-views/smiling.gif"
                        alt="Игорь Кулагин"
                    />
                </picture>
            </div>
        </div>
    </section>
</template>

<script setup>
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary.vue';
import SectionHint from '@/components/SectionHint/SectionHint.vue';
import FormPrimary from '@/components/FormPrimary/FormPrimary.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.brand {
    // min-width: fit-content;
    color: $c-F3F2EE;
    background-color: $c-111111;
    &__container {
        @include horizontal-layout;
    }
    &__body {
        position: relative;
        display: flex;
        align-items: center;
        gap: lineScale(32, 16, 480, 1440);
    }
    &__sticker-container {
        max-width: rem(180);
        aspect-ratio: 1;
        z-index: 2;
        rotate: -10deg;
        user-select: none;
    }
    &__sticker {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    &__image-container {
        position: relative;
        z-index: 1;
        height: 100%;
        width: rem(560);
        mask-image: var(--mask);
        mask-repeat: no-repeat;
        mask-size: 100% 100%;
        @include horizontal-max-height;
    }
    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    &__hint {
        display: flex;
        align-items: flex-end;
    }
    &__services {
        position: relative;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(6, auto);
        grid-template-rows: repeat(5, 1fr);
        grid-template-areas:
            '. . image-3 image-3 . .'
            '. image-2 image-3 image-3 image-4 image-5'
            'image-1 image-2 image-3 image-3 image-4 image-5'
            'image-1 image-6 image-6 image-7 image-8 image-9'
            '. image-6 image-6 . image-8 .';
        padding: 0 $px;
        @include horizontal-max-height;
        &-title,
        &-subtitle {
            text-shadow: 1px 1px 5px $c-111111;
            // mix-blend-mode: exclusion;
        }
        &-title {
            position: absolute;
            z-index: 1;
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            white-space: nowrap;
            text-transform: uppercase;
            font-family: 'Fira-Extra', sans-serif;
            font-size: lineScale(120, 64, 480, 1440);
            font-weight: $fw-bold;
        }
        &-subtitle {
            position: absolute;
            z-index: 1;
            top: 60%;
            left: 25%;
            max-width: 15ch;
            text-transform: uppercase;
            font-size: lineScale(32, 24, 480, 1440);
            font-weight: $fw-bold;
        }
        &-image-container {
            &:nth-of-type(1) {
                grid-area: image-1;
                max-width: rem(326);
                max-height: rem(326);
                rotate: 9deg;
                translate: 20% 0;
            }
            &:nth-of-type(2) {
                grid-area: image-2;
                max-width: rem(230);
                max-height: rem(319);
                rotate: -3deg;
            }
            &:nth-of-type(3) {
                grid-area: image-3;
                max-width: rem(464);
                max-height: rem(464);
                rotate: 2.55deg;
            }
            &:nth-of-type(4) {
                grid-area: image-4;
                max-width: rem(416);
                max-height: rem(350);
                rotate: -8deg;
                translate: -10% 0;
            }
            &:nth-of-type(5) {
                grid-area: image-5;
                max-width: rem(400);
                max-height: rem(350);
                rotate: 7deg;
                translate: -20% 0;
            }
            &:nth-of-type(6) {
                grid-area: image-6;
                max-width: rem(326);
                max-height: rem(326);
                rotate: 13deg;
                translate: 10% -10%;
            }
            &:nth-of-type(7) {
                grid-area: image-7;
                max-width: rem(326);
                max-height: rem(326);
                rotate: 17deg;
            }
            &:nth-of-type(8) {
                grid-area: image-8;
                max-width: rem(326);
                max-height: rem(326);
                rotate: -6deg;
                translate: -40% 0;
            }
            &:nth-of-type(9) {
                grid-area: image-9;
                max-width: rem(180);
                max-height: rem(326);
                rotate: 12deg;
                translate: -80% 0;
            }
        }
        &-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &__footer {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 rem(64);
        &-image-container {
            max-width: rem(380);
            max-height: rem(524);
            rotate: 5deg;
        }
        &-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

@media (max-width: 768px) {
    .brand {
        &__body {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        &__image-container {
            mask-image: var(--break-mask);
            // aspect-ratio: 1/2;
            // width: 100%;
            // height: 100%;
            // rotate: 90deg;
        }
    }
}
</style>

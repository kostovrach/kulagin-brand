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
                    variant="red"
                >
                    Блог
                </ButtonPrimary>
                <ButtonPrimary
                    style="position: absolute; left: 55%; top: -10%"
                    type="router-link"
                    to="/marketers"
                    variant="red"
                >
                    Маркетологам
                </ButtonPrimary>
                <picture
                    class="brand__image-container"
                    style="
                        --mask: url('/img/masks/b.svg');
                        --break-mask: url('/img/masks/b-rotate.svg');
                        --ratio: 457/692;
                    "
                >
                    <img class="brand__image" src="/img/content/personal-views/singing.gif" alt="#" />
                </picture>
                <picture
                    class="brand__image-container"
                    style="
                        --mask: url('/img/masks/ra.svg');
                        --break-mask: url('/img/masks/ra-rotate.svg');
                        --ratio: 256/173;
                    "
                >
                    <img class="brand__image" src="/img/content/temp.jpg" alt="#" />
                </picture>
                <picture
                    class="brand__image-container"
                    style="
                        --mask: url('/img/masks/nd.svg');
                        --break-mask: url('/img/masks/nd-rotate.svg');
                        --ratio: 1087/692;
                    "
                >
                    <img class="brand__image" src="/img/content/personal-views/singing.jpg" alt="#" />
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
            <FormPrimary image="/img/content/temp.jpg">
                <template #title>Ваш бренд не приносит прибыль?</template>
                <template #description>
                    Заполните форму и я свяжусь с&nbsp;вами, чтобы обсудить вашу точку «А». Ещё можно
                    <a href="tel:">позвонить</a> или <a href="mailto:">написать</a>.
                </template>
            </FormPrimary>
            <div class="brand__footer">
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
        aspect-ratio: var(--ratio);
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
    &__footer {
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

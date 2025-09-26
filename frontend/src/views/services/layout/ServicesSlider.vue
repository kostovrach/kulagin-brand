<template>
    <section class="services">
        <div class="services__container">
            <div class="services__titlebox">
                <h1 class="services__title">{{ content?.title }}</h1>
                <p class="services__subtitle">{{ content?.subtitle }}</p>
            </div>
            <ul class="services__list">
                <li class="services__item" v-for="item in content?.item" :key="item.id">
                    <div class="services__item-wrapper">
                        <picture class="services__item-image-container">
                            <img class="services__item-image" :src="item.item_id.image_url" :alt="item.item_id.title" />
                        </picture>
                        <div class="services__item-content">
                            <div class="services__item-titlebox">
                                <p class="services__item-desc">{{ item.item_id.tag }}</p>
                                <h2 class="services__item-title">{{ item.item_id.title }}</h2>
                            </div>
                            <ul class="services__item-values">
                                <li>{{ item.item_id.price_old }} &#8381;</li>
                                <li>{{ item.item_id.price }} &#8381;</li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
defineProps({
    content: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.services {
    $p: &;

    @include horizontal-layout;
    &__container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: rem(40);
    }
    &__titlebox {
        display: flex;
        gap: rem(64);
    }
    &__title {
        @include block-title;
    }
    &__subtitle {
        max-width: 40ch;
        text-transform: uppercase;
        font-size: lineScale(22, 18, 480, 1440);
        font-weight: $fw-semi;
        line-height: 1.4;
    }
    &__list {
        height: fit-content;
        display: flex;
        gap: rem(64);
    }
    &__item {
        width: rem(640);
        height: fit-content;
        &-wrapper {
            width: 100%;
            height: 100%;
        }
        &-image-container {
            width: 100%;
            height: lineScale-y(380, 240, 480, 1440);
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &-content {
            display: flex;
            justify-content: space-between;
            gap: rem(96);
            margin-top: rem(16);
        }
        &-desc {
            font-family: 'Inter', sans-serif;
            color: $c-accent;
            font-size: lineScale(18, 16, 480, 1440);
            font-weight: $fw-bold;
        }
        &-title {
            text-transform: uppercase;
            font-family: 'Fira-Extra', sans-serif;
            font-size: lineScale(40, 24, 480, 1440);
            font-weight: $fw-med;
        }
        &-values {
            display: flex;
            flex-direction: column;
            gap: rem(8);
            li {
                font-family: 'Fira-Extra', sans-serif;
                white-space: nowrap;
                &:first-child {
                    font-size: lineScale(22, 18, 480, 1440);
                    text-decoration: line-through;
                    opacity: 0.8;
                }
                &:last-child {
                    font-size: lineScale(48, 24, 480, 1440);
                    font-weight: $fw-med;
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .services {
        &__titlebox {
            display: flex;
            flex-direction: column;
            gap: rem(32);
        }
        &__list {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: rem(64);
        }
        &__item {
            width: 100%;
        }
    }
}
</style>

<template>
    <div class="loader">
        <div class="loader__container">
            <div class="loader__titlebox">
                <div class="loader__title">
                    <Skeleton
                        class="loader__title-text"
                        :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                        height="2rem"
                        border-radius="1rem"
                    />
                    <Skeleton
                        class="loader__title-text"
                        :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                        height="2rem"
                        border-radius="1rem"
                    />
                    <Skeleton
                        class="loader__title-text"
                        :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                        height="2rem"
                        border-radius="1rem"
                    />
                    <Skeleton
                        class="loader__title-text"
                        :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                        height="2rem"
                        border-radius="1rem"
                    />
                </div>
                <div class="loader__subtitle">
                    <Skeleton
                        class="loader__subtitle-text"
                        :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                        border-radius="1rem"
                    />
                    <Skeleton
                        class="loader__subtitle-text"
                        :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                        border-radius="1rem"
                    />
                    <Skeleton
                        class="loader__subtitle-text"
                        :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                        border-radius="1rem"
                    />
                </div>
            </div>
            <div class="loader__body">
                <div class="loader__item" v-for="n in 4" :key="n">
                    <Skeleton
                        class="loader__item-image"
                        :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                        height="20rem"
                        border-radius="1rem"
                    />
                    <div class="loader__item-content">
                        <Skeleton
                            class="loader__item-text"
                            :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                            border-radius="1rem"
                        />
                        <Skeleton
                            class="loader__item-text"
                            :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                            border-radius="1rem"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Skeleton from 'primevue/skeleton';
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.loader {
    width: 100vw;
    height: 100lvh;
    overflow: clip;
    &__container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: rem(32);
        padding: $py $px;
    }
    &__titlebox {
        display: flex;
        flex-direction: column;
        gap: rem(64);
    }
    &__title {
        width: 100%;
        max-width: rem(640);
        display: flex;
        flex-direction: column;
        gap: rem(8);
        &-text {
            width: 100%;
            height: rem(24);
            &:nth-child(2) {
                width: 80%;
            }
        }
    }
    &__subtitle {
        width: 100%;
        max-width: rem(320);
        display: flex;
        flex-direction: column;
        gap: rem(8);
        &-text {
            width: 100%;
            height: rem(16);
        }
    }
    &__body {
        display: flex;
        align-items: center;
        gap: rem(32);
        @media (max-width: 768px) {
            flex-direction: column;
        }
    }
    &__item {
        flex: 1 1 25%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: rem(16);
        &-image {
            width: 100%;
        }
        &-content {
            display: flex;
            flex-direction: column;
            gap: rem(8);
        }
        &-text {
            width: 100%;
            height: rem(16);
        }
    }
}
</style>

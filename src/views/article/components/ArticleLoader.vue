<template>
    <div class="article-loader">
        <Skeleton
            class="article-loader__item"
            width="80%"
            height="35px"
            borderRadius="1rem"
            :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
        />
        <Skeleton
            class="article-loader__item"
            width="60%"
            height="35px"
            borderRadius="1rem"
            :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
        />
        <Skeleton
            class="article-loader__item"
            width="100%"
            height="300px"
            borderRadius="1rem"
            style="margin-top: 3rem"
            :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
        />
        <div class="article-loader__content">
            <div class="article-loader__sider">
                <Skeleton
                    class="article-loader__item"
                    width="100%"
                    height="300px"
                    borderRadius="1rem"
                    :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                />
            </div>
            <div class="article-loader__body">
                <Skeleton
                    class="article-loader__item"
                    width="25%"
                    height="1.5rem"
                    borderRadius="1rem"
                    :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                />
                <Skeleton
                    v-for="n in 10"
                    class="article-loader__item"
                    width="100%"
                    height="1rem"
                    borderRadius="1rem"
                    style="margin-top: 1rem"
                    :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                />
                <Skeleton
                    class="article-loader__item"
                    width="25%"
                    height="1.5rem"
                    borderRadius="1rem"
                    style="margin-top: 4rem"
                    :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                />
                <Skeleton
                    v-for="n in 10"
                    class="article-loader__item"
                    width="100%"
                    height="1rem"
                    borderRadius="1rem"
                    style="margin-top: 1rem"
                    :dt="{ root: { background: '#ececec', animationBackground: '#f7f9f7' } }"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import Skeleton from 'primevue/skeleton';
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.article-loader {
    display: flex;
    flex-direction: column;
    gap: rem(16);
    @include vertical-layout;
    &__content {
        display: grid;
        grid-template-columns: 30% auto;
        gap: rem(64);
        margin-top: rem(64);
        @media (max-width: 768px) {
            display: flex;
            flex-direction: column;
        }
    }
    &__sider {
        @media (max-width: 768px) {
            display: none;
        }
    }
}
</style>

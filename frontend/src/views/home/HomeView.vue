<template>
    <main class="homepage">
        <section class="home">
            <div class="home__container fade-bottom">
                <HomeAgency :content="page?.home_agency" />
                <HomeNavigator :content="page?.home_view" />
            </div>
        </section>
    </main>
</template>

<script setup>
import HomeAgency from './layout/HomeAgency.vue';
import HomeNavigator from './layout/HomeNavigator.vue';

// content management
import { usePage } from '@/composables/usePage';

const { page } = usePage('home', ['home_agency.*', 'home_view.*'], {
    resolveFiles: true,
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.home {
    $p: &;

    min-height: 100lvh;
    padding: rem(32) lineScale(32, 0, 480, 1440);
    background-color: #dfdddd;
    &__container {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: rem(16);
    }
}

@media (max-width: 1024px) {
    .home {
        &__container {
            display: flex;
            flex-direction: column-reverse;
        }
    }
}
</style>

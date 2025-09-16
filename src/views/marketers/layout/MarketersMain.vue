<template>
    <section class="marketers">
        <ButtonPrimary
            class="marketers__button"
            v-follow-cursor="{ bound: true }"
            type="a"
            href="https://gt-business.ru"
            target="_blank"
            variant="red"
            logic="noanim"
            style="font-size: 1.5rem"
            >Присоединиться</ButtonPrimary
        >
        <div class="marketers__container">
            <div class="marketers__section">
                <div class="marketers__section-titlebox">
                    <h1 class="marketers__section-title">Вечеринки для маркетологов</h1>
                    <p class="marketers__section-desc">
                        На вечеринках царит атмосфера креатива, где обмен идеями сочетается с неформальным общением
                    </p>
                    <ButtonPrimary
                        class="marketers__button--touch"
                        type="a"
                        href="https://gt-business.ru"
                        target="_blank"
                        variant="red"
                        style="font-size: 1rem"
                        >Присоединиться</ButtonPrimary
                    >
                </div>
                <div class="marketers__section-gallery">
                    <picture
                        class="marketers__section-image-container"
                        v-animateonscroll="{ enterClass: 'fade-bottom' }"
                    >
                        <img class="marketers__section-image" src="/img/content/blog/temp5.jpg" alt="#" />
                    </picture>
                    <picture
                        class="marketers__section-image-container"
                        v-animateonscroll="{ enterClass: 'fade-bottom' }"
                    >
                        <img class="marketers__section-image" src="/img/content/blog/temp4.jpg" alt="#" />
                    </picture>
                    <picture
                        class="marketers__section-image-container"
                        v-animateonscroll="{ enterClass: 'fade-bottom' }"
                    >
                        <img class="marketers__section-image" src="/img/content/gt-club.gif" alt="#" />
                    </picture>
                </div>
            </div>
            <div class="marketers__section">
                <div class="marketers__section-titlebox">
                    <h2 class="marketers__section-title">Веселье ради сильного бренда</h2>
                    <p class="marketers__section-desc">
                        Объединение предпринимателей и бизнесменов для совместного роста, обмена опытом, знаниями и
                        возможностями. Это экосистема, отражающая все аспекты жизни: бизнес, финансы, развитие, семья,
                        здоровье, спорт, дружба, увлечения, активный отдых. А я являюсь резидентом этого клуба.
                    </p>
                    <ButtonPrimary
                        class="marketers__button--touch"
                        type="a"
                        href="https://gt-business.ru"
                        target="_blank"
                        variant="red"
                        style="font-size: 1rem"
                        >Присоединиться</ButtonPrimary
                    >
                </div>
                <div class="marketers__section-gallery">
                    <picture
                        class="marketers__section-image-container"
                        v-animateonscroll="{ enterClass: 'fade-bottom' }"
                    >
                        <img class="marketers__section-image" src="/img/content/blog/temp3.jpg" alt="#" />
                    </picture>
                    <picture
                        class="marketers__section-image-container"
                        v-animateonscroll="{ enterClass: 'fade-bottom' }"
                    >
                        <img class="marketers__section-image" src="/img/content/blog/temp2.jpg" alt="#" />
                    </picture>
                    <picture
                        class="marketers__section-image-container"
                        v-animateonscroll="{ enterClass: 'fade-bottom' }"
                    >
                        <img class="marketers__section-image" src="/img/content/blog/temp1.jpg" alt="#" />
                    </picture>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.marketers {
    $p: &;

    position: relative;
    overflow: hidden;
    @include vertical-layout;
    &__container {
        display: flex;
        flex-direction: column;
        gap: rem(128);
    }
    &__section {
        display: flex;
        flex-direction: column;
        gap: rem(96);
        &:nth-child(odd) {
            #{$p}__section-gallery {
                align-self: flex-end;
            }
        }
        &:nth-child(even) {
            #{$p}__section-titlebox {
                align-items: flex-end;
                text-align: right;
            }
        }
        &-titlebox {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: rem(32);
        }
        &-title {
            @include block-title($font-size: lineScale(96, 32, 480, 1440));
        }
        &-desc {
            max-width: 60ch;
            font-family: 'Inter', sans-serif;
            font-size: lineScale(22, 18, 480, 1440);
        }
        &-gallery {
            max-width: 60%;
            display: flex;
            flex-direction: column;
            gap: rem(34);
        }
        &-image-container {
            max-width: 100%;
            height: rem(635);
            &:nth-child(odd) {
                rotate: -2deg;
            }
            &:nth-child(even) {
                rotate: 3deg;
            }
        }
        &-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &__button--touch {
        position: absolute;
        top: 100%;
        right: 0;
        @media (min-width: 768px) {
            display: none;
        }
    }
}

@media (max-width: 768px) {
    .marketers {
        $p: &;

        &__section {
            &:nth-child(even) {
                #{$p}__section-titlebox {
                    align-items: initial;
                    text-align: initial;
                }
            }
            &-gallery {
                max-width: initial;
            }
        }
        &__button {
            display: none;
        }
    }
}
</style>

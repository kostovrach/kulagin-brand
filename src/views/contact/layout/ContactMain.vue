<template>
    <section class="contact">
        <div class="contact__container">
            <Sticker
                class="contact__sticker"
                v-draggable="{ top: 80, left: 65 }"
                style="rotate: -7deg"
                variant="grey"
                textAccent="🔥"
                textMain="Какой-то призыв к действию"
            />
            <div class="contact__content">
                <FormPrimary theme="light" image="/img/content/personal-views/temp.jpg" class="fade-scale">
                    <template #title>
                        <ul>
                            <li>Что хотите</li>
                            <li style="margin-left: 30%">обсудить?</li>
                        </ul>
                    </template>
                    <template #description>
                        Заполните форму и я свяжусь с&nbsp;вами, чтобы обсудить вашу точку «А»
                    </template>
                </FormPrimary>
                <div class="contact__list fade-right" style="animation-delay: 0.3s">
                    <div class="contact__item">
                        <p class="contact__item-title">Можно позвонить</p>
                        <a class="contact__item-link" href="tel:">+7 999 874-42-47</a>
                    </div>
                    <div class="contact__item">
                        <p class="contact__item-title">А можно написать</p>
                        <a class="contact__item-link" href="/">vk.com/kulagin</a>
                        <a class="contact__item-link" href="/">t.me/kulagin</a>
                        <a class="contact__item-link" href="/">kulagin@mail.ru</a>
                    </div>
                    <div class="contact__item">
                        <p class="contact__item-title">Или даже придти в гости!</p>
                        <a
                            class="contact__item-link contact__item-link--caption"
                            href="https://kulaginbrand.ru"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p>г. Самара, ул. Конноармейская 17</p>
                            <span>(офис Kulaginbrand)</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import FormPrimary from '@/components/FormPrimary/FormPrimary.vue';
import Sticker from '@/components/Sticker/Sticker.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.contact {
    $p: &;

    &__container {
        position: relative;
        @include horizontal-layout;
    }
    &__content {
        display: flex;
        align-items: center;
        gap: rem(128);
    }
    &__list {
        display: flex;
        flex-direction: column;
        gap: rem(40);
    }
    &__item {
        display: flex;
        flex-direction: column;
        gap: rem(8);
        &-title {
            text-transform: uppercase;
            font-size: lineScale(32, 24, 480, 1440);
            line-height: 1.2;
            font-weight: $fw-bold;
            margin-bottom: rem(8);
        }
        &-link {
            font-size: lineScale(22, 18, 480, 1440);
            &:not(#{$p}__item-link--caption) {
                @include gradient-text-hover;
            }
            &--caption {
                p {
                    @include gradient-text-hover;
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .contact {
        &__sticker {
            display: none;
        }
        &__content {
            display: flex;
            flex-direction: column;
        }
        &__list {
            align-self: flex-start;
        }
    }
}
</style>

<template>
    <footer class="footer">
        <div class="footer__container">
            <div class="footer__controls">
                <div class="footer__socials">
                    <a
                        class="footer__socials-icon"
                        style="--mask: url(/img/icons/vk.svg); --color: #016fcc"
                        href="https://example.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    ></a>
                    <a
                        class="footer__socials-icon"
                        style="--mask: url(/img/icons/tg.svg); --color: #03a4df"
                        href="https://example.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    ></a>
                    <a
                        class="footer__socials-icon"
                        style="--mask: url(/img/icons/ok.svg); --color: #ff7700"
                        href="https://example.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    ></a>
                    <a
                        class="footer__socials-icon"
                        style="
                            --mask: url(/img/icons/instagram.svg);
                            --color: linear-gradient(
                                45deg,
                                #feda75 0%,
                                #fa7e1e 25%,
                                #d62976 50%,
                                #962fbf 75%,
                                #4f5bd5 100%
                            );
                        "
                        href="https://example.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    ></a>
                </div>
                <div class="footer__links">
                    <a class="footer__link" href="/">Конфиденциальность</a>
                    <a class="footer__link" href="/">Оферта</a>
                    <a class="footer__link" href="/">Пользовательское соглашение</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.footer {
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    width: 100vw;
    mix-blend-mode: difference; // <-----
    padding: rem(16) rem(64);
    pointer-events: none;
    &__container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &__controls {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: rem(32);
    }
    &__socials {
        display: flex;
        align-items: center;
        gap: rem(8);
        &-icon {
            width: rem(28);
            aspect-ratio: 1;
            background: $c-FFFFFF;
            mask-image: var(--mask);
            mask-size: cover;
            mask-repeat: no-repeat;
            pointer-events: auto;
            will-change: rotate;
            @media (pointer: fine) {
                &:hover {
                    background: var(--color);
                    &:nth-of-type(4n + 1) {
                        rotate: -6deg;
                    }
                    &:nth-of-type(4n + 2) {
                        rotate: -9deg;
                    }
                    &:nth-of-type(4n + 3) {
                        rotate: -4deg;
                    }
                    &:nth-of-type(4n + 4) {
                        rotate: -13deg;
                    }
                }
            }
        }
    }
    &__links {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: rem(32);
    }
    &__link {
        cursor: pointer;
        text-transform: uppercase;
        font-family: 'Inter', sans-serif;
        font-size: rem(14);
        font-weight: $fw-semi;
        pointer-events: auto;
        @include gradient-text-hover($main-color: $c-FFFFFF, $accent-color: $c-0FD2D3);
    }
}
</style>

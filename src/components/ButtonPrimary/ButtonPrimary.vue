<template>
    <component
        :is="componentTag"
        v-bind="{ ...attrs, ...$attrs }"
        :id="id || undefined"
        :class="['button-primary', `button-primary--${props.variant}`]"
    >
        <span v-if="firstPart">{{ firstPart }}</span>
        <div class="button-primary__icon">
            <span></span>
            <span></span>
            <span></span>
            <!-- <TheSvgSprite type="arrow" :size="96" /> -->
        </div>
        <span v-if="secondPart">{{ secondPart }}</span>
    </component>
</template>

<script setup>
import { computed, useSlots } from 'vue';
import TheSvgSprite from '../TheSvgSprite.vue';

const props = defineProps({
    type: {
        type: String,
        default: 'a',
        validator: (val) => ['button', 'a', 'router-link'].includes(val),
    },
    variant: {
        type: String,
        default: 'red',
        validator: (val) => ['red', 'grey'].includes(val),
    },
    to: { type: String },
    href: { type: String },
    buttonType: {
        type: String,
        default: 'button',
    },
    target: {
        type: String,
        default: '',
        validator: (val) => ['', '_blank', '_self', '_parent', '_top'].includes(val),
    },
    id: {
        type: String,
        default: '',
    },
});

const slots = useSlots();

const componentTag = computed(() => {
    switch (props.type) {
        case 'router-link':
            return 'router-link';
        case 'button':
            return 'button';
        default:
            return 'a';
    }
});

const attrs = computed(() => {
    switch (props.type) {
        case 'router-link':
            return { to: props.to };
        case 'button':
            return { type: props.buttonType };
        case 'a':
            return {
                href: props.href,
                target: props.target || undefined,
                rel: props.target === '_blank' ? 'noopener noreferrer' : undefined,
            };
        default:
            return {};
    }
});

const slotText = computed(() => {
    const raw = slots.default?.()[0]?.children || '';
    return typeof raw === 'string' ? raw : '';
});

const firstPart = computed(() => {
    const len = slotText.value.length;
    const half = Math.ceil(len / 2);
    return slotText.value.slice(0, half);
});

const secondPart = computed(() => {
    const len = slotText.value.length;
    const half = Math.ceil(len / 2);
    return slotText.value.slice(half);
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.button-primary {
    $p: &;

    position: relative;
    width: fit-content;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: lineScale(32, 24, 480, 1440);
    font-weight: $fw-bold;
    border-radius: 50%;
    padding: rem(34);
    box-shadow: 1px 1px 1px $c-111111;
    overflow: hidden;
    &::before {
        content: '';
        position: absolute;
        z-index: 1;
        inset: 0;
        background-image: url('/img/patterns/variant2.png');
        opacity: 0.4;
        pointer-events: none;
    }

    @media (pointer: fine) {
        &:hover {
            #{$p}__icon {
                > * {
                    background-position: 100% 100%;
                }
            }
            > span {
                &:first-of-type {
                    translate: rem(-64) 0;
                    opacity: 0;
                }
                &:last-of-type {
                    translate: rem(64) 0;
                    opacity: 0;
                }
            }
        }
    }
    > span {
        position: relative;
        z-index: 2;
        display: block;
        transition: all $td $tf;
    }
    &__icon {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        width: rem(96);
        aspect-ratio: 1;
        pointer-events: none;
        > * {
            display: block;
            position: absolute;
            width: rem(4);
            background-image: linear-gradient(to top, currentColor 50%, transparent 50%);
            background-size: 200% 200%;
            transition: background-position $td $tf;
        }
        :nth-child(1) {
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            height: rem(96);
            rotate: 45deg;
        }
        :nth-child(2) {
            height: rem(48);
            top: rem(14);
            right: rem(12);
        }
        :nth-child(3) {
            height: rem(48);
            top: rem(-9);
            right: rem(35);
            rotate: 90deg;
        }
    }
    &--red {
        background-color: $c-accent;
        color: $c-FFFFFF;
    }
    &--grey {
        background-color: $c-FFFFFF;
        color: $c-111111;
    }
}
</style>

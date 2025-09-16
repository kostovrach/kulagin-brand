<template>
    <component
        :is="componentTag"
        v-bind="{ ...attrs, ...$attrs }"
        :id="id || undefined"
        :class="['button-primary', `button-primary--${props.variant}`, `button-primary--${props.logic}`]"
    >
        <div class="button-primary__body">
            <span v-if="firstPart">{{ firstPart }}</span>
            <span v-if="secondPart">{{ secondPart }}</span>
            <div class="button-primary__icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </component>
</template>

<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'a',
        validator: (val) => ['button', 'a', 'router-link'].includes(val),
    },
    variant: {
        type: String,
        default: 'red',
        validator: (val) => ['red', 'grey', 'black'].includes(val),
    },
    logic: {
        type: String,
        validator: (val) => ['double', 'noanim'].includes(val),
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
    if (props.logic !== 'double') {
        const len = slotText.value.length;
        const half = Math.ceil(len / 2);
        return slotText.value.slice(0, half);
    } else if (props.logic === 'double') {
        const text = slotText.value;
        const words = text.split(' ');
        const firstLine = words.slice(0, 1);
        return firstLine.toString();
    } else return '';
});

const secondPart = computed(() => {
    if (props.logic !== 'double') {
        const len = slotText.value.length;
        const half = Math.ceil(len / 2);
        return slotText.value.slice(half);
    } else if (props.logic === 'double') {
        const text = slotText.value;
        const words = text.split(' ');
        const secondLine = words.slice(1, 2);
        return secondLine.toString();
    } else return '';
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.button-primary {
    $p: &;

    position: relative;
    z-index: 2;
    width: fit-content;
    height: fit-content;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    white-space: nowrap;
    font-size: lineScale(32, 24, 480, 1440);
    font-weight: $fw-bold;
    border-radius: 50%;
    padding: rem(34);
    box-shadow: rem(1) rem(1) rem(1) $c-111111;
    overflow: hidden;
    transition: background-color $td $tf;
    &::before {
        content: '';
        position: absolute;
        z-index: 1;
        inset: 0;
        background-image: url('/img/patterns/variant2.png');
        opacity: 0.4;
        pointer-events: none;
        transition: opacity $td $tf;
    }

    @media (pointer: fine) {
        &:not(#{$p}--noanim):hover {
            background-color: $c-111111;
            &::before {
                opacity: 0;
            }
            #{$p}__icon {
                > * {
                    background-position: 100% 100%;
                }
            }
            #{$p}__body > span {
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
    &__body {
        display: flex;
        align-items: center;
        justify-content: center;
        > span {
            position: relative;
            z-index: 2;
            display: block;
            transition: all $td $tf;
        }
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
            background-image: linear-gradient(to top, $c-FFFFFF 49%, transparent 50%);
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
    &--double {
        font-size: lineScale(22, 18, 480, 1440);
        #{$p}__body {
            overflow: hidden;
            flex-direction: column;
        }
        @media (pointer: fine) {
            &:hover {
                #{$p}__body > span {
                    &:first-of-type {
                        translate: 0 rem(-32);
                        opacity: 0;
                    }
                    &:last-of-type {
                        translate: 0 rem(32);
                        opacity: 0;
                    }
                }
            }
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
    &--black {
        background-color: $c-111111;
        color: $c-FFFFFF;
    }
}
</style>

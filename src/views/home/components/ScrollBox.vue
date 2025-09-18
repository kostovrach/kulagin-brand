<template>
    <div class="scrollbox">
        <div ref="container" class="scrollbox__container">
            <slot></slot>
        </div>
        <div class="scrollbox__controls">
            <button
                v-if="isOverflow"
                class="scrollbox__btn scrollbox__btn--up"
                aria-label="Scroll up"
                :disabled="!canScrollUp"
                @mousedown="startScroll(-1)"
                @mouseup="stopScroll"
                @mouseleave="stopScroll"
                @click="scrollOnce(-1)"
            >
                <TheSvgSprite type="arrow" :size="64" />
            </button>
            <button
                v-if="isOverflow"
                class="scrollbox__btn scrollbox__btn--down"
                aria-label="Scroll down"
                :disabled="!canScrollDown"
                @mousedown="startScroll(1)"
                @mouseup="stopScroll"
                @mouseleave="stopScroll"
                @click="scrollOnce(1)"
            >
                <TheSvgSprite type="arrow" :size="64" />
            </button>
        </div>
    </div>
</template>

<script setup>
import TheSvgSprite from '@/components/TheSvgSprite.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    step: { type: Number, default: 100 },
});

const container = ref(null);
const isOverflow = ref(false);
const canScrollUp = ref(false);
const canScrollDown = ref(false);

let frameId = null;
let holdTimer = null;
let isHolding = false;
let resizeObserver;

const checkOverflow = () => {
    const el = container.value;
    if (!el) return;
    isOverflow.value = el.scrollHeight > el.clientHeight;
    updateButtons();
};

const updateButtons = () => {
    const el = container.value;
    if (!el) return;
    canScrollUp.value = el.scrollTop > 0;
    canScrollDown.value = el.scrollTop + el.clientHeight < el.scrollHeight;
};

const scrollOnce = (dir) => {
    if (isHolding) return;
    const el = container.value;
    if (!el) return;
    el.scrollBy({ top: dir * props.step, behavior: 'smooth' });
};

const startScroll = (dir) => {
    const el = container.value;
    if (!el) return;

    holdTimer = setTimeout(() => {
        isHolding = true;
        const step = () => {
            el.scrollTop += dir * 5;
            updateButtons();
            frameId = requestAnimationFrame(step);
        };
        frameId = requestAnimationFrame(step);
    }, 200);
};

const stopScroll = () => {
    clearTimeout(holdTimer);
    holdTimer = null;

    if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
    }

    isHolding = false;
};

onMounted(() => {
    checkOverflow();
    container.value?.addEventListener('scroll', updateButtons);

    resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(container.value);
});

onBeforeUnmount(() => {
    stopScroll();
    container.value?.removeEventListener('scroll', updateButtons);
    window.removeEventListener('resize', checkOverflow);
    resizeObserver?.disconnect();
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.scrollbox {
    height: 100%;
    position: relative;
    display: flex;
    gap: rem(64);
    &__container {
        padding-bottom: rem(164);
        overflow-y: auto;
        mask-image: linear-gradient(to bottom, $c-main 60%, transparent 100%);
        @include hide-scrollbar;
    }
    &__controls {
        align-self: center;
        display: flex;
        flex-direction: column;
        gap: rem(256);
    }
    &__btn {
        cursor: pointer;
        user-select: none;
        &:first-of-type {
            rotate: -90deg;
        }
        &:last-of-type {
            rotate: 90deg;
        }
        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
}
</style>

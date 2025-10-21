<template>
    <div class="modal-wrapper" :style="{ zIndex: options.zIndex ?? 10 }" aria-hidden="false">
        <div class="modal-backdrop" :class="options.backdropClass" @mousedown.self="onBackdropDown"></div>

        <div
            ref="panel"
            class="modal-panel"
            :class="options.wrapperClass"
            role="dialog"
            aria-modal="true"
            @mousedown.stop
        >
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { useModalStore } from '@/stores/modal';
import { trapFocus, releaseFocus } from '@/utils/focusTrap';

const props = defineProps({
    modalId: { type: Number, required: true },
    isTop: { type: Boolean, default: false },
    options: { type: Object, default: () => ({}) },
});

const panel = ref(null);
const store = useModalStore();

function onKey(e) {
    if (!props.isTop) return;
    if (e.key === 'Escape' && props.options.closeOnEsc !== false) {
        store.close(props.modalId);
    }
}

function onBackdropDown() {
    if (!props.isTop) return;
    if (props.options.closeOnBackdrop === false) return;
    store.close(props.modalId);
}

onMounted(() => {
    window.addEventListener('keydown', onKey);

    if (props.isTop && props.options.trapFocus !== false) {
        nextTick(() => trapFocus(panel.value));
    }
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey);
    releaseFocus();
});

watch(
    () => props.isTop,
    (v) => {
        if (v && props.options.trapFocus !== false) nextTick(() => trapFocus(panel.value));
        if (!v) releaseFocus();
    },
);
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.modal {
    &-wrapper {
        position: fixed;
        inset: 0;
        display: block;
        pointer-events: auto;
    }
    &-backdrop {
        position: absolute;
        inset: 0;
        background-color: rgba($c-111111, 0.8);
        will-change: opacity;
        animation: fadeIn $td $tf;
    }
    &-panel {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        pointer-events: auto;
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
}
</style>

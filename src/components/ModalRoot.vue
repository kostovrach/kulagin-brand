<template>
    <teleport to="body">
        <div class="modal-root" aria-live="polite">
            <component v-for="(m, idx) in stack" :key="m.id" :is="getWrappedComponent(m, idx)" />
        </div>
    </teleport>
</template>

<script setup>
import { computed, h } from 'vue';
import { useModalStore } from '@/stores/modal';

import ModalWrapper from '@/components/ModalWrapper.vue';

// registry
import VideoModal from '@/components/modals/VideoModal.vue';
//

const registry = {
    video: VideoModal,
};

const store = useModalStore();
const stack = computed(() => store.stack);

function getWrappedComponent(m, idx) {
    const comp = registry[m.name];
    if (!comp) {
        console.warn(`[ModalRoot] modal "${m.name}" not found in registry`);
        return { template: '<div />' };
    }

    const options = comp.modalConfig || {};

    return {
        render() {
            const isTop = idx === stack.value.length - 1;

            return h(
                ModalWrapper,
                { modalId: m.id, isTop, options },
                {
                    default: () => h(comp, { payload: m.payload, modalId: m.id }),
                },
            );
        },
    };
}
</script>

<style scoped lang="scss">
.modal-root {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 10;
}
</style>

import { useModalStore } from '@/stores/modal';
import { computed } from 'vue';

export function useModal() {
    const modal = useModalStore();

    const stack = computed(() => modal.stack);
    const top = computed(() => modal.top());
    const count = computed(() => modal.count());

    function openModal(name, payload = {}, options = {}) {
        return modal.open(name, payload, options);
    }

    function closeModal(id = null) {
        modal.close(id);
    }

    function closeTop() {
        modal.close();
    }

    return { openModal, closeModal, closeTop, stack, top, count };
}

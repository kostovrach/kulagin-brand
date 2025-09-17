import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
    const stack = ref([]);
    let _id = 1;

    function open(name, payload = {}, options = {}) {
        const item = { id: _id++, name, payload, options };
        stack.value.push(item);
        _updateBodyScroll();
        return item.id;
    }

    function close(id = null) {
        if (!stack.value.length) return;
        if (id === null) {
            stack.value.pop();
        } else {
            const idx = stack.value.findIndex((i) => i.id === id);
            if (idx !== -1) stack.value.splice(idx, 1);
        }
        _updateBodyScroll();
    }

    function closeAll() {
        stack.value = [];
        _updateBodyScroll();
    }

    function top() {
        return stack.value.at(-1) ?? null;
    }

    function count() {
        return stack.value.length;
    }

    function _updateBodyScroll() {
        document.body.classList.toggle('modal-open', stack.value.length > 0);
    }

    return { stack, open, close, closeAll, top, count };
});

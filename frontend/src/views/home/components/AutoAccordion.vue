<template>
    <ul :class="props.class">
        <template v-for="(item, index) in slotItems" :key="index">
            <component :is="item" :class="{ active: index === activeIndex }" />
        </template>
    </ul>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
    class: { type: String },
    interval: {
        type: Number,
        default: 2000,
    },
});

const activeIndex = ref(0);
let timer = null;

const next = () => {
    activeIndex.value = (activeIndex.value + 1) % slotItems.value.length;
};

const start = () => {
    stop();
    if (slotItems.value.length > 0) {
        timer = setInterval(next, props.interval);
    }
};

const stop = () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
};

import { useSlots, computed } from 'vue';
const slots = useSlots();

const slotItems = computed(() => slots.default?.() ?? []);

onMounted(start);
onBeforeUnmount(stop);

watch(() => props.interval, start);
</script>

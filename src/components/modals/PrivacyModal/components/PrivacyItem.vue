<template>
    <section>
        <component :is="HeadingTag"> {{ `${prefix}.` }} {{ item.title }} </component>

        <p v-if="item.text" v-html="item.text"></p>

        <div v-if="item.points && item.points.length">
            <PolicyItem
                v-for="(child, idx) in item.points"
                :key="idx"
                :item="child"
                :prefix="`${prefix}.${idx + 1}`"
                :level="level + 1"
            />
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'PolicyItem' });

const props = defineProps({
    item: { type: Object, required: true },
    prefix: { type: String, required: true },
    level: { type: Number, required: true },
});

const HeadingTag = computed(() => (props.level <= 6 ? `h${props.level}` : 'h6'));
</script>

<template>
    <main :class="['page', 'page--vertical', props.class]">
        <slot></slot>
    </main>
</template>

<script setup>
const props = defineProps({
    class: { type: String },
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.page--vertical {
    max-width: 100vw;
    min-height: 100%;
    margin-top: $py;
    overflow-x: clip;
}
</style>

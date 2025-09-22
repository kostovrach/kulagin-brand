<template>
    <svg aria-hidden="true" :width="size" :height="size" class="icon">
        <use :xlink:href="`#icon-${type}`" />
    </svg>
</template>

<script setup>
defineProps({
    type: { type: String, required: true },
    size: { type: [String, Number], default: 24 },
});
</script>

<style>
.icon {
    fill: currentColor;
}
</style>

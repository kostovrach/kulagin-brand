<template>
    <div class="burger" @click="openMenu">
        <span></span>
    </div>
</template>

<script setup>
import { useModal } from '@/composables/useModal';

const { openModal } = useModal();

function openMenu() {
    openModal('menu');
}
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.burger {
    cursor: pointer;
    width: rem(32);
    height: rem(24);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border: rem(3) solid $c-main;
    border: {
        left: none;
        right: none;
    }
    box-sizing: border-box;
    span {
        display: block;
        width: 70%;
        height: rem(3);
        background-color: $c-main;
    }
}
</style>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    name?: string;
    size?: string;
    filled?: boolean;
}>(), {
    filled: false,
    size: '24px'
});
</script>

<template>
    <span class="material-symbols-rounded icon" :class="{'filled': filled}">
        {{ name }}
    </span>
</template>

<style>
.material-symbols-rounded {
    user-select: none;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}

.material-symbols-rounded.filled {
    font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}

.icon.material-symbols-rounded {
    font-size: v-bind(size);
}
</style>

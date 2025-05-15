<script setup lang="ts">
const props = withDefaults(defineProps<{
    position?: 'left' | 'both' | 'right';
}>(), {
    position: 'right',
});
</script>

<template>
    <div class="flex items-center gap-xs w-full text-neutral-foreground-high font-bold">
        <div class="divider" v-if="position != 'right'" />
        <slot />
        <div class="divider" v-if="position != 'left'" />
    </div>
</template>

<style scoped>
.divider {
    @apply border-t-xxs flex-1 border-neutral-default;
}
</style>

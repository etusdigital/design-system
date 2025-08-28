<script setup lang="ts">
const props = withDefaults(defineProps<{
    position?: 'left' | 'center' | 'right';
}>(), {
    position: 'right',
});
</script>

<template>
    <div class="divider">
        <div class="divider" v-if="position != 'right'" />
        <slot />
        <div class="divider" v-if="position != 'left'" />
    </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.divider {
    @apply flex items-center gap-xs w-full text-neutral-foreground-high font-bold;
}

.divider {
    @apply border-t-xxs flex-1 border-neutral-default;
}
</style>

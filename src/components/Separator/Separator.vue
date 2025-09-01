<script setup lang="ts">
const props = withDefaults(defineProps<{
    position?: 'left' | 'center' | 'right';
}>(), {
    position: 'right',
});
</script>

<template>
    <div class="separator">
        <div class="separator-line" v-if="position != 'right'" />
        <slot />
        <div class="separator-line" v-if="position != 'left'" />
    </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.separator {
    @apply flex items-center gap-xs w-full text-neutral-foreground-high font-bold;
}

.separator-line {
    @apply border-t-xxs flex-1 border-neutral-default;
}
</style>

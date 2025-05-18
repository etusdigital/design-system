<script setup lang="ts">
defineProps<{
    className?: string;
}>();
</script>

<template>
    <div class="b-card" :class="className">
        <slot />
    </div>
</template>

<style scoped>
.b-card {
  @apply bg-neutral-surface-default rounded-base shadow-neutral-selected border-xxs border-neutral-default;
}
</style>

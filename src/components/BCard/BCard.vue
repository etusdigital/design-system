<script setup lang="ts">
const props = defineProps<{
    class?: string;
}>();
</script>
<template>
    <div class="b-card" :class="props.class">
        <slot />
    </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.b-card {
  @apply bg-neutral-surface-default rounded-base shadow-neutral-selected border-xxs border-neutral-default;
}
</style>

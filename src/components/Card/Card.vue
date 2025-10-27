<script setup lang="ts">
const props = defineProps<{
    class?: any;
}>();
</script>
<template>
    <div class="card" :class="props.class">
        <slot />
    </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.card {
  @apply bg-neutral-surface-default rounded-base shadow-neutral-selected border-xxs border-neutral-default;
}
</style>

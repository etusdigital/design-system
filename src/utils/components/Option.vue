<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    selected?: boolean;
    disabled?: boolean;
    secondary?: boolean;
    noHover?: boolean;
  }>(),
  {
    selected: false,
    disabled: false,
    secondary: false,
    noHover: false,
  }
);
</script>

<template>
  <div role="option" tabindex="0" class="option-container" :class="{ secondary, disabled, noHover, selected }">
    <slot />
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.option-container {
  @apply p3 flex items-center gap-xs cursor-pointer select-none text-neutral-interaction-default rounded-sm hover:text-primary-interaction-default hover:bg-primary-surface-default;

  .icon {
    @apply text-base;
  }
}

.option-container.selected {
  @apply text-primary-interaction-selected bg-primary-surface-default;
}

.option-container.noHover {
  @apply hover:text-neutral-interaction-default hover:bg-transparent;
}

.option-container.secondary {
  @apply text-neutral-foreground-negative hover:bg-primary-interaction-hover;
}

.option-container.disabled {
  @apply pointer-events-none text-neutral-interaction-disabled;
}
</style>

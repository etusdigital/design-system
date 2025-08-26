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
.option-container {
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
  user-select: none;
  color: var(--neutral-interaction-default);
  border-radius: var(--border-radius-sm);

  &:hover {
    color: var(--primary-interaction-default);
    background-color: var(--primary-surface-default);
  }

  .b-icon {
    font-size: var(--font-size-base);
  }
}

.option-container.selected {
  color: var(--primary-interaction-selected);
  background-color: var(--primary-surface-default);
}

.option-container.noHover {
  &:hover {
    color: var(--neutral-interaction-default);
    background-color: transparent;
  }
}

.option-container.secondary {
  color: var(--neutral-foreground-negative);
  &:hover {
    background-color: var(--primary-interaction-hover);
  }
}

.option-container.disabled {
  pointer-events: none;
  color: var(--neutral-interaction-disabled);
}
</style>


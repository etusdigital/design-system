<script setup lang="ts">
import { computed } from "vue";
import BSpinner from "../BSpinner/BSpinner.vue";

const props = withDefaults(
  defineProps<{
    id?: string;
    name?: string;
    type?: "button" | "reset" | "submit";
    color?:
      | "primary"
      | "info"
      | "success"
      | "warning"
      | "danger"
      | "neutral";
    size?: "small" | "medium" | "large";
    variant?: "default" | "secondary" | "plain" | "reverse";
    disabled?: boolean;
    loading?: boolean;
    progress?: number;
  }>(),
  {
    type: "button",
    color: "primary",
    size: "medium",
    variant: "default",
    disabled: false,
    loading: false,
    progress: 0,
  }
);

const isLoading = computed(
  (): boolean => !!(props.progress > 0 || props.loading)
);
</script>

<template>
  <button
    :id="id"
    :name="name || id"
    :type="type"
    :disabled="disabled"
    class="b-button"
    :class="[
      { disabled, 'pointer-events-none': isLoading },
      variant,
      size,
      color,
    ]"
  >
    <div
      v-if="isLoading"
      class="progress"
      :class="{ 'rounded-r-sm': progress == 1 }"
      :style="{ width: progress * 100 + '%' }"
    />
    <BSpinner v-if="isLoading" />
    <template v-if="$slots.default">
      <label
        v-if="name || id"
        :for="name || id"
        :class="{ invisible: isLoading }"
        class="button-label cursor-[inherit]"
      >
        <slot />
      </label>
      <div v-else :class="{ invisible: isLoading }" class="button-label">
        <slot />
      </div>
    </template>
  </button>
</template>

<style scoped src="@/utils/styles/button.css" />

<style scoped>
.b-button {
  padding: var(--spacing-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-xs);
  border-radius: var(--border-radius-base);
  position: relative;
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.05em;
  text-transform: capitalize;
  user-select: none;
  border-width: var(--border-width-xs);
  color: var(--neutral-foreground-negative);

  .b-spinner {
    position: absolute;
  }
}

.b-button.small {
  padding: var(--spacing-xs) var(--spacing-base);

  .b-spinner {
    font-size: var(--font-size-xs);
  }
}

.b-button.medium {
  padding: var(--spacing-sm) var(--spacing-base);
}

.b-button.large {
  padding: var(--spacing-base) var(--spacing-xl);
}

.progress {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  bottom: 0;
  border-top-left-radius: var(--border-radius-sm);
  transition: width 0.3s ease-out;
}

.b-button.default .progress {
  background-color: var(--neutral-surface-default);
  opacity: 0.6;
}

.button-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}
</style>

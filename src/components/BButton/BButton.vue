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
@reference "../../assets/main.css";

.b-button {
  @apply p3 font-semibold leading-xs rounded-base relative inline-flex cursor-pointer items-center justify-center tracking-wider capitalize select-none active:scale-95 border-xs text-neutral-foreground-negative;

  .b-spinner {
    @apply absolute;
  }
}

.b-button.small {
  @apply py-xs px-base;

  .b-spinner {
    @apply text-xs;
  }
}

.b-button.medium {
  @apply py-sm px-base;
}

.b-button.large {
  @apply py-base px-xl;
}

.progress {
  @apply absolute overflow-hidden top-0 left-0 bottom-0 rounded-l-sm transition-[width] ease-out duration-300;
}

.b-button.default .progress {
  @apply bg-white opacity-60;
}

.button-label {
  @apply inline-flex items-center justify-center gap-x-xs;
}
</style>

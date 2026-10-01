<script setup lang="ts">
import { computed, useId } from "vue";
import { useOptionalModel } from "#composables";

type CheckState = boolean | null;

const props = withDefaults(
  defineProps<{
    id?: string;
    name?: string;
    modelValue?: CheckState;
    rhs?: boolean;
    allowIndeterminate?: boolean;
    disabled?: boolean;
    tabindex?: number | string;
    ariaLabel?: string;
  }>(),
  {
    modelValue: undefined,
    rhs: false,
    allowIndeterminate: false,
    disabled: false,
    tabindex: 0,
    ariaLabel: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: CheckState];
}>();

const [model] = useOptionalModel<CheckState>(props, "modelValue", emit, false);
const labelId = useId();

const isActive = computed((): boolean => {
  if (props.allowIndeterminate) return model.value !== false;
  return !!model.value;
});

const ariaChecked = computed((): boolean | "mixed" => {
  return model.value === null ? "mixed" : !!model.value;
});

function toggle() {
  if (props.disabled) return;

  if (!props.allowIndeterminate) model.value = !model.value;
  else if (model.value === true) model.value = null;
  else if (model.value === null) model.value = false;
  else model.value = true;
}
</script>

<template>
  <div
    :id="id"
    :name="name || id"
    class="checkbox"
    :class="{ 'flex-row-reverse': rhs, disabled }"
    @click="toggle"
    @keyup.enter.space="toggle"
  >
    <div
      role="checkbox"
      :aria-checked="ariaChecked"
      :aria-disabled="disabled"
      :aria-label="ariaLabel"
      :aria-labelledby="$slots.default && !ariaLabel ? labelId : undefined"
      :tabindex="disabled ? -1 : tabindex"
      class="content"
      :class="{ active: isActive }"
      @keydown.space.prevent
    >
      <svg
        v-show="model === null"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full"
        style="stroke: currentColor"
      >
        <path
          id="Vector"
          d="M11.65 8L5 8"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-show="model === true"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full"
        style="stroke: currentColor"
      >
        <path
          id="Vector"
          d="M11.15 6L7.04998 9.9375L5 7.96875"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <template v-if="$slots.default">
      <div :id="labelId" class="checkbox-label cursor-[inherit]">
        <slot />
      </div>
    </template>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.checkbox {
  @apply inline-flex text-base gap-xs items-center cursor-pointer;
}

.checkbox:hover {
  .content {
    @apply border-primary-interaction-hover;
  }

  .checkbox-label {
    @apply text-neutral-interaction-hover;
  }
}

.checkbox.disabled {
  @apply pointer-events-none;

  .content {
    @apply bg-neutral-surface-default text-primary-surface-pressed border-neutral-disabled;
  }

  .checkbox-label {
    @apply text-neutral-interaction-disabled;
  }
}

.content {
  @apply bg-neutral-surface-default border-primary-default text-neutral-foreground-negative inline-block h-base w-base border rounded-xs transition-all duration-150 ease-out select-none;
}

.content.active {
  @apply bg-primary-interaction-selected border-primary-interaction-selected;
}

.checkbox-label {
  @apply p3 text-neutral-interaction-default;
}
</style>

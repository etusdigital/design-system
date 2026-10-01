<script setup lang="ts">
import { watch, inject, computed, useId } from "vue";
import type { GroupState } from "../../utils/types/Group";
import { useOptionalModel } from "#composables";

type Varinat = "default" | "onboarding";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    id?: string;
    name?: string;
    groupValue?: any;
    disabled?: boolean;
    variant?: Varinat;
    ariaLabel?: string;
  }>(),
  {
    modelValue: undefined,
    disabled: false,
    variant: "default",
    ariaLabel: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const [model] = useOptionalModel<boolean>(props, "modelValue", emit, false);
const groupState = inject<GroupState | null>("groupState", null);
const labelId = useId();
updateModel();

watch(model, (cur) => {
  if (cur && groupState && props.groupValue !== undefined) {
    groupState.select(props.groupValue);
  }
});

watch(
  () => groupState?.selected,
  () => {
    updateModel();
  }
);

const isDisabled = computed(
  (): boolean => groupState?.disabled || props.disabled
);

function updateModel() {
  if (groupState && groupState.selected && props.groupValue !== undefined)
    model.value = groupState.selected == props.groupValue;
}

function toggle() {
  if (isDisabled.value) return;
  model.value = true;
}
</script>

<template>
  <div
    :id="id"
    :name="name || id"
    class="radio"
    :class="[variant, { disabled: isDisabled, active: model }]"
    @click="toggle"
    @keyup.enter.space="toggle"
  >
    <span
      role="radio"
      :aria-checked="model"
      :aria-disabled="isDisabled"
      :aria-label="ariaLabel"
      :aria-labelledby="$slots.default && !ariaLabel ? labelId : undefined"
      :tabindex="isDisabled ? -1 : 0"
      class="out-circle"
      @keydown.space.prevent
    >
      <span class="inside-circle" />
    </span>
    <template v-if="$slots.default">
      <div
        :id="labelId"
        :class="name || id ? 'radio-label cursor-[inherit]' : 'radio-text'"
      >
        <slot />
      </div>
    </template>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.radio {
  @apply inline-flex gap-xs items-center text-xs cursor-pointer text-primary-interaction-default;
}

.radio.active {
  @apply text-primary-interaction-selected;

  .out-circle {
    @apply border-current;
  }

  .inside-circle {
    @apply scale-100;
  }
}

.radio.disabled {
  @apply pointer-events-none;

  .out-circle {
    @apply text-neutral-interaction-disabled;
  }

  .radio-label,
  .radio-text {
    @apply text-neutral-interaction-disabled;
  }
}

.radio.onboarding {
  .out-circle {
    @apply text-xl;
  }

  .radio-label,
  .radio-text {
    @apply text-sm;
  }
}

.out-circle {
  @apply bg-neutral-surface-default inline-flex justify-center items-center box-border w-[1em] h-[1em] border-xxs rounded-full text-base;
}

.inside-circle {
  @apply inline-block w-[.5em] h-[.5em] scale-0 rounded-full bg-current transition-transform ease-out;
}

.radio-label,
.radio-text {
  @apply text-neutral-interaction-default text-xs;
}
</style>

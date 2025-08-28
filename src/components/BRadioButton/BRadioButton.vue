<script setup lang="ts">
import { watch, inject, computed } from "vue";
import type { GroupState } from "../BGroup";
import { useOptionalModel } from "#composables";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    id?: string;
    name?: string;
    groupValue?: any;
    disabled?: boolean;
    isDiv?: boolean;
  }>(),
  {
    modelValue: undefined,
    disabled: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const [model] = useOptionalModel<boolean>(props, "modelValue", emit, false);
const groupState = inject<GroupState | null>("groupState", null);
updateModel();

watch(model, (cur) => {
  if (cur && groupState && props.groupValue !== undefined)
    groupState.select(props.groupValue);
});

watch(
  () => groupState?.selected,
  () => {
    updateModel();
  }
);

const isDisabled = computed((): boolean => {
  if (groupState) return groupState.disabled || props.disabled;
  return props.disabled;
});

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
    role="radio"
    :aria-checked="model"
    :aria-disabled="isDisabled"
    class="bg-neutral-surface-default text-xs relative inline-flex min-h-[3em] min-w-[10em] cursor-pointer items-center justify-center py-base px-2xl font-bold tracking-wider uppercase select-none leading-xs border-xxs border-current text-neutral-interaction-default"
    :class="[
      isDiv ? 'b-radio-div' : 'b-radio-button',
      { active: model, disabled: isDisabled },
    ]"
    tabindex="0"
    @click="toggle"
    @keyup.space="toggle"
  >
    <slot />
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.active {
  @apply bg-primary-interaction-default text-neutral-foreground-negative border-primary-interaction-default;
}

.b-radio-div {
  @apply py-xs px-base min-w-[8em] border-neutral-default rounded-base text-neutral-interaction-default;
}

.b-radio-div > :first-child {
  @apply text-neutral-interaction-default border-neutral-default;
}

.b-radio-div.active {
  @apply bg-primary-surface-highlight text-primary-interaction-default border-primary-interaction-default;
}

.b-radio-div.active > :first-child {
  @apply text-primary-interaction-default border-primary-interaction-default;
}

*.disabled {
  @apply text-neutral-interaction-disabled bg-neutral-surface-disabled border-neutral-disabled pointer-events-none;
}
</style>

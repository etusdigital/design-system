<script setup lang="ts">
import { watch, inject, computed } from "vue";
import type { GroupState } from "../../utils/types/Group";
import { useOptionalModel } from "#composables";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    id?: string;
    name?: string;
    groupValue?: any;
    disabled?: boolean;
    type?: 'default' | 'secondary';
  }>(),
  {
    modelValue: undefined,
    disabled: false,
    type: 'default',
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
    role="button"
    :aria-checked="model"
    :aria-disabled="isDisabled"
    class="toggle"
    :class="[
      type,
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

.toggle {
  @apply relative inline-flex items-center justify-center min-h-3xl min-w-9xl
          bg-neutral-surface-default py-xs px-base cursor-pointer text-xs font-bold text-neutral-interaction-default
          tracking-wider uppercase select-none leading-xs border-current border-xxs border-current;
}

.toggle.disabled {
  @apply text-neutral-interaction-disabled bg-neutral-surface-disabled border-neutral-disabled pointer-events-none;
}

.active {
  @apply bg-primary-interaction-default text-neutral-foreground-negative border-primary-interaction-default;
}

.toggle.secondary {
  @apply py-base px-2xl rounded-base border-neutral-default;
}

.toggle.secondary > :first-child {
  @apply text-neutral-interaction-default border-neutral-default;
}

.toggle.secondary.active {
  @apply bg-primary-surface-highlight text-primary-interaction-default border-primary-interaction-default;
}

.toggle.secondary.active > :first-child {
  @apply text-primary-interaction-default border-primary-interaction-default;
}
</style>

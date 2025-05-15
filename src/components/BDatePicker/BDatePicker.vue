<script setup lang="ts">
import { ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: Date | undefined;
    expanded?: boolean;
    labelValue?: string;
    lang?: string;
    maxInit?: Date;
    maxEnd?: Date;
    disabled?: boolean;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
    absolute?: boolean;
    alignRight?: boolean;
  }>(),
  {
    modelValue: undefined,
    expanded: false,
    lang: "en-US",
    labelValue: "",
    disabled: false,
    required: false,
    isError: false,
    errorMessage: "",
    absolute: false,
    alignRight: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: Date | undefined];
  "update:expanded": [value: boolean];
  apply: [value: Date | undefined];
}>();

const model = ref(props.modelValue);
const isExpanded = ref(props.expanded);

watch(
  () => props.modelValue,
  (value) => (model.value = value)
);
watch(
  () => props.expanded,
  (value) => (isExpanded.value = value)
);

function formatDate(date: Date) {
  return date.toLocaleDateString(props.lang, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function setModel(value: Date | undefined) {
  model.value = value;
  emit("update:modelValue", model.value);
}

function setExpanded(value: boolean) {
  isExpanded.value = value;
  emit("update:expanded", isExpanded.value);
}
</script>

<template>
  <BExpandableContainer
    v-model="isExpanded"
    :disabled="disabled"
    :required="required"
    :absolute="absolute"
    :label-value="labelValue"
    :is-error="isError"
    :error-message="errorMessage"
    :align-right="alignRight"
    hide-arrow
    @update:model-value="setExpanded"
  >
    <div
      class="flex items-center text-lg h-xl text-neutral-interaction-default"
      :class="{
        'text-primary-interaction-default': isExpanded,
        'text-danger-interaction-default': isError,
      }"
    >
      <BIcon name="calendar_month" size="lg" />
    </div>
    <h5 class="whitespace-nowrap" :class="{ 'font-bold': isExpanded }">
      <span v-if="model">
        {{ formatDate(model) }}
      </span>
      <slot v-else />
    </h5>
    <template #content>
      <BDate
        v-model="model"
        :lang="lang"
        :max-init="maxInit"
        :max-end="maxEnd"
        @update:model-value="setModel"
      />
      <div
        class="flex items-center justify-end gap-xs p-xs w-full border-t-xxs border-neutral-default"
      >
        <slot name="actions">
          <BButton size="small" variant="plain" @click="setModel(undefined)">
            <slot name="clear-text"> Clear </slot>
          </BButton>
          <BButton size="small" @click="emit('apply', model)">
            <slot name="apply-text"> Apply </slot>
          </BButton>
        </slot>
      </div>
    </template>
  </BExpandableContainer>
</template>

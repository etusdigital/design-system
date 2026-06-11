<script setup lang="ts">
import type { ContainerModelExtra } from "../types/ContainerModelExtra.ts";
import Container from "./Container.vue";
import { useOptionalModel } from "#composables";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    labelValue?: string;
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    required?: boolean;
    closeOnBlur?: boolean;
    maxHeight?: string;
    minWidth?: string;
    minWidthCard?: string;
    secondary?: boolean;
    hideArrow?: boolean;
    icon?: string;
  }>(),
  {
    modelValue: undefined,
    labelValue: "",
    disabled: false,
    errorMessage: "",
    infoMessage: "",
    isError: false,
    required: false,
    closeOnBlur: true,
    maxHeight: "40px",
    minWidth: "unset",
    secondary: false,
    hideArrow: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean, extra: ContainerModelExtra];
}>();

const [model, setModel] = useOptionalModel<boolean>(
  props,
  "modelValue",
  emit,
  false
);

function changeModel(value: boolean, extra: ContainerModelExtra) {
  setModel(value, extra);
}
</script>

<template>
  <Container class="expandable-container" v-model="model" :label-value="labelValue" :close-on-blur="closeOnBlur"
    :disabled="disabled" :is-error="isError" :error-message="errorMessage" :info-message="infoMessage"
    :required="required" :max-height="maxHeight" :min-width="minWidth" :secondary="secondary" :hide-arrow="hideArrow"
    :icon="icon" @update:model-value="changeModel">
    <slot />

    <template #leading-complement v-if="$slots['leading-complement']">
      <slot name="leading-complement" />
    </template>

    <template #complement v-if="$slots.complement">
      <slot name="complement" />
    </template>

    <template #label v-if="$slots.label">
      <slot name="label" />
    </template>

    <template #content="{ minWidth }">
      <div :style="{ 'min-width': minWidthCard || minWidth }">
        <slot name="card">
          <slot name="content" />
        </slot>
      </div>
    </template>
  </Container>
</template>

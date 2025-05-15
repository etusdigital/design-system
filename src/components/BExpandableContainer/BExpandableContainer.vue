<script setup lang="ts">
import { ref, computed } from "vue";
import type { BContainerModelExtra } from "../../utils/components/BContainerModelExtra.types";
import BContainer from "../../utils/components/Container.vue";
import { useOptionalModel } from "#composables";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    labelValue?: string;
    absolute?: boolean;
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    required?: boolean;
    closeOnBlur?: boolean;
    alignRight?: boolean;
    maxHeight?: string;
    minWidth?: string;
    minWidthCard?: string;
    secondary?: boolean;
    hideArrow?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelValue: "",
    absolute: false,
    disabled: false,
    errorMessage: "",
    infoMessage: "",
    isError: false,
    required: false,
    alignRight: false,
    closeOnBlur: true,
    maxHeight: "40px",
    minWidth: "unset",
    secondary: false,
    hideArrow: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean, extra: BContainerModelExtra];
}>();

const [model, setModel] = useOptionalModel<boolean>(
  props,
  "modelValue",
  emit,
  false
);
const content = ref<HTMLDivElement>();

const isExpanded = computed((): boolean =>
  props.disabled ? false : model.value
);
const isAbsolute = computed((): boolean =>
  isExpanded.value ? props.absolute : true
);

function changeModel(value: boolean, extra: BContainerModelExtra) {
  setModel(value, extra);
}
</script>

<template>
  <BContainer
    v-model="model"
    :label-value="labelValue"
    :close-on-blur="closeOnBlur"
    :disabled="disabled"
    :is-error="isError"
    :error-message="errorMessage"
    :info-message="infoMessage"
    :required="required"
    :max-height="maxHeight"
    :min-width="minWidth"
    :secondary="secondary"
    :hide-arrow="hideArrow"
    @update:model-value="changeModel"
  >
    <slot />

    <template #complement v-if="$slots.complement">
      <slot name="complement" />
    </template>

    <template #label v-if="$slots.label">
      <slot name="label" />
    </template>

    <template #content="{ minWidth }">
      <div
        v-show="isExpanded"
        ref="content"
        class="content-wrapper text-xs top-full transition-[max-height] w-fit duration-100"
        :class="[
          {
            'absolute z-[80]': isAbsolute,
            'max-h-fit': isExpanded,
            'left-0': !alignRight,
            'right-0': alignRight,
          },
        ]"
        :style="{ 'min-width': minWidth }"
      >
        <div
          class="content translate-y-[-100%] transition-translate duration-100 ease-out mt-xs"
          :class="[{ 'translate-y-[0]': isExpanded }]"
        >
          <slot name="card">
            <div
              class="bg-neutral-surface-default shadow-neutral-selected border-xxs border-neutral-default rounded-sm"
            >
              <slot name="content" />
            </div>
          </slot>
        </div>
      </div>
    </template>
  </BContainer>
</template>

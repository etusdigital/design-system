<script setup lang="ts">
import { computed } from "vue";
import { useOptionalModel } from "#composables";
import SelectContainer from "../../utils/components/SelectContainer.vue";
import Option from "@/utils/components/Option.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: number | string;
    expanded?: boolean;
    labelValue?: string;
    options?: number[] | string[];
    absolute?: boolean;
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    required?: boolean;
    placeholder?: string;
    maxHeight?: string;
    minWidth?: string;
  }>(),
  {
    modelValue: undefined,
    expanded: false,
    labelValue: "",
    absolute: true,
    disabled: false,
    isError: false,
    errorMessage: "",
    infoMessage: "",
    required: false,
    placeholder: "",
    maxHeight: "40px",
    minWidth: "15em",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: number | string];
  "update:expanded": [value: boolean];
}>();

const [model] = useOptionalModel<number | string>(props, "modelValue", emit, '');
const [isExpanded] = useOptionalModel<boolean>(props, "expanded", emit, false);
const filteredOptions = computed(() => {
  if (!model.value) return props.options;
  return props.options?.filter((option: any) =>
    option.toString().toLowerCase().includes(model.value?.toString().toLowerCase())
  );
});

function onFocus() {
  isExpanded.value = true;
}

function selectOption(option: number | string) {
  model.value = option;
}
</script>

<template>
  <SelectContainer
    class="auto-complete"
    v-model="isExpanded"
    :absolute="absolute"
    :label-value="labelValue"
    :disabled="disabled"
    :is-error="isError"
    :error-message="errorMessage"
    :info-message="infoMessage"
    :required="required"
    :max-height="maxHeight"
    :min-width="minWidth"
  >
    <template #label>
      <Input
        v-model="model"
        :disabled="disabled"
        :is-error="isError"
        :info-message="infoMessage"
        :placeholder="placeholder"
        :min-width="minWidth"
        icon="unfold_more"
        append-icon
        @focus="onFocus"
      />
    </template>

    <template #options>
      <Option
        :aria-selected="model == option"
        v-for="(option, index) in filteredOptions"
        :key="index"
        :class="{
          'font-bold': model == option,
        }"
        @click="selectOption(option)"
        @keyup.space="selectOption(option)"
      >
        <slot name="option" :option="option" :index="index">
          {{ option }}
        </slot>
      </Option>
    </template>
  </SelectContainer>
</template>
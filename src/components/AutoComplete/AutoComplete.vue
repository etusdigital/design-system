<script setup lang="ts">
import { computed } from "vue";
import { useOptionalModel } from "#composables";
import SelectContainer from "../../utils/components/SelectContainer.vue";
import Option from "@/utils/components/Option.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    expanded?: boolean;
    labelValue?: string;
    items?: string[];
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
  "update:modelValue": [value: string];
  "update:expanded": [value: boolean];
}>();

const [model] = useOptionalModel<string>(props, "modelValue", emit, '');
const [isExpanded] = useOptionalModel<boolean>(props, "expanded", emit, false);
const filteredItems = computed(() => {
  if (!model.value) return props.items;
  return props.items?.filter((item: any) =>
    item.toLowerCase().includes(model.value.toLowerCase())
  );
});

function onFocus() {
  isExpanded.value = true;
}

function selectItem(item: string) {
  model.value = item;
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

    <template #items>
      <Option
        :aria-selected="model == item"
        v-for="(item, index) in filteredItems"
        :key="index"
        :class="{
          'font-bold': model == item,
        }"
        @click="selectItem(item)"
        @keyup.space="selectItem(item)"
      >
        <slot name="item" :item="item" :index="index">
          {{ item }}
        </slot>
      </Option>
    </template>
  </SelectContainer>
</template>
<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import { type Option as OptionType } from "#utils/types/DropOption";
import { isObject } from "../../utils";
import Option from "./Option.vue";

type ModelValue =
  | string
  | number
  | boolean
  | object
  | Array<string | number | boolean | object | OptionType>
  | OptionType
  | undefined;

const props = withDefaults(
  defineProps<{
    modelValue?: ModelValue;
    options: OptionType[];
    labelKey?: string;
    valueKey?: string;
    getObject?: boolean;
    multiple?: boolean;
    disabled?: boolean;
  }>(),
  {
    modelValue: undefined,
    options: () => [] as OptionType[],
    labelKey: "label",
    valueKey: "value",
    getObject: false,
    multiple: false,
    disabled: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: ModelValue];
}>();

const model = ref<ModelValue>(undefined);

watch(() => props.modelValue, checkValidModel, { immediate: true, deep: true });
watch(
  () => props.multiple,
  () => {
    checkValidModel();
    updateModel();
  },
  { immediate: true }
);
watch(
  () => props.getObject,
  () => {
    model.value = undefined;
    updateModel();
  },
  { immediate: true }
);

onBeforeMount(() => {
  checkValidModel();
  updateModel();
});

function checkValidModel() {
  if (props.multiple) {
    if (!props.modelValue) model.value = [];
    else if (!Array.isArray(props.modelValue)) model.value = [props.modelValue];
    else model.value = [...props.modelValue];
  } else if (Array.isArray(props.modelValue)) model.value = props.modelValue[0];
  else model.value = props.modelValue;
}

function updateModel() {
  emit("update:modelValue", model.value);
}

function getOption(option: OptionType) {
  return props.getObject ? option : getValue(option);
}

function getValue(option: OptionType) {
  return isObject(option) ? (option as any)[props.valueKey] : option;
}

function getParent(value: OptionType, options = props.options): OptionType | undefined {
  return options?.find((option: OptionType) => {
    if (!option.options || !option.options.length) return false;

    const founded = option.options.find(
      (x: OptionType) => getValue(x) === getValue(value)
    );
    if (founded) return founded;

    return getParent(value, option.options);
  });
}

function parseModel(value: OptionType, add = false) {
  let originalValue = value;
  value = getOption(value);

  if (props.multiple && Array.isArray(model.value)) {
    if (props.getObject) {
      const parent = getParent(originalValue);
      if (!parent)
        parseOption(originalValue, model.value as Array<OptionType>, add);
      else
        updateSelection(
          originalValue,
          parent,
          model.value as Array<OptionType>,
          add
        );
      model.value = model.value.filter((x: OptionType) => x.options?.length);
    } else {
      const index = model.value.findIndex(
        (x: any) => getValue(x) === getValue(value)
      );

      if (index != -1) model.value.splice(index, 1);
      else if (!originalValue.options?.length) model.value.push(value);

      if (originalValue.options?.length) {
        originalValue.options.forEach((option: OptionType) => {
          parseModel(option, add);
        });
      }
    }
  } else model.value = value;
}

function updateSelection(
  option: OptionType,
  parent: OptionType,
  model: Array<OptionType>,
  add: boolean
) {
  if (!parent.options) return;

  const isLevel = parent.options.findIndex((x) => getValue(x) === getValue(option));

  let index = model.findIndex((x) => getValue(x) === getValue(parent));
  if ((!model.length || index == -1) && add) {
    index = model.length;
    model.push({
      ...parent,
      options: [] as OptionType[],
    });
  }

  if (isLevel == -1) {
    const newParent = getParent(option, parent.options);
    if (model[index]?.options && newParent)
      updateSelection(option, newParent, model[index].options!, add);

    return;
  }

  parseOption(option, model[index].options!, add);

  if (
    index !== -1 &&
    model[index]?.options &&
    !model[index]?.options?.length &&
    !add
  )
    model.splice(index, 1);
}

function parseOption(option: OptionType, options: OptionType[], add: boolean) {
  const index = options.findIndex((x) => getValue(x) === getValue(option));
  if (index != -1) options.splice(index, 1);

  if (add) options.push(JSON.parse(JSON.stringify(option)));
}

function setModel(value: OptionType, add = false) {
  parseModel(value, add);
  updateModel();
}
</script>

<template>
  <div class="tree">
    <Option
      v-for="option in options"
      :key="getValue(option)"
      :model-value="model"
      :option="option"
      :get-object="getObject"
      :label-key="labelKey"
      :value-key="valueKey"
      :multiple="multiple"
      :disabled="disabled"
      @update:model-value="setModel"
    />
  </div>
</template>
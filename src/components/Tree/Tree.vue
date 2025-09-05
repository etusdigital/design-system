<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import { type Item as ItemType } from "#utils/types/DropItem";
import { isObject } from "../../utils";
import Item from "./Item.vue";

type ModelValue =
  | string
  | number
  | boolean
  | object
  | Array<string | number | boolean | object | ItemType>
  | ItemType
  | undefined;

const props = withDefaults(
  defineProps<{
    modelValue?: ModelValue;
    items: ItemType[];
    labelKey?: string;
    valueKey?: string;
    getObject?: boolean;
    multiple?: boolean;
    disabled?: boolean;
  }>(),
  {
    modelValue: undefined,
    items: () => [] as ItemType[],
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

function getItem(item: ItemType) {
  return props.getObject ? item : getValue(item);
}

function getValue(item: ItemType) {
  return isObject(item) ? (item as any)[props.valueKey] : item;
}

function getParent(value: ItemType, items = props.items): ItemType | undefined {
  return items?.find((item: ItemType) => {
    if (!item.items || !item.items.length) return false;

    const founded = item.items.find(
      (x: ItemType) => getValue(x) === getValue(value)
    );
    if (founded) return founded;

    return getParent(value, item.items);
  });
}

function parseModel(value: ItemType, add = false) {
  let originalValue = value;
  value = getItem(value);

  if (props.multiple && Array.isArray(model.value)) {
    if (props.getObject) {
      const parent = getParent(originalValue);
      if (!parent)
        parseItem(originalValue, model.value as Array<ItemType>, add);
      else
        updateSelection(
          originalValue,
          parent,
          model.value as Array<ItemType>,
          add
        );
      model.value = model.value.filter((x: ItemType) => x.items?.length);
    } else {
      const index = model.value.findIndex(
        (x: any) => getValue(x) === getValue(value)
      );

      if (index != -1) model.value.splice(index, 1);
      else if (!originalValue.items?.length) model.value.push(value);

      if (originalValue.items?.length) {
        originalValue.items.forEach((item: ItemType) => {
          parseModel(item, add);
        });
      }
    }
  } else model.value = value;
}

function updateSelection(
  item: ItemType,
  parent: ItemType,
  model: Array<ItemType>,
  add: boolean
) {
  if (!parent.items) return;

  const isLevel = parent.items.findIndex((x) => getValue(x) === getValue(item));

  let index = model.findIndex((x) => getValue(x) === getValue(parent));
  if ((!model.length || index == -1) && add) {
    index = model.length;
    model.push({
      ...parent,
      items: [] as ItemType[],
    });
  }

  if (isLevel == -1) {
    const newParent = getParent(item, parent.items);
    if (model[index]?.items && newParent)
      updateSelection(item, newParent, model[index].items!, add);

    return;
  }

  parseItem(item, model[index].items!, add);

  if (
    index !== -1 &&
    model[index]?.items &&
    !model[index]?.items?.length &&
    !add
  )
    model.splice(index, 1);
}

function parseItem(item: ItemType, items: ItemType[], add: boolean) {
  const index = items.findIndex((x) => getValue(x) === getValue(item));
  if (index != -1) items.splice(index, 1);

  if (add) items.push(JSON.parse(JSON.stringify(item)));
}

function setModel(value: ItemType, add = false) {
  parseModel(value, add);
  updateModel();
}
</script>

<template>
  <div class="tree">
    <Item
      v-for="item in items"
      :key="getValue(item)"
      :model-value="model"
      :item="item"
      :get-object="getObject"
      :label-key="labelKey"
      :value-key="valueKey"
      :multiple="multiple"
      :disabled="disabled"
      @update:model-value="setModel"
    />
  </div>
</template>
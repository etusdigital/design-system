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
  let founded = undefined;
  items?.find((item: ItemType) => {
    if (!item.items || !item.items.length) return false;

    if (item.items.find((x: ItemType) => getValue(x) === getValue(value))) {
      founded = item;
      return founded;
    }

    founded = getParent(value, item.items);
    return founded;
  });

  return founded;
}

function parseModel(value: ItemType) {
  let originalValue = value;
  value = getItem(value);
  console.log("value", value);

  if (props.multiple && Array.isArray(model.value)) {
    const index = model.value.findIndex(
      (x: any) => getValue(x) === getValue(value)
    );

    let items = originalValue.items || [];

    if (index != -1) {
      if (!props.getObject && !items.length) model.value.splice(index, 1);

      items = items.filter(
        (item: ItemType) =>
          !(model.value as Array<any>).length ||
          (model.value as Array<any>).some(
            (x: ItemType) => getValue(x) === getValue(item)
          )
      );
    } else {
      console.log("items", items);
      if (!props.getObject && !items.length) model.value.push(value);

      items = items.filter(
        (item: ItemType) =>
          !(model.value as Array<any>).length ||
          (model.value as Array<any>).some(
            (x: ItemType) => getValue(x) != getValue(item)
          )
      );
      console.log("items", items);
    }

    const parent = getParent(originalValue);
    if (parent && props.getObject) {
      const parentIndex = model.value.findIndex(
        (x: ItemType) => getValue(x) === getValue(parent)
      );

      if (parentIndex != -1 && index != -1) {
        const notSelectedChilds = parent.items?.filter((item: ItemType) =>
          (model.value as Array<any>).find(
            (x: ItemType) =>
              getValue(x) != getValue(item) &&
              getValue(x) != getValue(originalValue)
          )
        );
        model.value.splice(parentIndex, 1);
        model.value.push(...(notSelectedChilds || []));
      } else if (index == -1 && parentIndex == -1) {
        const selectedChilds = parent.items?.filter((item: ItemType) =>
          (model.value as Array<any>).find(
            (x: ItemType) => getValue(x) === getValue(item)
          )
        );

        if (selectedChilds && selectedChilds?.length == parent?.items?.length) {
          model.value = model.value.filter(
            (x: ItemType) =>
              !selectedChilds.some((y: ItemType) => getValue(y) === getValue(x))
          ) as Array<ItemType>;
          (model.value as Array<ItemType>).push(getItem(parent));
        }
      }
    }

    console.log("items", items);
    if (items?.length)
      items.forEach((item: ItemType) => {
        parseModel(item);
      });
  } else model.value = value;
}

function setModel(value: ItemType) {
  parseModel(value);
  updateModel();
}
</script>

<template>
  {{ model }}
  <div class="tree">
    <Item
      v-for="item in items"
      :key="getValue(item)"
      :model-value="model"
      :item="item"
      :label-key="labelKey"
      :value-key="valueKey"
      :multiple="multiple"
      :disabled="disabled"
      @update:model-value="setModel"
    />
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";
</style>

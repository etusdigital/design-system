<script setup lang="ts">
import { onBeforeMount, computed } from "vue";
import { useOptionalModel } from "#composables";
import { checkPath, isObject } from "../../utils";
import { type Item as ItemType } from "../../utils/types/MenuItem";
import Item from "./Item.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    options: ItemType[];
    parentPath?: string;
    getObject?: boolean;
  }>(),
  {
    modelValue: undefined,
    getObject: false,
    parentPath: "",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

const [model] = useOptionalModel<any>(props, "modelValue", emit, "");
const parsedItems = computed(() => [
  props.options.filter((item) => !item.bottom),
  props.options.filter((item) => item.bottom),
]);

const computedHeight = computed((): string => {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    const navBarHeight = document.querySelector(".navbar")?.clientHeight;
    return navBarHeight ? `calc(100vh - ${navBarHeight}px)` : "100vh";
  }
  return "100vh";
});

onBeforeMount(() => {
  const item = getPaths(props.options, props.parentPath).find((item) =>
    checkPath(item.path)
  );
  if (item) changeModel(item.value);
});

function getPaths(
  options: ItemType[],
  parentPath: string = ""
): { path: string; value: any }[] {
  const result: { path: string; value: any }[] = [];

  for (const item of options) {
    const currentPath = parentPath ? `${parentPath}/${item.path}` : item.path;

    if (item.items?.length) {
      result.push(...getPaths(item.items, currentPath));
    } else {
      result.push({ path: currentPath || "", value: item.value });
    }
  }
  return result;
}

function changeSelected(options: ItemType[], value: string): boolean {
  let selected = false;
  for (const item of options) {
    if (item.items && item.items.length)
      item.selected = changeSelected(item.items, value);
    else item.selected = item.value == value;

    if (item.selected) selected = true;
  }
  return selected;
}

function changeModel(item: ItemType) {
  const value = props.getObject ? item : getValue(item);
  model.value = value;

  changeSelected(props.options, value);
  emit("update:modelValue", value);
}

function getValue(item: any) {
  return isObject(item) ? item.value : item;
}
</script>

<template>
  <div class="sidebar">
    <div
      class="options-container"
      v-for="(options, index) in parsedItems"
      :key="index"
    >
      <Item
        v-for="item in options"
        v-model="model"
        v-model:selected="item.selected"
        :key="item.value"
        :item="item"
        :get-object="getObject"
        :parent-path="parentPath"
        @update:model-value="changeModel"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.sidebar {
  @apply flex flex-col justify-between gap-sm w-fit py-lg px-sm bg-default border-r-xxs border-r-neutral-default;
  height: v-bind(computedHeight);
}

.options-container {
  @apply flex flex-col gap-sm;
}
</style>

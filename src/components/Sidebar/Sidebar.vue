<script setup lang="ts">
import { onBeforeMount, computed } from "vue";
import { useOptionalModel } from "#composables";
import { checkPath, isObject } from "../../utils";
import { type Option as OptionType } from "../../utils/types/MenuOption";
import Option from "./Option.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    options: OptionType[];
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
const parsedOptions = computed(() => [
  props.options.filter((option) => !option.bottom),
  props.options.filter((option) => option.bottom),
]);

const computedHeight = computed((): string => {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    const navBarHeight = document
      .querySelector(".navbar")
      ?.getBoundingClientRect()?.height;
    return navBarHeight ? `calc(100vh - ${navBarHeight}px)` : "100vh";
  }
  return "100vh";
});

onBeforeMount(() => {
  const option = getPaths(props.options, props.parentPath).find((option) =>
    checkPath(option.path)
  );
  if (option) changeModel(option.value);
});

function getPaths(
  options: OptionType[],
  parentPath: string = ""
): { path: string; value: any }[] {
  const result: { path: string; value: any }[] = [];

  for (const option of options) {
    const currentPath = parentPath
      ? `${parentPath}/${option.path}`
      : option.path;

    if (option.options?.length)
      result.push(...getPaths(option.options, currentPath));
    else result.push({ path: currentPath || "", value: option.value });
  }
  return result;
}

function changeSelected(options: OptionType[], value: any): boolean {
  let selected = false;
  for (const option of options) {
    if (option.options && option.options.length)
      option.selected = changeSelected(option.options, value);
    else option.selected = option.value == value;

    if (option.selected) {
      selected = true;
      break;
    }
  }
  return selected;
}

function changeModel(option: OptionType) {
  const value = props.getObject ? option : getValue(option);
  model.value = value;

  changeSelected(props.options, value);
  emit("update:modelValue", value);
}

function getValue(option: any) {
  return isObject(option) ? option.value : option;
}
</script>

<template>
  <div class="sidebar">
    <div
      class="options-container"
      v-for="(options, index) in parsedOptions"
      :key="index"
    >
      <Option
        v-for="option in options"
        v-model="model"
        v-model:selected="option.selected"
        :key="option.value"
        :option="option"
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

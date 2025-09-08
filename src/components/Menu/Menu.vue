<script setup lang="ts">
import { onBeforeMount, computed, resolveComponent } from "vue";
import { useOptionalModel } from "#composables";
import { checkPath, isObject } from "../../utils";
import { type Option } from "../../utils/types/MenuOption";
import MenuOption from "../../utils/components/MenuOption.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    expanded?: boolean;
    options: Option[];
    getObject?: boolean;
  }>(),
  {
    modelValue: undefined,
    expanded: false,
    getObject: false,
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
    const navBarHeight = document.querySelector(".navbar")?.scrollHeight;
    return navBarHeight ? `calc(100vh - ${navBarHeight}px)` : "100vh";
  }
  return "100vh";
});

onBeforeMount(() => {
  const option = props.options.find((option) => checkPath(option.path || ""));
  if (option) changeModel(option);
});

function changeModel(option: Option) {
  model.value = props.getObject ? option : getValue(option);
  emit("update:modelValue", model.value);
}

function getValue(option: Option) {
  return isObject(option) ? option.value : option;
}

function getPath(path: string | undefined): string {
  if (!path) return "";
  else if (!path.startsWith("/")) return "/" + path;
  return path;
}

function getContainer() {
  if (props.expanded) return "div";
  return "tooltip";
}

function getLinkComponent() {
  if (typeof resolveComponent("router-link") != "string") return "router-link";
  else if (typeof resolveComponent("nuxt-link") != "string") return "nuxt-link";
  return "a";
}
</script>

<template>
  <div class="menu">
    <div
      class="options-container"
      v-for="(options, index) in parsedOptions"
      :key="index"
    >
      <component
        :is="getContainer()"
        v-for="option in options"
        :key="option.value"
        :label-value="option.label"
      >
        <component
          :is="getLinkComponent()"
          class="hover:no-underline"
          :class="{ 'pointer-events-none': option.disabled }"
          :to="getPath(option.path)"
          :href="getLinkComponent() == 'a' ? getPath(option.path) : undefined"
          @click="changeModel(option)"
        >
          <MenuOption
            :icon="option.icon"
            :label="expanded ? option.label : ''"
            :selected="option.value == getValue(model)"
            :disabled="option.disabled"
          />
        </component>
      </component>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.menu {
  @apply flex flex-col justify-between gap-sm w-fit py-lg px-xs bg-default border-r-xxs border-r-neutral-default;
  height: v-bind(computedHeight);
}

.options-container {
  @apply flex flex-col gap-sm;
}
</style>

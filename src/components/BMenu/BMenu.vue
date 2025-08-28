<script setup lang="ts">
import { onBeforeMount, computed, resolveComponent } from "vue";
import { useOptionalModel } from "#composables";
import { checkPath, isObject } from "../../utils";
import { type Item } from "../../utils/types/MenuItem";
import MenuOption from "../../utils/components/MenuOption.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    expanded?: boolean;
    items: Item[];
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
const parsedItems = computed(() => [
  props.items.filter((item) => !item.bottom),
  props.items.filter((item) => item.bottom),
]);
const computedHeight = computed((): string => {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    const navBarHeight = document.querySelector(".b-navbar")?.scrollHeight;
    return navBarHeight ? `calc(100vh - ${navBarHeight}px)` : "100vh";
  }
  return "100vh";
});

onBeforeMount(() => {
  const item = props.items.find((item) => checkPath(item.path || ""));
  if (item) changeModel(item);
});

function changeModel(item: Item) {
  model.value = props.getObject ? item : getValue(item);
  emit("update:modelValue", model.value);
}

function getValue(item: Item) {
  return isObject(item) ? item.value : item;
}

function getPath(path: string | undefined): string {
  if (!path) return "";
  else if (!path.startsWith("/")) return "/" + path;
  return path;
}

function getContainer() {
  if (props.expanded) return "div";
  return "b-tooltip";
}

function getLinkComponent() {
  if (typeof resolveComponent("router-link") != "string") return "router-link";
  else if (typeof resolveComponent("nuxt-link") != "string") return "nuxt-link";
  return "a";
}
</script>

<template>
  <div class="b-menu">
    <div
      class="items-container"
      v-for="(items, index) in parsedItems"
      :key="index"
    >
      <component
        :is="getContainer()"
        v-for="item in items"
        :key="item.value"
        :label-value="item.label"
      >
        <component
          :is="getLinkComponent()"
          class="hover:no-underline"
          :class="{ 'pointer-events-none': item.disabled }"
          :to="getPath(item.path)"
          :href="getLinkComponent() == 'a' ? getPath(item.path) : undefined"
          @click="changeModel(item)"
        >
          <MenuOption
            :icon="item.icon"
            :label="expanded ? item.label : ''"
            :selected="item.value == getValue(model)"
            :disabled="item.disabled"
          />
        </component>
      </component>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.b-menu {
  @apply flex flex-col justify-between gap-sm w-fit py-lg px-xs bg-default border-r-xxs border-r-neutral-default;
  height: v-bind(computedHeight);
}

.items-container {
  @apply flex flex-col gap-sm;
}
</style>

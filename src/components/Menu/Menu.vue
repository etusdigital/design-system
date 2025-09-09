<script setup lang="ts">
import { onBeforeMount, computed, resolveComponent, ref, watch } from "vue";
import { checkPath, isObject } from "../../utils";
import { type Option } from "../../utils/types/MenuOption";
import MenuOption from "../../utils/components/MenuOption.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: Option | string | undefined;
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

const model = ref<Option | string | undefined>(props.modelValue);
const menu = ref<HTMLElement | null>(null);
const isExpanded = ref(false);
const parsedOptions = computed(() => [
  props.options.filter((option) => !option.bottom),
  props.options.filter((option) => option.bottom),
]);
const parent = computed(() => {
  return getParent(props.options);
});
const computedMaxWidth = computed((): string => {
  if (!menu.value) return "100vw";

  const maxWidth = menu.value.getBoundingClientRect().width || 0;
  return `calc(100vw - ${maxWidth}px)`;
});
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

watch(
  () => props.modelValue,
  () => {
    model.value = props.modelValue;
  }
);

onBeforeMount(() => {
  const option = getSelected(props.options);
  if (option) changeModel(option);
});

function changeModel(option: Option) {
  if (option.disabled) return;

  if (option.options && option.options.length)
    isExpanded.value = !isExpanded.value;

  console.log(isExpanded.value);
  model.value = props.getObject ? option : getValue(option);
  emit("update:modelValue", model.value);
}

function getParent(options: Option[]): Option | undefined {
  return options.find((option: Option) => {
    const founded = getValue(option) === getValue(model.value);
    if (founded) return founded;

    return getParent(option.options || []);
  });
}

function getSelected(
  options: Option[],
  parentPath: string = ""
): Option | undefined {
  let founded = undefined;
  options.find((option: Option) => {
    if (checkPath(parentPath + option.path || "")) {
      founded = option;
      return founded;
    }

    return getSelected(option.options || [], parentPath + option.path || "");
  });

  return founded;
}

function getValue(option: any) {
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

function getLinkComponent(option: Option) {
  if (option.options && option.options.length) return "div";
  else if (typeof resolveComponent("router-link") != "string")
    return "router-link";
  else if (typeof resolveComponent("nuxt-link") != "string") return "nuxt-link";
  return "a";
}

function handleBlur(event: FocusEvent) {
  const relatedTarget = event.relatedTarget as HTMLElement;
  const currentTarget = event.currentTarget as HTMLElement;

  if (!relatedTarget || !currentTarget.contains(relatedTarget))
    isExpanded.value = false;
}
</script>

<template>
  <div class="menu" tabindex="0" @focusout="handleBlur">
    <div class="menu-options" ref="menu">
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
            :is="getLinkComponent(option)"
            tabindex="0"
            class="rounded-base hover:no-underline"
            :class="{ 'pointer-events-none': option.disabled }"
            :to="getPath(option.path)"
            :href="
              getLinkComponent(option) == 'a' ? getPath(option.path) : undefined
            "
            @click="changeModel(option)"
            @keyup.enter="changeModel(option)"
          >
            <MenuOption
              tabindex="-1"
              :icon="option.icon"
              :label="expanded ? option.label : ''"
              :selected="option.value == getValue(parent)"
              :disabled="option.disabled"
            />
          </component>
        </component>
      </div>
    </div>
    <Transition name="expand">
      <Sidebar
        v-if="isExpanded && parent && parent.options && parent.options.length"
        v-model="model"
        :options="parent.options"
        :parent-path="getPath(parent.path)"
        :get-object="props.getObject"
        @update:model-value="changeModel"
      />
    </Transition>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.menu {
  @apply relative flex w-fit;
  height: v-bind(computedHeight);
}

.menu-options {
  @apply flex flex-col justify-between gap-sm w-fit h-full py-lg px-xs bg-default border-r-xxs border-r-neutral-default;
}

.options-container {
  @apply flex flex-col gap-sm;
}

.sidebar {
  @apply absolute left-[100%] min-w-max;
  max-width: v-bind(computedMaxWidth);
}

.expand-enter-active,
.expand-leave-active {
  @apply transition-all duration-300 overflow-hidden;
}

.expand-enter-from,
.expand-leave-to {
  @apply opacity-0 translate-x-[-10px] max-w-0;
}

.expand-enter-to,
.expand-leave-from {
  @apply opacity-100;
  max-width: v-bind(computedMaxWidth);
}
</style>

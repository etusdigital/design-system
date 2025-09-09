<script setup lang="ts">
import { onBeforeMount, computed, resolveComponent, ref, watch } from "vue";
import { checkPath, isObject } from "../../utils";
import { type Option as OptionType } from "../../utils/types/SidebarOption.ts";
import SubOption from "./SubOption.vue";
import Option from "./Option.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: OptionType | string | undefined;
    expanded?: boolean;
    options: OptionType[];
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

const model = ref<OptionType | string | undefined>(props.modelValue);
const sidebar = ref<HTMLElement | null>(null);
const isExpanded = ref(false);
const clicked = ref<OptionType | undefined>(undefined);
const parsedOptions = computed(() => parseOptions(props.options));
const parent = computed(() => getParent(props.options));

const computedMaxWidth = computed((): string => {
  if (!sidebar.value) return "100vw";

  const maxWidth = sidebar.value.getBoundingClientRect().width || 0;
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

function changeModel(option: OptionType, root: boolean = false) {
  if (option?.disabled) return;

  if (option?.options && option?.options.length && root) {
    clicked.value = option;     
    isExpanded.value = !isExpanded.value;
    return;
  }

  console.log(isExpanded.value);
  model.value = props.getObject ? option : getValue(option);
  emit("update:modelValue", model.value);
}

function parseOptions(options: OptionType[] = props.options): OptionType[][] {
  return [
    options.filter((option) => !option.bottom),
    options.filter((option) => option.bottom),
  ];
}

function getParent(options: OptionType[]): OptionType | undefined {
  return options.find((option: OptionType) => {
    const founded = getValue(option) === getValue(model.value);
    if (founded) return founded;

    return getParent(option.options || []);
  });
}

function getSelected(
  options: OptionType[],
  parentPath: string = ""
): OptionType | undefined {
  let founded = undefined;
  options.find((option: OptionType) => {
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

function getLinkComponent(option: OptionType) {
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
  <div class="sidebar" tabindex="0" @focusout="handleBlur">
    <div class="sidebar-options" ref="sidebar">
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
            @click="changeModel(option, true)"
            @keyup.enter="changeModel(option, true)"
          >
            <Option
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
      <div
        v-if="isExpanded && clicked && clicked.options && clicked.options.length"
        class="sub-options"
      >
        <div
          class="options-container"
          v-for="(options, index) in parseOptions(clicked.options)"
          :key="index"
        >
          <SubOption
            v-for="option in options"
            :model-value="model"
            :key="option.value"
            :option="option"
            :parent-path="getPath(clicked.path)"
            @update:model-value="changeModel"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.sidebar {
  @apply relative flex w-fit;
  height: v-bind(computedHeight);
}

.sidebar-options, .sub-options {
  @apply flex flex-col justify-between gap-sm w-fit h-full py-lg px-xs bg-default border-r-xxs border-r-neutral-default;
}

.options-container {
  @apply flex flex-col gap-sm;
}

.sub-options {
  @apply absolute left-[100%] min-w-max;
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

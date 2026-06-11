<script setup lang="ts">
import { computed, resolveComponent, ref, inject } from "vue";
import { type Option as OptionType } from "../../utils/types/SidebarOption.ts";
import Option from "./Option.vue";
import { isObject } from "../../utils";

const props = withDefaults(
  defineProps<{
    option: OptionType;
    parentPath?: string;
    bold?: boolean;
  }>(),
  {
    parentPath: "",
    bold: false,
  }
);

interface SidebarContext {
  currentValue: { value: any };
  onChange: (option: OptionType) => void;
}

const ctx = inject<SidebarContext>("sidebarContext")!;

const expanded = ref(false);

const hasChildren = computed(
  () => !!(props.option.options && props.option.options.length)
);

const path = computed(() => {
  let path = props.parentPath;
  if (props.option.path) {
    if (!path.endsWith("/") && !props.option.path.startsWith("/")) path += "/";
    else if (path.endsWith("/") && props.option.path.startsWith("/"))
      path = path.slice(0, -1);
    path += props.option.path;
  }
  return path;
});

const isSelected = computed(() => getSelected(props.option));

function getSelected(option: OptionType): boolean {
  return (
    getValue(ctx.currentValue.value) === getValue(option) ||
    !!(
      option.options &&
      option.options.length &&
      option.options.some(getSelected)
    )
  );
}

function changeModel(option: OptionType) {
  if (option.options && option.options.length) {
    expanded.value = !expanded.value;
    return;
  }
  ctx.onChange(option);
}

function getValue(option: any) {
  return isObject(option) ? option.value : option;
}

function getLinkComponent() {
  if (hasChildren.value) return "div";
  if (typeof resolveComponent("router-link") != "string") return "router-link";
  else if (typeof resolveComponent("nuxt-link") != "string") return "nuxt-link";
  return "a";
}
</script>

<template>
  <component
    :key="option.value"
    :is="getLinkComponent()"
    tabindex="0"
    class="option"
    :class="{ selected: isSelected, 'pointer-events-none': option.disabled }"
    :to="path"
    :href="getLinkComponent() == 'a' ? path : undefined"
    @click="changeModel(option)"
    @keyup.enter="changeModel(option)"
  >
    <Option
      tabindex="-1"
      :class="{ expanded: expanded, bold: bold }"
      :label="option.label"
      :icon="option.icon"
      :selected="isSelected"
      :disabled="option.disabled"
    >
      <Icon
        v-if="hasChildren"
        name="keyboard_arrow_down"
        :class="{ 'rotate-180': expanded }"
        class="sub-option-chevron transition-transform"
      />
    </Option>
    <Transition name="expand">
      <div v-if="hasChildren && expanded" class="options-container">
        <SubOption
          v-for="subOption in option.options"
          :key="subOption.value"
          :option="subOption"
          :parent-path="path"
          bold
        />
      </div>
    </Transition>
  </component>
</template>

<style scoped>
@reference "../../assets/main.css";

.option {
  @apply rounded-base;
}

.option:hover {
  @apply no-underline bg-primary-surface-default;
}

.option.selected {
  @apply bg-primary-surface-default;
}

.menu-option.selected.bold {
  @apply font-bold;
}

.options-container {
  @apply pl-xl rounded-sm;
}

.option > :deep(.sidebar-option) > .icon:not(.sub-option-chevron) {
  @apply text-2xl leading-none;
}

.option > :deep(.sidebar-option) > .icon.sub-option-chevron {
  @apply text-xl leading-none;
}

.expand-enter-active,
.expand-leave-active {
  @apply transition-all duration-300 overflow-hidden;
}

.expand-enter-from,
.expand-leave-to {
  @apply opacity-0 translate-y-[-10px] max-h-0;
}

.expand-enter-to,
.expand-leave-from {
  @apply opacity-100 max-h-screen;
}
</style>

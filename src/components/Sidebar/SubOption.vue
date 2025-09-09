<script setup lang="ts">
import { useOptionalModel } from "#composables";
import { type Option as OptionType } from "../../utils/types/SidebarOption.ts";
import Option from "./Option.vue";
import { computed, resolveComponent } from "vue";
import { isObject } from "../../utils";

const props = withDefaults(
  defineProps<{
    modelValue?: OptionType | string | undefined;
    option: OptionType;
    parentPath?: string;
    bold?: boolean;
  }>(),
  {
    modelValue: undefined,
    parentPath: "",
    bold: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: OptionType];
}>();

const [model] = useOptionalModel<any>(props, "modelValue", emit, "");

const path = computed(() => {
  let path = props.parentPath;
  if (props.option.path) {
    if (!path.endsWith('/') && !props.option.path.startsWith('/')) path += '/';
    else if (path.endsWith('/') && props.option.path.startsWith('/')) path = path.slice(0, -1);
    path += props.option.path;
  }
  return path;
});

const isSelected = computed(() => {
  return !!getSelected();
});

function changeModel(option: OptionType) {
  if (option.options && option.options.length) {
    option.expanded = !option.expanded;
    return;
  }

  model.value = option;
  emit("update:modelValue", option);
}

function getValue(option: OptionType) {
  return isObject(option) ? option.value : option;
}

function getLinkComponent() {
  if (typeof resolveComponent('router-link') != 'string') return 'router-link'
  else if (typeof resolveComponent('nuxt-link') != 'string') return 'nuxt-link'
  else if (props.option.options && props.option.options.length) return 'div'
  return 'a'
}

function getSelected(option: OptionType = props.option) {
  return getValue(model.value) === getValue(option) || (option.options && option.options.length && option.options.some(getSelected))
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
      :class="{ expanded: option.expanded, bold: bold }"
      :label="option.label"
      :icon="option.icon"
      :selected="isSelected"
      :disabled="option.disabled"
    >
      <Icon
        v-if="option.options && option.options.length"
        name="keyboard_arrow_down"
        :class="{ 'rotate-180': option.expanded }"
        class="transition-transform"
      />
    </Option>
    <Transition name="expand">
      <div
        v-if="option.options && option.options.length && option.expanded"
        class="options-container"
      >
        <SubOption
          v-for="subOption in option.options"
          v-model="model"
          :key="subOption.value"
          :option="subOption"
          :parent-path="path"
          bold
          @update:model-value="changeModel"
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

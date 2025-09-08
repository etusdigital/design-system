<script setup lang="ts">
import { useOptionalModel } from "#composables";
import { type Option as OptionType } from "../../utils/types/MenuOption";
import MenuOption from "../../utils/components/MenuOption.vue";
import { computed, resolveComponent } from "vue";
import { isObject } from "../../utils";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    option: OptionType;
    getObject?: boolean;
    parentPath?: string;
    selected?: boolean;
    bold?: boolean;
  }>(),
  {
    modelValue: undefined,
    getObject: false,
    parentPath: "",
    selected: false,
    bold: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
  "update:selected": [value: boolean, option?: OptionType];
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
  return props.option.value == getValue(model.value) || props.selected;
});

function changeModel(option: OptionType) {
  if (option.options && option.options.length) {
    option.expanded = !option.expanded;
    return;
  }

  const value = props.getObject ? option : getValue(option);
  model.value = value;
  emit("update:modelValue", value);
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
</script>

<template>
  <component
    :key="option.value"
    :is="getLinkComponent()"
    class="option"
    :class="{ selected: isSelected, 'pointer-events-none': option.disabled }"
    :to="path"
    :href="getLinkComponent() == 'a' ? path : undefined"
  >
    <MenuOption
      :class="{ expanded: option.expanded, bold: bold }"
      :label="option.label"
      :icon="option.icon"
      :selected="isSelected"
      :disabled="option.disabled"
      @click="changeModel(option)"
    >
      <Icon
        v-if="option.options && option.options.length"
        name="keyboard_arrow_down"
        :class="{ 'rotate-180': option.expanded }"
        class="transition-transform"
      />
    </MenuOption>
    <Transition name="expand">
      <div
        v-if="option.options && option.options.length && option.expanded"
        class="options-container"
      >
        <Option
          v-for="subOption in option.options"
          v-model="model"
          v-model:selected="subOption.selected"
          :key="subOption.value"
          :option="subOption"
          :get-object="getObject"
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

.menu-option.expanded {
  @apply hover:rounded-none;
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

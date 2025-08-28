<script setup lang="ts">
import { useOptionalModel } from "#composables";
import { type Item } from "../../utils/types/MenuItem";
import MenuOption from "../../utils/components/MenuOption.vue";
import { computed, resolveComponent } from "vue";
import { isObject } from "../../utils";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    item: Item;
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
  "update:selected": [value: boolean, item?: Item];
}>();

const [model] = useOptionalModel<any>(props, "modelValue", emit, "");

const path = computed(() => {
  let path = props.parentPath;
  if (props.item.path) {
    if (!path.endsWith('/') && !props.item.path.startsWith('/')) path += '/';
    else if (path.endsWith('/') && props.item.path.startsWith('/')) path = path.slice(0, -1);
    path += props.item.path;
  }
  return path;
});
const isSelected = computed(() => {
  return props.item.value == getValue(model.value) || props.selected;
});

function changeModel(item: Item) {
  if (item.items && item.items.length) {
    item.expanded = !item.expanded;
    return;
  }

  const value = props.getObject ? item : getValue(item);
  model.value = value;
  emit("update:modelValue", value);
}

function getValue(item: Item) {
  return isObject(item) ? item.value : item;
}

function getLinkComponent() {
  if (typeof resolveComponent('router-link') != 'string') return 'router-link'
  else if (typeof resolveComponent('nuxt-link') != 'string') return 'nuxt-link'
  else if (props.item.items && props.item.items.length) return 'div'
  return 'a'
}
</script>

<template>
  <component
    :key="item.value"
    :is="getLinkComponent()"
    class="item"
    :class="{ selected: isSelected, 'pointer-events-none': item.disabled }"
    :to="path"
    :href="getLinkComponent() == 'a' ? path : undefined"
  >
    <MenuOption
      class="menu-item"
      :class="{ expanded: item.expanded, bold: bold }"
      :label="item.label"
      :icon="item.icon"
      :selected="isSelected"
      :disabled="item.disabled"
      @click="changeModel(item)"
    >
      <Icon
        v-if="item.items && item.items.length"
        name="keyboard_arrow_down"
        :class="{ 'rotate-180': item.expanded }"
        class="transition-transform"
      />
    </MenuOption>
    <Transition name="expand">
      <div
        v-if="item.items && item.items.length && item.expanded"
        class="items-container"
      >
        <Item
          v-for="subItem in item.items"
          v-model="model"
          v-model:selected="item.selected"
          :key="subItem.value"
          :item="subItem"
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

.item {
  @apply rounded-base;
}

.item:hover {
  @apply no-underline bg-primary-surface-default;
}

.item.selected {
  @apply bg-primary-surface-default;
}

.menu-item.expanded {
  @apply hover:rounded-none;
}

.menu-item.selected.bold {
  @apply font-bold;
}

.items-container {
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

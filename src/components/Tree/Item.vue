<script setup lang="ts">
import { ref, watch } from "vue";
import { type Item } from "#utils/types/DropItem";
import { isObject } from "../../utils";
import Option from "../../utils/components/Option.vue";

const props = withDefaults(
  defineProps<{
    modelValue: any;
    item: Item;
    labelKey: string;
    valueKey: string;
    multiple: boolean;
    selected?: boolean;
    disabled?: boolean;
    getObject?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelKey: "label",
    valueKey: "value",
    multiple: false,
    selected: false,
    disabled: false,
    getObject: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any, add: boolean];
}>();

const expanded = ref(false);
const isSelected = ref<boolean | null>(getSelected());

watch(
  () => props.modelValue,
  () => {
    isSelected.value = getSelected();
    console.log("isSelected", props.item, isSelected.value);
  },
  { immediate: true, deep: true }
);

function getLabel(item: Item) {
  return isObject(item) ? (item as any)[props.labelKey] : item;
}

function getIcon(item: Item) {
  return isObject(item) ? (item as any).icon : "";
}

function getValue(item: any) {
  return isObject(item) ? item[props.valueKey] : item;
}

function getModel() {
  if (props.getObject && props.multiple)
    return (
      props.modelValue.find((x: any) => getValue(x) === getValue(props.item))
        ?.items || []
    );
  else return props.modelValue;
}

function getSelected(item: Item = props.item, model = props.modelValue) {
  if (Array.isArray(model)) {
    const selected = model.find((x: any) => getValue(x) === getValue(item));

    if (
      ((selected && props.getObject) || (!props.getObject && !selected)) &&
      item.items?.length
    ) {
      if (props.getObject && selected) model = selected.items;

      const isChildSelected = item.items?.filter(
        (x: any) => getSelected(x, model) === true
      );

      console.log("isChildSelected", item, isChildSelected.length, model);
      if (isChildSelected.length == item.items?.length) return true;
      else if (
        item.items?.filter((x: any) => getSelected(x, model) != false).length
      )
        return null;
    }

    return !!selected;
  } else return getValue(model) === getValue(item);
}

function setModel(value: Item, add = !isSelected.value && !props.selected) {
  emit("update:modelValue", value, add);
}
</script>

<template>
  <div class="tree-item">
    <div>
      <Option
        :aria-selected="isSelected"
        :disabled="item.disabled || disabled"
        :no-hover="multiple"
        :selected="!multiple && !!isSelected"
        class="tree-item-container"
        :tabindex="-1"
      >
        <Icon
          v-if="item.items && item.items.length"
          name="keyboard_arrow_right"
          :class="{ 'rotate-90': expanded }"
          class="transition-transform"
          @click="expanded = !expanded"
        />
        <div
          class="tree-item-option"
          :class="{ 'pointer-events-none': item.disabled || disabled }"
          tabindex="0"
          @click="setModel(item)"
          @keyup.space="setModel(item)"
          @keyup.enter="setModel(item)"
        >
          <Checkbox
            v-if="multiple"
            :model-value="selected || isSelected"
            allow-indeterminate
            :disabled="item.disabled || disabled"
            class="pointer-events-none"
            @update:model-value="setModel(item)"
          />
          <Icon v-if="getIcon(item)" :name="getIcon(item)" />
          {{ getLabel(item) }}
        </div>
      </Option>
    </div>
    <Transition name="expand">
      <div
        v-if="expanded && item.items && item.items.length"
        class="tree-sub-items"
      >
        <Item
          v-for="subItem in item.items"
          :key="subItem.value"
          :model-value="getModel()"
          :item="subItem"
          :selected="!!isSelected || selected"
          :label-key="labelKey"
          :value-key="valueKey"
          :multiple="multiple"
          :disabled="disabled"
          :get-object="getObject"
          @update:model-value="setModel"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.tree-item {
  @apply flex flex-col;
}

.tree-item-container {
  @apply flex items-center gap-xxs py-xxs px-xs;
}

.tree-item-option {
  @apply flex items-center gap-xxs flex-1;
}

.tree-item-option .icon {
  @apply text-xl;
}

.tree-sub-items {
  @apply pl-xl;
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

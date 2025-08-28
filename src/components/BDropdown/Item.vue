<script setup lang="ts">
import { useOptionalModel } from "#composables";
import { type Item } from "#utils/types/DropItem";
import { isObject } from "../../utils";
import Items from "./Items.vue";

const props = withDefaults(
  defineProps<{
    modelValue: any;
    selected: boolean | undefined;
    item: Item;
    getObject: boolean;
  }>(),
  {
    modelValue: undefined,
    selected: false,
    getObject: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
  "update:selected": [value: boolean];
}>();

const [model] = useOptionalModel<any>(props, "modelValue", emit, "");
const [isSelected] = useOptionalModel<boolean>(props, "selected", emit, false);

function selectItem(item: Item) {
  if (!props.item.items?.length) {
    model.value = props.getObject ? item : item.value;
    isSelected.value = true;
    emit("update:selected", true);
  } else {
    props.item.expanded = !props.item.expanded;
  }
}

function changeSelected(selected: boolean) {
  isSelected.value = selected;
  emit("update:selected", selected);
}

function handleBlur() {
  setTimeout(() => {
    props.item.expanded = false;
  }, 200);
}

function getValue(item: any): any {
  return isObject(item) ? item.value : item;
}
</script>

<template>
  <div class="relative" tabindex="0" @blur="handleBlur">
    <div
      class="item"
      :class="{
        selected: item.value === getValue(model) || isSelected,
        disabled: item.disabled,
      }"
      @click="selectItem(item)"
      @keydown.enter="selectItem(item)"
    >
      <div class="flex items-center gap-xs">
        <BIcon :name="item.icon" class="icon" v-if="item.icon" />
        <p class="label">{{ item.label }}</p>
      </div>
      <BIcon
        v-if="item.items && item.items.length"
        name="chevron_right"
        class="icon icon-small"
      />
    </div>
    <Items
      v-if="item.items && item.items.length && item.expanded"
      class="sub-items"
      :items="item.items"
    >
      <template #default="{ items }">
        <Item
          v-for="item in items"
          v-model="model"
          v-model:selected="item.selected"
          :item="item"
          :get-object="getObject"
          @update:model-value="selectItem"
          @update:selected="changeSelected"
        />
      </template>
    </Items>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.custom-card {
  :first-child .item {
    @apply rounded-t-sm;
  }

  :last-child .item {
    @apply rounded-b-sm;
  }
}

.item {
  @apply overflow-hidden text-neutral-interaction-default w-full flex items-center justify-between gap-xs px-base py-sm cursor-pointer
    hover:bg-primary-surface-hover hover:text-primary-interaction-hover;

  .label {
    @apply text-sm whitespace-nowrap;
  }

  .icon.b-icon {
    @apply text-xl flex items-center;
  }
}

.item.selected {
  @apply bg-primary-surface-default text-primary-interaction-selected;
}

.item.disabled {
  @apply pointer-events-none text-neutral-interaction-disabled;
}

.sub-items {
  @apply absolute top-0 z-[60] bg-neutral-surface-default rounded-base flex flex-col shadow-neutral-default max-h-[12em];
  left: calc(100% + var(--spacing-xs));
}

.item .icon.b-icon.icon-small {
  @apply text-base;
}
</style>

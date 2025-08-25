<script setup lang="ts">
import { computed, onBeforeMount, ref, useSlots } from "vue";
import { useOptionalModel } from "#composables";
import Item from "./Item.vue";
import { type Item as ItemType } from "#utils/types/DropItem";
import Items from "./Items.vue";
import { isObject } from "../../utils";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    expanded?: boolean;
    labelValue?: string;
    items: ItemType[];
    absolute?: boolean;
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    required?: boolean;
    maxHeight?: string;
    minWidth?: string;
    getObject?: boolean;
    searchable?: boolean;
  }>(),
  {
    modelValue: undefined,
    expanded: false,
    labelValue: "",
    absolute: true,
    disabled: false,
    isError: false,
    errorMessage: "",
    infoMessage: "",
    required: false,
    maxHeight: "40px",
    minWidth: "15em",
    getObject: false,
    searchable: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
  "update:expanded": [value: boolean];
}>();

const [model] = useOptionalModel<any>(props, "modelValue", emit, "");
const [isExpanded] = useOptionalModel<boolean>(props, "expanded", emit, false);
const search = ref("");
const slots = useSlots();

const selectedItem = computed(() => {
  if (!props.items) return undefined;
  return findItem(props.items, model.value)?.label;
});
const filteredItems = computed(() => {
  if (!props.items) return [];
  else if (!search.value) return props.items;
  return filterItems(props.items, search.value);
});

onBeforeMount(() => {
  updateSearch();
});

function findItem(items: ItemType[], value: string): ItemType | undefined {
  for (const item of items) {
    if (item.value === getValue(value)) {
      return item;
    }
    if (item.items) {
      const found = findItem(item.items, value);
      if (found) return found;
    }
  }
  return undefined;
}

function filterItems(items: ItemType[], value: string): ItemType[] {
  const filteredItems: ItemType[] = [];
  for (const item of items) {
    let found: ItemType[] = [];

    if (item.items && item.items.length) found = filterItems(item.items, value);

    if (
      item.label.toLowerCase().includes(value.toLowerCase()) ||
      found.length
    ) {
      if (found.length) item.items = found;
      filteredItems.push(item);
    }
  }

  return filteredItems;
}

function changeSelected(items: ItemType[], value: any): boolean {
  let selected = false;
  for (const item of items) {
    if (item.items && item.items.length) item.selected = changeSelected(item.items, value);
    else item.selected = item.value == getValue(value);

    if (item.selected) selected = true;
  }
  return selected;
}

function selectItem(value: any) {
  model.value = value;
  isExpanded.value = false;
  updateSearch();
  changeSelected(props.items, value);
}

function onFocus() {
  isExpanded.value = true;
  search.value = "";
}

function updateSearch() {
  setTimeout(() => {
    if (!isExpanded.value && !slots.default && props.searchable)
      search.value = selectedItem.value || "";
  });
}

function getValue(item: any): any {
  return isObject(item) ? item.value : item;
}
</script>

<template>
  <BExpandableContainer
    v-model="isExpanded"
    :absolute="absolute"
    :label-value="labelValue"
    :disabled="disabled"
    :is-error="isError"
    :error-message="errorMessage"
    :info-message="infoMessage"
    :required="required"
    :max-height="maxHeight"
    :min-width="minWidth"
    @update:model-value="updateSearch"
  >
    {{ selectedItem }}
    <template #label>
      <slot>
        <BInput
          v-if="props.searchable"
          v-model="search"
          :disabled="disabled"
          :is-error="isError"
          icon="unfold_more"
          append-icon
          @focus="onFocus"
        />
      </slot>
    </template>
    <template #card>
      <Items :items="filteredItems">
        <template #default="{ items }">
          <Item
            v-for="item in items"
            v-model="model"
            v-model:selected="item.selected"
            :item="item"
            :get-object="getObject"
            @update:model-value="selectItem"
          />
        </template>
      </Items>
    </template>
  </BExpandableContainer>
</template>

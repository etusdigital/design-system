<script setup lang="ts">
import { ref, watch } from "vue";
import { useOptionalModel } from "#composables";
import { type ContainerModelExtra } from "../../utils/components/ContainerModelExtra.types";
import SelectContent from "../../utils/components/SelectContent.vue";
import Option from "../../utils/components/Option.vue";
import { isObject } from "../../utils";

type SelectExpandedExtra = {
  source: ContainerModelExtra["source"] | "value-selected";
};

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    labelValue?: string;
    items: any[];
    icon?: string;
    expanded?: boolean;
    labelKey?: string;
    valueKey?: string;
    searchable?: boolean;
    disabled?: boolean;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    absolute?: boolean;
    secondary?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelValue: "",
    expanded: undefined,
    labelKey: "label",
    valueKey: "value",
    searchable: false,
    disabled: false,
    required: false,
    isError: false,
    errorMessage: "",
    infoMessage: "",
    absolute: true,
    secondary: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any, extra: { index: number }];
  "update:expanded": [value: boolean, extra: SelectExpandedExtra];
}>();

const [model, setModel] = useOptionalModel<any>(
  props,
  "modelValue",
  emit,
  null
);
const [expandedModel, setExpandedModel] = useOptionalModel<boolean>(
  props,
  "expanded",
  emit,
  false
);

let selectedIndex = ref<number | null>(null);
let searchText = ref("");

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) selectedIndex.value = null;
    else {
      const index = props.items.findIndex((x: any) => x == newVal);
      selectedIndex.value = index < 0 ? null : index;
    }
    model.value = props.modelValue;
  }
);

function getLabel(item: any) {
  return isObject(item) ? item[props.labelKey] : item;
}

function getValue(item: any) {
  return isObject(item) ? item[props.valueKey] : item;
}

function selectItem(item: any, index: number) {
  if (props.disabled) return;
  setModel(item, { index });
  selectedIndex.value = index;
  setExpandedModel(false, { source: "value-selected" });
}

function onKeyUp(e: KeyboardEvent) {
  function setSelection(index: number) {
    setModel(props.items[index], { index });
    e.preventDefault();
  }

  switch (e.key) {
    case "ArrowUp":
      {
        if (selectedIndex.value == 0) break;
        const index =
          selectedIndex.value === null
            ? props.items.length - 1
            : selectedIndex.value - 1;
        setSelection(index);
      }
      break;

    case "ArrowDown":
      {
        if (selectedIndex.value == props.items.length - 1) break;
        const index =
          selectedIndex.value === null ? 0 : selectedIndex.value + 1;
        setSelection(index);
      }
      break;

    case "Home":
      setSelection(0);
      break;

    case "End":
      {
        const index = props.items.length - 1;
        setSelection(index);
      }
      break;
  }
}

function searchItem(search: string) {
  if (!search || !props.searchable) {
    return props.items;
  }
  return props.items.filter((item: any) => {
    if (isObject(item)) {
      if (item[props.labelKey].toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    } else {
      if (item.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    }
  });
}

function changeExpanded(value: boolean, extra: any) {
  if (props.searchable && extra?.source == "click")
    setExpandedModel(true, extra);
  else setExpandedModel(value, extra);
}
</script>

<template>
  <SelectContainer
    v-model="expandedModel"
    :label-value="labelValue"
    :absolute="absolute"
    class="select"
    :disabled="disabled"
    :required="required"
    :is-error="isError"
    :error-message="errorMessage"
    :info-message="infoMessage"
    :secondary="secondary"
    aria-multiselectable="false"
    @keyup="onKeyUp"
    @update:model-value="changeExpanded"
  >
    <SelectContent
      v-model="searchText"
      v-model:expanded="expandedModel"
      :disabled="disabled"
      :icon="icon"
      :secondary="secondary"
      :items="items"
      :searchable="searchable"
      @update:expanded="changeExpanded"
    >
      <template #search-label v-if="$slots['search-label']">
        <slot name="search-label" />
      </template>
      <template #status>
        <slot
          name="status"
          :item="model"
          v-if="model && ((!expandedModel && searchable) || !searchable)"
        >
          {{ getLabel(model) }}
        </slot>
        <slot v-else-if="(!expandedModel && searchable) || !searchable" />
      </template>
    </SelectContent>

    <template #items>
      <Option
        :aria-selected="getValue(model) == getValue(item)"
        v-for="(item, index) in searchItem(searchText)"
        :key="index"
        :secondary="secondary"
        :disabled="item.disabled"
        :selected="getValue(model) == getValue(item)"
        @click="selectItem(item, index)"
        @keyup.space="selectItem(item, index)"
      >
        <slot name="item" :item="item" :index="index">
          {{ getLabel(item) }}
        </slot>
      </Option>
    </template>

    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
  </SelectContainer>
</template>

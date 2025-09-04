<script setup lang="ts">
import { ref, watch, computed, onBeforeMount } from "vue";
import { useOptionalModel } from "#composables";
import { type ContainerModelExtra } from "../../utils/types/ContainerModelExtra";
import { isObject } from "../../utils";
import SelectContainer from "../../utils/components/SelectContainer.vue";
import SelectContent from "../../utils/components/SelectContent.vue";
import Option from "../../utils/components/Option.vue";

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
    valueKey?: string;
    labelKey?: string;
    secondary?: boolean;
    searchable?: boolean;
    disabled?: boolean;
    required?: boolean;
    isError?: boolean;
    multiple?: boolean;
    getObject?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    absolute?: boolean;
    clearable?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelValue: "",
    expanded: undefined,
    valueKey: "value",
    labelKey: "label",
    secondary: false,
    searchable: false,
    disabled: false,
    required: false,
    isError: false,
    multiple: false,
    getObject: false,
    errorMessage: "",
    infoMessage: "",
    absolute: false,
    clearable: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
  "update:expanded": [value: boolean, extra: SelectExpandedExtra];
}>();

const model = ref<any>(null);
const [expandedModel, setExpandedModel] = useOptionalModel<boolean>(
  props,
  "expanded",
  emit,
  false
);
const selectedIndex = ref<number | null>(null);
const searchText = ref("");

const showSelected = computed(
  () =>
    props.multiple &&
    model.value.length &&
    !props.disabled &&
    ((!expandedModel.value && props.searchable) || !props.searchable)
);

onBeforeMount(checkValidModel);

watch(() => props.modelValue, checkValidModel, { deep: true, immediate: true });
watch(
  () => props.multiple,
  () => {
    checkValidModel();
    updateModel();
  }
);

function checkValidModel() {
  if (props.multiple) {
    if (!props.modelValue) model.value = [];
    else if (!Array.isArray(props.modelValue)) model.value = [props.modelValue];
    else model.value = [...props.modelValue];
  } else if (Array.isArray(props.modelValue)) model.value = props.modelValue[0];
  else model.value = props.modelValue;
}

function updateModel() {
  emit("update:modelValue", model.value);
}

function setModel(value: any) {
  if (props.multiple) {
    const index = model.value.findIndex(
      (x: any) => getValue(x) === getValue(value)
    );
    if (index != -1) model.value.splice(index, 1);
    else model.value.push(value);
  } else model.value = value;

  updateModel();
}

function findSelected() {
  const item = props.items.find((item: any) => getValue(item) === getValue(model.value));
  return getLabel(item);
}

function getLabel(item: any) {
  return isObject(item) ? item[props.labelKey] : item;
}

function getValue(item: any) {
  return isObject(item) ? item[props.valueKey] : item;
}

function getItem(item: any) {
  return !props.getObject ? getValue(item) : item;
}

function isSelected(item: any) {
  if (Array.isArray(model.value))
    return model.value.some((x: any) => getValue(x) === getValue(item));
  else return getValue(model.value) === getValue(item);
}

function selectItem(item: any) {
  if (props.disabled) return;

  selectedIndex.value = null;
  setModel(getItem(item));
  if (!props.multiple) setExpandedModel(false, { source: "value-selected" });
}

function setSelection(e: KeyboardEvent, index: number) {
  setModel(getItem(props.items[index]));
  e.preventDefault();
}

function onKeyUp(e: KeyboardEvent) {
  switch (e.key) {
    case "ArrowUp":
      {
        if (selectedIndex.value == 0) break;
        selectedIndex.value = selectedIndex.value
          ? selectedIndex.value - 1
          : props.items.length - 1;
      }
      break;

    case "ArrowDown":
      {
        if (selectedIndex.value == props.items.length - 1) break;
        selectedIndex.value = selectedIndex.value ? selectedIndex.value + 1 : 0;
      }
      break;
    case "Home":
      setSelection(e, 0);
      break;

    case "End":
      {
        const index = props.items.length - 1;
        setSelection(e, index);
      }
      break;

    case "Enter":
      if (selectedIndex.value == null) break;
      setSelection(e, selectedIndex.value);
      selectedIndex.value = null;
      break;
  }
}

function searchItem(search: string) {
  if (!search || !props.searchable) return props.items;

  return props.items.filter((item: any) => {
    if (getLabel(item).toLowerCase().includes(search.toLowerCase()))
      return item;
  });
}

function changeExpanded(value: boolean, extra: any) {
  if (props.searchable && extra?.source == "click")
    setExpandedModel(true, extra);
  else setExpandedModel(value, extra);
}

function clearModel() {
  if (!model.value || (Array.isArray(model.value) && !model.value.length))
    return;

  if (props.multiple) model.value = [];
  else model.value = null;

  updateModel();
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
    :aria-multiselectable="multiple"
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
        <slot v-if="showSelected" name="status" :selected="model.length">
          <slot name="status-label" :selected="model.length">
            <span class="font-bold">Selected</span>
          </slot>
        </slot>
        <slot
          name="status"
          :item="model"
          v-else-if="
            findSelected() &&
            !multiple &&
            ((!expandedModel && searchable) || !searchable)
          "
        >
          {{ findSelected() }}
        </slot>
        <slot v-else-if="(!expandedModel && searchable) || !searchable" />
      </template>
    </SelectContent>

    <template #complement v-if="showSelected && multiple">
      <span class="select-count">{{
          model.length
        }}</span>
    </template>

    <template #items>
      <Option
        v-for="(item, index) in searchItem(searchText)"
        :aria-selected="isSelected(item)"
        :key="index"
        :secondary="secondary"
        :disabled="item.disabled"
        :no-hover="multiple"
        :selected="!multiple && isSelected(item)"
        class="flex items-center gap-xxs"
        @click="selectItem(item)"
        @keyup.space="selectItem(item)"
        @keyup.enter="selectItem(item)"
      >
        <Checkbox
          v-if="multiple"
          :model-value="isSelected(item)"
          class="pointer-events-none"
        />
        <slot name="item" :item="item" :index="index">
          {{ getLabel(item) }}
        </slot>
      </Option>
    </template>

    <template #actions v-if="clearable || $slots.actions">
      <slot name="actions">
        <Button variant="plain" size="small" @click="clearModel">
          <slot name="clear-label">Clear</slot>
        </Button>
      </slot>
    </template>
  </SelectContainer>
</template>

<style scoped>
@reference "../../assets/main.css";

.select-count {
  @apply flex items-center justify-center text-neutral-foreground-negative bg-primary-interaction-selected text-xs w-[1.6em] h-[1.6em] rounded-full;
}
</style>

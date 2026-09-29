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
    options: any[];
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
const optionRefs = ref<HTMLElement[]>([]);

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

watch(expandedModel, (value) => {
  if (!value) selectedIndex.value = null;
});

watch(searchText, () => {
  selectedIndex.value = null;
});

watch(
  selectedIndex,
  (index) => {
    if (index == null) return;
    optionRefs.value[index]?.focus();
  },
  { flush: "post" }
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
  const option = props.options.find((option: any) => getValue(option) === getValue(model.value));
  return getLabel(option);
}

function getLabel(option: any) {
  return isObject(option) ? option[props.labelKey] : option;
}

function getValue(option: any) {
  return isObject(option) ? option[props.valueKey] : option;
}

function getOption(option: any) {
  return !props.getObject ? getValue(option) : option;
}

function isSelected(option: any) {
  if (Array.isArray(model.value))
    return model.value.some((x: any) => getValue(x) === getValue(option));
  else return getValue(model.value) === getValue(option);
}

function selectOption(option: any) {
  if (props.disabled) return;

  setModel(getOption(option));
  if (!props.multiple) setExpandedModel(false, { source: "value-selected" });
}

function onKeyDown(e: KeyboardEvent) {
  const enabled = searchOption(searchText.value)
    .map((option: any, index: number) => (option?.disabled ? -1 : index))
    .filter((index: number) => index >= 0);
  const last = enabled.length - 1;
  if (last < 0) return;

  const position =
    selectedIndex.value != null ? enabled.indexOf(selectedIndex.value) : -1;
  switch (e.key) {
    case "ArrowUp":
      e.preventDefault();
      if (!expandedModel.value) setExpandedModel(true, { source: "click" });
      selectedIndex.value = enabled[position > -1 ? Math.max(position - 1, 0) : last];
      break;
    case "ArrowDown":
      e.preventDefault();
      if (!expandedModel.value) setExpandedModel(true, { source: "click" });
      selectedIndex.value = enabled[position > -1 ? Math.min(position + 1, last) : 0];
      break;
    case "Home":
      if (!expandedModel.value) break;
      e.preventDefault();
      selectedIndex.value = enabled[0];
      break;
    case "End":
      if (!expandedModel.value) break;
      e.preventDefault();
      selectedIndex.value = enabled[last];
      break;
  }
}

function onOptionKeyDown(e: KeyboardEvent) {
  if (e.key === " ") e.preventDefault();
  onKeyDown(e);
}

function searchOption(search: string) {
  if (!search || !props.searchable) return props.options;

  return props.options.filter((option: any) => {
    if (getLabel(option).toLowerCase().includes(search.toLowerCase()))
      return option;
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
  <div class="select">
    <SelectContainer
      v-model="expandedModel"
      :label-value="labelValue"
      class="select-content"
      :disabled="disabled"
      :required="required"
      :is-error="isError"
      :error-message="errorMessage"
      :info-message="infoMessage"
      :secondary="secondary"
      :aria-multiselectable="multiple"
      @keydown="onKeyDown"
      @update:model-value="changeExpanded"
    >
    <SelectContent
      v-model="searchText"
      v-model:expanded="expandedModel"
      :disabled="disabled"
      :icon="icon"
      :secondary="secondary"
      :options="options"
      :searchable="searchable"
      :is-error="isError"
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
          :option="model"
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

    <template #options>
      <Option
        v-for="(option, index) in searchOption(searchText)"
        :ref="(el: any) => (optionRefs[index] = el?.$el)"
        :aria-selected="isSelected(option)"
        :key="index"
        :secondary="secondary"
        :disabled="option.disabled"
        :no-hover="multiple"
        :selected="!multiple && isSelected(option)"
        class="flex items-center gap-xxs"
        @focus="selectedIndex = index"
        @click="selectOption(option)"
        @keydown="onOptionKeyDown"
        @keyup.enter.space="selectOption(option)"
      >
        <Checkbox
          v-if="multiple"
          :model-value="isSelected(option)"
          class="pointer-events-none"
          :tabindex="-1"
        />
        <slot name="option" :option="option" :index="index">
          {{ getLabel(option) }}
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
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.select-count {
  @apply flex items-center justify-center text-neutral-foreground-negative bg-primary-interaction-selected text-xs w-[1.6em] h-[1.6em] rounded-full;
}
</style>

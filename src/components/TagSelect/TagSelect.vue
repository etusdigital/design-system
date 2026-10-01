<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { useOptionalModel } from "#composables";
import { type ContainerModelExtra } from "../../utils/types/ContainerModelExtra";
import SelectContent from "../../utils/components/SelectContent.vue";
import Option from "../../utils/components/Option.vue";
import { computed } from "vue";
import { isObject } from "../../utils";
import SelectContainer from "../../utils/components/SelectContainer.vue";

type SelectExpandedExtra = {
  source: ContainerModelExtra["source"] | "value-selected";
};

const props = withDefaults(
  defineProps<{
    modelValue?: any[];
    options?: any[];
    labelValue?: string;
    icon?: string;
    expanded?: boolean;
    labelKey?: string;
    valueKey?: string;
    getObject?: boolean;
    searchable?: boolean;
    creatable?: boolean;
    placeholder?: string;
    errorMessage?: string;
    infoMessage?: string;
    disabled?: boolean;
    required?: boolean;
    isError?: boolean;
    buttonLabel?: string;
    ariaLabel?: string;
  }>(),
  {
    modelValue: undefined,
    options: undefined,
    labelValue: "",
    errorMessage: "",
    expanded: false,
    labelKey: "label",
    valueKey: "value",
    getObject: false,
    searchable: false,
    creatable: false,
    placeholder: "Search",
    infoMessage: "",
    disabled: false,
    required: false,
    isError: false,
    buttonLabel: "Add",
    ariaLabel: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any[]];
  "update:options": [value: any[]];
  "update:expanded": [value: boolean, extra: SelectExpandedExtra];
}>();

const [model, setModel] = useOptionalModel<any>(props, "modelValue", emit, []);
model.value = model.value || [];
const [optionsModel, setOptionsModel] = useOptionalModel<any>(
  props,
  "options",
  emit,
  []
);

const expandedModel = ref(props.expanded);
const searchText = ref("");
const selectedIndex = ref<number | null>(null);
const optionRefs = ref<HTMLElement[]>([]);
const searchInput = ref<HTMLInputElement>();

const searchedOptions = computed((): any[] => {
  if (!searchText.value) {
    return optionsModel.value;
  }
  return optionsModel.value.filter((option: any) =>
    String(getLabel(option) ?? "")
      .toLowerCase()
      .includes(searchText.value.toLowerCase())
  );
});

watch(
  () => props.expanded,
  () => {
    expandedModel.value = props.expanded;
  }
);

watch(expandedModel, (value) => {
  if (!value) {
    selectedIndex.value = null;
    return;
  }

  nextTick(() => searchInput.value?.focus({ preventScroll: true }));
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

function addTag(tag: string) {
  if (!props.creatable || props.isError || !tag) return;

  if (isIncluded(optionsModel.value, tag)) {
    searchText.value = "";
    return;
  }

  optionsModel.value.push(tag);
  setOptionsModel(optionsModel.value, { index: optionsModel.value.length - 1 });
  searchText.value = "";
}

function removeTag(index: number) {
  model.value.splice(index, 1);
  setModel(model.value, { index: index });
}

function onSearchTab(e: KeyboardEvent) {
  if (e.shiftKey || !props.creatable || !searchText.value) return;

  e.preventDefault();
  e.stopPropagation();
  addTag(searchText.value);
}

function onKeyDown(e: KeyboardEvent) {
  const last = searchedOptions.value.length - 1;
  if (last < 0) return;

  const hasSelection = selectedIndex.value != null;
  switch (e.key) {
    case "ArrowUp":
      e.preventDefault();
      if (!expandedModel.value) changeExpanded(true, { source: "click" });
      selectedIndex.value = hasSelection
        ? Math.max(selectedIndex.value! - 1, 0)
        : last;
      break;
    case "ArrowDown":
      e.preventDefault();
      if (!expandedModel.value) changeExpanded(true, { source: "click" });
      selectedIndex.value = hasSelection
        ? Math.min(selectedIndex.value! + 1, last)
        : 0;
      break;
  }
}

function onOptionKeyDown(e: KeyboardEvent) {
  switch (e.key) {
    case " ":
      e.preventDefault();
      break;
    case "Home":
      e.preventDefault();
      selectedIndex.value = 0;
      break;
    case "End":
      e.preventDefault();
      selectedIndex.value = searchedOptions.value.length - 1;
      break;
    default:
      onKeyDown(e);
  }
}

function selectOption(option: any, index: number) {
  if (props.disabled) return;

  const value = isIncluded(model.value, option)
    ? model.value.filter((i: any) => getValue(i) !== getValue(option))
    : [...model.value, props.getObject ? option : getValue(option)];
  setModel(value, index);
}

function getLabel(option: any) {
  return isObject(option) ? option[props.labelKey] : option;
}

function getValue(option: any) {
  return isObject(option) ? option[props.valueKey] ?? option[props.labelKey] : option;
}

function getTagLabel(tag: any) {
  if (isObject(tag)) return getLabel(tag);
  const option = optionsModel.value?.find((o: any) => getValue(o) === tag);
  return option ? getLabel(option) : tag;
}

function isIncluded(options: any[], option: any) {
  return !!options?.some((i: any) => getValue(i) === getValue(option));
}

function changeExpanded(value: boolean, extra: any) {
  expandedModel.value = value;
  emit("update:expanded", value, extra);
}

function checkSource(value: boolean, extra: any) {
  if (extra?.source == "click") changeExpanded(true, extra);
  else changeExpanded(value, extra);
}
</script>

<template>
  <SelectContainer :aria-label="ariaLabel" class="tag-select" aria-multiselectable="true" v-model="expandedModel"
    :required="required" :label-value="labelValue" :disabled="disabled" :is-error="isError"
    :error-message="errorMessage" :info-message="infoMessage" max-height="none" min-width="12em" @keydown="onKeyDown"
    @click="changeExpanded(true, { source: 'click' })" @update:model-value="checkSource">
    <SelectContent v-model="searchText" v-model:expanded="expandedModel" :disabled="disabled" :icon="icon"
      :options="options" :is-error="isError" @update:expanded="changeExpanded">
      <template #search-label>
        <slot name="search-label">{{ placeholder }}</slot>
      </template>
      <template #status>
        <slot v-if="$slots.default && !expandedModel && !model?.length" />
        <div class="relative" v-else-if="(searchable || creatable) && (expandedModel || !model?.length)">
          <div v-show="!searchText.length" class="pointer-events-none w-0 h-0">
            <span class="absolute text-neutral-foreground-low top-[50%] translate-y-[-50%]"
              :class="{ 'text-danger-foreground-low': isError }">
              <slot name="search-label">{{ placeholder }}</slot>
            </span>
          </div>
          <input ref="searchInput" v-model="searchText" type="text" class="search"
            :aria-label="labelValue || ariaLabel || placeholder" @keydown.enter="addTag(searchText)"
            @keydown.tab="onSearchTab" style="--tw-ring-color: none !important" :disabled="disabled" :class="{
              error: isError,
              disabled,
            }" />
        </div>
        <div class="flex flex-wrap gap-xxs my-xs max-w-[40em]" v-else-if="model?.length">
          <StatusBadge color="neutral" class="tag" v-for="(option, index) in model" :key="index" closeable
            @close="removeTag(Number(index))">
            <div class="tag-default py-xxs">
              <p class="font-bold text-xs truncate">
                {{ getTagLabel(option) }}
              </p>
            </div>
          </StatusBadge>
        </div>
      </template>
    </SelectContent>

    <template #options>
      <div class="text-xs italic text-neutral-foreground-low flex justify-center"
        v-if="!searchedOptions.length && searchText.length" role="option" aria-disabled="true">
        <slot name="no-options-found"> No result found </slot>
      </div>
      <div class="text-xs italic text-neutral-foreground-low flex justify-center" v-else-if="!optionsModel.length"
        role="option" aria-disabled="true">
        <slot name="empty-state"> No tags created yet </slot>
      </div>
      <template v-else>
        <Option v-for="(option, index) in searchedOptions" :ref="(el: any) => (optionRefs[index] = el?.$el)"
          :aria-selected="isIncluded(model, option)" :key="`${getValue(option)}`" no-hover
          :class="{ 'font-bold': isIncluded(model, option) }" @focus="selectedIndex = index"
          @click="selectOption(option, index)" @keydown="onOptionKeyDown"
          @keyup.enter.space="selectOption(option, index)">
          <Checkbox :model-value="isIncluded(model, option)" class="pointer-events-none" :tabindex="-1"
            aria-hidden="true" />
          <slot name="option" :option="option" :index="index">
            {{ getLabel(option) }}
          </slot>
        </Option>
      </template>
    </template>
    <template #actions v-if="creatable">
      <div class="flex justify-center w-full">
        <Button @click="addTag(searchText)" round size="small" always-open>
          {{ buttonLabel }}
        </Button>
      </div>
    </template>
  </SelectContainer>
</template>

<style scoped>
@reference "../../assets/main.css";

.tag-default {
  @apply flex items-center gap-xs;
}

.search {
  @apply text-neutral-interaction-default h-full w-full bg-neutral-surface-default p-none m-none border-none shadow-none outline-none p3;
}

.search.disabled {
  @apply bg-neutral-surface-disabled text-neutral-foreground-low;
}

.search.error {
  @apply text-danger-foreground-low;
}

.tag {
  @apply py-none max-w-full;
}
</style>

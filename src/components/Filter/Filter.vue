<script setup lang="ts">
import { ref, watch, computed, nextTick } from "vue";
import { useOptionalModel } from "#composables";
import { type ContainerModelExtra } from "../../utils/types/ContainerModelExtra";
import SelectContent from "../../utils/components/SelectContent.vue";
import Option from "../../utils/components/Option.vue";
import { isObject } from "../../utils";
import SelectContainer from "../../utils/components/SelectContainer.vue";

type MultiSelectModelExtra = {
  selected: number[];
  deselected: number[];
};

const props = withDefaults(
  defineProps<{
    modelValue: any;
    labelValue?: string;
    options: any[];
    icon?: string;
    expanded?: boolean;
    labelKey?: string;
    valueKey?: string;
    searchLabel?: string;
    searchable?: boolean;
    disabled?: boolean;
    getObject?: boolean;
    hideActions?: boolean;
    ariaLabel?: string;
  }>(),
  {
    modelValue: undefined,
    labelValue: "",
    expanded: undefined,
    labelKey: "label",
    valueKey: "value",
    searchLabel: "Search",
    icon: "filter_list",
    searchable: false,
    disabled: false,
    getObject: false,
    hideActions: false,
    ariaLabel: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any, extra?: MultiSelectModelExtra];
  "update:expanded": [value: boolean, extra: ContainerModelExtra];
  apply: [];
  clear: [];
}>();

const [expandedModel, setExpandedModel] = useOptionalModel<boolean>(
  props,
  "expanded",
  emit,
  false
);

const model = ref<any>(props.modelValue || {});
const searchText = ref("");
const optionExpanded = ref("");
const selected = ref(getSelected());
const groupRefs = ref<HTMLElement[]>([]);

const isSearching = computed(() => props.searchable && !!searchText.value);

const filteredOptions = computed<any[]>(() => {
  if (!isSearching.value) return props.options;

  const search = searchText.value.toLowerCase();

  return props.options
    .map((option: any) => {
      const labelMatches = getLabel(option).toLowerCase().includes(search);
      const matchingSubOptions = option.options.filter((subOption: any) =>
        getLabel(subOption).toLowerCase().includes(search)
      );

      if (labelMatches || matchingSubOptions.length) {
        return {
          ...option,
          options: labelMatches ? option.options : matchingSubOptions,
        };
      }

      return null;
    })
    .filter(Boolean);
});

watch(() => props.modelValue, (newVal) => {
  model.value = newVal || {};
  selected.value = getSelected();
}, { deep: true });

function getLabel(value: any): string {
  return isObject(value) ? value[props.labelKey] : value;
}

function getValue(option: any): any {
  return isObject(option) ? option[props.valueKey] : option;
}

function getSelected() {
  return props.options.reduce((total: number, option: any) => {
    const selected = model.value[getValue(option)];

    return (
      total +
      option.options.filter((subOption: any) =>
        selected?.some((x: any) => getValue(x) === getValue(subOption))
      ).length
    );
  }, 0);
}

function selectOption(option: any, subOption: any) {
  if (props.disabled) return;

  const key = getValue(option);
  const value = props.getObject ? subOption : getValue(subOption);

  if (!model.value[key]) model.value[key] = [];
  const index = model.value[key]?.findIndex((x: any) => getValue(x) === value);
  let extra: MultiSelectModelExtra = { selected: [], deselected: [] };

  if (index != -1) {
    model.value[key].splice(index, 1);
    extra.deselected = [value];
    selected.value--;
  } else {
    model.value[key].push(value);
    extra.selected = [value];
    selected.value++;
  }

  emit("update:modelValue", model.value, extra);
}

function toggleSubList(option: any) {
  const value = getValue(option);

  if (optionExpanded.value === value) optionExpanded.value = "";
  else optionExpanded.value = value;
}

function isActive(option: any): boolean {
  if (isSearching.value) return true;

  const optionValue = getValue(option);
  return optionExpanded.value === optionValue;
}

function isSelected(option: any, subOption: any) {
  return model.value[getValue(option)]?.some(
    (x: any) => getValue(x) === getValue(subOption)
  );
}

function clear() {
  model.value = {};
  selected.value = 0;
  emit("update:modelValue", model.value);
  emit('clear');
}

function apply() {
  emit("apply");
}

function getItems(): HTMLElement[] {
  const list = groupRefs.value.find(Boolean)?.parentElement;
  return Array.from(
    list?.querySelectorAll<HTMLElement>("[data-filter-item]") ?? []
  ).filter((item) => item.tabIndex >= 0);
}

function focusItem(index: number) {
  const items = getItems();
  items[Math.min(Math.max(index, 0), items.length - 1)]?.focus();
}

async function onTriggerKeyDown(e: KeyboardEvent) {
  if (props.disabled || (e.key !== "ArrowDown" && e.key !== "ArrowUp")) return;

  e.preventDefault();
  if (!expandedModel.value) setExpandedModel(true, { source: "click" });
  await nextTick();
  focusItem(e.key === "ArrowDown" ? 0 : getItems().length - 1);
}

function onSearchKeyDown(e: KeyboardEvent) {
  if (e.key !== "ArrowDown") return;

  e.preventDefault();
  focusItem(0);
}

function onItemKeyDown(e: KeyboardEvent, option: any, subOption?: any) {
  const item = e.currentTarget as HTMLElement;
  if (e.target !== item) return;

  const index = getItems().indexOf(item);
  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      focusItem(index + 1);
      break;
    case "ArrowUp":
      e.preventDefault();
      focusItem(index - 1);
      break;
    case "Home":
      e.preventDefault();
      focusItem(0);
      break;
    case "End":
      e.preventDefault();
      focusItem(getItems().length - 1);
      break;
    case "Enter":
    case " ":
      e.preventDefault();
      if (subOption) selectOption(option, subOption);
      else toggleSubList(option);
      break;
    case "ArrowRight":
      if (subOption || isActive(option)) break;
      e.preventDefault();
      toggleSubList(option);
      break;
    case "ArrowLeft":
      e.preventDefault();
      if (subOption)
        item.parentElement?.closest<HTMLElement>("[data-filter-item]")?.focus();
      else if (isActive(option) && !isSearching.value) toggleSubList(option);
      break;
  }
}
</script>

<template>
  <SelectContainer v-model="expandedModel" :label-value="labelValue" class="filter" :disabled="disabled"
    aria-multiselectable="true" :aria-label="ariaLabel" min-width="22em" :dont-have-max-height="true"
    @keydown="onTriggerKeyDown">
    <SelectContent v-model:expanded="expandedModel" :disabled="disabled" :icon="icon" :options="modelValue"
      @update:expanded="setExpandedModel">
      <template #status>
        <slot v-if="!disabled" name="status" :selected="selected">
          <span class="font-bold text-neutral-interaction-default">
            <slot name="status-label" :selected="selected"> Filters </slot>
          </span>
        </slot>
        <slot v-else-if="!expandedModel || disabled" />
      </template>
    </SelectContent>

    <template #complement v-if="selected && !disabled">
      <span class="select-count">{{ selected }}</span>
    </template>

    <template #options>
      <li v-if="searchable && !disabled"
        class="flex items-center gap-xs px-sm py-xs border-b-xxs border-neutral-default">
        <Icon name="search" class="text-neutral-foreground-low" />
        <input v-model="searchText" type="search"
          class="flex-1 p-0 m-0 border-none text-sm bg-transparent placeholder:text-neutral-foreground-low outline-none"
          style="box-shadow: none" :placeholder="searchLabel" @keydown="onSearchKeyDown" />
      </li>

      <li role="option" :aria-selected="!!model[getValue(option)]?.length"
        v-for="(option, index) in filteredOptions" :key="option[labelKey]"
        :ref="(el: any) => (groupRefs[index] = el)"
        class="flex flex-col gap-xs select-none h-max transition-[height] max-h-[3em] overflow-hidden" tabindex="0"
        data-filter-item :class="{ active: isActive(option) }" style="transition: max-height 0.2s ease"
        @keydown="onItemKeyDown($event, option)">
        <div
          class="flex items-center justify-between text-neutral-interaction-default w-full h-full cursor-pointer [&>*]:p-xs hover:text-primary-interaction-default hover:bg-primary-surface-hover"
          :class="{
            'bg-primary-surface-default text-primary-interaction-default font-bold':
              isActive(option),
          }" @click.prevent="toggleSubList(option)">
          <p class="text-neutral-interaction-default">
            {{ option[labelKey] }}
          </p>
          <div class="flex items-center gap-xs">
            <slot v-if="model[getValue(option)] && model[getValue(option)].length" name="status">
              <span class="select-count font-normal" :class="{
                active: isActive(option),
              }">
                {{ model[getValue(option)].length }}
              </span>
            </slot>
            <div
              class="flex items-center w-fit h-fit transition-transform ease-in-out duration-300 cursor-pointer text-xl leading-xs"
              :class="[
                isActive(option)
                  ? 'rotate-180 text-primary-interaction-default'
                  : 'text-neutral-interaction-default',
              ]">
              <Icon name="expand_more" />
            </div>
          </div>
        </div>
        <Transition name="content">
          <ul v-if="isActive(option)" class="flex flex-col gap-xs overflow-auto custom-scroll max-h-[12em] m-xxs">
            <Option v-for="(subOption, subOptionIndex) in (option.options as any[])" no-hover
              :disabled="subOption.disabled" :key="subOptionIndex" data-filter-item
              @click="selectOption(option, subOption)" @keydown="onItemKeyDown($event, option, subOption)"
              class="flex items-center pl-xxs gap-xs">
              <Checkbox :modelValue="
                // @ts-ignore
                isSelected(option, subOption)
                " class="pointer-events-none" :tabindex="-1" aria-hidden="true" />
              {{ getLabel(subOption) }}
            </Option>
          </ul>
        </Transition>
      </li>
    </template>

    <template #actions v-if="!hideActions">
      <slot name="actions">
        <div class="flex items-center gap-xs">
          <Button size="small" variant="plain" @click="clear" :disabled="!selected">
            <slot name="clear-label"> Clear </slot>
          </Button>
          <Button type="button" :disabled="!selected" size="small" @click="apply">
            <slot name="apply-label"> Apply </slot>
          </Button>
        </div>
      </slot>
    </template>
  </SelectContainer>
</template>
<style scoped>
@reference "../../assets/main.css";

.select {
  @apply w-full;
}

.content-enter-active {
  @apply transition-all duration-300 ease-out;
}

.content-leave-active {
  @apply transition-all duration-300 ease-out;
}

.content-enter-from,
.content-leave-to {
  @apply h-max;
}

.active {
  @apply max-h-[12em];
}

.select-count {
  @apply flex items-center justify-center text-neutral-foreground-negative bg-primary-interaction-selected text-xs w-[1.6em] h-[1.6em] rounded-full;
}
</style>

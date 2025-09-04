<script setup lang="ts">
import { ref, watch } from "vue";
import { useOptionalModel } from "#composables";
import { type ContainerModelExtra } from "../../utils/types/ContainerModelExtra";
import SelectContent from "../../utils/components/SelectContent.vue";
import Option from "../../utils/components/Option.vue";
import { isObject } from "../../utils";

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
    absolute?: boolean;
    getObject?: boolean;
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
    absolute: false,
    getObject: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any, extra?: MultiSelectModelExtra];
  "update:expanded": [value: boolean, extra: ContainerModelExtra];
  apply: [];
}>();

const [expandedModel, setExpandedModel] = useOptionalModel<boolean>(
  props,
  "expanded",
  emit,
  false
);

const model = ref<any>(props.modelValue || {});
const optionsSearch = ref<any>({});
const itemExpanded = ref("");
const selected = ref(getSelected());

watch(() => props.modelValue, (newVal) => {
  model.value = newVal || {};
  selected.value = getSelected();
});

function getLabel(value: any): string {
  return isObject(value) ? value[props.labelKey] : value;
}

function getValue(item: any): any {
  return isObject(item) ? item[props.valueKey] : item;
}

function getSelected() {
  const selected = props.options.filter((item: any) => {
    const key = getValue(item);
    const selected = model.value[key];

    return item.options.filter((subItem: any) =>
      selected?.some((x: any) => getValue(x) === getValue(subItem))
    ).length;
  });

  return selected.length;
}

function selectItem(item: any, subItem: any) {
  if (props.disabled) return;

  const key = getValue(item);
  const value = props.getObject ? subItem : getValue(subItem);

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

function toggleSubList(item: any) {
  const value = getValue(item);

  if (itemExpanded.value === value) itemExpanded.value = "";
  else itemExpanded.value = value;
}

function isActive(item: any): boolean {
  const itemValue = getValue(item);
  return itemExpanded.value === itemValue;
}

function searchItem(options: any, search: string) {
  if (!search) return options;

  return options.filter((value: any) => {
    if (value[props.labelKey].toLowerCase().includes(search.toLowerCase()))
      return value;
  });
}

function isSelected(item: any, subItem: any) {
  return model.value[getValue(item)]?.some(
    (x: any) => getValue(x) === getValue(subItem)
  );
}

function clear() {
  model.value = {};
  selected.value = 0;
  emit("update:modelValue", model.value);
}

function apply() {
  emit("apply");
}
</script>

<template>
  <SelectContainer
    v-model="expandedModel"
    :label-value="labelValue"
    class="filter"
    :disabled="disabled"
    :absolute="absolute"
    aria-multiselectable="true"
    min-width="22em"
    :dont-have-max-height="true"
  >
    <SelectContent
      v-model:expanded="expandedModel"
      :disabled="disabled"
      :icon="icon"
      :options="modelValue"
      @update:expanded="setExpandedModel"
    >
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

    <template #items>
      <li
        role="option"
        :aria-selected="
          // @ts-ignore
          item[labelKey]
        "
        v-for="(item, index) in options"
        :key="item[labelKey]"
        class="flex flex-col gap-xs select-none h-max transition-[height] max-h-[3em] overflow-hidden"
        :tabindex="index"
        :class="{ active: isActive(item) }"
        style="transition: max-height 0.2s ease"
      >
        <div
          class="flex items-center justify-between text-neutral-interaction-default w-full h-full cursor-pointer [&>*]:p-xs hover:text-primary-interaction-default hover:bg-primary-surface-hover"
          :class="{
            'bg-primary-surface-default text-primary-interaction-default font-bold':
              isActive(item),
          }"
          @click.prevent="toggleSubList(item)"
          @keyup.space="toggleSubList(item)"
        >
          <p class="text-neutral-interaction-default">
            {{ item[labelKey] }}
          </p>
          <div class="flex items-center gap-xs">
            <slot v-if="model[getValue(item)]" name="status">
              <span
                class="select-count font-normal"
                :class="{
                  active: isActive(item),
                }"
              >
                {{ model[getValue(item)].length }}
              </span>
            </slot>
            <div
              class="flex items-center w-fit h-fit transition-transform ease-in-out duration-300 cursor-pointer text-xl"
              :class="[
                isActive(item)
                  ? 'rotate-180 text-primary-interaction-default'
                  : 'text-neutral-interaction-default',
              ]"
            >
              <Icon name="expand_more" size="xl" />
            </div>
          </div>
        </div>
        <Transition name="content">
          <ul
            v-if="isActive(item)"
            class="flex flex-col gap-xs pxxs overflow-auto custom-scroll max-h-[12em] mr-xxs mxxs"
          >
            <div
              v-if="searchable && !disabled"
              class="flex items-center text-xl gap-xs pxxs border-xxs border-neutral-default mxxs px-xs"
            >
              <Icon
                name="search"
                class="text-neutral-foreground-low"
                size="xl"
              />
              <input
                v-model="optionsSearch[getValue(item)]"
                type="search"
                class="h-full w-full p-0 m-0 border-none text-xs p-[.05em] placeholder:text-neutral-foreground-low outline-none border-none"
                style="box-shadow: none"
                :disabled="disabled"
                :placeholder="searchLabel"
              />
            </div>
            <Option
              v-for="(subItem, subItemIndex) in searchItem(
                item.options,
                optionsSearch[getValue(item)]
              )"
              no-hover
              :disabled="subItem.disabled"
              :key="subItemIndex"
              @click="selectItem(item, subItem)"
              @key.space="selectItem(item, subItem)"
              class="flex items-center pl-xxs gap-xs"
            >
              <Checkbox
                :modelValue="
                  // @ts-ignore
                  isSelected(item, subItem)
                "
                class="pointer-events-none"
              />
              {{ getLabel(subItem) }}
            </Option>
          </ul>
        </Transition>
      </li>
    </template>

    <template #actions>
      <slot name="actions">
        <div class="flex items-center gap-xs">
          <Button
            size="small"
            variant="plain"
            @click="clear"
            :disabled="!selected"
          >
            <slot name="clear-label"> Clear </slot>
          </Button>
          <Button
            type="button"
            :disabled="!selected"
            size="small"
            @click="apply"
          >
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

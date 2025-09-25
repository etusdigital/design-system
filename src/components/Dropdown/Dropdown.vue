<script setup lang="ts">
import { computed, onBeforeMount, ref, useSlots } from "vue";
import { useOptionalModel } from "#composables";
import { type Option as OptionType } from "#utils/types/DropOption";
import ExpandableContainer from "../../utils/components/ExpandableContainer.vue";
import Options from "./Options.vue";
import Option from "./Option.vue";
import { isObject } from "../../utils";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    expanded?: boolean;
    labelValue?: string;
    options: OptionType[];
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

const selectedOption = computed(() => {
  if (!props.options) return undefined;
  return findOption(props.options, model.value)?.label;
});

const filteredOptions = computed(() => {
  if (!props.options) return [];
  else if (!search.value) return props.options;
  return filterOptions(props.options, search.value);
});

onBeforeMount(() => {
  updateSearch();
});

function findOption(
  options: OptionType[],
  value: string
): OptionType | undefined {
  for (const option of options) {
    if (option.value === getValue(value)) {
      return option;
    }
    if (option.options) {
      const found = findOption(option.options, value);
      if (found) return found;
    }
  }
  return undefined;
}

function filterOptions(options: OptionType[], value: string): OptionType[] {
  const filteredOptions: OptionType[] = [];
  for (const option of options) {
    let found: OptionType[] = [];

    if (option.options && option.options.length)
      found = filterOptions(option.options, value);

    if (
      option.label.toLowerCase().includes(value.toLowerCase()) ||
      found.length
    ) {
      if (found.length) option.options = found;
      filteredOptions.push(option);
    }
  }

  return filteredOptions;
}

function changeSelected(options: OptionType[], value: any): boolean {
  let selected = false;
  for (const option of options) {
    if (option.options && option.options.length)
      option.selected = changeSelected(option.options, value);
    else option.selected = option.value == getValue(value);

    if (option.selected) selected = true;
  }
  return selected;
}

function selectOption(value: any) {
  model.value = value;
  isExpanded.value = false;
  updateSearch();
  changeSelected(props.options, value);
}

function onFocus() {
  isExpanded.value = true;
  search.value = "";
}

function updateSearch() {
  setTimeout(() => {
    if (!isExpanded.value && !slots.default && props.searchable)
      search.value = selectedOption.value || "";
  });
}

function getValue(option: any): any {
  return isObject(option) ? option.value : option;
}
</script>

<template>
  <ExpandableContainer
    class="dropdown"
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
    {{ selectedOption }}
    <template #label>
      <slot>
        <Input
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
      <Options :options="filteredOptions">
        <template #default="{ options }">
          <Option
            v-for="option in options"
            v-model="model"
            v-model:selected="option.selected"
            :option="option"
            :get-object="getObject"
            @update:model-value="selectOption"
          />
        </template>
      </Options>
    </template>
  </ExpandableContainer>
</template>

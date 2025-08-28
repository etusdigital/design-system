<script setup lang="ts">
import { ref, computed } from "vue";
import { useOptionalModel } from "#composables";
import { type ContainerModelExtra } from "../../utils/components/ContainerModelExtra.types";
import SelectContent from "../../utils/components/SelectContent.vue";
import Option from "../../utils/components/Option.vue";

type MultiSelectModelExtra = {
  selected: number[];
  deselected: number[];
};

const props = withDefaults(
  defineProps<{
    modelValue: any[];
    labelValue?: string;
    icon?: string;
    expanded?: boolean;
    labelKey?: string;
    selectedKey?: string;
    searchable?: boolean;
    disabled?: boolean;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    absolute?: boolean;
    labelFormatter?: (item: any) => string;
  }>(),
  {
    modelValue: undefined,
    labelValue: "",
    expanded: undefined,
    labelKey: "label",
    selectedKey: "selected",
    searchable: false,
    disabled: false,
    required: false,
    isError: false,
    errorMessage: "",
    infoMessage: "",
    absolute: true,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any[], extra: MultiSelectModelExtra];
  "update:expanded": [value: boolean, extra: ContainerModelExtra];
}>();

const [expandedModel, setExpandedModel] = useOptionalModel<boolean>(
  props,
  "expanded",
  emit,
  false
);

const searchText = ref("");
const selected = computed(
  () =>
    props.modelValue.filter((item: any) => item[props.selectedKey] == true)
      .length
);
const showStatus = computed(
  () =>
    selected.value &&
    !props.disabled &&
    ((!expandedModel.value && props.searchable) || !props.searchable)
);

function selectItem(item: any) {
  if (props.disabled) return;
  item[props.selectedKey] = !item[props.selectedKey];
  const extra = item[props.selectedKey]
    ? { selected: [item], deselected: [] }
    : { selected: [], deselected: [item] };

  emit("update:modelValue", props.modelValue, extra);
}

function searchItem(search: string) {
  if (!search || !props.searchable) {
    return props.modelValue;
  }
  return props.modelValue.filter((value: any) => {
    if (value[props.labelKey].toLowerCase().includes(search.toLowerCase())) {
      return value;
    }
  });
}

function changeExpanded(value: boolean, extra: any) {
  if (props.searchable && extra?.source == "click")
    setExpandedModel(true, extra);
  else setExpandedModel(value, extra);
}

// @TODO: Accessibility - Make arrow keys focus elements in order.
</script>

<template>
  <SelectContainer
    v-model="expandedModel"
    :labelValue="labelValue"
    class="multi-select"
    :disabled="disabled"
    :required="required"
    :is-error="isError"
    :error-message="errorMessage"
    :info-message="infoMessage"
    :absolute="absolute"
    aria-multiselectable="true"
    @update:model-value="changeExpanded"
  >
    <SelectContent
      v-model="searchText"
      v-model:expanded="expandedModel"
      :disabled="disabled"
      :icon="icon"
      :items="modelValue"
      :searchable="searchable"
      @update:expanded="changeExpanded"
    >
      <template #search-label v-if="$slots['search-label']">
        <slot name="search-label" />
      </template>
      <template #status>
        <slot
          v-if="showStatus"
          name="status"
          :selected="selected"
        >
          <slot name="status-label" :selected="selected">
            <span class="font-bold">Selected</span>
          </slot>
        </slot>
        <slot v-else-if="(!expandedModel && searchable) || !searchable" />
      </template>
    </SelectContent>

    <template #complement v-if="showStatus">
      <span class="select-count">{{
          selected
        }}</span>
    </template>

    <template #items>
      <Option
        :aria-selected="
          // @ts-ignore
          item[selectedKey]
        "
        v-for="(item, index) in searchItem(searchText)"
        :key="index"
        :disabled="item.disabled"
        no-hover
        class="flex items-center gap-xxs"
        @click="selectItem(item)"
        @keyup.space="selectItem(item)"
      >
        <Checkbox
          :modelValue="
            // @ts-ignore
            item[selectedKey]
          "
          class="pointer-events-none"
        />
        <slot name="item" :item="item" :index="index">
          {{ item[labelKey] }}
        </slot>
      </Option>
    </template>

    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
  </SelectContainer>
</template>

<style scoped>
@reference "../../assets/main.css";

.select-count {
  @apply flex items-center justify-center text-neutral-foreground-negative bg-primary-interaction-selected text-xs w-[1.6em] h-[1.6em] rounded-full;
}
</style>
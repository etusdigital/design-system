<script setup lang="ts">
import { ref, watch } from "vue";
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
    errorMessage?: string;
    infoMessage?: string;
    disabled?: boolean;
    required?: boolean;
    isError?: boolean;
    absolute?: boolean;
    buttonLabel?: string;
  }>(),
  {
    modelValue: undefined,
    options: undefined,
    labelValue: "",
    errorMessage: "",
    expanded: false,
    labelKey: "label",
    infoMessage: "",
    disabled: false,
    required: false,
    isError: false,
    absolute: false,
    buttonLabel: "Add",
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

const searchedOptions = computed((): any[] => {
  if (!searchText.value) {
    return optionsModel.value;
  }
  return optionsModel.value.filter((option: any) => {
    if (isObject(option)) {
      if (
        option[props.labelKey]
          ?.toLowerCase()
          ?.includes(searchText.value.toLowerCase())
      ) {
        return option;
      }
    } else if (option?.toLowerCase()?.includes(searchText.value.toLowerCase()))
      return option;
  });
});

watch(
  () => props.expanded,
  () => {
    expandedModel.value = props.expanded;
  }
);

function addTag(tag: string) {
  if (props.isError || !tag) return;

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

function onKeyUp(e: KeyboardEvent) {
  function setSelection(index: number) {
    setModel([...model.value, optionsModel.value[index]], { index });
    e.preventDefault();
  }

  switch (e.key) {
    case "Home":
    case "ArrowDown":
      setSelection(0);
      break;

    case "End":
    case "ArrowUp":
      {
        const index = optionsModel.value.length - 1;
        setSelection(index);
      }
      break;
  }
}

function selectOption(option: any, index: number) {
  if (props.disabled || isIncluded(model.value, option)) return;
  setModel([...model.value, option], index);
  expandedModel.value = false;
  emit("update:expanded", false, { source: "value-selected" });
}

function isIncluded(options: any, option: any) {
  if (isObject(option)) {
    return options.find((i: any) => i[props.labelKey] === option[props.labelKey]);
  }
  return options?.includes(option);
}

function handleSlotClick(e: MouseEvent) {
  if (!e.target) return;
  setTimeout(() => {
    if (!(e.target as Element)?.classList?.contains("close-icon")) {
      expandedModel.value = true;
      emit("update:expanded", true, { source: "click" });
    }
  }, 1);
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
  <SelectContainer
    class="tag-select"
    v-model="expandedModel"
    :required="required"
    :label-value="labelValue"
    :disabled="disabled"
    :absolute="absolute"
    :is-error="isError"
    :error-message="errorMessage"
    :info-message="infoMessage"
    max-height="none"
    min-width="12em"
    @keyup="onKeyUp"
    @click="changeExpanded(true, { source: 'click' })"
    @update:model-value="checkSource"
  >
    <SelectContent
      v-model="searchText"
      v-model:expanded="expandedModel"
      :disabled="disabled"
      :icon="icon"
      :options="options"
      @click="handleSlotClick"
      @update:expanded="changeExpanded"
    >
      <template #search-label>
        <slot name="search-label">Search</slot>
      </template>
      <template #status>
        <div class="relative" v-if="expandedModel || !modelValue?.length">
          <div v-show="!searchText.length" class="pointer-events-none w-0 h-0">
            <span
              class="absolute text-neutral-foreground-low top-[50%] translate-y-[-50%]"
              :class="{ 'text-danger-foreground-low': isError }"
            >
              <slot name="search-label">Search</slot>
            </span>
          </div>
          <input
            v-model="searchText"
            type="text"
            class="search"
            @keydown.enter="addTag(searchText)"
            @keydown.prevent.tab="addTag(searchText)"
            style="--tw-ring-color: none !important"
            :disabled="disabled"
            :class="{
              'text-danger-foreground-low': isError,
              'bg-neutral-surface-disabled text-neutral-foreground-low':
                disabled,
            }"
          />
        </div>
        <div class="flex flex-wrap gap-xxs my-xs max-w-[40em]" v-else>
          <StatusBadge
            color="neutral"
            class="tag"
            v-for="(option, index) in model"
            :key="index"
          >
            <div class="tag-default py-xxs">
              <p class="font-bold text-xs truncate">
                {{ isObject(option) ? option[labelKey] : option }}
              </p>
              <Icon name="close" @click="removeTag(index)" class="close-icon" />
            </div>
          </StatusBadge>
        </div>
      </template>
    </SelectContent>

    <template #options>
      <div
        class="text-xs italic text-neutral-foreground-low flex justify-center"
        v-if="!searchedOptions.length && searchText.length"
      >
        <slot name="no-options-found"> No result found </slot>
      </div>
      <div
        class="text-xs italic text-neutral-foreground-low flex justify-center"
        v-else-if="!optionsModel.length"
      >
        <slot name="empty-state"> No tags created yet </slot>
      </div>
      <template v-else>
        <Option
          v-for="(option, index) in searchedOptions"
          :aria-selected="isIncluded(model, option)"
          :key="`${isObject(option) ? option[labelKey] : option}`"
          tabindex="0"
          :class="{ 'font-bold': isIncluded(model, option) }"
          @click="selectOption(option, index)"
          @keyup.space="selectOption(option, index)"
        >
          <slot name="option" :option="option" :index="index">
            {{ isObject(option) ? option[labelKey] : option }}
          </slot>
        </Option>
      </template>
    </template>
    <template #actions>
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
  @apply text-neutral-interaction-default h-full w-full p-none m-none border-none shadow-none outline-none p3;
}

.tag {
  @apply py-none max-w-full;
}

.close-icon {
  @apply text-base text-neutral-interaction-default cursor-pointer;
}
</style>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import { dateOptions } from "../../utils";
import Option from "../../utils/components/Option.vue";

type OptionType = {
  label: string;
  value: string;
  calculate: () => Date[];
  selected?: boolean;
  disabled?: boolean;
};

const props = withDefaults(
  defineProps<{
    modelValue?: Date[] | Date[][];
    labelValue?: string;
    lang?: string;
    separator?: string;
    isCompare?: boolean;
    maxInit?: Date;
    maxEnd?: Date;
    disabled?: boolean;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
    absolute?: boolean;
    expanded?: boolean;
    alignRight?: boolean;
    options?: OptionType[] | any;
  }>(),
  {
    lang: "en-US",
    labelValue: "",
    isCompare: false,
    disabled: false,
    required: false,
    isError: false,
    errorMessage: "",
    absolute: false,
    expanded: false,
    alignRight: false,
    options: dateOptions,
  }
);

onBeforeMount(() => {
  if (optionSelected.value) {
    let option: OptionType = props.options.find(
      (o: OptionType) => o.value == optionSelected.value
    );
    setModel(option.calculate());
    isMulti.value = false;
    emit("update:isCompare", isMulti.value);
  } else if (props.modelValue) {
    if (
      props.modelValue &&
      Array.isArray(props.modelValue[0]) &&
      !isMulti.value
    ) {
      (isMulti.value = true), emit("update:isCompare", true);
    } else {
      if (isMulti.value) {
        (isMulti.value = false), emit("update:isCompare", false);
      }
    }
    setFormatedDate(true);
  }
});

watch(
  () => props.modelValue,
  (cur) => {
    if (cur && Array.isArray(cur[0])) {
      if (!isMulti.value) {
        (isMulti.value = true), emit("update:isCompare", true);
      }
    } else {
      if (isMulti.value) {
        (isMulti.value = false), emit("update:isCompare", false);
      }
    }
    model.value = cur;
  }
);
watch(
  () => props.isCompare,
  () => {
    isMulti.value = props.isCompare;
    if (!isMulti.value) {
      optionSelected.value =
        props.options.find((o: OptionType) => o.selected)?.value || "";
    } else {
      optionSelected.value = "";
    }
  }
);
watch(
  () => props.expanded,
  () => (isExpanded.value = props.expanded)
);

const emit = defineEmits<{
  "update:modelValue": [value: Date[] | Date[][]];
  "update:expanded": [value: boolean];
  "update:isCompare": [value: boolean];
  "apply": [value: Date[] | Date[][]];
}>();

let isExpanded = ref(props.expanded);
let isMulti = ref(false);
let optionSelected = ref(
  props.options.length && !props.isCompare
    ? props.options.find((o: OptionType) => o.selected)?.value || ""
    : ""
);
let model: any = ref(
  props.modelValue ? props.modelValue : props.isCompare ? [[], []] : []
);
let formatedDate = ref("");

function formatDate(date: Date, template?: any) {
  return date.toLocaleDateString(
    props.lang,
    template || { year: "numeric", month: "short", day: "2-digit" }
  );
}

function getAnd() {
  if (props.lang.includes("pt")) {
    return "e";
  }
  return "and";
}

function setFormatedDate(dontEmit = false) {
  if (model.value && isMulti.value) {
    if (model.value[1].length > 0) {
      formatedDate.value = `${
        formatDate(model.value[0][0]) +
        (model.value[0][1]
          ? " - " +
            formatDate(model.value[0][1])
          : "")
      } ${props.separator || getAnd()} ${
        formatDate(model.value[1][0]) +
        (model.value[1][1]
          ? " - " +
            formatDate(model.value[1][1])
          : "")
      }`;
    } else if (model.value[0].length > 0) {
      formatedDate.value =
        formatDate(model.value[0][0]) +
        (model.value[0][1] ? " - " + formatDate(model.value[0][1]) : "");
    } else {
      formatedDate.value = "";
    }
  } else if (model.value && model.value.length > 0) {
    formatedDate.value =
      formatDate(model.value[0]) +
      (model.value[1] ? " - " + formatDate(model.value[1]) : "");
  } else {
    formatedDate.value = "";
  }
  if (!dontEmit) emit("update:modelValue", model.value);
}

function setModel(value: any) {
  model.value = value;
  emit("update:modelValue", model.value);
}

function changeDate(option: OptionType) {
  isMulti.value = false;
  emit("update:isCompare", false);
  optionSelected.value = option.value;
  formatedDate.value = "";
  setTimeout(() => {
    setModel(option.calculate());
  }, 100);
}

function clear() {
  setModel(undefined);
  optionSelected.value = '';
  formatedDate.value = '';
}
</script>

<template>
  <BExpandableContainer
    v-model="isExpanded"
    :disabled="disabled"
    :required="required"
    :absolute="absolute"
    :label-value="labelValue"
    :is-error="isError"
    :error-message="errorMessage"
    :align-right="alignRight"
    hide-arrow
    @update:modelValue="emit('update:expanded', isExpanded)"
  >
    <div
      class="flex items-center text-lg h-xl text-neutral-interaction-default"
      :class="{
        'text-primary-interaction-default': isExpanded,
        'text-danger-interaction-default': isError,
      }"
    >
      <BIcon name="calendar_month" size="lg" />
    </div>
    <h5 class="whitespace-nowrap" :class="{ 'font-bold': isExpanded }">
      <span
        v-if="formatedDate || options.find((o: OptionType) => o.value == optionSelected)?.label"
      >
        {{
          formatedDate ||
          options.find((o: OptionType) => o.value == optionSelected)?.label
        }}
      </span>
      <slot v-else />
    </h5>
    <template #content>
      <div class="flex">
        <div
          class="flex flex-col justify-between border-r-xxs border-neutral-default w-fit truncate rounded-l-sm overflow-hidden p-xs"
        >
          <div class="flex flex-col">
            <Option
              v-for="(option, index) in options"
              :key="index"
              class="px-xs py-sm"
              :selected="optionSelected == option.value"
              :disabled="option.disabled"
              @click="changeDate(option)"
            >
              {{ option.label }}
            </Option>
          </div>
          <div class="px-xs py-sm">
            <BCheckbox
              v-model="isMulti"
              @update:modelValue="(value: boolean) => {
                            emit('update:isCompare', value);
                            optionSelected = '';
                        }"
            >
              <slot name="compare-text"> Compare two periods </slot>
            </BCheckbox>
          </div>
        </div>
        <div class="flex flex-col items-end gap-base relative overflow-hidden">
          <BDateComparator
            class="px-sm pt-xxs"
            v-model="model"
            :lang="lang"
            :is-compare="isMulti"
            :max-init="maxInit"
            :max-end="maxEnd"
            @update:model-value="setFormatedDate(false)"
          />
          <div
            class="flex items-center justify-end gap-xs w-full border-t-xxs border-neutral-default p-sm"
          >
          <slot name="actions">
            <BButton
              size="small"
              variant="plain"
              @click="clear"
            >
              <slot name="clear-text"> Clear </slot>
            </BButton>
            <BButton
              size="small"
              @click="emit('apply', model)"
            >
              <slot name="apply-text"> Apply </slot>
            </BButton>
          </slot>
          </div>
        </div>
      </div>
    </template>
  </BExpandableContainer>
</template>

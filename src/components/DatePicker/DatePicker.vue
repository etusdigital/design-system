<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import { dateOptions, checkDateType } from "../../utils";
import Option from "../../utils/components/Option.vue";
import ExpandableContainer from "../../utils/components/ExpandableContainer.vue";

type OptionType = {
  label: string;
  value: string;
  calculate: () => Date[];
  selected?: boolean;
  disabled?: boolean;
};
type Type = "date" | "period" | "compare";

const props = withDefaults(
  defineProps<{
    modelValue?: Date | Date[] | Date[][];
    labelValue?: string;
    lang?: string;
    separator?: string;
    type?: Type;
    isCompare?: boolean;
    allowChangeType?: boolean;
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
    type: "date",
    isCompare: false,
    allowChangeType: false,
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

const emit = defineEmits<{
  "update:modelValue": [value: Date | Date[] | Date[][]];
  "update:expanded": [value: boolean];
  "update:type": [value: Type];
  apply: [value: Date | Date[] | Date[][]];
}>();

const model = ref<Date[] | Date[][]>([]);
const isExpanded = ref(props.expanded);
const isMulti = ref(props.type === "compare");
const optionSelected = ref(
  (props.options.length &&
    props.options.find((o: OptionType) => o.selected)?.value) ||
    ""
);
const formatedDate = ref("");

onBeforeMount(updateModel);

watch(
  () => props.modelValue,
  updateModel
);

watch(
  () => props.type,
  () => {
    isMulti.value = props.type === "compare";
    updateModel();
  }
);

watch(
  () => props.expanded,
  () => (isExpanded.value = props.expanded)
);

function updateModel() {
  let value = props.modelValue;
  if (optionSelected.value) {
    const option: OptionType = props.options.find(
      (o: OptionType) => o.value == optionSelected.value
    );
    value = option.calculate();
  }

  checkValidModel(value, !optionSelected.value);
}

function checkValidModel(value: Date | Date[] | Date[][] | undefined, updateFormatedDate = true) {
  model.value = checkDateType(value, props.type);
  if (updateFormatedDate) setFormatedDate();
}

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

function setFormatedDate() {
  if (model.value && Array.isArray(model.value[0])) {
    if (Array.isArray(model.value[1]) && model.value[1].length > 0) {
      formatedDate.value = `${
        formatDate(model.value[0][0]) +
        (model.value[0][1] ? " - " + formatDate(model.value[0][1]) : "")
      } ${props.separator || getAnd()} ${
        formatDate(model.value[1][0]) +
        (model.value[1][1] ? " - " + formatDate(model.value[1][1]) : "")
      }`;
    } else if (model.value[0].length > 0) {
      formatedDate.value =
        formatDate(model.value[0][0]) +
        (model.value[0][1] ? " - " + formatDate(model.value[0][1]) : "");
    } else {
      formatedDate.value = "";
    }
  } else if (
    model.value &&
    Array.isArray(model.value) &&
    model.value[0] instanceof Date
  ) {
    formatedDate.value =
      formatDate(model.value[0] as Date) +
      (model.value[1] && props.type != "date" ? " - " + formatDate(model.value[1] as Date) : "");
  } else {
    formatedDate.value = "";
  }

  if (formatedDate.value) optionSelected.value = "";
}

function setModel(value: any) {
  checkValidModel(value);
  emit(
    "update:modelValue",
    props.type == "date" ? model.value[0] : model.value
  );
}

function changeDate(option: OptionType) {
  setModel(option.calculate());
  formatedDate.value = "";
  optionSelected.value = option.value;
}

function clear() {
  setModel(undefined);
  optionSelected.value = "";
  formatedDate.value = "";
}

function changeType() {
  emit("update:type", isMulti.value ? "compare" : "period");
}
</script>

<template>
  <ExpandableContainer
    class="date-picker"
    v-model="isExpanded"
    :disabled="disabled"
    :required="required"
    :absolute="absolute"
    :label-value="labelValue"
    :is-error="isError"
    :error-message="errorMessage"
    :align-right="alignRight"
    disable-label-auto-width
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
      <Icon name="calendar_month" size="lg" />
    </div>
    <h5 class="whitespace-nowrap" :class="{ 'font-bold': isExpanded }">
      <span
        v-if="
          formatedDate ||
          options.find((o: OptionType) => o.value == optionSelected)?.label
        "
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
          v-if="type !== 'date' && options.length"
        >
          <div class="flex flex-col">
            <Option
              v-for="(option, index) in options"
              :key="index"
              class="px-xs py-sm min-w-9xl"
              :selected="optionSelected == option.value"
              :disabled="option.disabled"
              @click="changeDate(option)"
            >
              {{ option.label }}
            </Option>
          </div>
          <div class="px-xs py-sm" v-if="allowChangeType">
            <Checkbox v-model="isMulti" @update:model-value="changeType">
              <slot name="compare-label"> Compare two periods </slot>
            </Checkbox>
          </div>
        </div>
        <div class="flex flex-col items-end gap-base relative overflow-hidden">
          <Calendar
            class="px-sm pt-xxs"
            v-model="model"
            :lang="lang"
            :type="type"
            :max-init="maxInit"
            :max-end="maxEnd"
            :double-calendar="type !== 'date'"
            @update:model-value="setModel"
          />
          <div
            class="flex items-center justify-end gap-xs w-full border-t-xxs border-neutral-default p-sm"
          >
            <slot name="actions">
              <Button size="small" variant="plain" @click="clear">
                <slot name="clear-label"> Clear </slot>
              </Button>
              <Button size="small" @click="emit('apply', model)">
                <slot name="apply-label"> Apply </slot>
              </Button>
            </slot>
          </div>
        </div>
      </div>
    </template>
  </ExpandableContainer>
</template>

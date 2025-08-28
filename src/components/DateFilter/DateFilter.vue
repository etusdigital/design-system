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
    modelValue?: any[] | Date[];
    labelValue?: string;
    lang?: string;
    maxInit?: Date;
    maxEnd?: Date;
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    absolute?: boolean;
    required?: boolean;
    options?: OptionType[] | any;
  }>(),
  {
    labelValue: "",
    lang: "en-US",
    disabled: false,
    isError: false,
    errorMessage: "",
    absolute: true,
    options: dateOptions,
  }
);

let isExpanded = ref(false);
let model: any = ref(props.modelValue ? props.modelValue : []);
let optionSelected = ref(
  props.options.length
    ? props.options.find((o: OptionType) => o.selected)?.value || ""
    : ""
);
let formatedDate = ref("");
if (model.value.length) {
  formatedDate.value =
    formatDate(model.value[0]) +
    (model.value[1] ? " - " + formatDate(model.value[1]) : "");
}

onBeforeMount(() => {
  if (optionSelected.value) {
    let option: OptionType = props.options.find(
      (o: OptionType) => o.value == optionSelected.value
    );
    model.value = option.calculate();
  }
});

const emit = defineEmits<{
  "update:modelValue": [value: Date[] | any[]];
  "apply": [value: Date[] | any[]];
}>();

watch(
  () => props.modelValue,
  (cur) => (model.value = cur)
);

function formatDate(date: Date) {
  if (!date) return;
  return date.toLocaleDateString(props.lang, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function changeDate(option: OptionType) {
  const resultDate = option.calculate();
  let firstDate = resultDate[0];
  let secondDate = resultDate[1];
  if (
    (props.maxInit &&
      props.maxInit.toISOString().substr(0, 10) >=
        firstDate.toISOString().substr(0, 10)) ||
    (props.maxEnd &&
      props.maxEnd.toISOString().substr(0, 10) <=
        secondDate.toISOString().substr(0, 10))
  ) {
    return;
  }
  formatedDate.value = "";
  model.value = [firstDate, secondDate];
  optionSelected.value = option.value;
  emit("update:modelValue", model.value);
}

function resetModel() {
  optionSelected.value = "";
  formatedDate.value = "";
  model.value = [];
  emit("update:modelValue", model.value);
}

function setFormatedDate() {
  if (model.value) {
    formatedDate.value =
      formatDate(model.value[0]) +
      (model.value[1] ? " - " + formatDate(model.value[1]) : "");
  } else {
    formatedDate.value = "";
  }
  optionSelected.value = "";
  emit("update:modelValue", model.value);
}
</script>

<template>
  <SelectContainer
    class="date-filter"
    v-model="isExpanded"
    :label-value="labelValue"
    :required="required"
    aria-multiselectable="false"
    dont-have-max-height
    :absolute="absolute"
    :disabled="disabled"
    :is-error="isError"
    :error-message="errorMessage"
    hide-arrow
    @click="() => {}"
  >
    <div
      class="flex items-center text-lg h-xl text-neutral-interaction-default"
      :class="{ 'text-primary-interaction-default': isExpanded }"
    >
      <Icon name="calendar_month" size="lg" />
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

    <template #items>
      <div
        class="flex flex-col items-center divide-y-xxs divide-neutral-default overflow-x-hidden"
      >
        <Date
          v-model="model"
          :lang="lang"
          is-period
          :max-init="maxInit"
          :max-end="maxEnd"
          @update:modelValue="setFormatedDate"
        />
        <div class="flex flex-col w-full p-xs">
          <Option
            v-for="(option, index) in options"
            :key="index"
            class="px-xs py-sm"
            :selected="optionSelected === option.value"
            :disabled="option.disabled"
            @click="changeDate(option)"
          >
            {{ option.label }}
          </Option>
        </div>
      </div>
    </template>

    <template #actions>
      <div class="flex items-center justify-end gap-xs w-full">
        <slot name="actions">
          <Button size="small" variant="plain" @click="resetModel">
            <slot name="clear-label"> Clear </slot>
          </Button>
          <Button size="small" @click="emit('apply', model)">
            <slot name="apply-label"> Apply </slot>
          </Button>
        </slot>
      </div>
    </template>
  </SelectContainer>
</template>

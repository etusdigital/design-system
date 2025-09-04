<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import { isObject } from "../../utils";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    labelKey?: string;
    valueKey?: string;
    options: any[];
    size?: "medium" | "large";
    disabled?: boolean;
    allowedSkip?: boolean;
    background?: string;
    version?: 1 | 2;
    getObject?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelKey: "label",
    valueKey: "value",
    size: "medium",
    disabled: false,
    allowedSkip: false,
    background: "var(--neutral-background-default)",
    version: 1,
    getObject: false,
  }
);

const model = ref(props.modelValue);
const step = ref(0);
const biggerStepSelected = ref(0);
const passedIn = ref(new Set<number>());
passedIn.value.add(0);

onBeforeMount(() => {
  if (!model.value) changeActiveStep(props.options[0], 0);
});

watch(
  () => props.modelValue,
  () => {
    model.value = props.modelValue;
    const index = findIndex(model.value);
    if (index == -1) return;

    step.value = index;
    passedIn.value.add(index);
    if (biggerStepSelected.value < index && step.value === index)
      biggerStepSelected.value = index;
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
  changeStep: [item: any, index: number];
}>();

function changeActiveStep(item: any, index: number) {
  if (!props.disabled) {
    if (
      biggerStepSelected.value + 1 === index ||
      step.value > index ||
      biggerStepSelected.value >= index ||
      props.allowedSkip
    ) {
      step.value = index;
      model.value = props.getObject ? item : getValue(item);
      emit("update:modelValue", item);
    }

    if (biggerStepSelected.value < index && step.value === index)
      biggerStepSelected.value = index;
  }

  passedIn.value.add(index);
  emit("changeStep", item, index);
}

function isSkipped(index: number) {
  return (
    !passedIn.value.has(index) &&
    index < biggerStepSelected.value &&
    props.allowedSkip
  );
}

function getLabel(item: any) {
  return isObject(item) ? item[props.labelKey] : item;
}

function getValue(item: any) {
  return isObject(item) ? item[props.valueKey] : item;
}

function findIndex(item: any) {
  return props.options.findIndex((i) => getValue(i) == getValue(item));
}
</script>
<template>
  <div class="stepper flex w-full" v-if="version == 1">
    <button
      v-for="(item, index) in options"
      :key="`step-button-${index}`"
      class="step-button"
      :class="[
        size,
        {
          'active-button': index === step,
          'fisrt-button': index === 0,
          'last-button': !options[index + 1],
          'middle-button': index !== 0 && options[index + 1],
          'even-button': index % 2 == 0,
          'past-button': index <= biggerStepSelected,
        },
      ]"
      @click="changeActiveStep(item, index)"
    >
      <span class="step-value mr-[.6em]">{{
        getLabel(item)
      }}</span>
      <span class="before-triangle-cover" v-if="index !== 0"></span>
      <span class="after-triangle-cover" v-if="options[index + 1]"></span>
    </button>
  </div>
  <div class="stepper flex justify-end" v-if="version == 2">
    <div
      v-for="(item, index) in options"
      :key="`step-button-${index}`"
      class="flex items-center"
      :class="[size, options[index + 1] ? 'w-full' : 'w-fit']"
    >
      <div class="button-container" :class="{ 'scale-[1.2]': index === step }">
        <div class="background" v-if="index === step">
          <div class="bg-primary-interaction-default h-[52.5%]" />
          <div class="netrual-border-color h-[47%]" />
        </div>
        <div
          v-else
          class="background"
          :class="[
            isSkipped(index) || index <= biggerStepSelected
              ? 'bg-primary-interaction-default'
              : 'netrual-border-color',
          ]"
        />
        <button
          class="step-button-circle"
          :data-after-content="getLabel(item)"
          :class="{
            'active-button': index === step,
            'past-button': index <= biggerStepSelected,
            'skip-button': isSkipped(index),
          }"
          @click="changeActiveStep(item, index)"
        >
          <Icon :name="item.icon ? item.icon : 'image'" />
        </button>
      </div>
      <span
        class="right-line"
        :class="[
          index < biggerStepSelected
            ? 'bg-primary-interaction-default'
            : 'netrual-border-color',
        ]"
        v-if="options[index + 1]"
      />
    </div>
  </div>
</template>
<style scoped>
@reference "../../assets/main.css";

.step-button {
  @apply flex items-center justify-center rounded-e-xxs border-xxs h-[2.2em] w-[10em] border-neutral-default text-neutral-interaction-default pl-base ml-xs font-bold uppercase text-sm text-start relative bg-default;
  width: 100%;
  background: v-bind(background);

  .step-value {
    @apply text-xs;
  }

  &::after {
    @apply right-[-19px];
  }
}

.step-button:not(.first-button) {
  @apply border-l-0;
}

.step-button:not(.last-button) {
  @apply border-r-0;
}

.step-button:not(.fisrt-button)::before {
  @apply z-[2] absolute w-[20px] h-[100%] left-[-1px] top-1/2 translate-y-[-50%] bg-default;
  content: "";
  background: v-bind(background);
  clip-path: polygon(0 0, 0 100%, 100% 50%);
}

.before-triangle-cover {
  @apply z-[1] absolute w-[20px] h-[100%] left-0 top-1/2 translate-y-[-50%];
  content: "";
  background: var(--neutral-border-default);
  clip-path: polygon(0 0, 0 100%, 100% 50%);
}

.step-button:not(.last-button)::after {
  @apply z-[4] absolute w-[20px] h-full top-1/2 translate-y-[-50%] bg-inherit border-inherit;
  content: "";
  clip-path: polygon(0 0, 0 100%, 100% 50%);
}

.after-triangle-cover {
  @apply z-[3] absolute w-[20px] h-[102%] right-[-20px] top-1/2 translate-y-[-50%] bg-inherit border-inherit;
  content: "";
  background: var(--neutral-border-default);
  clip-path: polygon(0 0, 0 100%, 100% 50%);
}

.step-button.first-button:not(.last-button) .step-button.large {
  @apply h-[3em] ml-xs;

  .step-value {
    @apply text-sm;
  }
}

.step-button:hover {
  @apply bg-neutral-surface-highlight;
}

.step-button.large {
  @apply h-[3em] ml-xs;

  .step-value {
    @apply text-sm;
  }
}

.step-button.active-button {
  @apply bg-primary-interaction-default text-neutral-foreground-negative border-primary-default;

  .before-triangle-cover,
  .after-triangle-cover {
    background: var(--primary-border-default);
  }
}

.step-button.active-button:hover {
  @apply bg-primary-interaction-hover border-primary-hover;

  .before-triangle-cover,
  .after-triangle-cover {
    background: var(--primary-border-hover);
  }
}

.past-button {
  @apply text-primary-interaction-default border-primary-default;

  .before-triangle-cover,
  .after-triangle-cover {
    background: var(--primary-border-default);
  }
}

.past-button:hover {
  @apply bg-primary-interaction-hover text-neutral-foreground-negative border-primary-interaction-hover;
}

.fisrt-button {
  @apply rounded-s-full ml-none;

  &::after,
  .after-triangle-cover {
    @apply h-[104%];
  }
}

.last-button {
  @apply rounded-e-full;
}

.large.fisrt-button {
  @apply rounded-s-full;
}

.large.last-button {
  @apply rounded-e-full;
}

.button-container {
  @apply p-xxs rounded-full relative hover:scale-[1.2];
}

.background {
  @apply flex flex-col w-full h-full rounded-full overflow-hidden absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%];

  div {
    @apply w-full;
  }
}

.step-button-circle {
  @apply flex items-center justify-center p-sm rounded-full text-neutral-interaction-default relative bg-default;
  background: v-bind(background);
}

.large .step-button-circle {
  @apply p-sm;
}

.large .step-button-circle .icon {
  @apply text-3xl;
}

.step-button-circle.active-button {
  @apply text-primary-interaction-default;
  background: v-bind(background);
}

.step-button-circle.active-button::after {
  @apply text-primary-interaction-default;
}

.step-button-circle.past-button:not(.active-button) {
  @apply bg-primary-interaction-default text-neutral-foreground-negative;
}

.step-button-circle.past-button::after {
  @apply text-primary-interaction-default;
}

.step-button-circle::after {
  content: attr(data-after-content);
  @apply absolute bottom-[-2em] font-bold text-xs z-[1] truncate;
}

.step-button-circle.skip-button,
.step-button-circle.skip-button.past-button {
  @apply text-primary-interaction-default bg-default;
  background: v-bind(background);
}

.right-line {
  @apply w-full h-[.2em];
}

.netrual-border-color {
  background: var(--neutral-border-default);
}
</style>

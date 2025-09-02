<script setup lang="ts">
import { ref, onBeforeMount, watch, computed } from "vue";
import Label from "../../utils/components/Label.vue";

type TextAlign = "start" | "center" | "end";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    labelValue?: string;
    max?: number;
    errorMessage?: string;
    infoMessage?: string;
    disabled?: boolean;
    isError?: boolean;
    required?: boolean;
    placeholder?: string;
    textAlign?: TextAlign;
    tooltipMinWidth?: string;
  }>(),
  {
    modelValue: "",
    labelValue: "",
    max: undefined,
    errorMessage: "",
    infoMessage: "",
    disabled: false,
    isError: false,
    required: false,
    placeholder: "",
    textAlign: "start",
    tooltipMinWidth: "none",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  focus: [value: string];
  blur: [value: string];
}>();

let inputValue = ref("");
let hasError = ref(false);
let isFocused = ref(false);

const computedMax = computed((): number | undefined => {
  if (props.max || props.max === 0) return props.max;
  return undefined;
});

const inputClasses = computed((): string => {
  let classes = "";

  if (isFocused.value) classes += " focus";
  if (props.disabled) classes += " disabled";
  if (props.isError || hasError.value) classes += " error";

  return classes;
});

const inputStyle = computed((): any => {
  return { "text-align": props.textAlign };
});

onBeforeMount(setInputValue);

watch(() => props.modelValue, setInputValue);

function setInputValue() {
  inputValue.value = props.modelValue || "";
}

function checkError() {
  hasError.value = !!(
    (props.max || props.max === 0) &&
    inputValue.value.length > props.max
  );
}

function onInput() {
  checkError();
  emit("update:modelValue", inputValue.value);
}

function onBlur() {
  isFocused.value = false;
  emit("blur", inputValue.value);
}

function onFocus() {
  isFocused.value = true;
  emit("focus", inputValue.value);
}
</script>

<template>
  <div class="flex flex-col gap-xxs h-fit">
    <div class="flex justify-between items-center" v-if="labelValue || max || max == 0">
      <Label
        :label-value="labelValue"
        :info-message="infoMessage"
        :tooltip-min-width="tooltipMinWidth"
        :required="required"
      />
      <span v-if="max || max == 0" class="max-length">
        {{ inputValue?.length || 0 }}/{{ max }}
      </span>
    </div>
    <textarea
      v-model="inputValue"
      class="textarea"
      :class="inputClasses"
      :style="inputStyle"
      :maxlength="computedMax"
      :placeholder="placeholder"
      :disabled="disabled"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
    />
    <small v-if="isError || hasError" class="error-message">
      {{ errorMessage }}
    </small>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

/* #region BASE FONT SIZES */
.max-length,
.error-message {
  @apply text-sm;
}

.textarea {
  @apply p3 flex items-center gap-xs outline-xxs
      outline-neutral-default
        rounded-sm
        transition-[outline-color]
        duration-100
        delay-100
        py-xs
        px-sm
        focus:outline-primary-default
        border-none bg-transparent text-neutral-foreground-high min-h-xl;
}
/* #endregion BASE FONT SIZES */

/* #region LABEL COMPONENTS STYLE */
.max-length {
  @apply text-neutral-foreground-low font-bold;
}
/* #endregion LABEL COMPONENTS STYLE */

/* #region DEFAULT TEXTAREA STYLE */
.textarea.focus {
  @apply outline-primary-default;
}

/* #region DISABLED TEXTAREA STYLE */
.textarea.disabled {
  @apply bg-neutral-surface-disabled text-neutral-foreground-disabled outline-neutral-disabled;
}
/* #endregion DISABLED TEXTAREA STYLE */

/* #region ERROR TEXTAREA STYLE */
.textarea.error {
  @apply text-danger-foreground-low outline-danger-default;
}
/* #endregion ERROR TEXTAREA STYLE */

/* #region ERROR MESSAGE STYLE */
.error-message {
  @apply text-danger-foreground-low text-start;
}
/* #endregion ERROR MESSAGE STYLE */
</style>

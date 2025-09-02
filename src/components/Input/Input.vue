<script setup lang="ts">
import { ref, onBeforeMount, watch, computed } from "vue";
import {
  applyMask,
  isValidEmail,
  isValidDomain,
  isValidUrl,
} from "../../utils/index";
import Label from "../../utils/components/Label.vue";

type InputType =
  | "text"
  | "number"
  | "search"
  | "color"
  | "password"
  | "file"
  | "email";
type Mask = "cpf" | "cnpj" | "cep" | "domain" | "url";
type TextAlign = "start" | "center" | "end";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    labelValue?: string;
    type?: InputType;
    mask?: Mask;
    max?: number;
    min?: number;
    step?: number;
    errorMessage?: string;
    infoMessage?: string;
    disabled?: boolean;
    isError?: boolean;
    required?: boolean;
    placeholder?: string;
    textAlign?: TextAlign;
    tooltipMinWidth?: string;
    icon?: string;
    appendIcon?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelValue: "",
    type: "text",
    mask: undefined,
    max: undefined,
    min: undefined,
    step: 1,
    errorMessage: "",
    infoMessage: "",
    disabled: false,
    isError: false,
    required: false,
    placeholder: "",
    textAlign: "start",
    tooltipMinWidth: "none",
    icon: "",
    appendIcon: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
  focus: [value: any];
  blur: [value: any];
}>();

let inputValue = ref();
let hasError = ref(false);
let isFocused = ref(false);
let showPass = ref(false);
let haveFile = ref(false);
let dragging = ref(false);
let fileName = ref("");

const type = computed((): InputType => {
  const type = props.type;
  if (type === "color" || type === "email" || showPass.value) return "text";
  return type;
});

const computedMax = computed((): number | undefined => {
  if ((props.max || props.max == 0) && !props.mask)
    return props.max;

  return undefined;
});

const prependIcon = computed((): string => {
  if (isTypeValid("search")) return "search";
  else if (!props.appendIcon) return props.icon;
  return "";
});

const appendedIcon = computed((): string => {
  if (isTypeValid("password")) {
    if (showPass.value) return "visibility_off";
    return "visibility";
  } else if (props.appendIcon) return props.icon;
  return "";
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
watch(() => props.type, setInputValue);

function setInputValue() {
  if (isTypeValid("file")) {
    haveFile.value = !!props.modelValue;
    if (props.modelValue) {
      fileName.value = props.modelValue?.name || "";
    }
  } else {
    inputValue.value =
      props.modelValue || props.modelValue == 0 ? props.modelValue : "";
  }
}

function checkError() {
  if (isTypeValid("email")) hasError.value = !isValidEmail(inputValue.value);
  else if (isMaskValid("domain"))
    hasError.value = !isValidDomain(inputValue.value);
  else if (isMaskValid("url")) hasError.value = !isValidUrl(inputValue.value);
  else {
    hasError.value = !!(
      (props.max || props.max === 0) &&
      inputValue.value.length > props.max
    );
  }
}

function onInput() {
  if (props.mask && isTypeValid("text"))
    inputValue.value = applyMask(inputValue.value, props.mask);

  if (isTypeValid("number")) {
    if ((props.min || props.min === 0) && inputValue.value < props.min) {
      inputValue.value = props.min;
    } else if ((props.max || props.max === 0) && inputValue.value > props.max) {
      inputValue.value = props.max;
    }
  }

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

function increaseOrDecrease(n: number) {
  if (isNaN(Number(inputValue.value))) inputValue.value = 0;

  if (props.disabled) return;
  else if (
    ((props.max || props.max === 0) &&
      inputValue.value >= props.max &&
      n > 0) ||
    ((props.min || props.min === 0) && inputValue.value <= props.min && n < 0)
  ) {
    return;
  }

  inputValue.value = (Number(inputValue.value) * 1000 + n * 1000) / 1000;
  onInput();
}

function isMaskValid(value: Mask | Mask[], opposite = false) {
  return isValueValid(props.mask, value, opposite);
}

function isTypeValid(value: InputType | InputType[], opposite = false) {
  return isValueValid(props.type, value, opposite);
}

function isValueValid(prop: any, value: any | any[], opposite = false) {
  let valid = prop == value;

  if (Array.isArray(value)) valid = value.includes(prop);
  if (opposite) valid = !valid;

  return valid;
}
</script>

<template>
  <div
    class="flex flex-col gap-xxs h-fit"
  >
    <div
      class="flex justify-between items-center"
      v-if="labelValue || max || max == 0"
    >
      <Label
        :label-value="labelValue"
        :info-message="infoMessage"
        :tooltip-min-width="tooltipMinWidth"
        :required="required"
      />
      <span v-if="(max || max == 0) && isTypeValid('text')" class="max-length">
        {{ inputValue?.length || 0 }}/{{ max }}
      </span>
    </div>
    <div class="flex items-center h-fit">
      <div class="input-container flex-1" :class="inputClasses">
        <slot name="icon-slot">
          <Icon
            v-if="prependIcon"
            :name="prependIcon"
            class="side-icon"
            :class="{
              'text-danger-interaction-default': isError,
              'text-primary-foreground-low': isFocused,
            }"
          />
        </slot>
        <input
          v-model="inputValue"
          class="input"
          :style="inputStyle"
          :disabled="disabled"
          :value="inputValue"
          :placeholder="placeholder"
          :type="type"
          spellcheck="false"
          :max="computedMax"
          :min="min"
          :maxlength="computedMax"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
        />
        <input
          v-if="isTypeValid('color')"
          v-model="inputValue"
          class="color-display"
          :class="{ disabled: disabled }"
          :disabled="disabled"
          type="color"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
        />
        <slot name="appended-icon-slot">
          <Icon
            v-if="appendedIcon"
            :name="appendedIcon"
            class="side-icon"
            :class="{
              'text-danger-interaction-default': isError,
              'text-primary-foreground-low': isFocused,
              'cursor-pointer': isTypeValid('password'),
            }"
            @click="showPass = !showPass && isTypeValid('password')"
          />
        </slot>
      </div>
      <div
        v-if="isTypeValid('number')"
        class="flex flex-col items-center ml-xxs mt-xxs"
        :class="[
          {
            'text-neutral-interaction-disabled': disabled,
            'text-danger-interaction-default': hasError,
          },
        ]"
      >
        <Icon
          name="arrow_drop_up"
          class="number-icon"
          @click="increaseOrDecrease(+step)"
        />
        <Icon
          name="arrow_drop_down"
          class="number-icon"
          @click="increaseOrDecrease(-step)"
        />
      </div>
    </div>
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

.input {
  @apply p3  flex-1 bg-transparent text-neutral-foreground-high outline-none p-0 border-none min-h-xl;
}

.side-icon {
  @apply text-neutral-interaction-default;
}

.error-circle.icon {
  @apply text-xl;
}
/* #endregion BASE FONT SIZES */

/* #region LABEL COMPONENTS STYLE */
.max-length {
  @apply text-neutral-foreground-low font-bold;
}
/* #endregion LABEL COMPONENTS STYLE */

/* #region DEFAULT INPUT STYLE */
.input-container {
  @apply flex items-center gap-xs outline outline-xxs bg-emphasis
      outline-neutral-default
        rounded-sm
        transition-[outline-color]
        duration-100
        delay-100
        py-xs
        px-sm
        min-h-fit
        focus:outline-primary-default;
}

.input-container.focus {
  @apply outline-primary-default;
}
/* #endregion DEFAULT INPUT STYLE */

/* #region DISABLED INPUT STYLE */
.input-container.disabled {
  @apply bg-neutral-surface-disabled text-neutral-foreground-disabled outline-neutral-disabled;
}
/* #endregion DISABLED INPUT STYLE */

/* #region ERROR INPUT STYLE */
.input-container.error {
  @apply text-danger-foreground-low outline-danger-default;
}

/* #endregion ERROR INPUT STYLE */

/* #region COLOR DISPLAY STYLE */
.color-display {
  @apply w-2xl h-xl cursor-pointer bg-transparent;
}

.color-display.disabled {
  @apply pointer-events-none;
}
/* #endregion COLOR DISPLAY STYLE */

/* #region INCREMENT AND DECREMENT STYLE */
.number-icon {
  @apply cursor-pointer text-2xl flex items-center h-[.7em] text-neutral-interaction-default;
}
/* #endregion INCREMENT AND DECREMENT STYLE */

/* #region ERROR MESSAGE STYLE */
.error-message {
  @apply text-danger-foreground-low text-start;
}
/* #endregion ERROR MESSAGE STYLE */

/* #region CHANGE INPUT DEFAULT STYLE */
input[type="color"]::-webkit-color-swatch-wrapper {
  @apply border-0 p-0 bg-transparent;
}

input[type="color"]::-webkit-color-swatch {
  @apply border-xxs border-neutral-surface-highlight rounded-sm;
}

input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  @apply m-0;
}
/* #endregion CHANGE INPUT DEFAULT STYLE */
</style>

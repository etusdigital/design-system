<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  isNilAndBlank,
  applyMask,
  isValidEmail,
  isValidDomain,
  isValidUrl,
} from "../../utils/index";
import Label from "../../utils/components/Label.vue";

const props = withDefaults(
  defineProps<{
    modelValue: any[];
    labelValue?: string;
    errorMessage?: string;
    infoMessage?: string;
    disabled?: boolean;
    required?: boolean;
    allowDuplicate?: boolean;
    max?: number;
    isError?: boolean;
    placeholder?: string;
    mask?: "cpf" | "cnpj" | "cep" | "domain" | "url" | "email";
    icon?: string;
    appendIcon?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelValue: "",
    errorMessage: "",
    infoMessage: "",
    disabled: false,
    required: false,
    allowDuplicate: false,
    max: undefined,
    isError: false,
    placeholder: "",
    mask: undefined,
    icon: "",
    appendIcon: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any[]];
}>();

onMounted(() => {
  addToTagList();
});

let tags: any = ref([]);
const isFocused = ref(false);
const newTag = ref("");
const hasError = ref(false);
const errMessage = ref("");
const tagInput = ref<HTMLTextAreaElement | null>(null);

const ERROR_MESSAGES = {
  DUPLICATE: "Duplicated values are not allowed",
  INVALID_INPUT: "Please provide a valid input",
  MAX_VALUES: "Max number of values reached",
};

watch(
  () => props.modelValue,
  () => {
    addToTagList();
  }
);

function focusInput() {
  const input = tagInput.value?.querySelector("#input-default") as HTMLTextAreaElement;
  isFocused.value = true;
  if (input) input.focus();
}

function addToTagList() {
  tags.value = props.modelValue || [];
}

function addTag(tag: string) {
  if (hasError.value) return;

  if (isNilAndBlank(tag)) return;

  if (checkMultipleValues(tag)) {
    const urls = tag.split(/,|\n/).map((url) => url.trim());
    if (urls.length > 0) {
      urls.forEach((url) => {
        if (!checkErrors(url)) tags.value.push(url);
        resetFields();
      });
    }
  } else {
    if (!checkErrors(tag)) {
      tags.value.push(tag);
      resetFields();
    }
  }
  emit("update:modelValue", tags.value);
}

function checkErrors(url: string) {
  hasError.value = false;
  if (!props.allowDuplicate && checkDuplicate(url)) {
    setErrorMessage(ERROR_MESSAGES.DUPLICATE);
    return true;
  } else if (url.trim().length === 0) {
    setErrorMessage(ERROR_MESSAGES.INVALID_INPUT);
    return true;
  } else if (
    props.max !== undefined &&
    props.max > 0 &&
    tags.value.length > props.max - 1
  ) {
    setErrorMessage(ERROR_MESSAGES.MAX_VALUES);
    return true;
  }

  return false;
}

function resetErrorAfterTimeout() {
  setTimeout(() => {
    hasError.value = false;
  }, 2000);
}

function checkDuplicate(tag: string) {
  return tags.value.includes(tag);
}

function checkMultipleValues(tag: string) {
  return tag.includes(",") || tag.includes("\n");
}

function setErrorMessage(message: string) {
  errMessage.value = message;
  hasError.value = true;
  resetErrorAfterTimeout();
}

function resetFields() {
  errMessage.value = "";
  newTag.value = "";
  hasError.value = false;
}

function removeTag(index: number) {
  if (newTag.value.length) return;
  tags.value.splice(index, 1);
  emit("update:modelValue", tags.value);
}

function checkEmail(value: any) {
  hasError.value = !isValidEmail(value);
}

function checkDomain(value: any) {
  hasError.value = !isValidDomain(value);
}
function checkUrl(value: any) {
  hasError.value = !isValidUrl(value);
}

function applyMasks(e: any) {
  let maskedValue = e.target.value;
  maskedValue = applyMask(maskedValue, props.mask);

  if (props.mask == "email") checkEmail(maskedValue);
  else if (props.mask == "domain") checkDomain(maskedValue);
  else if (props.mask == "url") checkUrl(maskedValue);
}
</script>

<template>
  <div ref="tagInput" class="tag-input">
    <div
      class="flex flex-row justify-between items-center mxxs"
      v-if="labelValue"
    >
      <Label :label-value="labelValue" :info-message="infoMessage" :required="required" />
      <label
        v-if="max !== undefined && max > 0"
        class="text-neutral-foreground-low font-bold text-xs"
      >
        {{ tags.length }} / {{ max }}</label
      >
    </div>
    <div
      class="tag-input-container"
      tabindex="0"
      :class="{
        active: isFocused && !disabled,
        error: hasError || isError,
        disabled: disabled,
      }"
      @focus="focusInput"
      @blur="isFocused = false"
    >
      <slot name="icon-slot">
        <Icon
          v-if="icon && !appendIcon"
          :name="icon"
          class="side-icon"
        />
      </slot>
      <Tooltip
        v-for="(tag, index) in tags"
        :key="tag"
        position="bottom"
        class="max-w-full"
      >
        <Tag color="neutral" class="tag-padding max-w-full" :label-value="tag" closeable @close="removeTag(index)" />
          <template #label>
            <div class="max-w-[100%]">
              <span class="whitespace-normal break-all">{{ tag }}</span>
            </div>
          </template>
      </Tooltip>
      <textarea
        rows="1"
        v-model="newTag"
        id="input-default"
        class="input-default"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="applyMasks"
        @focusout="isFocused = false"
        @focus="isFocused = true"
        @keydown.enter="
          (e) => {
            e.preventDefault();
            addTag(newTag);
          }
        "
        @keydown.prevent.tab="addTag(newTag)"
        @keydown.backspace="removeTag(tags.length - 1)"
      />
      <slot name="appended-icon-slot">
        <Icon
          v-if="appendIcon && icon"
          :name="icon"
          class="side-icon"
        />
      </slot>
    </div>
    <div v-if="$slots['hint-message']">
      <label class="p3 text-neutral-foreground-low">
        <slot name="hint-message" />
      </label>
    </div>
    <div>
      <label v-if="props.isError || hasError" class="error-default">{{
        props.errorMessage || errMessage
      }}</label>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.tag-input-container {
  @apply flex flex-row flex-wrap gap-xxs border-xxs border-neutral-default rounded-base items-center py-xs px-sm bg-neutral-surface-default;
}

.tag-input-container.active {
  @apply border-primary-interaction-default;
}

.tag-input-container.error {
  @apply border-xxs border-danger-default border-solid focus:border-solid;
  animation: shake 0.5s;

  .input-default {
    @apply text-danger-foreground-high;
  }
}

.tag-input-container.disabled,
.tag-input-container.disabled .input-default {
  @apply bg-neutral-surface-disabled text-neutral-foreground-low border-neutral-default;
}

.info-icon.icon {
  @apply text-lg text-primary-interaction-default h-[1em] flex items-center;
}

.input-default {
  @apply p3 text-neutral-foreground-high rounded-base outline-none border-none flex-1 p-xxs focus:border-none focus:outline-none;
}

.error-default {
  @apply text-danger-foreground-low p3;
}

.tag-default {
  @apply flex items-center gap-xxs;
}

.tag-padding {
  @apply py-xxs;
}

.side-icon {
  @apply text-neutral-interaction-default;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-5px);
  }
  40% {
    transform: translateX(5px);
  }
  60% {
    transform: translateX(-5px);
  }
  80% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>

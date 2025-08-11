<script setup lang="ts">
import { ref, computed, watch, onBeforeMount, nextTick } from "vue";
import { useOptionalModel } from "#composables/OptionalModel";
import { useAriaAttributes, useScreenReader } from "#composables";
import { useInputValidation } from "#composables/useInputValidation";
import { useInputFormatting } from "#composables/useInputFormatting";
import { useFileInput } from "#composables/useFileInput";
import BLabel from "../../utils/components/Label.vue";
import BIcon from "../BIcon/BIcon.vue";
import type { BInputProps, BInputEmits, BInputValue } from "./BInput.types";

const props = withDefaults(defineProps<BInputProps>(), {
  modelValue: undefined,
  labelValue: "",
  type: "text",
  mask: undefined,
  max: undefined,
  min: undefined,
  step: 1,
  errorMessage: "",
  infoMessage: "",
  size: "100",
  isTextArea: false,
  disabled: false,
  isError: false,
  required: false,
  placeholder: "",
  textAlign: "start",
  tooltipMinWidth: "none",
  icon: "",
  appendIcon: false,
  loading: false,
  validationState: 'none',
  announceValidation: true,
  announceCharacterCount: false,
  autocomplete: undefined,
});

const emit = defineEmits<BInputEmits>();

// Component state
const inputValue = ref<BInputValue | undefined>();
const isFocused = ref(false);
const showPass = ref(false);

// Initialize optional model
const [model] = useOptionalModel<BInputValue | undefined>(
  props,
  "modelValue",
  emit,
  undefined
);

// Setup composables
const validationOptions = computed(() => ({
  type: props.type,
  mask: props.mask,
  max: props.max,
  min: props.min,
  required: props.required,
  isTextArea: props.isTextArea,
  disabled: props.disabled,
  isError: props.isError,
  announceValidation: props.announceValidation,
  customErrorAnnouncement: props.customErrorAnnouncement,
  customSuccessAnnouncement: props.customSuccessAnnouncement,
}));

const formattingOptions = computed(() => ({
  type: props.type,
  mask: props.mask,
  max: props.max,
  min: props.min,
  step: props.step,
  isTextArea: props.isTextArea,
}));

const fileOptions = computed(() => ({
  announceValidation: props.announceValidation,
  fileConfig: props.fileConfig,
}));

// Initialize composables
const validation = useInputValidation(inputValue, validationOptions.value);
const formatting = useInputFormatting(inputValue, formattingOptions.value);
const fileHandling = props.type === 'file' ? 
  useFileInput(inputValue, emit, fileOptions.value) : null;

// Accessibility setup
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();

// Generate unique IDs for ARIA relationships
const inputId = useAriaId('input');
const errorId = useAriaId('input-error');
const infoId = useAriaId('input-info');
const labelId = useAriaId('input-label');
const descriptionId = useAriaId('input-description');
const helpTextId = useAriaId('input-help');
const characterCountId = useAriaId('input-count');

// Computed values
const computedError = computed(() => props.isError || validation.hasError.value);

const type = computed(() => {
  const currentType = props.type;
  if (currentType === "color" || currentType === "email" || showPass.value)
    return "text";
  return currentType;
});

const prependIcon = computed(() => {
  if (props.type === "search") return "search";
  else if (!props.appendIcon) return props.icon;
  return "";
});

const appendedIcon = computed(() => {
  if (props.type === "password") {
    return showPass.value ? "visibility_off" : "visibility";
  } else if (props.appendIcon) return props.icon;
  return "";
});

const inputContainerClasses = computed(() => ({
  focus: isFocused.value,
  error: computedError.value,
  disabled: props.disabled,
}));

const inputStyle = computed(() => ({
  "text-align": props.textAlign 
}));

// Comprehensive ARIA attributes computation
const inputAriaAttrs = computed(() => {
  const describedByParts = [];
  
  if (props.helpText) describedByParts.push(helpTextId);
  if (props.infoMessage && !(computedError.value && props.errorMessage)) {
    describedByParts.push(infoId);
  }
  if (computedError.value && props.errorMessage) {
    describedByParts.push(errorId);
  }
  if (props.announceCharacterCount && formatting.computedMax.value) {
    describedByParts.push(characterCountId);
  }
  if (props.ariaDescription) {
    describedByParts.push(descriptionId);
  }

  return {
    id: inputId,
    'aria-label': props.ariaLabel || undefined,
    'aria-labelledby': !props.ariaLabel && props.labelValue ? labelId : undefined,
    'aria-describedby': describedByParts.length > 0 ? describedByParts.join(' ') : undefined,
    'aria-invalid': computedError.value,
    'aria-required': props.required || undefined,
    'aria-busy': props.loading || undefined,
    'aria-expanded': props.ariaExpanded,
    'aria-controls': props.ariaControls,
    'autocomplete': props.autocomplete,
    'inputmode': formatting.getInputMode(),
  };
});

// Accessible placeholder text
const accessiblePlaceholder = computed(() => 
  formatting.getAccessiblePlaceholder(props.placeholder)
);

// Character count for accessibility
const accessibleCharacterCount = computed(() => 
  formatting.getCharacterCountText(formatting.computedMax.value)
);

// Lifecycle
onBeforeMount(setInputValue);

// Watchers
watch(() => props.modelValue, setInputValue);
watch(() => props.type, setInputValue);

// Watch validation state changes
watch(validation.currentValidationState, (newState) => {
  emit('validation-change', newState, validation.getValidationMessage(newState));
});

// Watch character count changes
watch(formatting.characterCount, (newCount, oldCount) => {
  if (props.announceCharacterCount && formatting.computedMax.value) {
    emit('character-count-change', newCount, formatting.computedMax.value);
    
    // Announce critical milestones
    const remaining = formatting.computedMax.value - newCount;
    if (remaining === 10 && oldCount !== undefined && newCount > oldCount) {
      screenReader.announcePolitely('10 characters remaining');
    } else if (remaining === 0 && oldCount !== undefined && newCount > oldCount) {
      screenReader.announcePolitely('Character limit reached');
    }
  }
});

// Methods
function setInputValue() {
  if (props.type === "file") {
    fileHandling?.setFileState(props.modelValue);
  } else {
    inputValue.value = props.modelValue || props.modelValue == 0 ? props.modelValue : "";
    formatting.updateCharacterCount();
  }
}

function onInput() {
  formatting.formatInput();
  validation.validateInput();
  emit("update:modelValue", inputValue.value);
  emit("input", inputValue.value);
}

function onBlur(event: FocusEvent) {
  isFocused.value = false;
  validation.validateInput();
  
  // Announce validation state on blur for screen readers
  if (props.announceValidation && validation.currentValidationState.value === 'invalid') {
    nextTick(() => {
      const message = props.customErrorAnnouncement || 
                    props.errorMessage || 
                    'Input contains errors';
      screenReader.announceAssertively(message);
    });
  }
  
  emit("blur", event);
}

function onFocus(event: FocusEvent) {
  isFocused.value = true;
  if (!props.isError) {
    validation.clearValidation();
  }
  
  emit("focus", event);
}

function increaseOrDecrease(direction: number) {
  if (props.disabled) return;
  
  const newValue = formatting.adjustNumberValue(direction);
  if (newValue !== undefined) {
    inputValue.value = newValue;
    
    // Announce value change for screen readers
    if (props.announceValidation) {
      const boundary = direction > 0 ? 'maximum' : 'minimum';
      const limit = direction > 0 ? props.max : props.min;
      
      if (newValue === limit) {
        screenReader.announcePolitely(`${boundary} value ${limit} reached`);
      } else {
        screenReader.announcePolitely(`Value changed to ${newValue}`);
      }
    }
    
    onInput();
  }
}

function getSvgSize() {
  switch (props.size) {
    case "xs": return 56;
    case "sm": return 66;
    case "base": return 76;
    case "lg": return 86;
    case "xl": return 96;
    case "100": return 76;
    default: return 76;
  }
}

// Type checking utilities
function isTypeValid(value: string | string[], opposite = false): boolean {
  let valid = props.type === value;
  if (Array.isArray(value)) valid = value.includes(props.type);
  if (opposite) valid = !valid;
  return valid;
}

function isMaskValid(value: string | string[], opposite = false): boolean {
  let valid = props.mask === value;
  if (Array.isArray(value)) valid = value.includes(props.mask || '');
  if (opposite) valid = !valid;
  return valid;
}
</script>

<template>
  <div
    class="flex flex-col h-fit"
    :class="[
      isTypeValid('file', true) ? 'file-input-wrapper' : 'standard-input-wrapper',
      'size-' + props.size,
    ]"
    style="gap: 6px"
    :style="{ opacity: props.disabled && !isTypeValid('file') ? 0.5 : 1 }"
  >
    <!-- Label and Character Count -->
    <div
      class="flex justify-between items-center"
      v-if="labelValue || (formatting.computedMax !== undefined && !isTextArea && isTypeValid('text'))"
    >
      <BLabel
        :id="labelId"
        :label-value="labelValue"
        :info-message="props.infoMessage && !(computedError && props.errorMessage) ? props.infoMessage : ''"
        :tooltip-min-width="tooltipMinWidth"
        :required="required"
      />
      <span
        v-if="formatting.computedMax !== undefined && !isTextArea && isTypeValid('text')"
        class="b-input-max-length"
      >
        {{ formatting.characterCount }}/{{ formatting.computedMax }}
      </span>
    </div>

    <!-- File Input -->
    <template v-if="isTypeValid('file') && fileHandling">
      <div
        class="w-full h-full file-drop-area"
        :class="[{ 'blur-[2px]': fileHandling.isDragging.value }, 'file-' + props.size, 'file']"
        v-bind="fileHandling.getDragHandlers()"
      >
        <!-- Upload SVG Icon -->
        <svg
          v-if="!fileHandling.haveFile.value"
          :width="getSvgSize()"
          :height="getSvgSize()"
          viewBox="0 0 76 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M63.5312 33.25H42.75C40.8603 33.25 39.0481 32.4993 37.7119 31.1631C36.3757 29.8269 35.625 28.0147 35.625 26.125V5.34375C35.625 5.18628 35.5624 5.03526 35.4511 4.92391C35.3397 4.81256 35.1887 4.75 35.0312 4.75H21.375C18.8554 4.75 16.4391 5.75089 14.6575 7.53249C12.8759 9.31408 11.875 11.7304 11.875 14.25V61.75C11.875 64.2696 12.8759 66.6859 14.6575 68.4675C16.4391 70.2491 18.8554 71.25 21.375 71.25H54.625C57.1446 71.25 59.5609 70.2491 61.3425 68.4675C63.1241 66.6859 64.125 64.2696 64.125 61.75V33.8438C64.125 33.6863 64.0624 33.5353 63.9511 33.4239C63.8397 33.3126 63.6887 33.25 63.5312 33.25Z"
            fill="var(--neutral-border-default)"
          />
          <path
            d="M62.228 27.9938L40.8812 6.647C40.8397 6.60573 40.7869 6.57766 40.7295 6.56631C40.672 6.55495 40.6125 6.56083 40.5584 6.5832C40.5043 6.60556 40.4581 6.64342 40.4254 6.69202C40.3928 6.74061 40.3752 6.79776 40.375 6.8563V26.125C40.375 26.7549 40.6252 27.3589 41.0706 27.8043C41.516 28.2497 42.1201 28.5 42.75 28.5H62.0187C62.0772 28.4997 62.1344 28.4822 62.183 28.4495C62.2315 28.4169 62.2694 28.3706 62.2918 28.3165C62.3141 28.2624 62.32 28.2029 62.3087 28.1455C62.2973 28.0881 62.2692 28.0353 62.228 27.9938Z"
            fill="var(--neutral-border-default)"
          />
          <g clip-path="url(#clip0_2300_5309_BInput)">
            <circle cx="63" cy="63" r="7" fill="white" />
            <path
              d="M63 50C55.8319 50 50 55.8319 50 63C50 70.1681 55.8319 76 63 76C70.1681 76 76 70.1681 76 63C76 55.8319 70.1681 50 63 50ZM68 64H64V68C64 68.2652 63.8946 68.5196 63.7071 68.7071C63.5196 68.8946 63.2652 69 63 69C62.7348 69 62.4804 68.8946 62.2929 68.7071C62.1054 68.5196 62 68.2652 62 68V64H58C57.7348 64 57.4804 63.8946 57.2929 63.7071C57.1054 63.5196 57 63.2652 57 63C57 62.7348 57.1054 62.4804 57.2929 62.2929C57.4804 62.1054 57.7348 62 58 62H62V58C62 57.7348 62.1054 57.4804 62.2929 57.2929C62.4804 57.1054 62.7348 57 63 57C63.2652 57 63.5196 57.1054 63.7071 57.2929C63.8946 57.4804 64 57.7348 64 58V62H68C68.2652 62 68.5196 62.1054 68.7071 62.2929C68.8946 62.4804 69 62.7348 69 63C69 63.2652 68.8946 63.5196 68.7071 63.7071C68.5196 63.8946 68.2652 64 68 64Z"
              fill="var(--primary-interaction-default)"
            />
          </g>
          <defs>
            <clipPath id="clip0_2300_5309_BInput">
              <rect width="26" height="26" fill="white" transform="translate(50 50)" />
            </clipPath>
          </defs>
        </svg>

        <!-- File Selected Display -->
        <div v-if="fileHandling.haveFile.value" class="flex gap-2 items-center justify-center">
          <slot name="uploaded-file">
            <div class="flex flex-col items-center gap-xs">
              <BIcon name="draft" class="file-icon" />
              <div class="flex items-center gap-xs">
                <p class="file-name text-neutral-foreground-low truncate max-w-7xl">
                  {{ fileHandling.fileName.value }}
                </p>
                <BIcon
                  class="cursor-pointer trash-icon"
                  name="delete"
                  @click.stop="fileHandling.removeFile()"
                />
              </div>
            </div>
          </slot>
        </div>

        <!-- Upload Instructions -->
        <div v-if="!fileHandling.haveFile.value" class="flex flex-col items-center gap-xs">
          <p class="file-name cursor-pointer text-primary-interaction-default">
            {{ labelValue || "Select a file" }}
          </p>
          <p class="file-name text-neutral-foreground-low">
            {{ placeholder || "or drag and drop it here" }}
          </p>
        </div>

        <!-- Hidden File Input -->
        <input
          v-if="!fileHandling.haveFile.value"
          ref="inputFile"
          type="file"
          class="w-full h-full top-0 left-0 right-0 bottom-0 absolute opacity-0 z-1 cursor-pointer"
          v-bind="inputAriaAttrs"
          @change="fileHandling.handleFileChange"
          :disabled="disabled"
          :aria-label="fileHandling.getAccessibleFileLabel(props.labelValue)"
        />
      </div>
    </template>

    <!-- Textarea -->
    <div v-else-if="isTextArea" class="b-input-field-area" :class="inputContainerClasses">
      <textarea
        v-model="inputValue"
        class="b-input-text-content w-full"
        :style="inputStyle"
        :maxlength="formatting.computedMax.value"
        :placeholder="accessiblePlaceholder"
        :disabled="disabled"
        :rows="props.rows || 4"
        v-bind="inputAriaAttrs"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
      />
    </div>

    <!-- Regular Input -->
    <div v-else class="flex items-center h-fit">
      <div class="b-input-field-area flex-1" :class="inputContainerClasses">
        <BIcon
          v-if="prependIcon"
          :name="prependIcon"
          class="b-input-side-icon"
        />
        
        <input
          v-model="inputValue"
          class="b-input-text-content"
          :style="inputStyle"
          :disabled="disabled"
          :value="inputValue"
          :placeholder="accessiblePlaceholder"
          :type="type"
          spellcheck="false"
          :max="formatting.computedMax.value"
          :min="min"
          :step="step"
          :maxlength="formatting.computedMax.value"
          v-bind="inputAriaAttrs"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
        />
        
        <!-- Color Input Display -->
        <input
          v-if="isTypeValid('color')"
          v-model="inputValue"
          class="color-display"
          :class="{ disabled: disabled }"
          :disabled="disabled"
          type="color"
          v-bind="inputAriaAttrs"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
        />
        
        <BIcon
          v-if="appendedIcon"
          :name="appendedIcon"
          class="b-input-side-icon"
          :class="{ 'cursor-pointer': isTypeValid('password') }"
          @click="showPass = !showPass && isTypeValid('password')"
        />
      </div>

      <!-- Number Input Controls -->
      <div
        v-if="isTypeValid('number')"
        class="flex flex-col items-center ml-xxs"
        :class="{
          'text-neutral-interaction-disabled': disabled && !computedError,
          'text-danger-interaction-default': computedError && !disabled,
        }"
      >
        <BIcon
          name="arrow_drop_up"
          class="number-icon"
          role="button"
          :aria-label="`Increase value by ${props.step}`"
          tabindex="0"
          @click="increaseOrDecrease(1)"
          @keydown.enter.space.prevent="increaseOrDecrease(1)"
        />
        <BIcon
          name="arrow_drop_down"
          class="number-icon"
          role="button"
          :aria-label="`Decrease value by ${props.step}`"
          tabindex="0"
          @click="increaseOrDecrease(-1)"
          @keydown.enter.space.prevent="increaseOrDecrease(-1)"
        />
      </div>
    </div>

    <!-- Loading indicator for screen readers -->
    <div
      v-if="props.loading"
      :id="`${inputId}-loading`"
      class="sr-only"
      aria-live="polite"
    >
      Validating input...
    </div>

    <!-- Help text -->
    <div v-if="props.helpText" :id="helpTextId" class="b-input-help-text">
      {{ props.helpText }}
    </div>

    <!-- Custom ARIA description -->
    <div v-if="props.ariaDescription" :id="descriptionId" class="sr-only">
      {{ props.ariaDescription }}
    </div>

    <!-- Character count -->
    <div
      v-if="props.announceCharacterCount && formatting.computedMax.value"
      :id="characterCountId"
      class="b-input-character-count"
      :class="{ 'sr-only': !props.announceCharacterCount }"
      aria-live="polite"
    >
      {{ accessibleCharacterCount }}
    </div>

    <!-- Error message -->
    <small
      v-if="computedError && errorMessage"
      :id="errorId"
      class="b-input-message-error"
      role="alert"
      aria-live="assertive"
    >
      {{ errorMessage }}
    </small>

    <!-- Info message -->
    <small
      v-if="props.infoMessage && !(computedError && props.errorMessage)"
      :id="infoId"
      class="b-input-message-info"
    >
      {{ props.infoMessage }}
    </small>

    <!-- Screen reader instructions -->
    <div v-if="isTypeValid('password')" class="sr-only" aria-live="polite">
      Press the eye icon to {{ showPass ? 'hide' : 'show' }} password
    </div>

    <div v-if="isTypeValid('number')" class="sr-only" aria-live="polite">
      Use arrow keys or plus/minus buttons to change value. Step: {{ props.step }}
    </div>
  </div>
</template>

<style scoped>
	@import "../../assets/main.css";

	/* Accessibility styles */
	.sr-only {
		position: absolute !important;
		width: 1px !important;
		height: 1px !important;
		padding: 0 !important;
		margin: -1px !important;
		overflow: hidden !important;
		clip: rect(0, 0, 0, 0) !important;
		white-space: nowrap !important;
		border: 0 !important;
	}

	.b-input-help-text {
		@apply text-sm text-neutral-foreground-low mt-xs;
	}

	.b-input-character-count {
		@apply text-xs text-neutral-foreground-low text-right mt-xs;
	}

	/* Focus management improvements */
	.b-input-field-area:focus-within {
		outline: 2px solid var(--color-primary-interaction-default);
		outline-offset: 2px;
	}

	/* Loading state styling */
	.b-input-field-area:has(.b-input-text-content[aria-busy="true"]) {
		opacity: 0.7;
		position: relative;
	}

	/* Enhanced error styling for accessibility */
	.b-input-message-error {
		@apply text-sm text-danger-foreground-low font-medium;
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.b-input-field-area {
			border: 2px solid currentColor;
		}
		
		.b-input-field-area:focus-within {
			outline: 3px solid currentColor;
			outline-offset: 2px;
		}
		
		.b-input-message-error {
			border: 1px solid currentColor;
			padding: 0.25rem;
			border-radius: 0.25rem;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.b-input-field-area,
		.b-input-text-content {
			transition: none !important;
		}
	}

	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.b-input-help-text {
			color: var(--color-neutral-foreground-medium-dark, #9ca3af);
		}
		
		.b-input-character-count {
			color: var(--color-neutral-foreground-low-dark, #6b7280);
		}
	}

	/* Size classes controlam a largura do wrapper principal */
	.size-xs {
		width: 176px;
	}
	.size-sm {
		width: 272px;
	}
	.size-base {
		width: 367px;
	}
	.size-lg {
		width: 559px;
	}
	.size-xl {
		width: 1134px;
	}
	.size-100 {
		width: 100%;
	}

	/* Styles for input[type="color"] */
	.color-display {
		@apply w-2xl h-xl cursor-pointer bg-transparent;
	}
	.color-display.disabled {
		@apply pointer-events-none;
	}
	input[type="color"]::-webkit-color-swatch-wrapper {
		@apply border-0 p-0 bg-transparent;
	}
	input[type="color"]::-webkit-color-swatch {
		@apply border-xxs border-neutral-surface-highlight rounded-xs;
	}

	/* Styles for input[type="number"] controls */
	.number-icon {
		@apply cursor-pointer text-2xl flex items-center h-[.7em];
	}
	input[type="number"] {
		-moz-appearance: textfield;
	}
	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		@apply m-0;
	}

	/* File input specific styles */
	.file-drop-area {
		@apply relative flex flex-col items-center justify-center w-full h-full border-neutral-border-default border-dashed border-xxs cursor-pointer py-2 px-3 rounded-xs;
	}

	.file-icon {
		@apply text-neutral-foreground-low;
	}
	.trash-icon {
		@apply text-neutral-interaction-default hover:text-danger-interaction-default;
	}
	.file-name {
		/* Empty rule for consistency */
	}

	/* File input SIZES */
	.file-xs .file-icon {
		@apply text-4xl;
	}
	.file-xs .trash-icon {
		@apply text-base;
	}
	.file-xs .file-name {
		@apply text-xs;
	}

	.file-sm .file-icon {
		@apply text-6xl;
	}
	.file-sm .trash-icon {
		@apply text-lg;
	}
	.file-sm .file-name {
		@apply text-sm;
	}

	.file-base .file-icon {
		@apply text-7xl;
	}
	.file-base .trash-icon {
		@apply text-xl;
	}
	.file-base .file-name {
		@apply text-base;
	}

	.file-lg .file-icon {
		@apply text-8xl;
	}
	.file-lg .trash-icon {
		@apply text-2xl;
	}
	.file-lg .file-name {
		@apply text-lg;
	}

	.file-xl .file-icon {
		@apply text-9xl;
	}
	.file-xl .trash-icon {
		@apply text-3xl;
	}
	.file-xl .file-name {
		@apply text-xl;
	}

	.file-100 .file-icon {
		@apply text-7xl;
	}
	.file-100 .trash-icon {
		@apply text-lg;
	}
	.file-100 .file-name {
		@apply text-base;
	}
</style>
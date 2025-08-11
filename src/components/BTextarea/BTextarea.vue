<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import type {
  BTextareaProps,
  BTextareaEmits,
  BTextareaState,
  BTextareaValidationState,
  BTextareaAriaAttributes,
  BTextareaValidationResult,
} from './BTextarea.types';
import BLabel from '../../utils/components/Label.vue';

/**
 * Enhanced textarea properties with comprehensive accessibility
 */
interface Props extends BTextareaProps {}

/**
 * Component emits
 */
interface Emits extends BTextareaEmits {}

const props = withDefaults(defineProps<Props>(), {
  size: 'base',
  resize: 'vertical',
  wrap: 'soft',
  rows: 3,
  autoResize: false,
  showCount: false,
  spellcheck: true,
  keyboardNavigation: true,
  announceValidation: true,
  announceCharacterCount: false,
  announceLineCount: false,
  announceResize: true,
  enhancedFocus: true,
  minTouchTarget: true,
  showFocusIndicator: true,
  liveRegionPoliteness: 'polite',
  reduceMotion: false,
  highContrast: false,
  countTemplate: '{count}/{max}',
  tabSize: 2,
});

const emit = defineEmits<Emits>();

// Template refs
const textareaRef = ref<HTMLTextAreaElement>();
const containerRef = ref<HTMLDivElement>();
const liveRegionRef = ref<HTMLDivElement>();

// State management
const internalValue = ref(props.modelValue || '');
const isFocused = ref(false);
const isValidating = ref(false);
const validationState = ref<BTextareaValidationState>(props.validationState || 'none');
const validationMessage = ref('');
const isResizing = ref(false);
const dimensions = ref({ width: 0, height: 0, scrollHeight: 0, scrollWidth: 0 });
const selection = ref({ start: 0, end: 0, direction: 'none' as const });

// Computed values
const componentId = computed(() => props.id || `btextarea-${Math.random().toString(36).substr(2, 9)}`);

const characterCount = computed(() => internalValue.value?.length || 0);
const lineCount = computed(() => (internalValue.value || '').split('\n').length);
const wordCount = computed(() => {
  const text = internalValue.value || '';
  return text.trim() ? text.trim().split(/\s+/).length : 0;
});

const hasError = computed(() => props.isError || validationState.value === 'invalid');
const isRequired = computed(() => props.required);
const isDisabled = computed(() => props.disabled);
const isReadonly = computed(() => props.readonly);
const hasContent = computed(() => Boolean(internalValue.value?.trim()));

// Character limit validation
const isOverLimit = computed(() => {
  return props.maxLength ? characterCount.value > props.maxLength : false;
});

const remainingCharacters = computed(() => {
  return props.maxLength ? props.maxLength - characterCount.value : null;
});

// CSS classes
const containerClasses = computed(() => [
  'b-textarea-container',
  `b-textarea-container--${props.size}`,
  {
    'b-textarea-container--disabled': isDisabled.value,
    'b-textarea-container--error': hasError.value,
    'b-textarea-container--focused': isFocused.value,
    'b-textarea-container--readonly': isReadonly.value,
    'b-textarea-container--loading': props.loading,
    'b-textarea-container--has-content': hasContent.value,
    'b-textarea-container--high-contrast': props.highContrast,
    'b-textarea-container--reduce-motion': props.reduceMotion,
    'b-textarea-container--min-touch-target': props.minTouchTarget,
  }
]);

const textareaClasses = computed(() => [
  'b-textarea',
  `b-textarea--${props.size}`,
  `b-textarea--resize-${props.resize}`,
  `b-textarea--align-${props.textAlign || 'start'}`,
  {
    'b-textarea--auto-resize': props.autoResize,
    'b-textarea--error': hasError.value,
    'b-textarea--disabled': isDisabled.value,
    'b-textarea--readonly': isReadonly.value,
    'b-textarea--show-resize-handle': props.showResizeHandle,
    'b-textarea--enhanced-focus': props.enhancedFocus && props.showFocusIndicator,
  }
]);

const countClasses = computed(() => [
  'b-textarea-count',
  `b-textarea-count--${props.countConfig?.position || 'bottom-right'}`,
  {
    'b-textarea-count--error': isOverLimit.value,
    'b-textarea-count--warning': props.maxLength && characterCount.value > props.maxLength * 0.9,
  }
]);

// ARIA attributes
const ariaAttributes = computed<BTextareaAriaAttributes>(() => ({
  id: componentId.value,
  role: 'textbox',
  'aria-label': props.ariaLabel,
  'aria-labelledby': props.ariaLabelledBy,
  'aria-describedby': getAriaDescribedBy(),
  'aria-invalid': hasError.value,
  'aria-required': isRequired.value,
  'aria-busy': props.loading || isValidating.value,
  'aria-multiline': true,
  tabindex: isDisabled.value ? -1 : 0,
  autocomplete: props.autocomplete,
  spellcheck: props.spellcheck,
}));

// Helper functions
function getAriaDescribedBy(): string | undefined {
  const descriptions = [];
  
  if (props.ariaDescribedBy) descriptions.push(props.ariaDescribedBy);
  if (props.helpText) descriptions.push(`${componentId.value}-help`);
  if (hasError.value && props.errorMessage) descriptions.push(`${componentId.value}-error`);
  if (props.infoMessage) descriptions.push(`${componentId.value}-info`);
  if (props.showCount) descriptions.push(`${componentId.value}-count`);
  
  return descriptions.length > 0 ? descriptions.join(' ') : undefined;
}

function updateDimensions() {
  if (textareaRef.value) {
    const rect = textareaRef.value.getBoundingClientRect();
    dimensions.value = {
      width: rect.width,
      height: rect.height,
      scrollHeight: textareaRef.value.scrollHeight,
      scrollWidth: textareaRef.value.scrollWidth,
    };
  }
}

function updateSelection() {
  if (textareaRef.value) {
    selection.value = {
      start: textareaRef.value.selectionStart,
      end: textareaRef.value.selectionEnd,
      direction: textareaRef.value.selectionDirection as 'forward' | 'backward' | 'none',
    };
    emit('selection-change', selection.value);
  }
}

function autoResizeTextarea() {
  if (!props.autoResize || !textareaRef.value) return;

  const textarea = textareaRef.value;
  const minHeight = props.autoResizeConfig?.minHeight || 60;
  const maxHeight = props.autoResizeConfig?.maxHeight || 400;

  // Reset height to auto to get the correct scrollHeight
  textarea.style.height = 'auto';
  
  // Calculate new height
  let newHeight = Math.max(minHeight, textarea.scrollHeight);
  newHeight = Math.min(maxHeight, newHeight);
  
  // Apply new height
  textarea.style.height = `${newHeight}px`;
  
  // Announce resize if enabled
  if (props.announceResize && newHeight !== dimensions.value.height) {
    announceToScreenReader(`Textarea resized to height ${newHeight} pixels`);
    emit('auto-resize', newHeight);
  }
  
  updateDimensions();
}

function announceToScreenReader(message: string) {
  if (!liveRegionRef.value) return;
  
  liveRegionRef.value.textContent = '';
  nextTick(() => {
    if (liveRegionRef.value) {
      liveRegionRef.value.textContent = message;
    }
  });
}

function validateValue(value: string | undefined): BTextareaValidationResult {
  const result: BTextareaValidationResult = {
    isValid: true,
    state: 'valid',
    errors: [],
    warnings: [],
    value,
    characterCount: {
      current: value?.length || 0,
      max: props.maxLength,
      valid: true,
    },
    lineCount: {
      current: (value || '').split('\n').length,
      min: props.validationConfig?.minLines,
      max: props.validationConfig?.maxLines,
      valid: true,
    },
    wordCount: {
      current: value?.trim() ? value.trim().split(/\s+/).length : 0,
      limit: props.validationConfig?.wordLimit,
      valid: true,
    },
  };

  // Required validation
  if (props.required && !value?.trim()) {
    result.isValid = false;
    result.state = 'invalid';
    result.errors.push(props.validationConfig?.messages?.required || 'This field is required');
  }

  // Length validations
  if (props.minLength && value && value.length < props.minLength) {
    result.isValid = false;
    result.state = 'invalid';
    result.errors.push(props.validationConfig?.messages?.tooShort || 'Text is too short');
  }

  if (props.maxLength && value && value.length > props.maxLength) {
    result.isValid = false;
    result.state = 'invalid';
    result.characterCount!.valid = false;
    result.errors.push(props.validationConfig?.messages?.tooLong || 'Text is too long');
  }

  // Line count validation
  const lineCount = (value || '').split('\n').length;
  if (props.validationConfig?.minLines && lineCount < props.validationConfig.minLines) {
    result.isValid = false;
    result.state = 'invalid';
    result.lineCount!.valid = false;
    result.errors.push(props.validationConfig?.messages?.minLines || 'Minimum number of lines required');
  }

  if (props.validationConfig?.maxLines && lineCount > props.validationConfig.maxLines) {
    result.isValid = false;
    result.state = 'invalid';
    result.lineCount!.valid = false;
    result.errors.push(props.validationConfig?.messages?.maxLines || 'Maximum number of lines exceeded');
  }

  // Word count validation
  const wordCount = value?.trim() ? value.trim().split(/\s+/).length : 0;
  if (props.validationConfig?.wordLimit && wordCount > props.validationConfig.wordLimit) {
    result.isValid = false;
    result.state = 'invalid';
    result.wordCount!.valid = false;
    result.errors.push(props.validationConfig?.messages?.wordLimit || 'Word limit exceeded');
  }

  // Custom validation
  if (props.validationConfig?.validator) {
    const customResult = props.validationConfig.validator(value);
    if (typeof customResult === 'string') {
      result.isValid = false;
      result.state = 'invalid';
      result.errors.push(customResult);
    } else if (!customResult) {
      result.isValid = false;
      result.state = 'invalid';
      result.errors.push(props.validationConfig?.messages?.invalid || 'Please enter a valid value');
    }
  }

  return result;
}

function runValidation() {
  if (!props.validationConfig?.enabled) return;

  isValidating.value = true;
  const result = validateValue(internalValue.value);
  
  validationState.value = result.state;
  validationMessage.value = result.errors.join(', ');
  
  if (props.announceValidation) {
    const message = result.isValid 
      ? 'Textarea is now valid'
      : `Error: ${result.errors.join(', ')}`;
    announceToScreenReader(message);
  }

  emit('validation-change', result.state, validationMessage.value);
  
  setTimeout(() => {
    isValidating.value = false;
  }, 100);
}

// Event handlers
function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  internalValue.value = target.value;
  emit('update:modelValue', target.value);
  emit('input', target.value);

  // Auto-resize if enabled
  if (props.autoResize) {
    autoResizeTextarea();
  }

  // Real-time validation
  if (props.validationConfig?.mode === 'realtime') {
    const debounceTime = props.validationConfig?.debounceTime || 300;
    clearTimeout(validationTimeout);
    validationTimeout = setTimeout(runValidation, debounceTime);
  }

  // Announce character count if enabled
  if (props.announceCharacterCount && props.maxLength) {
    const count = target.value.length;
    const max = props.maxLength;
    const percentage = (count / max) * 100;
    
    if ([25, 50, 75, 90, 95].includes(Math.floor(percentage))) {
      announceToScreenReader(`${count} of ${max} characters`);
    }
  }

  emit('character-count-change', characterCount.value, props.maxLength);
  emit('line-count-change', lineCount.value);
  emit('word-count-change', wordCount.value);
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true;
  updateSelection();
  emit('focus', event);
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false;
  
  // Validation on blur
  if (props.validationConfig?.mode === 'onBlur') {
    runValidation();
  }

  emit('blur', event);
}

function handleKeydown(event: KeyboardEvent) {
  emit('keydown', event);

  // Handle keyboard shortcuts
  if (props.keyboardConfig?.enabled !== false) {
    // Submit shortcuts (Ctrl+Enter or Cmd+Enter)
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      emit('enter', internalValue.value);
      return;
    }

    // Clear shortcut (Escape)
    if (event.key === 'Escape' && props.keyboardConfig?.clearKeys?.includes('Escape')) {
      event.preventDefault();
      internalValue.value = '';
      emit('update:modelValue', '');
      emit('clear');
      return;
    }

    // Tab indentation
    if (event.key === 'Tab' && props.keyboardConfig?.tabIndentation) {
      event.preventDefault();
      const target = event.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const tabChar = ' '.repeat(props.tabSize || 2);
      
      const newValue = 
        internalValue.value.substring(0, start) + 
        tabChar + 
        internalValue.value.substring(end);
      
      internalValue.value = newValue;
      emit('update:modelValue', newValue);
      
      nextTick(() => {
        target.selectionStart = target.selectionEnd = start + tabChar.length;
        updateSelection();
      });
    }
  }
}

function handleKeyup(event: KeyboardEvent) {
  updateSelection();
  emit('keyup', event);
}

function handlePaste(event: ClipboardEvent) {
  emit('paste', event);
  if (props.announceValidation) {
    announceToScreenReader('Content pasted');
  }
}

function handleCut(event: ClipboardEvent) {
  emit('cut', event);
}

function handleCopy(event: ClipboardEvent) {
  emit('copy', event);
}

function handleScroll(event: Event) {
  updateDimensions();
  emit('scroll', event);
}

function handleResize() {
  if (!isResizing.value) {
    isResizing.value = true;
    updateDimensions();
    
    if (props.announceResize) {
      announceToScreenReader(`Textarea resized to ${dimensions.value.width} by ${dimensions.value.height} pixels`);
    }
    
    emit('resize', { width: dimensions.value.width, height: dimensions.value.height });
    
    setTimeout(() => {
      isResizing.value = false;
    }, 300);
  }
}

// Format count display
function formatCount(): string {
  if (props.countTemplate) {
    return props.countTemplate
      .replace('{count}', characterCount.value.toString())
      .replace('{max}', (props.maxLength || '').toString())
      .replace('{remaining}', (remainingCharacters.value || '').toString())
      .replace('{lines}', lineCount.value.toString())
      .replace('{words}', wordCount.value.toString());
  }

  if (props.countConfig?.characterCountFormat === 'remaining' && props.maxLength) {
    return `${remainingCharacters.value} remaining`;
  } else if (props.countConfig?.characterCountFormat === 'fraction' && props.maxLength) {
    return `${characterCount.value}/${props.maxLength}`;
  } else {
    return characterCount.value.toString();
  }
}

// Timeout for validation debouncing
let validationTimeout: NodeJS.Timeout;

// Lifecycle
onMounted(() => {
  if (props.autoFocus && textareaRef.value) {
    textareaRef.value.focus();
  }

  updateDimensions();

  if (props.autoResize) {
    autoResizeTextarea();
  }

  // Add resize observer
  if (window.ResizeObserver && textareaRef.value) {
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(textareaRef.value);
  }
});

// Watchers
watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalValue.value) {
    internalValue.value = newValue || '';
    if (props.autoResize) {
      nextTick(autoResizeTextarea);
    }
  }
});

watch(() => internalValue.value, () => {
  if (props.autoResize) {
    nextTick(autoResizeTextarea);
  }
});

// Expose public methods
defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  select: () => textareaRef.value?.select(),
  setSelectionRange: (start: number, end: number, direction?: 'forward' | 'backward' | 'none') => {
    textareaRef.value?.setSelectionRange(start, end, direction);
    updateSelection();
  },
  validate: runValidation,
  autoResize: autoResizeTextarea,
});
</script>

<template>
  <div :class="containerClasses" ref="containerRef">
    <!-- Label -->
    <BLabel
      v-if="labelValue"
      :for="componentId"
      :class="[
        'b-textarea-label',
        {
          'b-textarea-label--required': isRequired,
          'b-textarea-label--error': hasError,
          'b-textarea-label--disabled': isDisabled,
        }
      ]"
    >
      {{ labelValue }}
      <span v-if="isRequired" class="b-textarea-required" aria-label="required">*</span>
    </BLabel>

    <!-- Help text -->
    <div
      v-if="helpText"
      :id="`${componentId}-help`"
      class="b-textarea-help"
    >
      {{ helpText }}
    </div>

    <!-- Textarea container with icon -->
    <div class="b-textarea-wrapper">
      <!-- Prepend icon -->
      <div
        v-if="icon && !appendIcon"
        class="b-textarea-icon b-textarea-icon--prepend"
        :class="{ 'b-textarea-icon--disabled': isDisabled }"
      >
        <i :class="icon" aria-hidden="true"></i>
      </div>

      <!-- Main textarea -->
      <textarea
        ref="textareaRef"
        v-bind="{ ...ariaAttributes, ...$attrs }"
        :value="internalValue"
        :class="textareaClasses"
        :placeholder="placeholder"
        :rows="rows"
        :cols="cols"
        :maxlength="maxLength"
        :minlength="minLength"
        :disabled="isDisabled"
        :readonly="isReadonly"
        :wrap="wrap"
        :style="style"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
        @paste="handlePaste"
        @cut="handleCut"
        @copy="handleCopy"
        @scroll="handleScroll"
      />

      <!-- Append icon -->
      <div
        v-if="icon && appendIcon"
        class="b-textarea-icon b-textarea-icon--append"
        :class="{ 'b-textarea-icon--disabled': isDisabled }"
      >
        <i :class="icon" aria-hidden="true"></i>
      </div>

      <!-- Loading indicator -->
      <div
        v-if="loading"
        class="b-textarea-loading"
        aria-hidden="true"
      >
        <div class="b-textarea-spinner"></div>
      </div>
    </div>

    <!-- Character/Line/Word count -->
    <div
      v-if="showCount && (maxLength || countConfig?.showCharacterCount || countConfig?.showLineCount || countConfig?.showWordCount)"
      :id="`${componentId}-count`"
      :class="countClasses"
      :aria-label="`${formatCount()} characters`"
    >
      <span class="b-textarea-count-text">
        {{ formatCount() }}
      </span>
      <span v-if="countConfig?.showLineCount" class="b-textarea-count-lines">
        {{ lineCount }} {{ lineCount === 1 ? 'line' : 'lines' }}
      </span>
      <span v-if="countConfig?.showWordCount" class="b-textarea-count-words">
        {{ wordCount }} {{ wordCount === 1 ? 'word' : 'words' }}
      </span>
    </div>

    <!-- Error message -->
    <div
      v-if="hasError && (errorMessage || validationMessage)"
      :id="`${componentId}-error`"
      class="b-textarea-error"
      role="alert"
      aria-live="polite"
    >
      {{ errorMessage || validationMessage }}
    </div>

    <!-- Info message -->
    <div
      v-if="infoMessage && !hasError"
      :id="`${componentId}-info`"
      class="b-textarea-info"
    >
      {{ infoMessage }}
    </div>

    <!-- Screen reader live region for announcements -->
    <div
      ref="liveRegionRef"
      class="sr-only"
      :aria-live="liveRegionPoliteness"
      aria-atomic="true"
    ></div>
  </div>
</template>

<style scoped>
.b-textarea-container {
  @apply relative w-full;
}

.b-textarea-container--disabled {
  @apply opacity-60 cursor-not-allowed;
}

.b-textarea-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.b-textarea-label--required {
  @apply font-semibold;
}

.b-textarea-label--error {
  @apply text-red-600;
}

.b-textarea-label--disabled {
  @apply text-gray-400;
}

.b-textarea-required {
  @apply text-red-500 ml-1;
}

.b-textarea-help {
  @apply text-sm text-gray-600 mb-2;
}

.b-textarea-wrapper {
  @apply relative flex items-start;
}

.b-textarea {
  @apply block w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
  @apply placeholder:text-gray-400;
  @apply disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed;
  @apply read-only:bg-gray-50 read-only:cursor-default;
  @apply transition-colors duration-200;
  font-family: inherit;
  resize: vertical;
  min-height: 60px;
}

.b-textarea--xs {
  @apply text-xs px-2 py-1;
  min-height: 50px;
}

.b-textarea--sm {
  @apply text-sm px-2.5 py-1.5;
  min-height: 55px;
}

.b-textarea--base {
  @apply text-base px-3 py-2;
  min-height: 60px;
}

.b-textarea--lg {
  @apply text-lg px-3.5 py-2.5;
  min-height: 70px;
}

.b-textarea--xl {
  @apply text-xl px-4 py-3;
  min-height: 80px;
}

.b-textarea--100 {
  @apply w-full h-full min-h-full;
}

.b-textarea--resize-none {
  resize: none;
}

.b-textarea--resize-both {
  resize: both;
}

.b-textarea--resize-horizontal {
  resize: horizontal;
}

.b-textarea--resize-vertical {
  resize: vertical;
}

.b-textarea--resize-auto {
  resize: none;
  overflow: hidden;
}

.b-textarea--auto-resize {
  resize: none;
  overflow: hidden;
}

.b-textarea--align-start {
  @apply text-left;
}

.b-textarea--align-center {
  @apply text-center;
}

.b-textarea--align-end {
  @apply text-right;
}

.b-textarea--align-justify {
  text-align: justify;
}

.b-textarea--error {
  @apply border-red-300 text-red-900 placeholder:text-red-300;
  @apply focus:ring-red-500 focus:border-red-500;
}

.b-textarea--disabled {
  @apply bg-gray-50 text-gray-500 cursor-not-allowed;
  @apply placeholder:text-gray-300;
}

.b-textarea--readonly {
  @apply bg-gray-50 cursor-default;
}

.b-textarea--enhanced-focus {
  @apply focus:ring-4 focus:ring-primary-200/50;
}

.b-textarea-icon {
  @apply absolute z-10 flex items-center justify-center w-5 h-5 text-gray-400;
  top: 12px;
}

.b-textarea-icon--prepend {
  left: 12px;
}

.b-textarea-icon--append {
  right: 12px;
}

.b-textarea-icon--disabled {
  @apply text-gray-300;
}

.b-textarea:has(+ .b-textarea-icon--prepend) {
  @apply pl-10;
}

.b-textarea:has(+ .b-textarea-icon--append) {
  @apply pr-10;
}

.b-textarea-loading {
  @apply absolute right-3 top-3 flex items-center justify-center;
}

.b-textarea-spinner {
  @apply w-4 h-4 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin;
}

.b-textarea-count {
  @apply flex items-center justify-end gap-2 mt-1 text-sm text-gray-500;
}

.b-textarea-count--bottom-left {
  @apply justify-start;
}

.b-textarea-count--top-right {
  @apply absolute top-0 right-0 mt-1 mr-1;
}

.b-textarea-count--top-left {
  @apply absolute top-0 left-0 mt-1 ml-1;
}

.b-textarea-count--error {
  @apply text-red-600 font-medium;
}

.b-textarea-count--warning {
  @apply text-yellow-600;
}

.b-textarea-count-text,
.b-textarea-count-lines,
.b-textarea-count-words {
  @apply tabular-nums;
}

.b-textarea-error {
  @apply mt-1 text-sm text-red-600;
}

.b-textarea-info {
  @apply mt-1 text-sm text-gray-600;
}

/* High contrast mode support */
.b-textarea-container--high-contrast .b-textarea {
  @apply border-2 border-black;
}

.b-textarea-container--high-contrast .b-textarea:focus {
  @apply ring-4 ring-black ring-offset-2;
}

/* Reduced motion support */
.b-textarea-container--reduce-motion * {
  @apply transition-none;
}

/* Minimum touch target support */
.b-textarea-container--min-touch-target .b-textarea {
  min-height: 44px;
  min-width: 44px;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
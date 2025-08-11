<script setup lang="ts">
import { ref, reactive, computed, watch, provide, onMounted, onUnmounted, nextTick } from 'vue';
import { useAriaAttributes, useScreenReader } from '#composables';
import type {
  BFormProps,
  BFormEmits,
  BFormState,
  BFormValidationResult,
  BFormFieldValidation,
  BFormFieldRegistration,
  BFormValidationConfig,
  BFormSubmissionConfig,
  BFormKeyboardConfig,
  BFormAriaAttributes,
} from './BForm.types';
import {
  DEFAULT_FORM_VALIDATION_CONFIG,
  DEFAULT_FORM_SUBMISSION_CONFIG,
  DEFAULT_FORM_KEYBOARD_CONFIG,
  DEFAULT_FORM_ACCESSIBILITY_CONFIG,
  DEFAULT_FORM_ANNOUNCEMENTS,
  FORM_SIZE_CONFIG,
  FORM_LAYOUT_CONFIG,
} from './BForm.types';

interface Props extends BFormProps {}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  method: 'POST',
  disabled: false,
  readonly: false,
  loading: false,
  novalidate: true,
  autocomplete: 'on',
  showErrorSummary: true,
  errorSummaryPosition: 'top',
  showSuccessMessage: true,
  layout: 'vertical',
  size: 'md',
  spacing: 'normal',
  autoSave: false,
  autoSaveDelay: 1000,
  validationConfig: () => ({}),
  submissionConfig: () => ({}),
  keyboardConfig: () => ({}),
});

const emit = defineEmits<BFormEmits>();

// Refs and reactive state
const form = ref<HTMLFormElement | null>(null);
const formId = ref<string>('');
const fieldRegistrations = ref<Map<string, BFormFieldRegistration>>(new Map());
const autoSaveTimeout = ref<NodeJS.Timeout | null>(null);

// Composables
const { useAriaId } = useAriaAttributes();
const { announce, announcePolitely } = useScreenReader();

// Generate unique form ID
onMounted(() => {
  formId.value = useAriaId('form')();
});

// Reactive form state
const formState = reactive<BFormState>({
  data: { ...props.modelValue },
  previousData: { ...props.modelValue },
  validationState: 'idle',
  submissionState: 'idle',
  fieldValidations: {},
  isTouched: false,
  isDirty: false,
  isValidating: false,
  isSubmitting: false,
  isDisabled: props.disabled,
  isReadonly: props.readonly,
  errorCount: 0,
  warningCount: 0,
  focusedField: null,
  keyboardMode: false,
  formElement: null,
  lastError: null,
  lastResult: null,
});

// Configuration objects
const validationConfig = computed<BFormValidationConfig>(() => ({
  ...DEFAULT_FORM_VALIDATION_CONFIG,
  ...props.validationConfig,
}));

const submissionConfig = computed<BFormSubmissionConfig>(() => ({
  ...DEFAULT_FORM_SUBMISSION_CONFIG,
  ...props.submissionConfig,
}));

const keyboardConfig = computed<BFormKeyboardConfig>(() => ({
  ...DEFAULT_FORM_KEYBOARD_CONFIG,
  ...props.keyboardConfig,
}));

const accessibilityConfig = computed(() => ({
  ...DEFAULT_FORM_ACCESSIBILITY_CONFIG,
  ...props,
}));

// Computed properties
const isFormValid = computed(() => {
  return formState.errorCount === 0 && formState.validationState !== 'invalid';
});

const canSubmit = computed(() => {
  return !formState.isSubmitting && 
         !props.disabled && 
         !props.readonly && 
         (validationConfig.value.mode !== 'submit' ? isFormValid.value : true);
});

const formAriaAttrs = computed<BFormAriaAttributes>(() => ({
  role: 'form',
  'aria-label': accessibilityConfig.value.ariaLabel || props.name,
  'aria-labelledby': accessibilityConfig.value.ariaLabelledBy,
  'aria-describedby': accessibilityConfig.value.ariaDescribedBy,
  'aria-invalid': !isFormValid.value,
  'aria-busy': formState.isSubmitting || formState.isValidating,
  'aria-live': accessibilityConfig.value.liveRegionPoliteness,
  'aria-atomic': true,
  autocomplete: props.autocomplete,
  novalidate: props.novalidate,
}));

const formClasses = computed(() => [
  'b-form',
  `b-form--${props.layout}`,
  `b-form--${props.size}`,
  `b-form--spacing-${props.spacing}`,
  {
    'b-form--disabled': props.disabled,
    'b-form--readonly': props.readonly,
    'b-form--loading': props.loading || formState.isSubmitting,
    'b-form--invalid': !isFormValid.value,
    'b-form--validating': formState.isValidating,
    'b-form--touched': formState.isTouched,
    'b-form--dirty': formState.isDirty,
    'b-form--keyboard-mode': formState.keyboardMode,
  },
  props.class,
]);

const sizeConfig = computed(() => FORM_SIZE_CONFIG[props.size] || FORM_SIZE_CONFIG.md);
const layoutConfig = computed(() => FORM_LAYOUT_CONFIG[props.layout] || FORM_LAYOUT_CONFIG.vertical);

// Form validation logic
async function validateField(fieldName: string, value: any): Promise<BFormFieldValidation> {
  const registration = fieldRegistrations.value.get(fieldName);
  const validation: BFormFieldValidation = {
    name: fieldName,
    isValid: true,
    state: 'idle',
    errors: [],
    warnings: [],
    value,
    element: registration?.element,
  };

  // Required field validation
  if (registration?.required && (value === null || value === undefined || value === '')) {
    validation.isValid = false;
    validation.state = 'invalid';
    validation.errors.push(`${fieldName} is required`);
  }

  // Custom field validator
  if (registration?.validator) {
    const result = registration.validator(value);
    if (typeof result === 'string') {
      validation.isValid = false;
      validation.state = 'invalid';
      validation.errors.push(result);
    } else if (!result) {
      validation.isValid = false;
      validation.state = 'invalid';
      validation.errors.push(`${fieldName} is invalid`);
    }
  }

  // Global field validators
  if (validationConfig.value.fieldValidators?.[fieldName]) {
    const validator = validationConfig.value.fieldValidators[fieldName];
    const result = validator(value);
    if (typeof result === 'string') {
      validation.isValid = false;
      validation.state = 'invalid';
      validation.errors.push(result);
    } else if (!result) {
      validation.isValid = false;
      validation.state = 'invalid';
      validation.errors.push(`${fieldName} is invalid`);
    }
  }

  if (validation.isValid) {
    validation.state = 'valid';
  }

  return validation;
}

async function validateForm(): Promise<BFormValidationResult> {
  if (!validationConfig.value.enabled) {
    return {
      isValid: true,
      state: 'idle',
      fields: {},
      errors: [],
      warnings: [],
      data: formState.data,
    };
  }

  formState.isValidating = true;
  formState.validationState = 'validating';

  if (accessibilityConfig.value.announceValidation) {
    announcePolitely(DEFAULT_FORM_ANNOUNCEMENTS.validationStart);
  }

  const result: BFormValidationResult = {
    isValid: true,
    state: 'valid',
    fields: {},
    errors: [],
    warnings: [],
    data: { ...formState.data },
    timestamp: Date.now(),
  };

  // Validate all registered fields
  const fieldPromises = Array.from(fieldRegistrations.value.keys()).map(async (fieldName) => {
    const fieldValue = formState.data[fieldName];
    const fieldValidation = await validateField(fieldName, fieldValue);
    result.fields[fieldName] = fieldValidation;
    
    if (!fieldValidation.isValid) {
      result.isValid = false;
      result.state = 'invalid';
      result.errors.push(...fieldValidation.errors);
    }
    
    result.warnings.push(...fieldValidation.warnings);
  });

  await Promise.all(fieldPromises);

  // Custom form validator
  if (validationConfig.value.validator) {
    const customResult = validationConfig.value.validator(formState.data);
    if (customResult) {
      result.isValid = result.isValid && customResult.isValid;
      result.state = customResult.isValid ? result.state : 'invalid';
      result.errors.push(...customResult.errors);
      result.warnings.push(...customResult.warnings);
    }
  }

  // Update form state
  formState.fieldValidations = { ...result.fields };
  formState.validationState = result.state;
  formState.errorCount = result.errors.length;
  formState.warningCount = result.warnings.length;
  formState.isValidating = false;

  // Announce validation result
  if (accessibilityConfig.value.announceValidation) {
    const message = result.isValid 
      ? DEFAULT_FORM_ANNOUNCEMENTS.formValid
      : DEFAULT_FORM_ANNOUNCEMENTS.formInvalid.replace('{count}', result.errors.length.toString());
    announcePolitely(message);
  }

  // Scroll to first error if configured
  if (!result.isValid && validationConfig.value.scrollToError) {
    await nextTick();
    scrollToFirstError();
  }

  // Focus first error field if configured
  if (!result.isValid && validationConfig.value.focusError) {
    focusFirstErrorField();
  }

  // Emit validation events
  emit('validation', { result, trigger: validationConfig.value.mode!, state: formState, timestamp: result.timestamp! });
  
  if (result.isValid) {
    emit('valid', result);
  } else {
    emit('invalid', result);
  }

  return result;
}

function scrollToFirstError(): void {
  const firstErrorField = Object.values(formState.fieldValidations)
    .find(field => !field.isValid);
    
  if (firstErrorField?.element) {
    const offset = validationConfig.value.scrollOffset || 80;
    const elementTop = firstErrorField.element.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
      top: elementTop,
      behavior: validationConfig.value.scrollBehavior || 'smooth',
    });
  }
}

function focusFirstErrorField(): void {
  const firstErrorField = Object.values(formState.fieldValidations)
    .find(field => !field.isValid);
    
  if (firstErrorField?.element && 'focus' in firstErrorField.element) {
    (firstErrorField.element as any).focus();
  }
}

// Form submission logic
async function handleSubmit(event: Event): Promise<void> {
  event.preventDefault();

  if (!canSubmit.value) {
    return;
  }

  formState.submissionState = 'submitting';
  formState.isSubmitting = true;

  if (accessibilityConfig.value.announceSubmission) {
    announce(DEFAULT_FORM_ANNOUNCEMENTS.submissionStart, 'assertive');
  }

  emit('submit-start', formState.data);

  try {
    // Validate form before submission
    const validationResult = await validateForm();
    
    const submitEvent = {
      data: formState.data,
      validation: validationResult,
      state: formState,
      preventDefault: () => {},
      defaultPrevented: false,
    };

    emit('submit', submitEvent);

    if (submitEvent.defaultPrevented) {
      return;
    }

    if (!validationResult.isValid) {
      throw new Error('Form validation failed');
    }

    let result;
    if (submissionConfig.value.handler) {
      result = await submissionConfig.value.handler(formState.data);
    } else if (!submissionConfig.value.preventDefault) {
      // Allow native form submission
      const formData = new FormData();
      Object.entries(formState.data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      const response = await fetch(props.action || '', {
        method: submissionConfig.value.method,
        headers: submissionConfig.value.headers,
        body: submissionConfig.value.method === 'GET' ? undefined : formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      result = await response.json();
    }

    formState.submissionState = 'success';
    formState.lastResult = result;

    if (accessibilityConfig.value.announceSubmission) {
      announce(submissionConfig.value.successMessage || DEFAULT_FORM_ANNOUNCEMENTS.submissionSuccess, 'assertive');
    }

    emit('submit-success', result);

    if (submissionConfig.value.resetAfterSubmit) {
      resetForm();
    }

  } catch (error) {
    formState.submissionState = 'error';
    formState.lastError = error as Error;

    const errorMessage = submissionConfig.value.errorMessage || 
                        DEFAULT_FORM_ANNOUNCEMENTS.submissionError.replace('{error}', (error as Error).message);

    if (accessibilityConfig.value.announceSubmission) {
      announce(errorMessage, 'assertive');
    }

    emit('submit-error', error as Error);
  } finally {
    formState.isSubmitting = false;
  }
}

// Form reset logic
function resetForm(initialData: Record<string, any> = {}): void {
  const previousData = { ...formState.data };
  const resetData = { ...initialData };

  const resetEvent = {
    previousData,
    resetData,
    state: formState,
    preventDefault: () => {},
  };

  emit('reset', resetEvent);

  if (!resetEvent.preventDefault) {
    formState.data = resetData;
    formState.previousData = resetData;
    formState.isDirty = false;
    formState.isTouched = false;
    formState.validationState = 'idle';
    formState.submissionState = 'idle';
    formState.fieldValidations = {};
    formState.errorCount = 0;
    formState.warningCount = 0;
    formState.lastError = null;
    formState.lastResult = null;

    emit('update:modelValue', resetData);

    if (accessibilityConfig.value.announceValidation) {
      announcePolitely(DEFAULT_FORM_ANNOUNCEMENTS.formReset);
    }
  }
}

// Field registration logic
function registerField(registration: BFormFieldRegistration): void {
  fieldRegistrations.value.set(registration.name, registration);
  emit('field-register', registration);
}

function unregisterField(fieldName: string): void {
  fieldRegistrations.value.delete(fieldName);
  delete formState.fieldValidations[fieldName];
  emit('field-unregister', fieldName);
}

function updateFieldValue(fieldName: string, value: any, triggerValidation = true): void {
  const previousValue = formState.data[fieldName];
  formState.data[fieldName] = value;
  
  // Mark as touched and dirty
  if (!formState.isTouched) {
    formState.isTouched = true;
    emit('touched', true);
  }

  if (!formState.isDirty) {
    formState.isDirty = true;
    emit('dirty', true);
  }

  emit('update:modelValue', formState.data);

  const changeEvent = {
    fieldName,
    newValue: value,
    previousValue,
    formData: formState.data,
    formState,
    originalEvent: new Event('change'),
  };

  emit('change', changeEvent);

  // Trigger validation based on mode
  if (triggerValidation && validationConfig.value.enabled) {
    if (validationConfig.value.mode === 'change' || 
       (validationConfig.value.mode === 'realtime' && validationConfig.value.debounceTime)) {
      
      // Debounce real-time validation
      if (validationConfig.value.mode === 'realtime') {
        setTimeout(() => validateForm(), validationConfig.value.debounceTime);
      } else {
        validateForm();
      }
    }
  }

  // Auto-save functionality
  if (props.autoSave && props.autoSaveKey) {
    if (autoSaveTimeout.value) {
      clearTimeout(autoSaveTimeout.value);
    }
    
    autoSaveTimeout.value = setTimeout(() => {
      localStorage.setItem(props.autoSaveKey!, JSON.stringify(formState.data));
      emit('auto-save', formState.data);
      
      if (accessibilityConfig.value.announceValidation) {
        announcePolitely(DEFAULT_FORM_ANNOUNCEMENTS.autoSave);
      }
    }, props.autoSaveDelay);
  }
}

// Field focus management
function handleFieldFocus(fieldName: string, element: HTMLElement): void {
  formState.focusedField = fieldName;
  formState.keyboardMode = true;
  emit('field-focus', fieldName, element);
}

function handleFieldBlur(fieldName: string, element: HTMLElement): void {
  formState.focusedField = null;
  emit('field-blur', fieldName, element);

  // Trigger validation on blur if configured
  if (validationConfig.value.enabled && validationConfig.value.mode === 'blur') {
    validateForm();
  }
}

// Keyboard navigation
function handleKeydown(event: KeyboardEvent): void {
  if (!keyboardConfig.value.enabled) return;

  const { key, ctrlKey, metaKey } = event;
  const isModifier = ctrlKey || metaKey;

  // Handle form-level shortcuts
  if (keyboardConfig.value.submitKeys?.includes(key) && isModifier) {
    if (keyboardConfig.value.preventDefault) {
      event.preventDefault();
    }
    if (canSubmit.value) {
      handleSubmit(event);
    }
  }

  if (keyboardConfig.value.resetKeys?.includes(key) && isModifier) {
    if (keyboardConfig.value.preventDefault) {
      event.preventDefault();
    }
    resetForm(props.modelValue);
  }

  // Handle custom shortcuts
  const shortcutKey = `${isModifier ? 'Ctrl+' : ''}${key}`;
  const shortcutHandler = keyboardConfig.value.shortcuts?.[shortcutKey];
  if (shortcutHandler) {
    shortcutHandler(event);
  }
}

// Provide form context to child components
provide('bform', {
  formId: formId.value,
  formState,
  validationConfig,
  registerField,
  unregisterField,
  updateFieldValue,
  handleFieldFocus,
  handleFieldBlur,
  validateField,
  validateForm,
  size: props.size,
  layout: props.layout,
  disabled: props.disabled,
  readonly: props.readonly,
});

// Watchers
watch(() => props.modelValue, (newValue) => {
  if (JSON.stringify(newValue) !== JSON.stringify(formState.data)) {
    formState.data = { ...newValue };
    formState.previousData = { ...newValue };
  }
}, { deep: true });

watch(() => props.disabled, (newValue) => {
  formState.isDisabled = newValue;
});

watch(() => props.readonly, (newValue) => {
  formState.isReadonly = newValue;
});

// Load auto-saved data on mount
onMounted(() => {
  formState.formElement = form.value;

  if (props.autoSave && props.autoSaveKey) {
    const savedData = localStorage.getItem(props.autoSaveKey);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        formState.data = { ...formState.data, ...parsedData };
        emit('update:modelValue', formState.data);
      } catch (error) {
        console.warn('Failed to load auto-saved form data:', error);
      }
    }
  }

  if (validationConfig.value.validateOnMount) {
    validateForm();
  }
});

// Cleanup auto-save timeout on unmount
onUnmounted(() => {
  if (autoSaveTimeout.value) {
    clearTimeout(autoSaveTimeout.value);
  }
});

// Expose methods for programmatic access
defineExpose({
  validate: validateForm,
  reset: resetForm,
  submit: () => handleSubmit(new Event('submit')),
  registerField,
  unregisterField,
  updateFieldValue,
  getFormData: () => ({ ...formState.data }),
  getFormState: () => ({ ...formState }),
  isValid: () => isFormValid.value,
  canSubmit: () => canSubmit.value,
});
</script>

<template>
  <form
    ref="form"
    :id="formId"
    :name="name"
    :method="method"
    :action="action"
    :enctype="enctype"
    :target="target"
    :class="formClasses"
    :style="style"
    v-bind="formAriaAttrs"
    @submit="handleSubmit"
    @keydown="handleKeydown">
    
    <!-- Error Summary (Top) -->
    <div
      v-if="showErrorSummary && errorSummaryPosition === 'top' && !isFormValid && formState.errorCount > 0"
      class="b-form__error-summary b-form__error-summary--top"
      role="alert"
      aria-live="polite">
      <h2 class="b-form__error-summary-title">
        {{ formState.errorCount === 1 ? 'Please fix the following error:' : `Please fix the following ${formState.errorCount} errors:` }}
      </h2>
      <ul class="b-form__error-list">
        <li
          v-for="(field, fieldName) in formState.fieldValidations"
          :key="fieldName"
          v-show="!field.isValid"
          class="b-form__error-item">
          <button
            type="button"
            class="b-form__error-link"
            @click="field.element?.focus()">
            {{ field.errors.join(', ') }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Success Message -->
    <div
      v-if="showSuccessMessage && formState.submissionState === 'success'"
      class="b-form__success-message"
      role="status"
      aria-live="polite">
      {{ successMessage || submissionConfig.successMessage }}
    </div>

    <!-- Loading Indicator -->
    <div
      v-if="loading || formState.isSubmitting"
      class="b-form__loading"
      role="status"
      aria-live="polite">
      <div class="b-form__loading-spinner" aria-hidden="true"></div>
      <span class="b-form__loading-text">
        {{ formState.isSubmitting ? 'Submitting...' : 'Loading...' }}
      </span>
    </div>

    <!-- Form Content -->
    <div class="b-form__content">
      <slot 
        :form-data="formState.data"
        :form-state="formState"
        :is-valid="isFormValid"
        :can-submit="canSubmit"
        :validate="validateForm"
        :reset="resetForm"
        :register-field="registerField"
        :unregister-field="unregisterField"
        :update-field="updateFieldValue" />
    </div>

    <!-- Error Summary (Bottom) -->
    <div
      v-if="showErrorSummary && errorSummaryPosition === 'bottom' && !isFormValid && formState.errorCount > 0"
      class="b-form__error-summary b-form__error-summary--bottom"
      role="alert"
      aria-live="polite">
      <h2 class="b-form__error-summary-title">
        {{ formState.errorCount === 1 ? 'Please fix the following error:' : `Please fix the following ${formState.errorCount} errors:` }}
      </h2>
      <ul class="b-form__error-list">
        <li
          v-for="(field, fieldName) in formState.fieldValidations"
          :key="fieldName"
          v-show="!field.isValid"
          class="b-form__error-item">
          <button
            type="button"
            class="b-form__error-link"
            @click="field.element?.focus()">
            {{ field.errors.join(', ') }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Multi-step Navigation (if applicable) -->
    <div
      v-if="multiStep && totalSteps && totalSteps > 1"
      class="b-form__step-navigation"
      role="group"
      :aria-label="`Form step ${currentStep} of ${totalSteps}`">
      <span class="b-form__step-indicator">
        Step {{ currentStep }} of {{ totalSteps }}
      </span>
    </div>

    <!-- Screen Reader Instructions -->
    <div
      v-if="screenReaderInstructions"
      class="b-form__sr-instructions"
      aria-live="polite">
      {{ screenReaderInstructions }}
    </div>
  </form>
</template>

<style scoped>
/* Base form styles */
.b-form {
  @apply w-full;
}

/* Layout variants */
.b-form--vertical {
  @apply flex flex-col;
}

.b-form--vertical .b-form__content {
  @apply flex flex-col;
}

.b-form--horizontal .b-form__content {
  @apply flex flex-col;
}

.b-form--inline {
  @apply flex flex-row flex-wrap items-end;
}

.b-form--inline .b-form__content {
  @apply flex flex-row flex-wrap items-end gap-md;
}

/* Size variants */
.b-form--xs {
  font-size: 0.75rem;
}

.b-form--xs .b-form__content {
  @apply gap-xs;
}

.b-form--sm {
  font-size: 0.875rem;
}

.b-form--sm .b-form__content {
  @apply gap-sm;
}

.b-form--md {
  font-size: 1rem;
}

.b-form--md .b-form__content {
  @apply gap-md;
}

.b-form--lg {
  font-size: 1.125rem;
}

.b-form--lg .b-form__content {
  @apply gap-lg;
}

.b-form--xl {
  font-size: 1.25rem;
}

.b-form--xl .b-form__content {
  @apply gap-xl;
}

/* Spacing variants */
.b-form--spacing-none .b-form__content {
  @apply gap-0;
}

.b-form--spacing-compact .b-form__content {
  @apply gap-xs;
}

.b-form--spacing-normal .b-form__content {
  @apply gap-md;
}

.b-form--spacing-comfortable .b-form__content {
  @apply gap-lg;
}

.b-form--spacing-spacious .b-form__content {
  @apply gap-xl;
}

/* State styles */
.b-form--disabled {
  @apply opacity-60 pointer-events-none;
}

.b-form--readonly {
  @apply pointer-events-none;
}

.b-form--loading {
  @apply relative;
}

.b-form--invalid {
  /* Form-level invalid styles can be added here */
}

.b-form--validating {
  @apply pointer-events-none;
}

.b-form--keyboard-mode {
  /* Enhanced focus styles for keyboard navigation */
}

.b-form--keyboard-mode *:focus {
  @apply ring-2 ring-primary-500 ring-offset-2;
}

/* Error summary */
.b-form__error-summary {
  @apply p-md mb-lg bg-red-50 border border-red-200 rounded-lg;
}

.b-form__error-summary-title {
  @apply text-lg font-semibold text-red-800 mb-sm;
}

.b-form__error-list {
  @apply list-disc list-inside space-y-xs;
}

.b-form__error-item {
  @apply text-red-700;
}

.b-form__error-link {
  @apply underline hover:no-underline focus:outline-none focus:ring-1 focus:ring-red-500 rounded;
}

/* Success message */
.b-form__success-message {
  @apply p-md mb-lg bg-green-50 border border-green-200 rounded-lg text-green-800;
}

/* Loading indicator */
.b-form__loading {
  @apply flex items-center justify-center p-lg text-gray-600;
}

.b-form__loading-spinner {
  @apply w-5 h-5 border-2 border-gray-300 border-t-primary-600 rounded-full animate-spin mr-sm;
}

.b-form__loading-text {
  @apply text-sm font-medium;
}

/* Form content */
.b-form__content {
  @apply relative;
}

/* Step navigation */
.b-form__step-navigation {
  @apply mt-lg pt-lg border-t border-gray-200 text-center;
}

.b-form__step-indicator {
  @apply text-sm text-gray-500 font-medium;
}

/* Screen reader only content */
.b-form__sr-instructions {
  @apply sr-only;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .b-form__error-summary {
    @apply bg-red-900/20 border-red-800 text-red-300;
  }
  
  .b-form__error-summary-title {
    @apply text-red-200;
  }
  
  .b-form__success-message {
    @apply bg-green-900/20 border-green-800 text-green-300;
  }
  
  .b-form__loading-text {
    @apply text-gray-300;
  }
  
  .b-form__step-navigation {
    @apply border-gray-700;
  }
  
  .b-form__step-indicator {
    @apply text-gray-400;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .b-form__error-summary {
    @apply border-2 border-red-600;
  }
  
  .b-form__success-message {
    @apply border-2 border-green-600;
  }
  
  .b-form--keyboard-mode *:focus {
    @apply ring-2 ring-black ring-offset-2;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .b-form__loading-spinner {
    @apply animate-none;
  }
}

/* Touch-friendly spacing on mobile */
@media (max-width: 640px) {
  .b-form--inline {
    @apply flex-col items-stretch;
  }
  
  .b-form--inline .b-form__content {
    @apply flex-col gap-md;
  }
  
  .b-form__error-summary,
  .b-form__success-message {
    @apply p-sm text-sm;
  }
  
  .b-form__error-summary-title {
    @apply text-base;
  }
}
</style>
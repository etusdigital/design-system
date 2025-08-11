<script setup lang="ts">
import { ref, reactive, computed, inject, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useAriaAttributes, useScreenReader } from '#composables';
import BIcon from '../BIcon/BIcon.vue';
import BTooltip from '../BTooltip/BTooltip.vue';
import type {
  BFormFieldProps,
  BFormFieldEmits,
  BFormFieldState,
  BFormFieldValidationConfig,
  BFormFieldKeyboardConfig,
  BFormFieldTooltipConfig,
  BFormFieldAriaAttributes,
} from './BFormField.types';
import {
  DEFAULT_FORM_FIELD_VALIDATION_CONFIG,
  DEFAULT_FORM_FIELD_KEYBOARD_CONFIG,
  DEFAULT_FORM_FIELD_TOOLTIP_CONFIG,
  DEFAULT_FORM_FIELD_ACCESSIBILITY_CONFIG,
  DEFAULT_FORM_FIELD_ANNOUNCEMENTS,
  FORM_FIELD_LAYOUT_CONFIG,
  FORM_FIELD_SIZE_CONFIG,
  LABEL_POSITION_CONFIG,
} from './BFormField.types';

interface Props extends BFormFieldProps {}

const props = withDefaults(defineProps<Props>(), {
  layout: 'stacked',
  size: 'md',
  labelPosition: 'top',
  errorDisplay: 'inline',
  showRequired: true,
  showOptional: false,
  requiredText: '*',
  optionalText: '(optional)',
  tag: 'div',
  labelTag: 'label',
  autoId: true,
  validationConfig: () => ({}),
  keyboardConfig: () => ({}),
  tooltipConfig: () => ({}),
});

const emit = defineEmits<BFormFieldEmits>();

// Inject form context if available
const bform = inject<any>('bform', null);

// Refs
const fieldWrapper = ref<HTMLElement | null>(null);
const fieldElement = ref<HTMLElement | null>(null);
const labelElement = ref<HTMLElement | null>(null);
const hintElement = ref<HTMLElement | null>(null);
const errorElement = ref<HTMLElement | null>(null);

// IDs
const { useAriaId } = useAriaAttributes();
const { announce, announcePolitely } = useScreenReader();

const fieldId = ref('');
const labelId = ref('');
const hintId = ref('');
const errorId = ref('');

// Generate IDs on mount
onMounted(() => {
  const baseId = useAriaId('field')();
  fieldId.value = props.fieldId || `${baseId}-input`;
  labelId.value = props.labelId || `${baseId}-label`;
  hintId.value = props.hintId || `${baseId}-hint`;
  errorId.value = props.errorId || `${baseId}-error`;
});

// Reactive field state
const fieldState = reactive<BFormFieldState>({
  name: props.name,
  value: undefined,
  previousValue: undefined,
  hasFocus: false,
  isTouched: false,
  isDirty: false,
  isValidating: false,
  isDisabled: props.disabled || false,
  isReadonly: props.readonly || false,
  isRequired: props.required || false,
  validationState: 'idle',
  errors: props.error ? [props.error] : [],
  warnings: props.warning ? [props.warning] : [],
  successes: props.success ? [props.success] : [],
  keyboardMode: false,
  fieldElement: null,
  labelElement: null,
  errorElement: null,
  hintElement: null,
});

// Configuration objects
const validationConfig = computed<BFormFieldValidationConfig>(() => ({
  ...DEFAULT_FORM_FIELD_VALIDATION_CONFIG,
  ...props.validationConfig,
}));

const keyboardConfig = computed<BFormFieldKeyboardConfig>(() => ({
  ...DEFAULT_FORM_FIELD_KEYBOARD_CONFIG,
  ...props.keyboardConfig,
}));

const tooltipConfig = computed<BFormFieldTooltipConfig>(() => ({
  ...DEFAULT_FORM_FIELD_TOOLTIP_CONFIG,
  ...props.tooltipConfig,
}));

const accessibilityConfig = computed(() => ({
  ...DEFAULT_FORM_FIELD_ACCESSIBILITY_CONFIG,
  ...props,
}));

// Computed properties
const hasError = computed(() => fieldState.errors.length > 0);
const hasWarning = computed(() => fieldState.warnings.length > 0);
const hasSuccess = computed(() => fieldState.successes.length > 0);
const hasHint = computed(() => !!(props.hint || props.hintHtml || $slots.hint));
const hasLabel = computed(() => !!(props.label || props.labelHtml || $slots.label));

const effectiveSize = computed(() => bform?.size || props.size);
const effectiveLayout = computed(() => bform?.layout === 'horizontal' ? 'horizontal' : props.layout);
const effectiveDisabled = computed(() => bform?.disabled || props.disabled);
const effectiveReadonly = computed(() => bform?.readonly || props.readonly);

const layoutConfig = computed(() => FORM_FIELD_LAYOUT_CONFIG[effectiveLayout.value] || FORM_FIELD_LAYOUT_CONFIG.stacked);
const sizeConfig = computed(() => FORM_FIELD_SIZE_CONFIG[effectiveSize.value] || FORM_FIELD_SIZE_CONFIG.md);
const labelPositionConfig = computed(() => LABEL_POSITION_CONFIG[props.labelPosition] || LABEL_POSITION_CONFIG.top);

// ARIA attributes
const fieldAriaAttrs = computed<BFormFieldAriaAttributes>(() => {
  const describedBy: string[] = [];
  
  if (hasHint.value) describedBy.push(hintId.value);
  if (hasError.value) describedBy.push(errorId.value);
  if (accessibilityConfig.value.ariaDescribedBy) describedBy.push(accessibilityConfig.value.ariaDescribedBy);

  return {
    role: accessibilityConfig.value.role,
    'aria-label': accessibilityConfig.value.ariaLabel,
    'aria-labelledby': accessibilityConfig.value.ariaLabelledBy || (hasLabel.value ? labelId.value : undefined),
    'aria-describedby': describedBy.length > 0 ? describedBy.join(' ') : undefined,
    'aria-invalid': hasError.value,
    'aria-required': fieldState.isRequired,
    'aria-busy': fieldState.isValidating || props.loading,
    'aria-live': hasError.value ? 'assertive' : accessibilityConfig.value.liveRegionPoliteness,
    'aria-atomic': true,
  };
});

// CSS classes
const wrapperClasses = computed(() => [
  'b-form-field',
  `b-form-field--${effectiveLayout.value}`,
  `b-form-field--${effectiveSize.value}`,
  `b-form-field--label-${props.labelPosition}`,
  {
    'b-form-field--required': fieldState.isRequired,
    'b-form-field--optional': !fieldState.isRequired && props.showOptional,
    'b-form-field--disabled': effectiveDisabled.value,
    'b-form-field--readonly': effectiveReadonly.value,
    'b-form-field--loading': props.loading,
    'b-form-field--error': hasError.value,
    'b-form-field--warning': hasWarning.value,
    'b-form-field--success': hasSuccess.value,
    'b-form-field--touched': fieldState.isTouched,
    'b-form-field--dirty': fieldState.isDirty,
    'b-form-field--focused': fieldState.hasFocus,
    'b-form-field--validating': fieldState.isValidating,
    'b-form-field--keyboard-mode': fieldState.keyboardMode,
    'b-form-field--has-hint': hasHint.value,
    'b-form-field--has-label': hasLabel.value,
    'b-form-field--floating': props.labelPosition === 'floating',
  },
  props.class,
]);

const labelClasses = computed(() => [
  'b-form-field__label',
  {
    'b-form-field__label--required': fieldState.isRequired && props.showRequired,
    'b-form-field__label--optional': !fieldState.isRequired && props.showOptional,
    'b-form-field__label--floating': props.labelPosition === 'floating',
    'b-form-field__label--hidden': props.labelPosition === 'hidden',
  },
  props.labelClass,
]);

const hintClasses = computed(() => [
  'b-form-field__hint',
  props.hintClass,
]);

const errorClasses = computed(() => [
  'b-form-field__error',
  {
    'b-form-field__error--inline': props.errorDisplay === 'inline',
    'b-form-field__error--tooltip': props.errorDisplay === 'tooltip',
  },
  props.errorClass,
]);

// Field registration with parent form
function registerWithForm(): void {
  if (bform && typeof bform.registerField === 'function') {
    bform.registerField({
      name: props.name,
      element: fieldElement.value,
      component: getCurrentInstance(),
      validator: validationConfig.value.validator,
      required: fieldState.isRequired,
    });
  }
}

function unregisterFromForm(): void {
  if (bform && typeof bform.unregisterField === 'function') {
    bform.unregisterField(props.name);
  }
}

// Field value management
function updateFieldValue(value: any, triggerEvents = true): void {
  const previousValue = fieldState.value;
  fieldState.previousValue = previousValue;
  fieldState.value = value;

  if (!fieldState.isDirty && value !== previousValue) {
    fieldState.isDirty = true;
    if (triggerEvents) emit('dirty', true);
  }

  // Update parent form
  if (bform && typeof bform.updateFieldValue === 'function') {
    bform.updateFieldValue(props.name, value, false); // Don't trigger form validation here
  }

  if (triggerEvents) {
    const changeEvent = {
      name: props.name,
      newValue: value,
      previousValue,
      state: fieldState,
      originalEvent: new Event('change'),
    };
    emit('change', changeEvent);
  }
}

// Field focus management
function handleFieldFocus(event: FocusEvent): void {
  fieldState.hasFocus = true;
  fieldState.keyboardMode = true;

  if (!fieldState.isTouched) {
    fieldState.isTouched = true;
    emit('touched', true);
  }

  // Notify parent form
  if (bform && typeof bform.handleFieldFocus === 'function') {
    bform.handleFieldFocus(props.name, event.target as HTMLElement);
  }

  const focusEvent = {
    name: props.name,
    value: fieldState.value,
    state: fieldState,
    originalEvent: event,
  };
  emit('focus', focusEvent);
}

function handleFieldBlur(event: FocusEvent): void {
  fieldState.hasFocus = false;

  // Trigger validation on blur if configured
  if (validationConfig.value.enabled && validationConfig.value.trigger === 'blur') {
    validateField();
  }

  // Notify parent form
  if (bform && typeof bform.handleFieldBlur === 'function') {
    bform.handleFieldBlur(props.name, event.target as HTMLElement);
  }

  const blurEvent = {
    name: props.name,
    value: fieldState.value,
    state: fieldState,
    originalEvent: event,
  };
  emit('blur', blurEvent);
}

// Field validation
async function validateField(): Promise<void> {
  if (!validationConfig.value.enabled) return;

  fieldState.isValidating = true;
  fieldState.validationState = 'validating';

  if (accessibilityConfig.value.announceValidation) {
    announcePolitely(DEFAULT_FORM_FIELD_ANNOUNCEMENTS.validationStart);
  }

  // Clear previous validation messages
  fieldState.errors = [];
  fieldState.warnings = [];
  fieldState.successes = [];

  // Required validation
  if (fieldState.isRequired && (fieldState.value === null || fieldState.value === undefined || fieldState.value === '')) {
    fieldState.errors.push(validationConfig.value.messages?.required || 'This field is required');
  }

  // Custom validator
  if (validationConfig.value.validator && fieldState.value !== null && fieldState.value !== undefined) {
    const result = validationConfig.value.validator(fieldState.value);
    if (typeof result === 'string') {
      fieldState.errors.push(result);
    } else if (!result) {
      fieldState.errors.push(validationConfig.value.messages?.invalid || 'Please enter a valid value');
    }
  }

  // Update validation state
  if (fieldState.errors.length > 0) {
    fieldState.validationState = 'invalid';
  } else {
    fieldState.validationState = 'valid';
    if (validationConfig.value.messages?.success) {
      fieldState.successes.push(validationConfig.value.messages.success);
    }
  }

  fieldState.isValidating = false;

  // Announce validation result
  if (accessibilityConfig.value.announceValidation) {
    if (fieldState.errors.length > 0) {
      const message = DEFAULT_FORM_FIELD_ANNOUNCEMENTS.fieldError.replace('{message}', fieldState.errors.join(', '));
      announce(message, 'assertive');
    } else if (validationConfig.value.announceChanges) {
      announcePolitely(DEFAULT_FORM_FIELD_ANNOUNCEMENTS.validationComplete);
    }
  }

  // Emit validation events
  const validationEvent = {
    name: props.name,
    validationState: fieldState.validationState,
    errors: [...fieldState.errors],
    warnings: [...fieldState.warnings],
    successes: [...fieldState.successes],
    state: fieldState,
  };
  emit('validation', validationEvent);
  emit('error', fieldState.errors.length > 0, [...fieldState.errors]);
}

// Keyboard handling
function handleKeydown(event: KeyboardEvent): void {
  if (!keyboardConfig.value.enabled) return;

  const { key } = event;

  // Handle custom shortcuts
  const shortcutHandler = keyboardConfig.value.shortcuts?.[key];
  if (shortcutHandler) {
    shortcutHandler(event);
    return;
  }

  // Handle validation keys
  if (keyboardConfig.value.validationKeys?.includes(key)) {
    if (validationConfig.value.enabled && validationConfig.value.trigger === 'manual') {
      validateField();
    }
  }
}

// Find focusable field element
function findFocusableElement(): HTMLElement | null {
  if (!fieldWrapper.value) return null;
  
  const focusable = fieldWrapper.value.querySelector(
    'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
  ) as HTMLElement;
  
  return focusable;
}

// Setup field element references and event listeners
function setupFieldElement(): void {
  const focusableElement = findFocusableElement();
  if (focusableElement) {
    fieldState.fieldElement = focusableElement;
    fieldElement.value = focusableElement;
    
    // Add event listeners
    focusableElement.addEventListener('focus', handleFieldFocus);
    focusableElement.addEventListener('blur', handleFieldBlur);
    focusableElement.addEventListener('keydown', handleKeydown);
    
    // Set ARIA attributes
    Object.entries(fieldAriaAttrs.value).forEach(([attr, value]) => {
      if (value !== undefined) {
        focusableElement.setAttribute(attr, value.toString());
      }
    });
  }
}

function cleanupFieldElement(): void {
  if (fieldState.fieldElement) {
    fieldState.fieldElement.removeEventListener('focus', handleFieldFocus);
    fieldState.fieldElement.removeEventListener('blur', handleFieldBlur);
    fieldState.fieldElement.removeEventListener('keydown', handleKeydown);
  }
}

// Watchers
watch(() => props.error, (newError) => {
  if (newError) {
    fieldState.errors = [newError];
    fieldState.validationState = 'invalid';
  } else {
    fieldState.errors = [];
    if (fieldState.validationState === 'invalid') {
      fieldState.validationState = 'idle';
    }
  }
});

watch(() => props.warning, (newWarning) => {
  fieldState.warnings = newWarning ? [newWarning] : [];
});

watch(() => props.success, (newSuccess) => {
  fieldState.successes = newSuccess ? [newSuccess] : [];
});

watch(() => props.disabled, (newDisabled) => {
  fieldState.isDisabled = newDisabled || false;
});

watch(() => props.readonly, (newReadonly) => {
  fieldState.isReadonly = newReadonly || false;
});

watch(() => props.required, (newRequired) => {
  fieldState.isRequired = newRequired || false;
});

// Lifecycle
onMounted(async () => {
  await nextTick();
  
  fieldState.labelElement = labelElement.value;
  fieldState.hintElement = hintElement.value;
  fieldState.errorElement = errorElement.value;
  
  setupFieldElement();
  registerWithForm();
});

onUnmounted(() => {
  cleanupFieldElement();
  unregisterFromForm();
});

// Expose methods
defineExpose({
  validate: validateField,
  focus: () => fieldState.fieldElement?.focus(),
  blur: () => fieldState.fieldElement?.blur(),
  getFieldElement: () => fieldState.fieldElement,
  getState: () => ({ ...fieldState }),
});
</script>

<template>
  <component
    :is="tag"
    ref="fieldWrapper"
    :class="wrapperClasses"
    :style="style"
    v-bind="$attrs">
    
    <!-- Fieldset wrapper if configured -->
    <fieldset
      v-if="fieldset"
      class="b-form-field__fieldset">
      <legend
        v-if="legend"
        class="b-form-field__legend">
        {{ legend }}
      </legend>
      
      <div class="b-form-field__fieldset-content">
        <!-- Label -->
        <component
          :is="labelTag"
          v-if="hasLabel && labelPosition !== 'hidden'"
          ref="labelElement"
          :id="labelId"
          :for="autoId ? fieldId : undefined"
          :class="labelClasses"
          :style="{ order: labelPositionConfig.labelOrder }">
          
          <slot name="label" :label="label" :required="isRequired">
            <span
              v-if="labelHtml"
              v-html="labelHtml" />
            <span v-else>{{ label }}</span>
          </slot>
          
          <!-- Required/Optional indicator -->
          <span
            v-if="isRequired && showRequired"
            class="b-form-field__required"
            :aria-label="'Required field'">
            {{ requiredText }}
          </span>
          <span
            v-else-if="!isRequired && showOptional"
            class="b-form-field__optional">
            {{ optionalText }}
          </span>
          
          <!-- Tooltip -->
          <BTooltip
            v-if="tooltipConfig.enabled && tooltipConfig.content"
            :content="tooltipConfig.content"
            :position="tooltipConfig.position"
            :trigger="tooltipConfig.trigger"
            :delay="tooltipConfig.delay"
            :interactive="tooltipConfig.interactive">
            <BIcon
              name="info-circle"
              class="b-form-field__tooltip-icon"
              size="sm" />
          </BTooltip>
        </component>
        
        <!-- Field content -->
        <div
          class="b-form-field__content"
          :style="{ order: labelPositionConfig.fieldOrder }">
          
          <!-- Slot for field input -->
          <slot
            :field-id="fieldId"
            :label-id="labelId"
            :hint-id="hintId"
            :error-id="errorId"
            :field-state="fieldState"
            :has-error="hasError"
            :has-warning="hasWarning"
            :has-success="hasSuccess"
            :validate="validateField"
            :update-value="updateFieldValue"
            v-bind="fieldAriaAttrs" />
          
          <!-- Loading indicator -->
          <div
            v-if="loading"
            class="b-form-field__loading"
            role="status"
            :aria-label="'Field is loading'">
            <BIcon name="spinner" class="animate-spin" size="sm" />
          </div>
        </div>
      </div>
    </fieldset>
    
    <!-- Regular field wrapper -->
    <template v-else>
      <!-- Label -->
      <component
        :is="labelTag"
        v-if="hasLabel && labelPosition !== 'hidden'"
        ref="labelElement"
        :id="labelId"
        :for="autoId ? fieldId : undefined"
        :class="labelClasses"
        :style="{ order: labelPositionConfig.labelOrder }">
        
        <slot name="label" :label="label" :required="isRequired">
          <span
            v-if="labelHtml"
            v-html="labelHtml" />
          <span v-else>{{ label }}</span>
        </slot>
        
        <!-- Required/Optional indicator -->
        <span
          v-if="isRequired && showRequired"
          class="b-form-field__required"
          :aria-label="'Required field'">
          {{ requiredText }}
        </span>
        <span
          v-else-if="!isRequired && showOptional"
          class="b-form-field__optional">
          {{ optionalText }}
        </span>
        
        <!-- Tooltip -->
        <BTooltip
          v-if="tooltipConfig.enabled && tooltipConfig.content"
          :content="tooltipConfig.content"
          :position="tooltipConfig.position"
          :trigger="tooltipConfig.trigger"
          :delay="tooltipConfig.delay"
          :interactive="tooltipConfig.interactive">
          <BIcon
            name="info-circle"
            class="b-form-field__tooltip-icon"
            size="sm" />
        </BTooltip>
      </component>
      
      <!-- Field content -->
      <div
        class="b-form-field__content"
        :style="{ order: labelPositionConfig.fieldOrder }">
        
        <!-- Slot for field input -->
        <slot
          :field-id="fieldId"
          :label-id="labelId"
          :hint-id="hintId"
          :error-id="errorId"
          :field-state="fieldState"
          :has-error="hasError"
          :has-warning="hasWarning"
          :has-success="hasSuccess"
          :validate="validateField"
          :update-value="updateFieldValue"
          v-bind="fieldAriaAttrs" />
        
        <!-- Loading indicator -->
        <div
          v-if="loading"
          class="b-form-field__loading"
          role="status"
          :aria-label="'Field is loading'">
          <BIcon name="spinner" class="animate-spin" size="sm" />
        </div>
      </div>
    </template>
    
    <!-- Hint text -->
    <div
      v-if="hasHint"
      ref="hintElement"
      :id="hintId"
      :class="hintClasses"
      role="note">
      <slot name="hint" :hint="hint">
        <span
          v-if="hintHtml"
          v-html="hintHtml" />
        <span v-else>{{ hint }}</span>
      </slot>
    </div>
    
    <!-- Error messages -->
    <div
      v-if="hasError && errorDisplay === 'inline'"
      ref="errorElement"
      :id="errorId"
      :class="errorClasses"
      role="alert"
      aria-live="assertive">
      <slot name="error" :errors="fieldState.errors" :error="fieldState.errors[0]">
        <span
          v-if="errorHtml"
          v-html="errorHtml" />
        <ul v-else-if="fieldState.errors.length > 1" class="b-form-field__error-list">
          <li
            v-for="(error, index) in fieldState.errors"
            :key="index"
            class="b-form-field__error-item">
            {{ error }}
          </li>
        </ul>
        <span v-else>{{ fieldState.errors[0] }}</span>
      </slot>
    </div>
    
    <!-- Warning messages -->
    <div
      v-if="hasWarning"
      class="b-form-field__warning"
      role="status"
      aria-live="polite">
      <slot name="warning" :warnings="fieldState.warnings" :warning="fieldState.warnings[0]">
        <ul v-if="fieldState.warnings.length > 1" class="b-form-field__warning-list">
          <li
            v-for="(warning, index) in fieldState.warnings"
            :key="index"
            class="b-form-field__warning-item">
            {{ warning }}
          </li>
        </ul>
        <span v-else>{{ fieldState.warnings[0] }}</span>
      </slot>
    </div>
    
    <!-- Success messages -->
    <div
      v-if="hasSuccess"
      class="b-form-field__success"
      role="status"
      aria-live="polite">
      <slot name="success" :successes="fieldState.successes" :success="fieldState.successes[0]">
        <ul v-if="fieldState.successes.length > 1" class="b-form-field__success-list">
          <li
            v-for="(success, index) in fieldState.successes"
            :key="index"
            class="b-form-field__success-item">
            {{ success }}
          </li>
        </ul>
        <span v-else>{{ fieldState.successes[0] }}</span>
      </slot>
    </div>
  </component>
</template>

<style scoped>
/* Base field styles */
.b-form-field {
  @apply relative;
}

/* Layout variants */
.b-form-field--stacked {
  @apply flex flex-col;
}

.b-form-field--horizontal {
  @apply flex flex-row items-start;
}

.b-form-field--inline {
  @apply flex flex-row items-center;
}

.b-form-field--floating {
  @apply relative;
}

/* Label positioning */
.b-form-field--label-top .b-form-field__label {
  @apply mb-1;
}

.b-form-field--label-left .b-form-field__label {
  @apply mr-3 flex-shrink-0 w-1/4;
}

.b-form-field--label-right .b-form-field__label {
  @apply ml-3 flex-shrink-0 w-1/4;
}

.b-form-field--label-floating .b-form-field__label {
  @apply absolute left-3 top-2 text-gray-500 transition-all duration-200 pointer-events-none;
}

.b-form-field--label-floating.b-form-field--focused .b-form-field__label,
.b-form-field--label-floating.b-form-field--dirty .b-form-field__label {
  @apply text-xs -top-1 left-2 bg-white px-1;
}

.b-form-field--label-hidden .b-form-field__label {
  @apply sr-only;
}

/* Size variants */
.b-form-field--xs {
  font-size: 0.75rem;
}

.b-form-field--xs .b-form-field__label {
  @apply text-xs;
}

.b-form-field--xs .b-form-field__hint,
.b-form-field--xs .b-form-field__error,
.b-form-field--xs .b-form-field__warning,
.b-form-field--xs .b-form-field__success {
  @apply text-xs;
}

.b-form-field--sm .b-form-field__label {
  @apply text-sm;
}

.b-form-field--sm .b-form-field__hint,
.b-form-field--sm .b-form-field__error,
.b-form-field--sm .b-form-field__warning,
.b-form-field--sm .b-form-field__success {
  @apply text-xs;
}

.b-form-field--md .b-form-field__label {
  @apply text-sm;
}

.b-form-field--md .b-form-field__hint,
.b-form-field--md .b-form-field__error,
.b-form-field--md .b-form-field__warning,
.b-form-field--md .b-form-field__success {
  @apply text-xs;
}

.b-form-field--lg .b-form-field__label {
  @apply text-base;
}

.b-form-field--lg .b-form-field__hint,
.b-form-field--lg .b-form-field__error,
.b-form-field--lg .b-form-field__warning,
.b-form-field--lg .b-form-field__success {
  @apply text-sm;
}

.b-form-field--xl .b-form-field__label {
  @apply text-lg;
}

.b-form-field--xl .b-form-field__hint,
.b-form-field--xl .b-form-field__error,
.b-form-field--xl .b-form-field__warning,
.b-form-field--xl .b-form-field__success {
  @apply text-base;
}

/* Label */
.b-form-field__label {
  @apply font-medium text-gray-700 select-none;
}

.b-form-field__label--required {
  /* Required styling handled by required indicator */
}

.b-form-field__label--optional {
  /* Optional styling handled by optional indicator */
}

.b-form-field__required {
  @apply text-red-500 ml-1;
}

.b-form-field__optional {
  @apply text-gray-400 ml-1 text-xs;
}

.b-form-field__tooltip-icon {
  @apply text-gray-400 hover:text-gray-600 ml-1 cursor-help;
}

/* Content wrapper */
.b-form-field__content {
  @apply relative flex-1;
}

.b-form-field--horizontal .b-form-field__content {
  @apply flex-1;
}

/* Loading indicator */
.b-form-field__loading {
  @apply absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400;
}

/* Messages */
.b-form-field__hint {
  @apply text-gray-500 mt-1;
}

.b-form-field__error {
  @apply text-red-600 mt-1;
}

.b-form-field__error-list,
.b-form-field__warning-list,
.b-form-field__success-list {
  @apply list-disc list-inside space-y-1 mt-1;
}

.b-form-field__error-item {
  @apply text-red-600;
}

.b-form-field__warning {
  @apply text-amber-600 mt-1;
}

.b-form-field__warning-item {
  @apply text-amber-600;
}

.b-form-field__success {
  @apply text-green-600 mt-1;
}

.b-form-field__success-item {
  @apply text-green-600;
}

/* State styles */
.b-form-field--disabled {
  @apply opacity-60 pointer-events-none;
}

.b-form-field--readonly {
  @apply pointer-events-none;
}

.b-form-field--error .b-form-field__label {
  @apply text-red-700;
}

.b-form-field--warning .b-form-field__label {
  @apply text-amber-700;
}

.b-form-field--success .b-form-field__label {
  @apply text-green-700;
}

.b-form-field--validating {
  @apply opacity-75;
}

/* Keyboard mode enhancements */
.b-form-field--keyboard-mode.b-form-field--focused {
  /* Enhanced focus styles for keyboard navigation */
}

/* Fieldset styles */
.b-form-field__fieldset {
  @apply border border-gray-300 rounded-lg p-4;
}

.b-form-field__legend {
  @apply font-medium text-gray-700 px-2;
}

.b-form-field__fieldset-content {
  @apply mt-2;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .b-form-field__label {
    @apply text-gray-300;
  }
  
  .b-form-field__hint {
    @apply text-gray-400;
  }
  
  .b-form-field__error {
    @apply text-red-400;
  }
  
  .b-form-field__warning {
    @apply text-amber-400;
  }
  
  .b-form-field__success {
    @apply text-green-400;
  }
  
  .b-form-field__fieldset {
    @apply border-gray-600;
  }
  
  .b-form-field__legend {
    @apply text-gray-300;
  }
  
  .b-form-field--error .b-form-field__label {
    @apply text-red-300;
  }
  
  .b-form-field--warning .b-form-field__label {
    @apply text-amber-300;
  }
  
  .b-form-field--success .b-form-field__label {
    @apply text-green-300;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .b-form-field__label {
    @apply font-bold;
  }
  
  .b-form-field__error {
    @apply font-semibold;
  }
  
  .b-form-field__fieldset {
    @apply border-2 border-black;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .b-form-field--horizontal {
    @apply flex-col items-start;
  }
  
  .b-form-field--horizontal .b-form-field__label {
    @apply w-full mb-1 mr-0;
  }
  
  .b-form-field--inline {
    @apply flex-col items-start;
  }
}
</style>
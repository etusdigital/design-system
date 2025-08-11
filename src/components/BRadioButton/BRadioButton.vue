<script setup lang="ts">
import { 
  watch, 
  inject, 
  computed, 
  ref, 
  onMounted, 
  onUnmounted, 
  nextTick 
} from "vue";
import type { 
  GroupState, 
  GroupValue, 
  AccessibleGroupContext, 
  GroupItem 
} from "../BGroup/BGroup.types";
import type { 
  BRadioButtonProps,
  RadioButtonState,
  RadioButtonAriaAttributes,
  RadioButtonValidationResult
} from "./BRadioButton.types";
import { useOptionalModel, useAriaAttributes, useScreenReader } from "#composables";

const props = withDefaults(
  defineProps<BRadioButtonProps>(),
  {
    modelValue: undefined,
    disabled: false,
    isDiv: false,
    announceChanges: true,
    enhancedFocus: true,
    highContrast: false,
    reduceMotion: false,
    minTouchTarget: true,
    tabindex: -1,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "selection-change": [value: GroupValue, state: RadioButtonState];
  "focus": [event: FocusEvent];
  "blur": [event: FocusEvent];
  "validation-change": [result: RadioButtonValidationResult];
}>();

// Template refs
const radioElement = ref<HTMLElement | null>(null);
const helpTextElement = ref<HTMLElement | null>(null);
const errorElement = ref<HTMLElement | null>(null);

// Composables
const [model] = useOptionalModel<boolean>(props, "modelValue", emit, false);
const { useAriaId } = useAriaAttributes();
const { announcePolitely, announceAssertively } = useScreenReader();

// Inject group contexts
const groupState = inject<GroupState | null>("groupState", null);
const accessibleGroupContext = inject<AccessibleGroupContext | null>("accessibleGroupContext", null);

// Reactive state
const radioId = computed(() => props.id || useAriaId('radio-button'));
const helpTextId = computed(() => props.helpText ? `${radioId.value}-help` : undefined);
const errorId = computed(() => props.errorMessage ? `${radioId.value}-error` : undefined);
const isFocused = ref(false);
const wasInteracted = ref(false);

// Computed properties for accessibility
const isSelected = computed((): boolean => {
  if (accessibleGroupContext && props.groupValue !== undefined) {
    return accessibleGroupContext.selectedValues.includes(props.groupValue);
  }
  return model.value;
});

const isDisabled = computed((): boolean => {
  if (accessibleGroupContext) {
    return accessibleGroupContext.isDisabled || props.disabled;
  }
  if (groupState) {
    return groupState.disabled || props.disabled;
  }
  return props.disabled;
});

const isRequired = computed((): boolean => {
  if (accessibleGroupContext) {
    return accessibleGroupContext.isRequired || props.required || false;
  }
  return props.required || false;
});

const hasError = computed((): boolean => {
  return !!(props.errorMessage || (accessibleGroupContext?.errorMessage));
});

const positionInfo = computed(() => {
  if (props.positionInGroup) {
    return props.positionInGroup;
  }
  
  if (accessibleGroupContext && props.groupValue !== undefined) {
    const items = accessibleGroupContext.items;
    const currentIndex = items.findIndex(item => item.value === props.groupValue);
    if (currentIndex !== -1) {
      return {
        current: currentIndex + 1,
        total: items.length
      };
    }
  }
  
  return undefined;
});

const radioButtonState = computed((): RadioButtonState => ({
  isSelected: isSelected.value,
  isDisabled: isDisabled.value,
  hasFocus: isFocused.value,
  hasError: hasError.value,
  isRequired: isRequired.value,
  position: positionInfo.value,
}));

// ARIA attributes
const ariaAttributes = computed((): RadioButtonAriaAttributes => {
  const describedByIds = [
    props.ariaDescribedBy,
    helpTextId.value,
    errorId.value,
    accessibleGroupContext?.helpText ? `${accessibleGroupContext.groupId}-help` : undefined,
    accessibleGroupContext?.errorMessage ? `${accessibleGroupContext.groupId}-error` : undefined,
  ].filter(Boolean);

  return {
    role: 'radio',
    'aria-checked': isSelected.value,
    ...(isDisabled.value && { 'aria-disabled': true }),
    ...(props.ariaLabel && { 'aria-label': props.ariaLabel }),
    ...(props.ariaLabelledBy && { 'aria-labelledby': props.ariaLabelledBy }),
    ...(describedByIds.length > 0 && { 'aria-describedby': describedByIds.join(' ') }),
    ...(hasError.value && { 'aria-invalid': true }),
    ...(isRequired.value && { 'aria-required': true }),
    ...(positionInfo.value && { 
      'aria-posinset': positionInfo.value.current,
      'aria-setsize': positionInfo.value.total 
    }),
  };
});

const groupName = computed((): string => {
  return props.name || accessibleGroupContext?.groupName || radioId.value;
});

const radioLabel = computed((): string => {
  // Extract text content from slot for announcements
  return props.ariaLabel || radioId.value;
});

const effectiveTabIndex = computed((): number => {
  if (isDisabled.value) return -1;
  
  // In a group context, only the selected or first item should be tabbable
  if (accessibleGroupContext) {
    if (isSelected.value) return 0;
    if (accessibleGroupContext.selectedValues.length === 0) {
      // If nothing is selected, make the first item tabbable
      const items = accessibleGroupContext.items;
      const firstEnabledItem = items.find(item => !item.disabled);
      return (firstEnabledItem?.value === props.groupValue) ? 0 : -1;
    }
    return -1;
  }
  
  // Outside group context, use provided tabindex or default
  return props.tabindex !== undefined ? props.tabindex : 0;
});

// Validation
const validationResult = computed((): RadioButtonValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (props.errorMessage) {
    errors.push(props.errorMessage);
  }

  if (accessibleGroupContext?.errorMessage) {
    errors.push(accessibleGroupContext.errorMessage);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    fieldName: radioLabel.value,
  };
});

// Watch for group context changes
watch(
  () => accessibleGroupContext?.selectedValues,
  (newSelected) => {
    if (newSelected && accessibleGroupContext && props.groupValue !== undefined) {
      const isNowSelected = accessibleGroupContext.selectedValues.includes(props.groupValue);
      model.value = isNowSelected;
      
      if (isNowSelected && wasInteracted.value && props.announceChanges) {
        announceSelection();
      }
    }
  }
);

// Watch for validation changes
watch(
  validationResult,
  (newResult) => {
    emit("validation-change", newResult);
  },
  { deep: true }
);

// Watch for model value changes (external updates)
watch(model, (newValue) => {
  if (newValue && groupState && props.groupValue !== undefined) {
    groupState.select(props.groupValue);
    if (wasInteracted.value && props.announceChanges) {
      announceSelection();
    }
  }
});

/**
 * Handles radio button selection/activation
 */
function activateRadioButton(): void {
  if (isDisabled.value) {
    if (props.announceChanges) {
      announceAssertively(`${radioLabel.value} is disabled and cannot be selected.`);
    }
    return;
  }

  wasInteracted.value = true;

  // Update model
  model.value = true;

  // Notify accessible group context
  if (accessibleGroupContext && props.groupValue !== undefined) {
    accessibleGroupContext.selectItem(props.groupValue, false); // We handle announcement ourselves
  }

  // Notify legacy group state
  if (groupState && props.groupValue !== undefined) {
    groupState.select(props.groupValue);
  }

  // Emit selection change
  emit("selection-change", props.groupValue || true, radioButtonState.value);

  // Announce selection change
  if (props.announceChanges) {
    nextTick(() => announceSelection());
  }

  // Focus management
  if (props.enhancedFocus && radioElement.value) {
    radioElement.value.focus();
  }
}

/**
 * Announces selection to screen readers
 */
function announceSelection(): void {
  if (!props.announceChanges) return;

  let message = props.announcementTemplate || 'Selected {label}';
  message = message.replace('{label}', radioLabel.value);

  if (positionInfo.value) {
    message += `. ${positionInfo.value.current} of ${positionInfo.value.total}`;
  }

  if (isRequired.value) {
    message += '. Required field';
  }

  announcePolitely(message);
}

/**
 * Handles keyboard interactions
 */
function handleKeydown(event: KeyboardEvent): void {
  if (isDisabled.value) return;

  const { key } = event;

  switch (key) {
    case ' ':
    case 'Space':
      event.preventDefault();
      event.stopPropagation();
      activateRadioButton();
      break;

    case 'Enter':
      event.preventDefault();
      event.stopPropagation();
      activateRadioButton();
      break;

    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      // Let group handle navigation
      if (accessibleGroupContext) {
        // Group will handle this through its own keyboard handler
        return;
      }
      break;

    default:
      // Don't handle other keys
      break;
  }
}

/**
 * Handles focus events
 */
function handleFocus(event: FocusEvent): void {
  isFocused.value = true;
  emit("focus", event);

  // Announce focus if configured
  if (props.announceChanges && !isSelected.value) {
    const message = `${radioLabel.value} radio button. ${isSelected.value ? 'Selected' : 'Not selected'}`;
    announcePolitely(message);
  }
}

/**
 * Handles blur events
 */
function handleBlur(event: FocusEvent): void {
  isFocused.value = false;
  emit("blur", event);
}

/**
 * Handles click events
 */
function handleClick(event: MouseEvent): void {
  if (isDisabled.value) {
    event.preventDefault();
    return;
  }

  activateRadioButton();
}

/**
 * Legacy toggle function for backward compatibility
 */
function toggle() {
  activateRadioButton();
}

// Register with group context on mount
onMounted(() => {
  if (accessibleGroupContext && props.groupValue !== undefined && radioElement.value) {
    const groupItem: GroupItem = {
      id: radioId.value,
      value: props.groupValue,
      label: radioLabel.value,
      disabled: props.disabled,
      selected: isSelected.value,
      helpText: props.helpText,
      errorMessage: props.errorMessage,
      ariaDescription: props.ariaDescribedBy,
    };

    accessibleGroupContext.registerItem(groupItem, radioElement.value);
  }
});

// Cleanup on unmount
onUnmounted(() => {
  if (accessibleGroupContext && props.groupValue !== undefined) {
    accessibleGroupContext.unregisterItem(props.groupValue);
  }
});
</script>

<template>
  <div
    ref="radioElement"
    :id="radioId"
    :name="groupName"
    v-bind="ariaAttributes"
    :tabindex="effectiveTabIndex"
    class="b-radio-button relative inline-flex items-center justify-center cursor-pointer select-none font-bold tracking-wider uppercase transition-all duration-200"
    :class="[
      // Base styles
      'bg-neutral-surface-default text-neutral-interaction-default border-xxs border-current',
      'text-xs leading-xs py-base px-2xl',
      
      // Size variants for accessibility
      minTouchTarget ? 'min-h-[44px] min-w-[44px]' : 'min-h-[3em] min-w-[10em]',
      
      // State classes
      isDiv ? 'b-radio-div' : 'b-radio-button',
      {
        // Selection state
        'active': isSelected,
        
        // Disabled state
        'disabled': isDisabled,
        'pointer-events-none': isDisabled,
        
        // Focus state
        'ring-2 ring-blue-500 ring-offset-2': isFocused && enhancedFocus,
        'outline-none': true,
        
        // Error state
        'ring-2 ring-red-500 ring-offset-2': hasError && !isFocused,
        'border-red-500': hasError,
        
        // High contrast mode
        'border-2 border-black': highContrast && !hasError,
        'bg-white text-black': highContrast,
        
        // Reduced motion
        'transition-none': reduceMotion,
        
        // Required indicator
        'required': isRequired,
      }
    ]"
    @click="handleClick"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
    @mouseenter="wasInteracted = true"
  >
    <!-- Radio button content -->
    <span class="radio-content flex items-center justify-center">
      <slot>
        <!-- Default content if no slot provided -->
        {{ ariaLabel || `Radio ${groupValue}` }}
      </slot>
    </span>

    <!-- Hidden form input for form submission -->
    <input
      type="radio"
      :name="groupName"
      :value="groupValue"
      :checked="isSelected"
      :disabled="isDisabled"
      :required="isRequired"
      class="sr-only"
      tabindex="-1"
      aria-hidden="true"
    >
  </div>

  <!-- Help text (hidden from visual but available to screen readers) -->
  <div
    v-if="helpText"
    :id="helpTextId"
    class="sr-only">
    {{ helpText }}
  </div>

  <!-- Error message (hidden from visual but available to screen readers) -->
  <div
    v-if="errorMessage"
    :id="errorId"
    class="sr-only"
    role="alert"
    aria-live="assertive">
    {{ errorMessage }}
  </div>
</template>

<style scoped>
@import "../../assets/main.css";

/* Base radio button styling */
.b-radio-button {
  /* Use CSS custom properties for theming */
  background-color: var(--color-neutral-surface-default);
  color: var(--color-neutral-interaction-default);
  border-color: var(--color-neutral-border-default);
}

/* Active/selected state */
.b-radio-button.active {
  background-color: var(--color-primary-interaction-default);
  color: var(--color-neutral-foreground-negative);
  border-color: var(--color-primary-interaction-default);
}

/* Div variant styling */
.b-radio-div {
  @apply py-xs px-base min-w-[8em];
  border-radius: var(--rounded-base);
  border-color: var(--color-neutral-border-default);
  color: var(--color-neutral-interaction-default);
}

.b-radio-div.active {
  background-color: var(--color-primary-surface-highlight);
  color: var(--color-primary-interaction-default);
  border-color: var(--color-primary-interaction-default);
}

/* Disabled state */
.b-radio-button.disabled,
.b-radio-div.disabled {
  color: var(--color-neutral-interaction-disabled);
  background-color: var(--color-neutral-surface-disabled);
  border-color: var(--color-neutral-border-disabled);
  cursor: not-allowed;
}

/* Focus states with enhanced accessibility */
.b-radio-button:focus-visible {
  outline: 2px solid var(--color-primary-interaction-default);
  outline-offset: 2px;
}

/* High contrast mode support */
.b-radio-button.high-contrast {
  border-width: 2px;
}

.b-radio-button.high-contrast.active {
  background-color: black;
  color: white;
}

/* Required field indicator */
.b-radio-button.required::before {
  content: '';
  position: absolute;
  top: -2px;
  right: -2px;
  width: 6px;
  height: 6px;
  background-color: var(--color-danger-interaction-default);
  border-radius: 50%;
  opacity: 0.8;
}

/* Error state styling */
.b-radio-button[aria-invalid="true"] {
  border-color: var(--color-danger-border-default);
  background-color: var(--color-danger-surface-subtle);
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

/* Touch target improvements */
.b-radio-button {
  /* Ensure minimum touch target size per WCAG guidelines */
  min-height: 44px;
  min-width: 44px;
}

/* Hover and interaction states */
.b-radio-button:not(.disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.b-radio-button:not(.disabled):active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Reduced motion support */
.b-radio-button.reduce-motion,
.b-radio-button.reduce-motion * {
  transition: none !important;
  transform: none !important;
  animation: none !important;
}

/* Group context styling (handled by BGroup) */
.b-group.hor .b-radio-button {
  @apply border-r-0 first:rounded-l-sm last:rounded-r-sm last:border-r-xxs;
}

.b-group.vert .b-radio-button {
  @apply border-b-0 first:rounded-t-sm last:rounded-b-sm last:border-b-xxs;
}

/* Color scheme variants for accessibility */
.b-radio-button.variant-primary.active {
  background-color: var(--color-primary-interaction-default);
}

.b-radio-button.variant-success.active {
  background-color: var(--color-success-interaction-default);
}

.b-radio-button.variant-warning.active {
  background-color: var(--color-warning-interaction-default);
}

.b-radio-button.variant-danger.active {
  background-color: var(--color-danger-interaction-default);
}
</style>
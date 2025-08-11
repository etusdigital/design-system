<script setup lang="ts">
import { ref, watch, computed, nextTick, onMounted, onUnmounted } from "vue";
import { useAriaAttributes, useScreenReader, useKeyboardNavigation } from "#composables";
import type { 
  BDatePickerProps, 
  BDatePickerEmits,
  BDatePickerSelectionEvent,
  BDatePickerNavigationEvent,
  BDatePickerKeyboardEvent,
  BDatePickerFocusEvent,
  BDatePickerValidationResult
} from './BDatePicker.types';
import {
  defaultBDatePickerInputConfig,
  defaultBDatePickerCalendarConfig,
  defaultBDatePickerKeyboardConfig,
  defaultBDatePickerAnnouncementConfig,
  defaultBDatePickerAccessibilityConfig
} from './BDatePicker.types';

const props = withDefaults(
  defineProps<BDatePickerProps>(),
  {
    modelValue: undefined,
    expanded: false,
    lang: "en-US",
    labelValue: "",
    disabled: false,
    required: false,
    isError: false,
    errorMessage: "",
    absolute: false,
    alignRight: false,
    inputConfig: () => defaultBDatePickerInputConfig,
    calendarConfig: () => defaultBDatePickerCalendarConfig,
    keyboardConfig: () => defaultBDatePickerKeyboardConfig,
    announcementConfig: () => defaultBDatePickerAnnouncementConfig,
    accessibilityConfig: () => defaultBDatePickerAccessibilityConfig,
    tabindex: 0,
    autofocus: false,
    allowTextInput: false,
    validateOnBlur: true,
    validateOnChange: false,
    loading: false,
  }
);

const emit = defineEmits<BDatePickerEmits>();

// Accessibility composables
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();

// Generate unique IDs for ARIA relationships
const datePickerId = useAriaId('datepicker');
const calendarId = useAriaId('calendar');
const inputId = useAriaId('date-input');
const errorId = useAriaId('date-error');
const descriptionId = useAriaId('date-description');
const instructionsId = useAriaId('date-instructions');
const liveRegionId = useAriaId('date-live-region');

// Component state
const inputRef = ref<HTMLElement | null>(null);
const calendarRef = ref<HTMLElement | null>(null);
const previousFocusElement = ref<HTMLElement | null>(null);
const isKeyboardMode = ref(false);
const inputValue = ref('');
const validationErrors = ref<string[]>([]);
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const focusedDate = ref<Date | null>(null);
const calendarHasFocus = ref(false);
const inputHasFocus = ref(false);

// Computed properties for accessibility
const formattedDate = computed(() => {
  if (!model.value) return null;
  const format = props.displayConfig?.displayFormat || 'medium';
  
  const options: Intl.DateTimeFormatOptions = {};
  switch (format) {
    case 'full':
      options.dateStyle = 'full';
      break;
    case 'long':
      options.dateStyle = 'long';
      break;
    case 'short':
      options.dateStyle = 'short';
      break;
    case 'custom':
      return props.displayConfig?.customFormat ? 
        formatCustomDate(model.value, props.displayConfig.customFormat) :
        model.value.toLocaleDateString(props.lang);
    default:
      options.dateStyle = 'medium';
  }
  
  return model.value.toLocaleDateString(props.lang, options);
});

const formattedDateForScreenReader = computed(() => {
  if (!model.value) return null;
  return model.value.toLocaleDateString(props.lang, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const ariaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel;
  if (model.value) {
    return `Selected date: ${formattedDateForScreenReader.value}`;
  }
  return props.inputConfig?.inputLabel || 'Choose date';
});

const inputAriaLabel = computed(() => {
  if (props.inputAriaLabel) return props.inputAriaLabel;
  return props.inputConfig?.inputLabel || 'Date input';
});

const calendarAriaLabel = computed(() => {
  if (props.calendarAriaLabel) return props.calendarAriaLabel;
  return props.calendarConfig?.calendarLabel || 'Calendar';
});

const ariaDescription = computed(() => {
  const parts: string[] = [];
  
  if (props.required) parts.push('Required field.');
  if (props.disabled) parts.push('This field is disabled.');
  
  // Validation constraints
  if (props.maxInit) {
    parts.push(`Dates before ${props.maxInit.toLocaleDateString(props.lang)} are disabled.`);
  }
  if (props.maxEnd) {
    parts.push(`Dates after ${props.maxEnd.toLocaleDateString(props.lang)} are disabled.`);
  }
  if (props.validationConfig?.minDate) {
    parts.push(`Minimum date: ${props.validationConfig.minDate.toLocaleDateString(props.lang)}.`);
  }
  if (props.validationConfig?.maxDate) {
    parts.push(`Maximum date: ${props.validationConfig.maxDate.toLocaleDateString(props.lang)}.`);
  }
  
  // Input format hint
  if (props.inputConfig?.formatHint && props.allowTextInput) {
    parts.push(`Format: ${props.inputConfig.formatHint}.`);
  }
  
  // Instructions
  if (props.allowTextInput) {
    parts.push('Enter date manually or press Enter to open calendar.');
  } else {
    parts.push('Press Enter or Space to open calendar.');
  }
  
  return parts.join(' ');
});

const calendarInstructions = computed(() => {
  return props.calendarConfig?.gridInstructions || 
    'Use arrow keys to navigate dates. Enter or Space to select. Page Up/Page Down to change months. Home/End for first/last day of month.';
});

const isValid = computed(() => {
  return validationErrors.value.length === 0;
});

const hasError = computed(() => {
  return props.isError || !isValid.value;
});

const errorMessages = computed(() => {
  const messages = [...validationErrors.value];
  if (props.errorMessage && props.isError) {
    messages.push(props.errorMessage);
  }
  return messages;
});

const describedByIds = computed(() => {
  const ids: string[] = [];
  
  if (props.ariaDescribedBy) ids.push(props.ariaDescribedBy);
  ids.push(descriptionId);
  ids.push(instructionsId);
  if (hasError.value) ids.push(errorId);
  
  return ids.filter(Boolean).join(' ');
});

// Accessibility state
const accessibilityState = computed(() => ({
  isCalendarOpen: isExpanded.value,
  focusedDate: focusedDate.value,
  selectedDate: model.value,
  currentMonth: currentMonth.value,
  currentYear: currentYear.value,
  hasValidationErrors: !isValid.value,
  isKeyboardMode: isKeyboardMode.value,
  inputHasFocus: inputHasFocus.value,
  calendarHasFocus: calendarHasFocus.value,
}));

const model = ref(props.modelValue);
const isExpanded = ref(props.expanded);

watch(
  () => props.modelValue,
  (value) => (model.value = value)
);
watch(
  () => props.expanded,
  (value) => (isExpanded.value = value)
);

function formatDate(date: Date) {
  return date.toLocaleDateString(props.lang, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function formatCustomDate(date: Date, format: string): string {
  return format
    .replace('YYYY', date.getFullYear().toString())
    .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
    .replace('DD', date.getDate().toString().padStart(2, '0'))
    .replace('YY', date.getFullYear().toString().slice(-2))
    .replace('M', (date.getMonth() + 1).toString())
    .replace('D', date.getDate().toString());
}

function setModel(value: Date | undefined, source: 'calendar' | 'today-button' | 'text-input' | 'programmatic' = 'calendar') {
  const previousDate = model.value;
  
  // Validate the date if provided
  if (value) {
    const validation = validateDate(value);
    if (!validation.isValid) {
      validationErrors.value = validation.errors;
      if (props.announcementConfig?.announceValidation) {
        announceValidationErrors(validation.errors);
      }
      emit('validationChanged', false, validation.errors);
      return;
    }
    validationErrors.value = [];
  } else {
    validationErrors.value = [];
  }
  
  model.value = value;
  emit("update:modelValue", model.value);
  emit('validationChanged', true, []);
  
  // Create detailed selection event
  if (value) {
    const selectionEvent: BDatePickerSelectionEvent = {
      date: value,
      formatted: formattedDate.value || '',
      viaKeyboard: isKeyboardMode.value,
      viaTextInput: source === 'text-input',
      source,
      isValid: true,
      validationErrors: [],
    };
    
    emit('dateSelected', selectionEvent);
  }
  
  // Announce date selection to screen readers
  if (props.announcementConfig?.announceDateSelection) {
    if (value && (!previousDate || value.getTime() !== previousDate.getTime())) {
      const announcement = props.announcementConfig.customAnnouncements?.dateSelected?.(value) ||
        `Date selected: ${value.toLocaleDateString(props.lang, {
          weekday: 'long',
          year: 'numeric', 
          month: 'long',
          day: 'numeric'
        })}`;
      screenReader.announcePolitely(announcement);
    } else if (!value && previousDate) {
      screenReader.announcePolitely('Date cleared');
      emit('cleared');
    }
  }
  
  // Update input display if text input is enabled
  if (props.allowTextInput) {
    inputValue.value = value ? formatDate(value) : '';
  }
}

function setExpanded(value: boolean) {
  const wasExpanded = isExpanded.value;
  isExpanded.value = value;
  emit("update:expanded", isExpanded.value);
  
  if (value !== wasExpanded) {
    // Focus management
    if (value) {
      // Opening calendar
      previousFocusElement.value = document.activeElement as HTMLElement;
      
      nextTick(() => {
        if (props.accessibilityConfig?.focusManagement?.focusFirstSelectableDate && calendarRef.value) {
          // Focus first selectable date or calendar
          const firstSelectableDate = model.value || new Date();
          focusedDate.value = firstSelectableDate;
          calendarRef.value.focus();
        }
        calendarHasFocus.value = true;
      });
    } else {
      // Closing calendar
      calendarHasFocus.value = false;
      
      if (props.accessibilityConfig?.focusManagement?.returnFocusOnClose && 
          previousFocusElement.value) {
        previousFocusElement.value.focus();
      } else if (inputRef.value) {
        inputRef.value.focus();
      }
    }
    
    // Announce calendar state changes
    if (props.announcementConfig?.announceCalendarState) {
      if (value) {
        const announcement = props.announcementConfig.customAnnouncements?.calendarOpened?.() ||
          'Calendar opened. Use arrow keys to navigate dates.';
        screenReader.announcePolitely(announcement);
      } else {
        const announcement = props.announcementConfig.customAnnouncements?.calendarClosed?.() ||
          'Calendar closed';
        screenReader.announcePolitely(announcement);
      }
    }
  }
}

// Date validation function
function validateDate(date: Date | string): BDatePickerValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  let dateValue: Date;
  
  if (typeof date === 'string') {
    dateValue = new Date(date);
    if (isNaN(dateValue.getTime())) {
      errors.push(props.validationConfig?.errorMessages?.invalidFormat || 
                 props.inputConfig?.formatErrorMessage || 
                 'Invalid date format');
      return { isValid: false, errors, warnings, isSelectable: false };
    }
  } else {
    dateValue = date;
  }
  
  // Required validation
  if (props.required && !dateValue) {
    errors.push(props.validationConfig?.errorMessages?.required || 'Date is required');
  }
  
  // Min/max date validation
  if (props.maxInit && dateValue <= props.maxInit) {
    errors.push(props.validationConfig?.errorMessages?.minDate || 
               `Date must be after ${props.maxInit.toLocaleDateString(props.lang)}`);
  }
  
  if (props.maxEnd && dateValue >= props.maxEnd) {
    errors.push(props.validationConfig?.errorMessages?.maxDate || 
               `Date must be before ${props.maxEnd.toLocaleDateString(props.lang)}`);
  }
  
  // New validation config
  if (props.validationConfig?.minDate && dateValue < props.validationConfig.minDate) {
    errors.push(props.validationConfig.errorMessages?.minDate || 
               `Date must be on or after ${props.validationConfig.minDate.toLocaleDateString(props.lang)}`);
  }
  
  if (props.validationConfig?.maxDate && dateValue > props.validationConfig.maxDate) {
    errors.push(props.validationConfig.errorMessages?.maxDate || 
               `Date must be on or before ${props.validationConfig.maxDate.toLocaleDateString(props.lang)}`);
  }
  
  // Disabled dates validation
  if (props.validationConfig?.disabledDates) {
    const disabled = Array.isArray(props.validationConfig.disabledDates) 
      ? props.validationConfig.disabledDates.some(d => d.toDateString() === dateValue.toDateString())
      : props.validationConfig.disabledDates(dateValue);
    
    if (disabled) {
      errors.push(props.validationConfig.errorMessages?.disabledDate || 'This date is not available');
    }
  }
  
  // Custom validation
  if (props.validationConfig?.validator) {
    const customResult = props.validationConfig.validator(dateValue);
    if (typeof customResult === 'string') {
      errors.push(customResult);
    } else if (customResult === false) {
      errors.push(props.validationConfig.errorMessages?.custom || 'Invalid date');
    }
  }
  
  const isValid = errors.length === 0;
  const isSelectable = isValid;
  
  return { isValid, errors, warnings, isSelectable };
}

function announceValidationErrors(errors: string[]) {
  if (errors.length > 0) {
    const message = props.announcementConfig?.customAnnouncements?.validationError?.(errors.join(', ')) ||
      `Error: ${errors.join(', ')}`;
    screenReader.announceAssertively(message);
  }
}

// Input handling for text input mode
function handleInputChange(event: Event) {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;
  
  if (!props.allowTextInput) return;
  
  const trimmedValue = inputValue.value.trim();
  if (!trimmedValue) {
    setModel(undefined, 'text-input');
    emit('inputChanged', '', true);
    return;
  }
  
  const dateValue = new Date(trimmedValue);
  const validation = validateDate(dateValue);
  
  emit('inputChanged', trimmedValue, validation.isValid);
  
  if (props.validateOnChange && validation.isValid) {
    setModel(dateValue, 'text-input');
  } else if (!validation.isValid) {
    validationErrors.value = validation.errors;
    emit('validationChanged', false, validation.errors);
  }
}

function handleInputBlur() {
  inputHasFocus.value = false;
  
  if (!props.allowTextInput || !props.validateOnBlur) return;
  
  const trimmedValue = inputValue.value.trim();
  if (!trimmedValue) {
    setModel(undefined, 'text-input');
    return;
  }
  
  const dateValue = new Date(trimmedValue);
  const validation = validateDate(dateValue);
  
  if (validation.isValid) {
    setModel(dateValue, 'text-input');
  } else {
    validationErrors.value = validation.errors;
    if (props.announcementConfig?.announceValidation) {
      announceValidationErrors(validation.errors);
    }
    emit('validationChanged', false, validation.errors);
  }
}

function handleInputFocus() {
  inputHasFocus.value = true;
  
  const focusEvent: BDatePickerFocusEvent = {
    target: 'input',
    type: 'focus',
    viaKeyboard: isKeyboardMode.value,
  };
  
  emit('focusChanged', focusEvent);
}

// Calendar focus handling
function handleCalendarFocus() {
  calendarHasFocus.value = true;
  
  const focusEvent: BDatePickerFocusEvent = {
    target: 'calendar',
    type: 'focus',
    viaKeyboard: isKeyboardMode.value,
  };
  
  emit('focusChanged', focusEvent);
}

function handleCalendarBlur() {
  calendarHasFocus.value = false;
  
  const focusEvent: BDatePickerFocusEvent = {
    target: 'calendar',
    type: 'blur',
    viaKeyboard: isKeyboardMode.value,
  };
  
  emit('focusChanged', focusEvent);
}

// Today button handler
function selectToday() {
  const today = new Date();
  const validation = validateDate(today);
  
  if (validation.isValid) {
    setModel(today, 'today-button');
    emit('todaySelected', today);
    setExpanded(false);
  } else {
    validationErrors.value = validation.errors;
    if (props.announcementConfig?.announceValidation) {
      announceValidationErrors(validation.errors);
    }
  }
}

// Keyboard navigation handlers
function handleInputKeyDown(event: KeyboardEvent) {
  isKeyboardMode.value = true;
  
  const keyboardEvent: BDatePickerKeyboardEvent = {
    key: event.key,
    target: 'input',
    action: 'navigate',
  };
  
  switch (event.key) {
    case 'Enter':
      if (!props.disabled) {
        event.preventDefault();
        keyboardEvent.action = isExpanded.value ? 'close' : 'open';
        setExpanded(!isExpanded.value);
      }
      break;
      
    case ' ':
      if (!props.allowTextInput && !props.disabled) {
        event.preventDefault();
        keyboardEvent.action = isExpanded.value ? 'close' : 'open';
        setExpanded(!isExpanded.value);
      }
      break;
      
    case 'Escape':
      if (isExpanded.value) {
        event.preventDefault();
        keyboardEvent.action = 'close';
        setExpanded(false);
      }
      break;
      
    case 'ArrowDown':
      if (!isExpanded.value && !props.disabled) {
        event.preventDefault();
        keyboardEvent.action = 'open';
        setExpanded(true);
      }
      break;
  }
  
  emit('keyboardNavigation', keyboardEvent);
}

function handleCalendarKeyDown(event: KeyboardEvent) {
  isKeyboardMode.value = true;
  
  const keyboardEvent: BDatePickerKeyboardEvent = {
    key: event.key,
    target: 'calendar',
    action: 'navigate',
    focusedDate: focusedDate.value || undefined,
  };
  
  // Let the Calendar component handle most navigation
  // We only handle calendar-specific actions here
  switch (event.key) {
    case 'Escape':
      event.preventDefault();
      keyboardEvent.action = 'close';
      setExpanded(false);
      break;
      
    case 'Tab':
      // Allow tab navigation within calendar if enabled
      if (!props.keyboardConfig?.enableTabNavigation) {
        event.preventDefault();
      }
      break;
  }
  
  emit('keyboardNavigation', keyboardEvent);
}

// Action button handlers
function handleClear() {
  setModel(undefined, 'programmatic');
  emit('cleared');
}

function handleApply() {
  emit('apply', model.value);
  setExpanded(false);
}
// Watchers for accessibility
watch(() => props.modelValue, (newValue) => {
  if (newValue !== model.value) {
    model.value = newValue;
    if (props.allowTextInput) {
      inputValue.value = newValue ? formatDate(newValue) : '';
    }
  }
});

watch(() => props.expanded, (newValue) => {
  if (newValue !== isExpanded.value) {
    setExpanded(newValue);
  }
});

watch(isExpanded, (newValue) => {
  if (newValue) {
    currentMonth.value = (model.value || new Date()).getMonth();
    currentYear.value = (model.value || new Date()).getFullYear();
  }
});

// Initialize input value on mount
onMounted(() => {
  if (props.allowTextInput && model.value) {
    inputValue.value = formatDate(model.value);
  }
  
  if (props.autofocus && inputRef.value) {
    inputRef.value.focus();
  }
});

// Focus trap cleanup
onUnmounted(() => {
  if (previousFocusElement.value && document.contains(previousFocusElement.value)) {
    previousFocusElement.value.focus();
  }
});

// Reset keyboard mode on mouse interaction
function resetKeyboardMode() {
  isKeyboardMode.value = false;
}

</script>

<template>
  <div 
    :id="datePickerId"
    class="b-date-picker"
    :class="{
      'b-date-picker--high-contrast': accessibilityConfig?.highContrast,
      'b-date-picker--large-targets': accessibilityConfig?.largeTouchTargets,
      'b-date-picker--reduced-motion': accessibilityConfig?.respectReducedMotion,
      'b-date-picker--error': hasError,
      'b-date-picker--disabled': disabled,
      'b-date-picker--loading': loading,
    }"
    @click="resetKeyboardMode"
    @mousedown="resetKeyboardMode"
  >
    <BExpandableContainer
      v-model="isExpanded"
      :disabled="disabled"
      :required="required"
      :absolute="absolute"
      :label-value="labelValue"
      :is-error="hasError"
      :error-message="errorMessages.join(', ')"
      :align-right="alignRight"
      hide-arrow
      role="group"
      :aria-label="ariaLabel"
      :aria-describedby="describedByIds"
      @update:model-value="setExpanded"
    >
      <!-- Input field (text input mode or trigger button) -->
      <div class="b-date-picker__input-container flex items-center gap-xs">
        <!-- Text input mode -->
        <input
          v-if="allowTextInput"
          ref="inputRef"
          v-model="inputValue"
          type="text"
          :id="inputId"
          class="b-date-picker__input flex-1 bg-transparent border-none outline-none"
          :class="{
            'text-danger-foreground-high': hasError,
            'text-neutral-foreground-low': disabled,
          }"
          :placeholder="inputConfig?.placeholder"
          :aria-label="inputAriaLabel"
          :aria-describedby="describedByIds"
          :aria-required="required ? 'true' : undefined"
          :aria-invalid="hasError ? 'true' : undefined"
          :disabled="disabled"
          :readonly="!allowTextInput"
          :tabindex="props.tabindex"
          @input="handleInputChange"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @keydown="handleInputKeyDown"
        />
        
        <!-- Display only mode -->
        <div
          v-else
          ref="inputRef"
          :id="inputId"
          class="b-date-picker__display flex-1 whitespace-nowrap"
          :class="{ 'font-bold': isExpanded }"
          role="button"
          :tabindex="disabled ? -1 : props.tabindex"
          :aria-label="ariaLabel"
          :aria-describedby="describedByIds"
          :aria-expanded="isExpanded"
          :aria-haspopup="'dialog'"
          :aria-controls="calendarId"
          :aria-disabled="disabled ? 'true' : undefined"
          :aria-required="required ? 'true' : undefined"
          :aria-invalid="hasError ? 'true' : undefined"
          @click="!disabled && setExpanded(!isExpanded)"
          @keydown="handleInputKeyDown"
        >
          <span v-if="model">
            {{ formattedDate }}
          </span>
          <span v-else class="text-neutral-foreground-medium">
            <slot>{{ inputConfig?.placeholder || 'Select date' }}</slot>
          </span>
        </div>
        
        <!-- Calendar icon -->
        <div
          class="b-date-picker__icon flex items-center text-lg h-xl text-neutral-interaction-default"
          :class="{
            'text-primary-interaction-default': isExpanded,
            'text-danger-interaction-default': hasError,
            'text-neutral-interaction-disabled': disabled,
          }"
          aria-hidden="true"
        >
          <BIcon name="calendar_month" size="lg" />
        </div>
        
        <!-- Loading indicator -->
        <div 
          v-if="loading" 
          class="b-date-picker__loading"
          role="status"
          :aria-label="loadingMessage || 'Loading date picker'"
        >
          <BSpinner size="sm" />
        </div>
      </div>
      
      <!-- Hidden descriptions for screen readers -->
      <div :id="descriptionId" class="sr-only">
        {{ ariaDescription }}
      </div>
      
      <div :id="instructionsId" class="sr-only">
        <span v-if="!isExpanded">{{ ariaDescription }}</span>
        <span v-else>{{ calendarInstructions }}</span>
      </div>
      
      <!-- Calendar content -->
      <template #content>
        <div 
          :id="calendarId" 
          ref="calendarRef"
          class="b-date-picker__calendar"
          role="dialog" 
          aria-modal="true" 
          :aria-label="calendarAriaLabel"
          :aria-labelledby="inputId"
          :aria-describedby="instructionsId"
          tabindex="-1"
          @focus="handleCalendarFocus"
          @blur="handleCalendarBlur"
          @keydown="handleCalendarKeyDown"
        >
          <BDate
            v-model="model"
            :lang="lang"
            :max-init="maxInit"
            :max-end="maxEnd"
            :aria-label="calendarAriaLabel"
            :aria-describedby="instructionsId"
            @update:model-value="(value: Date | Date[] | null) => setModel(value as Date | undefined, 'calendar')"
          />
        </div>
        
        <!-- Action buttons -->
        <div
          class="b-date-picker__actions flex items-center justify-between gap-xs p-xs w-full border-t-xxs border-neutral-border-default"
          role="group"
          :aria-label="calendarConfig?.navigationLabels?.monthSelect || 'Date picker actions'"
        >
          <!-- Today button -->
          <BButton 
            v-if="displayConfig?.showTodayButton"
            size="small" 
            variant="plain"
            :aria-label="calendarConfig?.todayButtonLabel || 'Select today'"
            @click="selectToday"
          >
            Today
          </BButton>
          
          <div class="flex items-center gap-xs ml-auto">
            <slot name="actions">
              <!-- Clear button -->
              <BButton 
                v-if="displayConfig?.showClearButton !== false"
                size="small" 
                variant="plain" 
                :aria-label="calendarConfig?.clearButtonLabel || 'Clear selected date'"
                :disabled="!model"
                @click="handleClear"
              >
                <slot name="clear-text"> Clear </slot>
              </BButton>
              
              <!-- Apply button -->
              <BButton 
                size="small" 
                :aria-label="calendarConfig?.applyButtonLabel || 'Apply selected date and close calendar'"
                @click="handleApply"
              >
                <slot name="apply-text"> Apply </slot>
              </BButton>
            </slot>
          </div>
        </div>
      </template>
    </BExpandableContainer>
    
    <!-- Error messages -->
    <div 
      v-if="hasError && errorMessages.length > 0"
      :id="errorId"
      class="b-date-picker__errors mt-xs"
      role="alert"
      aria-live="assertive"
    >
      <div 
        v-for="(error, index) in errorMessages" 
        :key="index"
        class="text-sm text-danger-foreground-high"
      >
        {{ error }}
      </div>
    </div>
    
    <!-- Live region for announcements -->
    <div 
      :id="liveRegionId"
      class="sr-only"
      :aria-live="accessibilityConfig?.liveRegionPoliteness || 'polite'"
      aria-atomic="true"
      aria-relevant="text"
    >
      <!-- Content updated dynamically by screen reader announcements -->
    </div>
  </div>
</template>

<style scoped>
@import "../../assets/main.css";

.b-date-picker {
  @apply relative;
}

.b-date-picker__input-container {
  @apply relative w-full;
}

.b-date-picker__input {
  @apply text-base text-neutral-foreground-high;
  @apply px-base py-sm;
  @apply border border-neutral-border-default;
  @apply rounded-base;
  @apply transition-colors duration-200;
  
  &:focus {
    @apply outline-none;
    @apply border-primary-border-default;
    @apply ring-2 ring-primary-interaction-default ring-offset-1;
  }
  
  &:disabled {
    @apply bg-neutral-surface-disabled;
    @apply text-neutral-foreground-disabled;
    @apply cursor-not-allowed;
  }
  
  &[aria-invalid="true"] {
    @apply border-danger-border-default;
    
    &:focus {
      @apply ring-danger-interaction-default;
    }
  }
}

.b-date-picker__display {
  @apply text-base text-neutral-foreground-high;
  @apply px-base py-sm;
  @apply cursor-pointer;
  @apply transition-colors duration-200;
  @apply rounded-base;
  
  &:focus {
    @apply outline-none;
    @apply bg-neutral-surface-hover;
    @apply ring-2 ring-primary-interaction-default ring-offset-1;
  }
  
  &:hover:not([aria-disabled="true"]) {
    @apply bg-neutral-surface-hover;
  }
  
  &[aria-disabled="true"] {
    @apply text-neutral-foreground-disabled;
    @apply cursor-not-allowed;
  }
  
  &[aria-invalid="true"] {
    @apply text-danger-foreground-high;
  }
}

.b-date-picker__icon {
  @apply transition-colors duration-200;
  @apply pointer-events-none;
}

.b-date-picker__loading {
  @apply flex items-center;
}

.b-date-picker__calendar {
  @apply focus:outline-none;
  @apply focus:ring-2 focus:ring-primary-interaction-default focus:ring-offset-2;
}

.b-date-picker__actions {
  @apply bg-neutral-surface-subtle;
}

.b-date-picker__errors {
  @apply space-y-xxs;
}

/* Screen reader only utility class */
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

/* High contrast mode */
.b-date-picker--high-contrast {
  @apply contrast-125;
  
  .b-date-picker__input,
  .b-date-picker__display {
    @apply border-2 border-current;
  }
  
  .b-date-picker__icon {
    @apply contrast-150;
  }
}

/* Large touch targets for mobile accessibility */
.b-date-picker--large-targets {
  .b-date-picker__input,
  .b-date-picker__display {
    min-height: 44px;
  }
  
  button,
  [role="button"],
  [tabindex="0"]:not(input) {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Reduced motion support */
.b-date-picker--reduced-motion,
.b-date-picker--reduced-motion * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}

/* Error state styling */
.b-date-picker--error {
  .b-date-picker__input,
  .b-date-picker__display {
    @apply border-danger-border-default;
  }
  
  .b-date-picker__icon {
    @apply text-danger-interaction-default;
  }
}

/* Disabled state styling */
.b-date-picker--disabled {
  @apply opacity-60;
  @apply pointer-events-none;
}

/* Loading state styling */
.b-date-picker--loading {
  @apply pointer-events-none;
}

/* Focus management */
.b-date-picker:focus-within {
  @apply relative z-10;
}

/* Ensure focus visibility in high contrast mode */
.b-date-picker--high-contrast *:focus {
  outline: 2px solid;
  outline-offset: 2px;
}

/* Button focus styles */
button:focus,
[role="button"]:focus {
  @apply outline-none;
  @apply ring-2 ring-primary-interaction-default ring-offset-1;
}

/* Responsive considerations for accessibility */
@media (prefers-reduced-motion: reduce) {
  .b-date-picker,
  .b-date-picker * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: high) {
  .b-date-picker {
    @apply contrast-125;
  }
  
  .b-date-picker__input,
  .b-date-picker__display {
    @apply border-2 border-current;
  }
}

/* Print styles for accessibility */
@media print {
  .b-date-picker__icon,
  .b-date-picker__loading,
  .b-date-picker__actions {
    @apply hidden;
  }
  
  .b-date-picker__input,
  .b-date-picker__display {
    @apply border-current;
  }
}

/* Voice control support - larger click targets */
@media (pointer: coarse) {
  .b-date-picker__input,
  .b-date-picker__display {
    min-height: 44px;
  }
  
  button {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Keyboard navigation visual feedback */
.b-date-picker[data-keyboard-mode="true"] {
  *:focus {
    @apply ring-2 ring-primary-interaction-default ring-offset-2;
  }
}
</style>

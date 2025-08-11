<template>
  <div
    :id="componentId"
    :class="containerClasses"
    :style="containerStyle"
    role="group"
    :aria-label="computedAriaLabel"
    :aria-describedby="ariaDescribedBy"
    :aria-invalid="isInvalid"
    :aria-required="required"
  >
    <!-- Label -->
    <label
      v-if="labelValue"
      :for="sliderElementId"
      :class="labelClasses"
      :id="labelElementId"
    >
      {{ labelValue }}
      <span v-if="required" aria-label="required">*</span>
    </label>

    <!-- Help Text -->
    <div
      v-if="helpText"
      :id="helpTextId"
      :class="helpTextClasses"
    >
      {{ helpText }}
    </div>

    <!-- Slider Input Container -->
    <div 
      :class="sliderInputContainerClasses"
      :style="sliderInputContainerStyle"
    >
      <!-- Input Field (Left/Top Position) -->
      <div 
        v-if="showInput && (inputPosition === 'left' || inputPosition === 'top')"
        :class="inputWrapperClasses"
        :style="inputWrapperStyle"
      >
        <input
          :id="inputElementId"
          ref="inputRef"
          v-model="internalInputValue"
          :type="inputConfig.type"
          :placeholder="effectivePlaceholder"
          :min="min"
          :max="max"
          :step="step"
          :disabled="disabled"
          :readonly="readonly || inputConfig.readonly"
          :pattern="inputConfig.pattern"
          :class="inputClasses"
          :style="inputStyle"
          :aria-label="inputAriaLabel"
          :aria-describedby="inputAriaDescribedBy"
          :aria-invalid="isInvalid"
          :aria-required="required"
          :tabindex="inputTabIndex"
          @focus="onInputFocus"
          @blur="onInputBlur"
          @input="onInputChange"
          @keydown="onInputKeydown"
          @keyup="onInputKeyup"
          @change="onInputValidate"
        />
      </div>

      <!-- Slider Container -->
      <div
        :class="sliderContainerClasses"
        :style="sliderContainerStyle"
      >
        <!-- Slider Track -->
        <div
          ref="sliderTrackRef"
          :class="sliderTrackClasses"
          :style="sliderTrackStyle"
          @mousedown="onSliderMouseDown"
          @touchstart="onSliderTouchStart"
        >
          <!-- Slider Fill -->
          <div
            :class="sliderFillClasses"
            :style="sliderFillStyle"
          ></div>

          <!-- Tick Marks -->
          <div
            v-if="tickConfig.showTicks && tickPositions.length > 0"
            :class="tickContainerClasses"
          >
            <div
              v-for="(position, index) in tickPositions"
              :key="index"
              :class="tickMarkClasses"
              :style="getTickStyle(position)"
              @click="tickConfig.clickable ? onTickClick(position) : undefined"
            >
              <span
                v-if="tickConfig.showLabels && getTickLabel(position)"
                :class="tickLabelClasses"
              >
                {{ getTickLabel(position) }}
              </span>
            </div>
          </div>

          <!-- Slider Thumb -->
          <div
            ref="sliderThumbRef"
            :class="sliderThumbClasses"
            :style="sliderThumbStyle"
            role="slider"
            :aria-label="sliderAriaLabel"
            :aria-describedby="sliderAriaDescribedBy"
            :aria-valuenow="internalSliderValue"
            :aria-valuemin="min"
            :aria-valuemax="max"
            :aria-valuetext="sliderAriaValueText"
            :aria-orientation="orientation"
            :aria-invalid="isInvalid"
            :aria-required="required"
            :tabindex="sliderTabIndex"
            @focus="onSliderFocus"
            @blur="onSliderBlur"
            @keydown="onSliderKeydown"
            @keyup="onSliderKeyup"
          >
            <!-- Tooltip -->
            <div
              v-if="shouldShowTooltip"
              :class="tooltipClasses"
              :style="tooltipStyle"
            >
              {{ tooltipText }}
            </div>
          </div>
        </div>

        <!-- Value Labels -->
        <div
          v-if="showValueLabels"
          :class="valueLabelsClasses"
        >
          <span :class="minLabelClasses">{{ formatDisplayValue(min) }}</span>
          <span :class="maxLabelClasses">{{ formatDisplayValue(max) }}</span>
        </div>
      </div>

      <!-- Input Field (Right/Bottom Position) -->
      <div 
        v-if="showInput && (inputPosition === 'right' || inputPosition === 'bottom')"
        :class="inputWrapperClasses"
        :style="inputWrapperStyle"
      >
        <input
          :id="inputElementId + '_right'"
          ref="inputRef"
          v-model="internalInputValue"
          :type="inputConfig.type"
          :placeholder="effectivePlaceholder"
          :min="min"
          :max="max"
          :step="step"
          :disabled="disabled"
          :readonly="readonly || inputConfig.readonly"
          :pattern="inputConfig.pattern"
          :class="inputClasses"
          :style="inputStyle"
          :aria-label="inputAriaLabel"
          :aria-describedby="inputAriaDescribedBy"
          :aria-invalid="isInvalid"
          :aria-required="required"
          :tabindex="inputTabIndex"
          @focus="onInputFocus"
          @blur="onInputBlur"
          @input="onInputChange"
          @keydown="onInputKeydown"
          @keyup="onInputKeyup"
          @change="onInputValidate"
        />
        
        <!-- Unit Display -->
        <span
          v-if="unit"
          :class="unitClasses"
        >
          {{ unit }}
        </span>
      </div>
    </div>

    <!-- Error Message -->
    <div
      v-if="isError && errorMessage"
      :id="errorElementId"
      :class="errorMessageClasses"
      role="alert"
      :aria-live="liveRegionPoliteness"
    >
      {{ errorMessage }}
    </div>

    <!-- Info Message -->
    <div
      v-if="infoMessage"
      :id="infoElementId"
      :class="infoMessageClasses"
    >
      {{ infoMessage }}
    </div>

    <!-- Loading Indicator -->
    <div
      v-if="loading"
      :class="loadingClasses"
      :aria-label="loadingAriaLabel"
    >
      <!-- Loading spinner or indicator -->
      <div :class="loadingSpinnerClasses"></div>
    </div>

    <!-- Screen Reader Live Region -->
    <div
      :id="liveRegionId"
      class="sr-only"
      :aria-live="liveRegionPoliteness"
      :aria-atomic="true"
    >
      {{ liveRegionText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ref, 
  computed, 
  watch, 
  nextTick, 
  onMounted, 
  onBeforeUnmount,
  reactive,
  toRef
} from 'vue';
import { useScreenReader, useAriaAttributes, useClickOutside } from '#composables';
import type {
  BSliderInputProps,
  BSliderInputEmits,
  BSliderInputState,
  BSliderInputValue,
  BSliderInputValidationState,
  BSliderInputInteractionMode,
  BSliderInputKeyboardConfig,
  BSliderInputValidationConfig,
  BSliderInputFieldConfig,
  BSliderInputTickConfig,
  BSliderInputTooltipConfig,
  BSliderInputSyncConfig,
  DEFAULT_SLIDER_INPUT_KEYBOARD_CONFIG,
  DEFAULT_SLIDER_INPUT_ACCESSIBILITY_CONFIG,
  DEFAULT_SLIDER_INPUT_VALIDATION_CONFIG,
  DEFAULT_SLIDER_INPUT_FIELD_CONFIG,
  DEFAULT_SLIDER_INPUT_TICK_CONFIG,
  DEFAULT_SLIDER_INPUT_TOOLTIP_CONFIG,
  DEFAULT_SLIDER_INPUT_SYNC_CONFIG,
  SLIDER_INPUT_SIZE_CONFIG
} from './BSliderInput.types';

/**
 * Component props with defaults
 */
const props = withDefaults(defineProps<BSliderInputProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  size: 'md',
  orientation: 'horizontal',
  disabled: false,
  required: false,
  loading: false,
  readonly: false,
  showInput: true,
  inputPosition: 'right',
  showValueLabels: false,
  showPercentage: false,
  formatDisplay: false,
  animate: true,
  animationDuration: 200,
  autoFocus: false,
  validationState: 'none',
  liveRegionPoliteness: 'polite',
  announceValidation: true,
  announceValueChanges: true,
  keyboardNavigation: true,
  showFocusIndicator: true,
  minTouchTarget: true,
  enhancedFocus: true,
  fieldName: 'Slider Input'
});

/**
 * Component emits
 */
const emit = defineEmits<BSliderInputEmits>();

/**
 * Template refs
 */
const inputRef = ref<HTMLInputElement>();
const sliderTrackRef = ref<HTMLDivElement>();
const sliderThumbRef = ref<HTMLDivElement>();

/**
 * Component state
 */
const state = reactive<BSliderInputState>({
  sliderValue: props.modelValue || 0,
  inputValue: String(props.modelValue || 0),
  previousValue: props.modelValue || 0,
  hasFocus: false,
  focusedElement: null,
  hasError: false,
  isValidating: false,
  validationState: props.validationState,
  isDisabled: props.disabled,
  isRequired: props.required,
  keyboardMode: false,
  isRangeMode: false,
  hasContent: Boolean(props.modelValue),
  isLoading: props.loading,
  interactionMode: 'slider',
  atMinimum: (props.modelValue || 0) <= props.min,
  atMaximum: (props.modelValue || 0) >= props.max,
  isHighContrast: false,
  isReducedMotion: false,
  lastAnnouncedValue: null
});

/**
 * Internal reactive values
 */
const internalSliderValue = ref<number>(props.modelValue || 0);
const internalInputValue = ref<string>(String(props.modelValue || 0));
const isDragging = ref<boolean>(false);
const dragStartPosition = ref<{ x: number; y: number } | null>(null);
const currentTooltipVisible = ref<boolean>(false);
const liveRegionText = ref<string>('');
const validationErrors = ref<string[]>([]);

/**
 * Configuration objects with defaults
 */
const keyboardConfig = computed<BSliderInputKeyboardConfig>(() => ({
  ...DEFAULT_SLIDER_INPUT_KEYBOARD_CONFIG,
  ...props.keyboardConfig
}));

const validationConfig = computed<BSliderInputValidationConfig>(() => ({
  ...DEFAULT_SLIDER_INPUT_VALIDATION_CONFIG,
  ...props.validationConfig
}));

const inputConfig = computed<BSliderInputFieldConfig>(() => ({
  ...DEFAULT_SLIDER_INPUT_FIELD_CONFIG,
  ...props.inputConfig
}));

const tickConfig = computed<BSliderInputTickConfig>(() => ({
  ...DEFAULT_SLIDER_INPUT_TICK_CONFIG,
  ...props.tickConfig
}));

const tooltipConfig = computed<BSliderInputTooltipConfig>(() => ({
  ...DEFAULT_SLIDER_INPUT_TOOLTIP_CONFIG,
  ...props.tooltipConfig
}));

const syncConfig = computed<BSliderInputSyncConfig>(() => ({
  ...DEFAULT_SLIDER_INPUT_SYNC_CONFIG,
  ...props.syncConfig
}));

/**
 * Computed IDs
 */
const componentId = computed(() => props.id || `slider-input-${Math.random().toString(36).substr(2, 9)}`);
const sliderElementId = computed(() => `${componentId.value}-slider`);
const inputElementId = computed(() => `${componentId.value}-input`);
const labelElementId = computed(() => `${componentId.value}-label`);
const helpTextId = computed(() => `${componentId.value}-help`);
const errorElementId = computed(() => `${componentId.value}-error`);
const infoElementId = computed(() => `${componentId.value}-info`);
const liveRegionId = computed(() => `${componentId.value}-live`);

/**
 * Computed accessibility attributes
 */
const computedAriaLabel = computed(() => 
  props.ariaLabel || props.labelValue || `${props.fieldName} slider input`
);

const ariaDescribedBy = computed(() => {
  const descriptions = [];
  if (props.helpText) descriptions.push(helpTextId.value);
  if (props.isError && props.errorMessage) descriptions.push(errorElementId.value);
  if (props.infoMessage) descriptions.push(infoElementId.value);
  if (props.ariaDescribedBy) descriptions.push(props.ariaDescribedBy);
  return descriptions.length > 0 ? descriptions.join(' ') : undefined;
});

const sliderAriaLabel = computed(() => 
  `${props.fieldName} slider, ${internalSliderValue.value} of ${props.max}`
);

const inputAriaLabel = computed(() => 
  `${props.fieldName} input field`
);

const sliderAriaDescribedBy = computed(() => ariaDescribedBy.value);
const inputAriaDescribedBy = computed(() => ariaDescribedBy.value);

const sliderAriaValueText = computed(() => {
  if (props.ariaValueText) {
    return props.ariaValueText(internalSliderValue.value);
  }
  return `${internalSliderValue.value}${props.unit || ''}`;
});

/**
 * Computed validation and state
 */
const isInvalid = computed(() => 
  props.isError || state.validationState === 'invalid' || validationErrors.value.length > 0
);

const effectivePlaceholder = computed(() => 
  props.placeholder || inputConfig.value.placeholder
);

const sliderTabIndex = computed(() => 
  props.disabled ? -1 : (state.focusedElement === 'slider' ? 0 : -1)
);

const inputTabIndex = computed(() => 
  props.disabled ? -1 : (state.focusedElement === 'input' ? 0 : -1)
);

/**
 * Computed styles and positions
 */
const sliderPercentage = computed(() => {
  const range = props.max - props.min;
  if (range === 0) return 0;
  return ((internalSliderValue.value - props.min) / range) * 100;
});

const sliderThumbStyle = computed(() => {
  const baseStyle = {
    ...props.thumbStyle,
    position: 'absolute' as const,
    transform: props.orientation === 'horizontal' 
      ? `translateX(${sliderPercentage.value}%)` 
      : `translateY(${100 - sliderPercentage.value}%)`
  };
  
  if (props.orientation === 'horizontal') {
    baseStyle.left = '0';
    baseStyle.top = '50%';
    baseStyle.transform += ' translateY(-50%)';
  } else {
    baseStyle.bottom = '0';
    baseStyle.left = '50%';
    baseStyle.transform += ' translateX(-50%)';
  }
  
  return baseStyle;
});

const sliderFillStyle = computed(() => ({
  ...props.trackStyle,
  width: props.orientation === 'horizontal' ? `${sliderPercentage.value}%` : '100%',
  height: props.orientation === 'vertical' ? `${sliderPercentage.value}%` : '100%',
  backgroundColor: props.color || '#3b82f6'
}));

const tickPositions = computed(() => {
  if (!tickConfig.value.positions?.length) return [];
  return tickConfig.value.positions.filter(pos => pos >= props.min && pos <= props.max);
});

/**
 * Computed CSS classes
 */
const sizeConfig = computed(() => SLIDER_INPUT_SIZE_CONFIG[props.size]);

const containerClasses = computed(() => [
  'b-slider-input',
  `b-slider-input--${props.size}`,
  `b-slider-input--${props.orientation}`,
  {
    'b-slider-input--disabled': props.disabled,
    'b-slider-input--error': isInvalid.value,
    'b-slider-input--loading': props.loading,
    'b-slider-input--focused': state.hasFocus,
    'b-slider-input--high-contrast': props.highContrast,
    'b-slider-input--reduced-motion': props.reduceMotion
  },
  props.class
]);

const containerStyle = computed(() => ({
  ...props.style
}));

const labelClasses = computed(() => [
  'b-slider-input__label',
  {
    'b-slider-input__label--required': props.required
  }
]);

const helpTextClasses = computed(() => [
  'b-slider-input__help-text'
]);

const sliderInputContainerClasses = computed(() => [
  'b-slider-input__container',
  `b-slider-input__container--${inputConfig.value.position}`
]);

const sliderInputContainerStyle = computed(() => ({
  display: 'flex',
  flexDirection: props.inputPosition === 'top' || props.inputPosition === 'bottom' ? 'column' : 'row',
  alignItems: 'center',
  gap: '0.5rem'
}));

const inputWrapperClasses = computed(() => [
  'b-slider-input__input-wrapper',
  `b-slider-input__input-wrapper--${inputConfig.value.position}`
]);

const inputWrapperStyle = computed(() => ({
  width: inputConfig.value.width
}));

const inputClasses = computed(() => [
  'b-slider-input__input',
  {
    'b-slider-input__input--error': isInvalid.value,
    'b-slider-input__input--disabled': props.disabled,
    'b-slider-input__input--readonly': props.readonly || inputConfig.value.readonly,
    'b-slider-input__input--focused': state.focusedElement === 'input'
  }
]);

const sliderContainerClasses = computed(() => [
  'b-slider-input__slider-container'
]);

const sliderContainerStyle = computed(() => ({
  flex: 1,
  minWidth: 0
}));

const sliderTrackClasses = computed(() => [
  'b-slider-input__track',
  {
    'b-slider-input__track--disabled': props.disabled,
    'b-slider-input__track--dragging': isDragging.value
  }
]);

const sliderTrackStyle = computed(() => ({
  ...props.trackStyle,
  height: props.orientation === 'horizontal' ? sizeConfig.value.sliderHeight : '200px',
  width: props.orientation === 'vertical' ? sizeConfig.value.sliderHeight : '100%'
}));

const sliderFillClasses = computed(() => [
  'b-slider-input__fill'
]);

const sliderThumbClasses = computed(() => [
  'b-slider-input__thumb',
  {
    'b-slider-input__thumb--focused': state.focusedElement === 'slider',
    'b-slider-input__thumb--dragging': isDragging.value,
    'b-slider-input__thumb--disabled': props.disabled
  }
]);

const tickContainerClasses = computed(() => [
  'b-slider-input__ticks'
]);

const tickMarkClasses = computed(() => [
  'b-slider-input__tick',
  `b-slider-input__tick--${tickConfig.value.size}`,
  {
    'b-slider-input__tick--clickable': tickConfig.value.clickable
  }
]);

const tickLabelClasses = computed(() => [
  'b-slider-input__tick-label'
]);

const valueLabelsClasses = computed(() => [
  'b-slider-input__value-labels'
]);

const minLabelClasses = computed(() => [
  'b-slider-input__value-label',
  'b-slider-input__value-label--min'
]);

const maxLabelClasses = computed(() => [
  'b-slider-input__value-label',
  'b-slider-input__value-label--max'
]);

const unitClasses = computed(() => [
  'b-slider-input__unit'
]);

const errorMessageClasses = computed(() => [
  'b-slider-input__error-message'
]);

const infoMessageClasses = computed(() => [
  'b-slider-input__info-message'
]);

const loadingClasses = computed(() => [
  'b-slider-input__loading'
]);

const loadingSpinnerClasses = computed(() => [
  'b-slider-input__loading-spinner'
]);

const tooltipClasses = computed(() => [
  'b-slider-input__tooltip',
  `b-slider-input__tooltip--${tooltipConfig.value.position}`
]);

const tooltipStyle = computed(() => ({
  position: 'absolute' as const,
  top: tooltipConfig.value.position === 'top' ? '-100%' : 
       tooltipConfig.value.position === 'bottom' ? '100%' : '50%',
  left: tooltipConfig.value.position === 'left' ? '-100%' : 
        tooltipConfig.value.position === 'right' ? '100%' : '50%',
  transform: tooltipConfig.value.position === 'top' || tooltipConfig.value.position === 'bottom' 
    ? 'translateX(-50%)' : 'translateY(-50%)'
}));

/**
 * Computed tooltip visibility and text
 */
const shouldShowTooltip = computed(() => {
  if (!tooltipConfig.value.enabled) return false;
  
  if (tooltipConfig.value.showOnFocus && state.focusedElement === 'slider') return true;
  if (tooltipConfig.value.showOnDrag && isDragging.value) return true;
  if (tooltipConfig.value.showOnHover && currentTooltipVisible.value) return true;
  
  return false;
});

const tooltipText = computed(() => {
  if (tooltipConfig.value.formatter) {
    return tooltipConfig.value.formatter(internalSliderValue.value, props.unit);
  }
  return `${internalSliderValue.value}${props.unit || ''}`;
});

const loadingAriaLabel = computed(() => 
  `${props.fieldName} is loading`
);

/**
 * Utility functions
 */
function formatDisplayValue(value: number): string {
  if (props.displayFormatter) {
    return props.displayFormatter(value);
  }
  
  if (inputConfig.value.formatNumbers) {
    return inputConfig.value.numberFormatter(value);
  }
  
  let formatted = value.toString();
  if (inputConfig.value.decimalPlaces > 0) {
    formatted = value.toFixed(inputConfig.value.decimalPlaces);
  }
  
  return formatted + (props.unit || '');
}

function parseInputValue(value: string): number {
  if (inputConfig.value.numberParser) {
    return inputConfig.value.numberParser(value);
  }
  
  const parsed = parseFloat(value);
  return isNaN(parsed) ? props.min : parsed;
}

function clampValue(value: number): number {
  return Math.max(props.min, Math.min(props.max, value));
}

function snapToStep(value: number): number {
  if (props.step <= 0) return value;
  return Math.round(value / props.step) * props.step;
}

function getTickStyle(position: number): Record<string, string> {
  const percentage = ((position - props.min) / (props.max - props.min)) * 100;
  
  if (props.orientation === 'horizontal') {
    return {
      position: 'absolute',
      left: `${percentage}%`,
      transform: 'translateX(-50%)'
    };
  } else {
    return {
      position: 'absolute',
      bottom: `${percentage}%`,
      transform: 'translateY(50%)'
    };
  }
}

function getTickLabel(position: number): string {
  return tickConfig.value.labels[position] || position.toString();
}

/**
 * Screen reader and accessibility functions
 */
const { announceToScreenReader } = useScreenReader();

function announceValueChange(newValue: number, oldValue: number, source: 'slider' | 'input'): void {
  if (!props.announceValueChanges) return;
  
  const formattedValue = formatDisplayValue(newValue);
  const message = `Value changed to ${formattedValue}`;
  announceToScreenReader(message, props.liveRegionPoliteness);
  liveRegionText.value = message;
  
  emit('accessibility', 'value-change', { newValue, oldValue, source, message });
}

function announceValidation(isValid: boolean, message?: string): void {
  if (!props.announceValidation) return;
  
  const announcement = isValid 
    ? 'Input is valid'
    : message || 'Input has errors';
    
  announceToScreenReader(announcement, 'assertive');
  liveRegionText.value = announcement;
  
  emit('accessibility', 'validation-change', { isValid, message: announcement });
}

function announceFocusSwitch(from: 'slider' | 'input', to: 'slider' | 'input'): void {
  const message = `Focus moved to ${to}`;
  announceToScreenReader(message, 'polite');
  liveRegionText.value = message;
  
  emit('focus-switch', from, to);
  emit('accessibility', 'focus-switch', { from, to, message });
}

/**
 * Event handlers - Focus Management
 */
function onSliderFocus(event: FocusEvent): void {
  const previousElement = state.focusedElement;
  state.focusedElement = 'slider';
  state.hasFocus = true;
  state.keyboardMode = true;
  
  if (previousElement && previousElement !== 'slider') {
    announceFocusSwitch(previousElement, 'slider');
  }
  
  emit('focus', event, 'slider');
}

function onSliderBlur(event: FocusEvent): void {
  // Only blur if focus is not moving to the input
  if (event.relatedTarget !== inputRef.value) {
    state.focusedElement = null;
    state.hasFocus = false;
    state.keyboardMode = false;
  }
  
  emit('blur', event, 'slider');
}

function onInputFocus(event: FocusEvent): void {
  const previousElement = state.focusedElement;
  state.focusedElement = 'input';
  state.hasFocus = true;
  
  if (previousElement && previousElement !== 'input') {
    announceFocusSwitch(previousElement, 'input');
  }
  
  emit('focus', event, 'input');
}

function onInputBlur(event: FocusEvent): void {
  // Only blur if focus is not moving to the slider
  if (event.relatedTarget !== sliderThumbRef.value) {
    state.focusedElement = null;
    state.hasFocus = false;
  }
  
  emit('blur', event, 'input');
}

/**
 * Event handlers - Value Changes
 */
function onSliderKeydown(event: KeyboardEvent): void {
  if (props.disabled) return;
  
  const { smallStepKeys, largeStepKeys, boundaryKeys, switchFocusKeys } = keyboardConfig.value;
  const key = event.key;
  
  let newValue = internalSliderValue.value;
  let handled = false;
  
  if (smallStepKeys.includes(key)) {
    const direction = ['ArrowRight', 'ArrowUp'].includes(key) ? 1 : -1;
    newValue = clampValue(internalSliderValue.value + (direction * keyboardConfig.value.smallStepSize));
    handled = true;
  } else if (largeStepKeys.includes(key)) {
    const direction = key === 'PageUp' ? 1 : -1;
    newValue = clampValue(internalSliderValue.value + (direction * keyboardConfig.value.largeStepSize));
    handled = true;
  } else if (boundaryKeys.includes(key)) {
    newValue = key === 'Home' ? props.min : props.max;
    handled = true;
  } else if (switchFocusKeys.includes(key) && props.showInput) {
    inputRef.value?.focus();
    handled = true;
  }
  
  if (handled) {
    if (keyboardConfig.value.preventDefault) {
      event.preventDefault();
    }
    if (keyboardConfig.value.stopPropagation) {
      event.stopPropagation();
    }
    
    if (newValue !== internalSliderValue.value) {
      updateSliderValue(newValue);
    }
  }
  
  emit('keydown', event, 'slider');
}

function onSliderKeyup(event: KeyboardEvent): void {
  emit('keyup', event, 'slider');
}

function onInputKeydown(event: KeyboardEvent): void {
  if (props.disabled) return;
  
  const { switchFocusKeys } = keyboardConfig.value;
  const key = event.key;
  
  if (key === 'Enter') {
    validateAndSyncFromInput();
    emit('enter', internalSliderValue.value);
  } else if (key === 'Escape') {
    // Reset input to slider value
    internalInputValue.value = internalSliderValue.value.toString();
    emit('escape');
  } else if (switchFocusKeys.includes(key) && event.shiftKey) {
    // Shift+Tab should move to slider
    sliderThumbRef.value?.focus();
    event.preventDefault();
  }
  
  emit('keydown', event, 'input');
}

function onInputKeyup(event: KeyboardEvent): void {
  emit('keyup', event, 'input');
}

function onInputChange(event: Event): void {
  if (props.disabled) return;
  
  const target = event.target as HTMLInputElement;
  const newValue = parseInputValue(target.value);
  
  // Update internal state
  internalInputValue.value = target.value;
  
  // Emit input event
  emit('input', newValue, 'input');
  
  // Sync if configured for immediate sync
  if (syncConfig.value.immediate) {
    syncFromInput();
  }
}

function onInputValidate(): void {
  validateAndSyncFromInput();
}

/**
 * Event handlers - Mouse/Touch
 */
function onSliderMouseDown(event: MouseEvent): void {
  if (props.disabled) return;
  
  startDragging(event);
}

function onSliderTouchStart(event: TouchEvent): void {
  if (props.disabled) return;
  
  startDragging(event);
}

function startDragging(event: MouseEvent | TouchEvent): void {
  isDragging.value = true;
  state.interactionMode = 'drag';
  
  const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
  const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY;
  
  dragStartPosition.value = { x: clientX, y: clientY };
  
  // Calculate initial value based on click position
  updateValueFromPosition(event);
  
  // Add global event listeners
  document.addEventListener('mousemove', onDocumentMouseMove);
  document.addEventListener('mouseup', onDocumentMouseUp);
  document.addEventListener('touchmove', onDocumentTouchMove);
  document.addEventListener('touchend', onDocumentTouchEnd);
  
  emit('drag-start', internalSliderValue.value, event);
  emit('interaction-start', internalSliderValue.value, 'drag');
}

function onDocumentMouseMove(event: MouseEvent): void {
  if (!isDragging.value) return;
  updateValueFromPosition(event);
}

function onDocumentMouseUp(event: MouseEvent): void {
  if (!isDragging.value) return;
  stopDragging(event);
}

function onDocumentTouchMove(event: TouchEvent): void {
  if (!isDragging.value) return;
  updateValueFromPosition(event);
}

function onDocumentTouchEnd(event: TouchEvent): void {
  if (!isDragging.value) return;
  stopDragging(event);
}

function stopDragging(event: MouseEvent | TouchEvent): void {
  if (!isDragging.value) return;
  
  isDragging.value = false;
  state.interactionMode = 'slider';
  dragStartPosition.value = null;
  
  // Remove global event listeners
  document.removeEventListener('mousemove', onDocumentMouseMove);
  document.removeEventListener('mouseup', onDocumentMouseUp);
  document.removeEventListener('touchmove', onDocumentTouchMove);
  document.removeEventListener('touchend', onDocumentTouchEnd);
  
  emit('drag-end', internalSliderValue.value, event);
  emit('interaction-end', internalSliderValue.value, 'slider');
}

function updateValueFromPosition(event: MouseEvent | TouchEvent): void {
  if (!sliderTrackRef.value) return;
  
  const rect = sliderTrackRef.value.getBoundingClientRect();
  const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
  const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY;
  
  let percentage: number;
  
  if (props.orientation === 'horizontal') {
    percentage = (clientX - rect.left) / rect.width;
  } else {
    percentage = 1 - ((clientY - rect.top) / rect.height);
  }
  
  percentage = Math.max(0, Math.min(1, percentage));
  const rawValue = props.min + (percentage * (props.max - props.min));
  const newValue = snapToStep(rawValue);
  
  updateSliderValue(newValue);
}

function onTickClick(position: number): void {
  if (props.disabled || !tickConfig.value.clickable) return;
  updateSliderValue(position);
}

/**
 * Value synchronization functions
 */
function updateSliderValue(newValue: number): void {
  const clampedValue = clampValue(newValue);
  const oldValue = internalSliderValue.value;
  
  if (clampedValue === oldValue) return;
  
  internalSliderValue.value = clampedValue;
  internalInputValue.value = clampedValue.toString();
  
  // Update boundary states
  state.atMinimum = clampedValue <= props.min;
  state.atMaximum = clampedValue >= props.max;
  
  // Announce boundary reached
  if (props.announceRangeBoundaries) {
    if (state.atMinimum && oldValue > props.min) {
      announceToScreenReader(`Minimum value ${props.min} reached`, 'polite');
      emit('boundary-reached', 'min', clampedValue);
    } else if (state.atMaximum && oldValue < props.max) {
      announceToScreenReader(`Maximum value ${props.max} reached`, 'polite');
      emit('boundary-reached', 'max', clampedValue);
    }
  }
  
  // Announce value change
  announceValueChange(clampedValue, oldValue, 'slider');
  
  // Emit events
  emit('update:modelValue', clampedValue);
  emit('input', clampedValue, 'slider');
  emit('sync', clampedValue, clampedValue.toString());
  
  // Validate if enabled
  if (validationConfig.value.enabled && validationConfig.value.mode === 'onChange') {
    validateValue(clampedValue);
  }
}

function syncFromInput(): void {
  const parsedValue = parseInputValue(internalInputValue.value);
  const clampedValue = clampValue(parsedValue);
  const snappedValue = snapToStep(clampedValue);
  
  if (snappedValue !== internalSliderValue.value) {
    const oldValue = internalSliderValue.value;
    internalSliderValue.value = snappedValue;
    
    // Update input to show snapped value
    internalInputValue.value = snappedValue.toString();
    
    announceValueChange(snappedValue, oldValue, 'input');
    
    emit('update:modelValue', snappedValue);
    emit('input', snappedValue, 'input');
    emit('sync', snappedValue, snappedValue.toString());
  }
}

function validateAndSyncFromInput(): void {
  if (validationConfig.value.enabled) {
    const parsedValue = parseInputValue(internalInputValue.value);
    const isValid = validateValue(parsedValue);
    
    if (isValid || validationConfig.value.mode !== 'onSubmit') {
      syncFromInput();
    }
  } else {
    syncFromInput();
  }
}

/**
 * Validation functions
 */
function validateValue(value: number): boolean {
  validationErrors.value = [];
  
  if (props.required && (value === undefined || value === null)) {
    validationErrors.value.push(validationConfig.value.messages?.required || 'This field is required');
  }
  
  if (value < props.min) {
    validationErrors.value.push(validationConfig.value.messages?.belowMin || `Value must be at least ${props.min}`);
  }
  
  if (value > props.max) {
    validationErrors.value.push(validationConfig.value.messages?.aboveMax || `Value must be at most ${props.max}`);
  }
  
  if (props.step > 0 && (value - props.min) % props.step !== 0) {
    validationErrors.value.push(validationConfig.value.messages?.invalidStep || `Value must be a multiple of ${props.step}`);
  }
  
  // Custom validation
  if (validationConfig.value.validator) {
    const customResult = validationConfig.value.validator(value);
    if (typeof customResult === 'string') {
      validationErrors.value.push(customResult);
    } else if (customResult === false) {
      validationErrors.value.push(validationConfig.value.messages?.invalid || 'Invalid value');
    }
  }
  
  const isValid = validationErrors.value.length === 0;
  state.validationState = isValid ? 'valid' : 'invalid';
  state.hasError = !isValid;
  
  if (validationConfig.value.announceChanges) {
    announceValidation(isValid, validationErrors.value.join(', '));
  }
  
  emit('validation-change', state.validationState, validationErrors.value.join(', '));
  
  return isValid;
}

/**
 * Watchers
 */
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== undefined && newValue !== internalSliderValue.value) {
      internalSliderValue.value = newValue;
      internalInputValue.value = newValue.toString();
      state.hasContent = true;
    }
  }
);

watch(
  () => props.disabled,
  (newDisabled) => {
    state.isDisabled = newDisabled;
    if (newDisabled && state.hasFocus) {
      state.hasFocus = false;
      state.focusedElement = null;
    }
  }
);

watch(
  () => props.loading,
  (newLoading) => {
    state.isLoading = newLoading;
    emit('loading-change', newLoading);
  }
);

/**
 * Lifecycle hooks
 */
onMounted(() => {
  // Auto focus if specified
  if (props.autoFocus && !props.disabled) {
    nextTick(() => {
      if (props.showInput && inputConfig.value.enabled) {
        inputRef.value?.focus();
      } else {
        sliderThumbRef.value?.focus();
      }
    });
  }
  
  // Initialize validation
  if (validationConfig.value.enabled && props.modelValue !== undefined) {
    validateValue(props.modelValue);
  }
  
  // Detect high contrast and reduced motion
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    state.isHighContrast = mediaQuery.matches;
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    state.isReducedMotion = motionQuery.matches;
  }
});

onBeforeUnmount(() => {
  // Clean up event listeners
  document.removeEventListener('mousemove', onDocumentMouseMove);
  document.removeEventListener('mouseup', onDocumentMouseUp);
  document.removeEventListener('touchmove', onDocumentTouchMove);
  document.removeEventListener('touchend', onDocumentTouchEnd);
});

/**
 * Expose public methods
 */
defineExpose({
  focus: () => {
    if (props.showInput && inputConfig.value.enabled) {
      inputRef.value?.focus();
    } else {
      sliderThumbRef.value?.focus();
    }
  },
  blur: () => {
    if (state.focusedElement === 'input') {
      inputRef.value?.blur();
    } else if (state.focusedElement === 'slider') {
      sliderThumbRef.value?.blur();
    }
  },
  validate: () => validateValue(internalSliderValue.value),
  setValue: (value: number) => updateSliderValue(value),
  getValue: () => internalSliderValue.value,
  getState: () => ({ ...state })
});
</script>

<style scoped>
.b-slider-input {
  @apply relative w-full;
}

.b-slider-input__label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.b-slider-input__label--required::after {
  @apply text-red-500 ml-1;
  content: '*';
}

.b-slider-input__help-text {
  @apply text-xs text-gray-500 mb-2;
}

.b-slider-input__container {
  @apply flex items-center gap-3;
}

.b-slider-input__container--top,
.b-slider-input__container--bottom {
  @apply flex-col;
}

.b-slider-input__input-wrapper {
  @apply relative flex items-center;
}

.b-slider-input__input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md text-sm;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
  @apply transition-colors duration-200;
}

.b-slider-input__input--error {
  @apply border-red-300 focus:ring-red-500;
}

.b-slider-input__input--disabled {
  @apply bg-gray-100 text-gray-400 cursor-not-allowed;
}

.b-slider-input__input--readonly {
  @apply bg-gray-50 cursor-default;
}

.b-slider-input__slider-container {
  @apply flex-1 relative;
}

.b-slider-input__track {
  @apply relative bg-gray-200 rounded-full cursor-pointer;
  @apply transition-colors duration-200;
}

.b-slider-input__track--disabled {
  @apply cursor-not-allowed bg-gray-100;
}

.b-slider-input__track--dragging {
  @apply cursor-grabbing;
}

.b-slider-input__fill {
  @apply h-full bg-blue-500 rounded-full transition-all duration-200;
}

.b-slider-input__thumb {
  @apply w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-grab;
  @apply shadow-sm transition-all duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.b-slider-input__thumb--focused {
  @apply ring-2 ring-blue-500 ring-offset-2;
}

.b-slider-input__thumb--dragging {
  @apply cursor-grabbing shadow-md scale-110;
}

.b-slider-input__thumb--disabled {
  @apply cursor-not-allowed bg-gray-100 border-gray-300;
}

.b-slider-input__ticks {
  @apply absolute inset-0;
}

.b-slider-input__tick {
  @apply absolute w-1 h-1 bg-gray-400 rounded-full;
}

.b-slider-input__tick--clickable {
  @apply cursor-pointer hover:bg-gray-600;
}

.b-slider-input__tick-label {
  @apply absolute text-xs text-gray-500 mt-2;
  @apply transform -translate-x-1/2;
}

.b-slider-input__value-labels {
  @apply flex justify-between mt-1 text-xs text-gray-500;
}

.b-slider-input__unit {
  @apply ml-2 text-sm text-gray-500;
}

.b-slider-input__tooltip {
  @apply px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap;
  @apply z-10 pointer-events-none;
}

.b-slider-input__error-message {
  @apply text-sm text-red-600 mt-1;
}

.b-slider-input__info-message {
  @apply text-sm text-gray-500 mt-1;
}

.b-slider-input__loading {
  @apply absolute inset-0 flex items-center justify-center bg-white bg-opacity-75;
}

.b-slider-input__loading-spinner {
  @apply w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin;
}

/* Size variants */
.b-slider-input--xs .b-slider-input__track {
  height: 0.375rem;
}

.b-slider-input--xs .b-slider-input__thumb {
  @apply w-4 h-4;
}

.b-slider-input--sm .b-slider-input__track {
  height: 0.5rem;
}

.b-slider-input--sm .b-slider-input__thumb {
  @apply w-5 h-5;
}

.b-slider-input--md .b-slider-input__track {
  height: 0.75rem;
}

.b-slider-input--md .b-slider-input__thumb {
  @apply w-6 h-6;
}

.b-slider-input--lg .b-slider-input__track {
  height: 1rem;
}

.b-slider-input--lg .b-slider-input__thumb {
  @apply w-8 h-8;
}

.b-slider-input--xl .b-slider-input__track {
  height: 1.25rem;
}

.b-slider-input--xl .b-slider-input__thumb {
  @apply w-10 h-10;
}

/* Vertical orientation */
.b-slider-input--vertical .b-slider-input__track {
  @apply w-2 h-48;
}

.b-slider-input--vertical .b-slider-input__fill {
  @apply w-full;
}

/* High contrast mode */
.b-slider-input--high-contrast .b-slider-input__track {
  @apply border border-gray-900;
}

.b-slider-input--high-contrast .b-slider-input__thumb {
  @apply border-4 border-gray-900;
}

/* Reduced motion */
.b-slider-input--reduced-motion * {
  @apply transition-none;
}

/* Screen reader only */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
  clip: rect(0, 0, 0, 0);
}

/* Focus indicators */
.b-slider-input--focused {
  @apply ring-2 ring-blue-500 ring-opacity-50 rounded-md;
}

/* Error state */
.b-slider-input--error .b-slider-input__track {
  @apply border border-red-300;
}

.b-slider-input--error .b-slider-input__thumb {
  @apply border-red-500;
}

.b-slider-input--error .b-slider-input__fill {
  @apply bg-red-500;
}

/* Disabled state */
.b-slider-input--disabled {
  @apply opacity-60 cursor-not-allowed;
}

.b-slider-input--disabled .b-slider-input__track,
.b-slider-input--disabled .b-slider-input__thumb,
.b-slider-input--disabled .b-slider-input__input {
  @apply cursor-not-allowed;
}

/* Loading state */
.b-slider-input--loading {
  @apply relative;
}
</style>
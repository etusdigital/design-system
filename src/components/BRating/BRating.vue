<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import type { 
  BRatingProps, 
  BRatingEmits, 
  BRatingState,
  BRatingValue,
  BRatingValidationState,
  BRatingInteractionMode,
  BRatingAriaAttributes
} from './BRating.types';
import {
  DEFAULT_RATING_KEYBOARD_CONFIG,
  DEFAULT_RATING_ACCESSIBILITY_CONFIG,
  DEFAULT_RATING_VALIDATION_CONFIG,
  DEFAULT_RATING_THEME_CONFIG,
  DEFAULT_RATING_ANNOUNCEMENTS,
  RATING_SIZE_CONFIG,
  RATING_PRECISION_CONFIG,
  RATING_ICON_CONFIG
} from './BRating.types';

const props = withDefaults(defineProps<BRatingProps>(), {
  modelValue: 0,
  max: 5,
  min: 0,
  precision: 'full',
  icon: 'star',
  customIcon: '',
  size: 'md',
  colorTheme: 'default',
  displayMode: 'interactive',
  disabled: false,
  readonly: false,
  required: false,
  loading: false,
  errorMessage: '',
  infoMessage: '',
  successMessage: '',
  showValue: false,
  showLabels: false,
  labels: () => [],
  clearable: true,
  validationState: 'none',
  class: '',
  style: '',
  showEmptyStars: true,
  spacing: '',
  dense: false,
  autoFocus: false,
  // Accessibility defaults
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  ariaDescription: '',
  announceChanges: true,
  customErrorAnnouncement: '',
  customSuccessAnnouncement: '',
  helpText: '',
  groupRole: undefined,
  ariaExpanded: undefined,
  ariaControls: '',
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Use arrow keys to select rating, Enter to confirm, Delete to clear',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  announceStarFocus: false,
  announceValidation: true,
  ratingFormat: '{value} out of {max} stars',
  emptyStarAnnouncement: 'empty star',
  filledStarAnnouncement: 'filled star',
  halfStarAnnouncement: 'half filled star',
});

const emit = defineEmits<BRatingEmits>();

// Component references
const ratingRef = ref<HTMLDivElement>();
const starRefs = ref<HTMLElement[]>([]);
const liveRegionRef = ref<HTMLDivElement>();

// Component state
const focusedIndex = ref(-1);
const hoveredIndex = ref(-1);
const keyboardMode = ref(false);
const lastAnnouncedMessage = ref<string | null>(null);
const validationMessage = ref('');
const isLoading = ref(false);

// Generate unique ID
const ratingId = computed(() => props.id || `b-rating-${Math.random().toString(36).substr(2, 9)}`);
const liveRegionId = computed(() => `${ratingId.value}-live`);
const helpTextId = computed(() => `${ratingId.value}-help`);
const errorId = computed(() => `${ratingId.value}-error`);

// Configuration computed properties
const keyboardConfig = computed(() => ({
  ...DEFAULT_RATING_KEYBOARD_CONFIG,
  ...props.keyboardConfig,
}));

const validationConfig = computed(() => ({
  ...DEFAULT_RATING_VALIDATION_CONFIG,
  ...props.validationConfig,
}));

const themeConfig = computed(() => ({
  ...DEFAULT_RATING_THEME_CONFIG,
  ...props.themeConfig,
}));

const announcements = computed(() => ({
  ...DEFAULT_RATING_ANNOUNCEMENTS,
}));

// Rating state
const ratingState = computed((): BRatingState => ({
  value: props.modelValue || 0,
  previousValue: 0,
  focusedIndex: focusedIndex.value,
  hoveredIndex: hoveredIndex.value,
  hasFocus: focusedIndex.value >= 0,
  isInteracting: hoveredIndex.value >= 0 || focusedIndex.value >= 0,
  interactionMode: getInteractionMode(),
  keyboardMode: keyboardMode.value,
  isDisabled: props.disabled,
  isReadonly: props.readonly || props.displayMode === 'readonly',
  isLoading: props.loading || isLoading.value,
  hasError: props.validationState === 'invalid',
  validationState: props.validationState,
  validationMessage: validationMessage.value,
  isRequired: props.required,
  isHighContrast: props.highContrast,
  isReducedMotion: props.reduceMotion,
  lastAnnouncedMessage: lastAnnouncedMessage.value,
  maxRating: props.max,
  precision: props.precision,
  showValue: props.showValue,
}));

// Star array for rendering
const stars = computed(() => {
  const starArray = [];
  for (let i = 0; i < props.max; i++) {
    starArray.push({
      index: i,
      value: i + 1,
      isFilled: getStarFillState(i),
      isHovered: i <= hoveredIndex.value,
      isFocused: i === focusedIndex.value,
    });
  }
  return starArray;
});

// Interaction mode detection
function getInteractionMode(): BRatingInteractionMode {
  if (props.disabled) return 'disabled';
  if (props.readonly || props.displayMode === 'readonly') return 'disabled';
  if (keyboardMode.value) return 'keyboard';
  if (hoveredIndex.value >= 0) return 'hover';
  return 'click';
}

// Star fill state calculation
function getStarFillState(index: number): 'empty' | 'half' | 'full' {
  const currentValue = hoveredIndex.value >= 0 ? hoveredIndex.value + 1 : (props.modelValue || 0);
  const starValue = index + 1;
  
  if (currentValue >= starValue) {
    return 'full';
  } else if (props.precision === 'half' && currentValue >= starValue - 0.5) {
    return 'half';
  } else if (props.precision === 'quarter' && currentValue >= starValue - 0.75) {
    return currentValue >= starValue - 0.25 ? 'full' : 'half';
  }
  
  return 'empty';
}

// ARIA attributes
const ariaAttributes = computed((): BRatingAriaAttributes => {
  const baseAttrs: BRatingAriaAttributes = {
    id: ratingId.value,
    role: props.displayMode === 'readonly' ? 'img' : 'slider',
    'aria-valuenow': props.modelValue,
    'aria-valuemin': props.min,
    'aria-valuemax': props.max,
    'aria-valuetext': formatRatingForScreenReader(props.modelValue || 0),
    'aria-invalid': props.validationState === 'invalid',
    'aria-required': props.required,
    'aria-readonly': props.readonly || props.displayMode === 'readonly',
    'aria-disabled': props.disabled,
    'aria-busy': props.loading || isLoading.value,
    'aria-orientation': 'horizontal',
    tabindex: props.disabled || props.displayMode === 'readonly' ? -1 : 0,
  };

  if (props.ariaLabel) baseAttrs['aria-label'] = props.ariaLabel;
  if (props.ariaLabelledBy) baseAttrs['aria-labelledby'] = props.ariaLabelledBy;
  
  const describedBy = getAriaDescribedBy();
  if (describedBy) baseAttrs['aria-describedby'] = describedBy;

  return baseAttrs;
});

// Computed ARIA describedby
function getAriaDescribedBy(): string | undefined {
  const ids = [];
  
  if (props.ariaDescribedBy) ids.push(props.ariaDescribedBy);
  if (props.helpText) ids.push(helpTextId.value);
  if (props.validationState === 'invalid' && props.errorMessage) ids.push(errorId.value);
  
  return ids.length > 0 ? ids.join(' ') : undefined;
}

// Format rating for screen readers
function formatRatingForScreenReader(value: number): string {
  if (props.valueFormatter) {
    return props.valueFormatter(value, props.max);
  }
  
  const format = props.ratingFormat || '{value} out of {max} stars';
  return format.replace('{value}', value.toString()).replace('{max}', props.max.toString());
}

// Event handlers
function handleStarClick(index: number, event: MouseEvent): void {
  if (props.disabled || props.readonly || props.displayMode === 'readonly') return;
  
  const newValue = calculateRatingValue(index, event);
  updateRating(newValue, 'click');
  
  emit('star-click', index, newValue, event);
  
  if (newValue === props.max) {
    emit('complete', newValue);
    announceToScreenReader(announcements.value.ratingCompleted.replace('{max}', props.max.toString()));
  }
}

function handleStarHover(index: number, event: MouseEvent): void {
  if (props.disabled || props.readonly || props.displayMode === 'readonly') return;
  
  hoveredIndex.value = index;
  const hoverValue = index + 1;
  
  emit('hover', index, hoverValue);
  
  if (props.announceChanges) {
    const message = announcements.value.starHover
      .replace('{value}', hoverValue.toString())
      .replace('{max}', props.max.toString());
    announceToScreenReader(message, true);
  }
}

function handleMouseLeave(event: MouseEvent): void {
  hoveredIndex.value = -1;
  emit('hover-end', event);
}

function calculateRatingValue(index: number, event?: MouseEvent): number {
  let baseValue = index + 1;
  
  if (props.precision === 'full') {
    return baseValue;
  }
  
  if (event && props.precision === 'half') {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const starWidth = rect.width;
    
    if (clickPosition < starWidth / 2) {
      baseValue -= 0.5;
    }
  }
  
  return Math.max(props.min, Math.min(props.max, baseValue));
}

function updateRating(newValue: number, source: BRatingInteractionMode = 'click'): void {
  if (newValue === props.modelValue) return;
  
  const previousValue = props.modelValue || 0;
  emit('update:modelValue', newValue);
  emit('change', newValue, previousValue);
  
  if (props.announceChanges) {
    const message = announcements.value.ratingChange
      .replace('{value}', newValue.toString())
      .replace('{max}', props.max.toString());
    announceToScreenReader(message);
  }
  
  // Validate if enabled
  if (validationConfig.value.enabled && validationConfig.value.mode === 'onChange') {
    validateRating(newValue);
  }
}

// Keyboard navigation
function handleKeydown(event: KeyboardEvent): void {
  if (props.disabled || props.readonly || props.displayMode === 'readonly') return;
  if (!keyboardConfig.value.enabled) return;
  
  keyboardMode.value = true;
  let handled = false;
  const currentValue = props.modelValue || 0;
  
  // Arrow key navigation
  if (keyboardConfig.value.arrowNavigation) {
    if (keyboardConfig.value.increaseKeys?.includes(event.key)) {
      const newValue = Math.min(props.max, currentValue + RATING_PRECISION_CONFIG[props.precision].step);
      updateRating(newValue, 'keyboard');
      handled = true;
    } else if (keyboardConfig.value.decreaseKeys?.includes(event.key)) {
      const newValue = Math.max(props.min, currentValue - RATING_PRECISION_CONFIG[props.precision].step);
      updateRating(newValue, 'keyboard');
      handled = true;
    }
  }
  
  // Home/End navigation
  if (keyboardConfig.value.homeEndNavigation) {
    if (keyboardConfig.value.maxKeys?.includes(event.key)) {
      updateRating(props.max, 'keyboard');
      handled = true;
    } else if (keyboardConfig.value.minKeys?.includes(event.key)) {
      updateRating(props.min, 'keyboard');
      handled = true;
    }
  }
  
  // Number key navigation
  if (keyboardConfig.value.numberKeys && /^[0-9]$/.test(event.key)) {
    const numberValue = parseInt(event.key);
    if (numberValue <= props.max && numberValue >= props.min) {
      updateRating(numberValue, 'keyboard');
      handled = true;
    }
  }
  
  // Selection keys
  if (keyboardConfig.value.selectKeys?.includes(event.key)) {
    // Enter or Space - no action needed as rating is already applied
    handled = true;
  }
  
  // Clear keys
  if (keyboardConfig.value.clearKeys?.includes(event.key) && props.clearable) {
    updateRating(0, 'keyboard');
    emit('clear');
    announceToScreenReader(announcements.value.ratingCleared);
    handled = true;
  }
  
  // Custom shortcuts
  if (keyboardConfig.value.shortcuts?.[event.key]) {
    keyboardConfig.value.shortcuts[event.key]();
    handled = true;
  }
  
  if (handled) {
    if (keyboardConfig.value.preventDefault) event.preventDefault();
    if (keyboardConfig.value.stopPropagation) event.stopPropagation();
  }
  
  emit('keydown', event);
}

function handleFocus(event: FocusEvent): void {
  keyboardMode.value = false;
  emit('focus', event);
  
  if (props.announceStarFocus && props.modelValue) {
    const message = announcements.value.starFocus
      .replace('{index}', (props.modelValue || 1).toString())
      .replace('{value}', (props.modelValue || 0).toString())
      .replace('{max}', props.max.toString());
    announceToScreenReader(message);
  }
}

function handleBlur(event: FocusEvent): void {
  keyboardMode.value = false;
  hoveredIndex.value = -1;
  emit('blur', event);
  
  // Validate on blur if enabled
  if (validationConfig.value.enabled && validationConfig.value.mode === 'onBlur') {
    validateRating(props.modelValue || 0);
  }
}

// Validation
function validateRating(value: number): void {
  if (!validationConfig.value.enabled) return;
  
  let isValid = true;
  let errorMessage = '';
  
  // Required validation
  if (props.required && value === 0) {
    isValid = false;
    errorMessage = validationConfig.value.messages?.required || 'Please provide a rating';
  }
  
  // Min validation
  if (value < props.min) {
    isValid = false;
    errorMessage = validationConfig.value.messages?.min?.replace('{min}', props.min.toString()) || `Rating must be at least ${props.min}`;
  }
  
  // Max validation
  if (value > props.max) {
    isValid = false;
    errorMessage = validationConfig.value.messages?.max?.replace('{max}', props.max.toString()) || `Rating cannot exceed ${props.max}`;
  }
  
  // Custom validation
  if (validationConfig.value.validator) {
    const result = validationConfig.value.validator(value);
    if (typeof result === 'string') {
      isValid = false;
      errorMessage = result;
    } else if (result === false) {
      isValid = false;
      errorMessage = validationConfig.value.messages?.invalid || 'Please provide a valid rating';
    }
  }
  
  const newState: BRatingValidationState = isValid ? 'valid' : 'invalid';
  validationMessage.value = errorMessage;
  
  emit('validation-change', newState, errorMessage);
  
  if (validationConfig.value.announceChanges) {
    const message = isValid
      ? announcements.value.validationSuccess
      : announcements.value.validationError.replace('{message}', errorMessage);
    announceToScreenReader(message);
  }
  
  if (!isValid) {
    emit('error', errorMessage);
  } else {
    emit('success');
  }
}

// Screen reader announcements
function announceToScreenReader(message: string, force = false): void {
  if (!props.announceChanges && !force) return;
  if (message === lastAnnouncedMessage.value) return;
  
  lastAnnouncedMessage.value = message;
  
  if (liveRegionRef.value) {
    liveRegionRef.value.textContent = message;
    
    // Clear after announcement to avoid repetition
    setTimeout(() => {
      if (liveRegionRef.value) {
        liveRegionRef.value.textContent = '';
      }
    }, 1000);
  }
}

// Star icon rendering
function getStarIcon(fillState: 'empty' | 'half' | 'full'): string {
  if (props.icon === 'custom' && props.customIcon) {
    return props.customIcon;
  }
  
  const iconConfig = RATING_ICON_CONFIG[props.icon];
  
  switch (fillState) {
    case 'full':
      return iconConfig.filledIcon || iconConfig.defaultIcon;
    case 'half':
      return iconConfig.halfIcon || iconConfig.defaultIcon;
    case 'empty':
    default:
      return iconConfig.defaultIcon;
  }
}

// Component styles
const ratingClasses = computed(() => {
  const sizeConfig = RATING_SIZE_CONFIG[props.size];
  
  return [
    'b-rating',
    `b-rating--${props.size}`,
    `b-rating--${props.colorTheme}`,
    `b-rating--${props.displayMode}`,
    {
      'b-rating--disabled': props.disabled,
      'b-rating--readonly': props.readonly || props.displayMode === 'readonly',
      'b-rating--loading': props.loading || isLoading.value,
      'b-rating--error': props.validationState === 'invalid',
      'b-rating--success': props.validationState === 'valid',
      'b-rating--keyboard-mode': keyboardMode.value,
      'b-rating--high-contrast': props.highContrast,
      'b-rating--reduced-motion': props.reduceMotion,
      'b-rating--dense': props.dense,
      'b-rating--min-touch-target': sizeConfig.minTouchTarget && props.minTouchTarget,
    },
    props.class,
  ];
});

const ratingStyles = computed(() => {
  const sizeConfig = RATING_SIZE_CONFIG[props.size];
  const spacing = props.spacing || sizeConfig.spacing;
  
  return {
    '--b-rating-icon-size': sizeConfig.iconSize,
    '--b-rating-spacing': spacing,
    '--b-rating-font-size': sizeConfig.fontSize,
    '--b-rating-empty-color': themeConfig.value.emptyColor,
    '--b-rating-filled-color': themeConfig.value.filledColor,
    '--b-rating-hover-color': themeConfig.value.hoverColor,
    '--b-rating-focus-color': themeConfig.value.focusColor,
    '--b-rating-disabled-color': themeConfig.value.disabledColor,
    '--b-rating-error-color': themeConfig.value.errorColor,
    '--b-rating-success-color': themeConfig.value.successColor,
    ...((typeof props.style === 'object' ? props.style : {})),
  };
});

// Lifecycle
onMounted(() => {
  if (props.autoFocus && !props.disabled && props.displayMode !== 'readonly') {
    nextTick(() => {
      ratingRef.value?.focus();
    });
  }
  
  // Announce keyboard instructions if focused
  if (props.screenReaderInstructions) {
    announceToScreenReader(props.screenReaderInstructions);
  }
});

// Watchers
watch(() => props.modelValue, (newValue, oldValue) => {
  if (validationConfig.value.enabled && validationConfig.value.mode === 'realtime') {
    validateRating(newValue || 0);
  }
});

watch(() => props.loading, (newLoading) => {
  isLoading.value = newLoading;
  emit('loading-change', newLoading);
  
  if (newLoading && props.announceChanges) {
    announceToScreenReader(announcements.value.loadingState);
  }
});
</script>

<template>
  <div
    :class="ratingClasses"
    :style="ratingStyles"
  >
    <!-- Main rating container -->
    <div
      ref="ratingRef"
      v-bind="ariaAttributes"
      :class="[
        'b-rating__container',
        {
          'b-rating__container--focused': ratingState.hasFocus,
          'b-rating__container--interacting': ratingState.isInteracting,
        }
      ]"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
      @mouseleave="handleMouseLeave"
    >
      <!-- Stars -->
      <div class="b-rating__stars" :aria-hidden="true">
        <button
          v-for="(star, index) in stars"
          :key="index"
          ref="starRefs"
          type="button"
          :class="[
            'b-rating__star',
            `b-rating__star--${star.isFilled}`,
            {
              'b-rating__star--hovered': star.isHovered,
              'b-rating__star--focused': star.isFocused,
              'b-rating__star--interactive': displayMode === 'interactive' && !disabled && !readonly,
            }
          ]"
          :disabled="disabled || readonly || displayMode === 'readonly'"
          :tabindex="-1"
          @click="handleStarClick(index, $event)"
          @mouseenter="handleStarHover(index, $event)"
        >
          <!-- Star icon (you'll need to implement your icon system) -->
          <span
            :class="[
              'b-rating__star-icon',
              getStarIcon(star.isFilled)
            ]"
            :aria-label="
              `${star.isFilled === 'full' ? filledStarAnnouncement : 
               star.isFilled === 'half' ? halfStarAnnouncement : 
               emptyStarAnnouncement} ${star.value}`
            "
          >
            <!-- Placeholder for icon - replace with your icon component -->
            ★
          </span>
          
          <!-- Half star overlay for precision -->
          <span
            v-if="star.isFilled === 'half' && precision === 'half'"
            :class="['b-rating__star-half', getStarIcon('half')]"
            aria-hidden="true"
          >
            ★
          </span>
        </button>
      </div>
      
      <!-- Rating value display -->
      <div
        v-if="showValue || labels?.length"
        class="b-rating__value"
        aria-hidden="true"
      >
        <span v-if="showValue" class="b-rating__numeric-value">
          {{ valueFormatter ? valueFormatter(modelValue || 0, max) : `${modelValue || 0}/${max}` }}
        </span>
        
        <span
          v-if="labels?.length && modelValue && labels[Math.ceil((modelValue || 0) - 1)]"
          class="b-rating__label"
        >
          {{ labels[Math.ceil((modelValue || 0) - 1)] }}
        </span>
      </div>
    </div>
    
    <!-- Help text -->
    <div
      v-if="helpText"
      :id="helpTextId"
      class="b-rating__help"
    >
      {{ helpText }}
    </div>
    
    <!-- Error message -->
    <div
      v-if="validationState === 'invalid' && errorMessage"
      :id="errorId"
      class="b-rating__error"
      role="alert"
    >
      {{ errorMessage }}
    </div>
    
    <!-- Success message -->
    <div
      v-if="validationState === 'valid' && successMessage"
      class="b-rating__success"
      role="status"
    >
      {{ successMessage }}
    </div>
    
    <!-- Info message -->
    <div
      v-if="infoMessage"
      class="b-rating__info"
    >
      {{ infoMessage }}
    </div>
    
    <!-- Loading indicator -->
    <div
      v-if="loading || isLoading"
      class="b-rating__loading"
      :aria-label="announcements.loadingState"
    >
      <!-- Replace with your loading component -->
      <span class="b-rating__loading-spinner">...</span>
    </div>
    
    <!-- Screen reader live region -->
    <div
      ref="liveRegionRef"
      :id="liveRegionId"
      :aria-live="liveRegionPoliteness"
      aria-atomic="true"
      class="sr-only"
    />
  </div>
</template>

<style scoped>
.b-rating {
  @apply relative inline-flex flex-col gap-1;
}

.b-rating__container {
  @apply relative inline-flex items-center gap-1 outline-none;
}

.b-rating__container--focused {
  @apply ring-2 ring-blue-500 ring-opacity-50 rounded;
}

.b-rating__stars {
  @apply flex items-center;
  gap: var(--b-rating-spacing, 0.375rem);
}

.b-rating__star {
  @apply relative inline-flex items-center justify-center p-0 border-none bg-transparent cursor-pointer;
  @apply transition-all duration-200 ease-in-out;
  width: var(--b-rating-icon-size, 1.5rem);
  height: var(--b-rating-icon-size, 1.5rem);
  color: var(--b-rating-empty-color, #e5e7eb);
}

.b-rating__star:disabled {
  @apply cursor-not-allowed opacity-50;
}

.b-rating__star--interactive:hover {
  @apply transform scale-110;
  color: var(--b-rating-hover-color, #f59e0b);
}

.b-rating__star--interactive:focus {
  @apply outline-none ring-2 ring-blue-500 ring-opacity-50 rounded;
}

.b-rating__star--focused {
  @apply ring-2 ring-blue-500 ring-opacity-50 rounded;
}

.b-rating__star--full {
  color: var(--b-rating-filled-color, #fbbf24);
}

.b-rating__star--half {
  color: var(--b-rating-filled-color, #fbbf24);
}

.b-rating__star--hovered {
  color: var(--b-rating-hover-color, #f59e0b);
  @apply transform scale-105;
}

.b-rating__star-icon {
  @apply block;
  font-size: var(--b-rating-icon-size, 1.5rem);
  line-height: 1;
}

.b-rating__star-half {
  @apply absolute inset-0 flex items-center justify-center overflow-hidden;
  width: 50%;
  color: var(--b-rating-filled-color, #fbbf24);
}

.b-rating__value {
  @apply ml-2 flex items-center gap-2;
  font-size: var(--b-rating-font-size, 1rem);
}

.b-rating__numeric-value {
  @apply text-gray-600 font-medium;
}

.b-rating__label {
  @apply text-gray-500;
}

.b-rating__help {
  @apply text-sm text-gray-500 mt-1;
}

.b-rating__error {
  @apply text-sm text-red-600 mt-1;
}

.b-rating__success {
  @apply text-sm text-green-600 mt-1;
}

.b-rating__info {
  @apply text-sm text-blue-600 mt-1;
}

.b-rating__loading {
  @apply absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded;
}

.b-rating__loading-spinner {
  @apply animate-spin;
}

/* Size variants */
.b-rating--xs .b-rating__star {
  @apply text-xs;
}

.b-rating--sm .b-rating__star {
  @apply text-sm;
}

.b-rating--md .b-rating__star {
  @apply text-base;
}

.b-rating--lg .b-rating__star {
  @apply text-lg;
}

.b-rating--xl .b-rating__star {
  @apply text-xl;
}

/* States */
.b-rating--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.b-rating--readonly {
  @apply cursor-default;
}

.b-rating--error .b-rating__star {
  color: var(--b-rating-error-color, #ef4444);
}

.b-rating--success .b-rating__star {
  color: var(--b-rating-success-color, #10b981);
}

/* High contrast mode */
.b-rating--high-contrast {
  @apply contrast-more;
}

.b-rating--high-contrast .b-rating__star {
  @apply border border-current;
}

/* Reduced motion */
.b-rating--reduced-motion .b-rating__star {
  @apply transition-none;
}

/* Minimum touch target */
.b-rating--min-touch-target .b-rating__star {
  @apply min-w-11 min-h-11;
}

/* Dense layout */
.b-rating--dense {
  @apply gap-0;
}

.b-rating--dense .b-rating__stars {
  @apply gap-0.5;
}

/* Screen reader only */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
  clip: rect(0, 0, 0, 0);
}
</style>
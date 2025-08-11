import type { App, Plugin } from 'vue';
import BSliderInput from './BSliderInput.vue';

// Export types
export type {
  BSliderInputAccessibilityProps,
  BSliderInputProps,
  BSliderInputEmits,
  BSliderInputState,
  BSliderInputValue,
  BSliderInputSize,
  BSliderInputOrientation,
  BSliderInputInteractionMode,
  BSliderInputValidationState,
  BSliderInputRangeConfig,
  BSliderInputFieldConfig,
  BSliderInputTickConfig,
  BSliderInputTooltipConfig,
  BSliderInputSyncConfig,
  BSliderInputKeyboardConfig,
  BSliderInputValidationConfig,
  BSliderInputAriaAttributes,
  BSliderInputValidationResult,
  BSliderInputAnnouncementTemplates,
  BSliderInputAccessibilityHelpers,
  // Re-export with shorter aliases
  BSliderInputAccessibilityProps as SliderInputAccessibilityProps,
  BSliderInputProps as SliderInputProps,
  BSliderInputEmits as SliderInputEmits,
  BSliderInputState as SliderInputState,
  BSliderInputValidationResult as SliderInputValidationResult,
} from './BSliderInput.types';

// Export default configurations
export {
  DEFAULT_SLIDER_INPUT_KEYBOARD_CONFIG,
  DEFAULT_SLIDER_INPUT_ACCESSIBILITY_CONFIG,
  DEFAULT_SLIDER_INPUT_VALIDATION_CONFIG,
  DEFAULT_SLIDER_INPUT_RANGE_CONFIG,
  DEFAULT_SLIDER_INPUT_FIELD_CONFIG,
  DEFAULT_SLIDER_INPUT_TICK_CONFIG,
  DEFAULT_SLIDER_INPUT_TOOLTIP_CONFIG,
  DEFAULT_SLIDER_INPUT_SYNC_CONFIG,
  DEFAULT_SLIDER_INPUT_ANNOUNCEMENTS,
  SLIDER_INPUT_SIZE_CONFIG,
} from './BSliderInput.types';

/**
 * Size configurations available for BSliderInput
 */
export const SLIDER_INPUT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

/**
 * Orientation options for BSliderInput
 */
export const SLIDER_INPUT_ORIENTATIONS = ['horizontal', 'vertical'] as const;

/**
 * Input position options for BSliderInput
 */
export const SLIDER_INPUT_POSITIONS = ['left', 'right', 'top', 'bottom'] as const;

/**
 * Validation states for BSliderInput
 */
export const SLIDER_INPUT_VALIDATION_STATES = ['valid', 'invalid', 'pending', 'none'] as const;

/**
 * Interaction modes for BSliderInput
 */
export const SLIDER_INPUT_INTERACTION_MODES = ['slider', 'input', 'keyboard', 'drag'] as const;

/**
 * Keyboard navigation keys supported by BSliderInput
 */
export const SLIDER_INPUT_KEYBOARD_KEYS = {
  /** Small increment/decrement keys */
  SMALL_STEP: ['ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown'],
  /** Large increment/decrement keys */
  LARGE_STEP: ['PageUp', 'PageDown'],
  /** Boundary navigation keys */
  BOUNDARY: ['Home', 'End'],
  /** Focus switching keys */
  FOCUS_SWITCH: ['Tab'],
  /** Value confirmation keys */
  CONFIRM: ['Enter'],
  /** Value reset keys */
  RESET: ['Escape'],
} as const;

/**
 * Common milestone percentages for announcements
 */
export const COMMON_SLIDER_INPUT_MILESTONES = [0, 25, 50, 75, 100] as const;

/**
 * Accessibility configuration presets for common use cases
 */
export const SLIDER_INPUT_ACCESSIBILITY_PRESETS = {
  /** Standard accessibility configuration */
  STANDARD: {
    announceValueChanges: true,
    announceValidation: true,
    announceRangeBoundaries: true,
    keyboardNavigation: true,
    showFocusIndicator: true,
    enhancedFocus: true,
    minTouchTarget: true,
    liveRegionPoliteness: 'polite' as const,
  },
  
  /** High accessibility configuration for users with disabilities */
  ENHANCED: {
    announceValueChanges: true,
    announceValidation: true,
    announceRangeBoundaries: true,
    announceMilestones: true,
    keyboardNavigation: true,
    showFocusIndicator: true,
    enhancedFocus: true,
    minTouchTarget: true,
    highContrast: true,
    liveRegionPoliteness: 'assertive' as const,
    announcementDelay: 500,
    screenReaderInstructions: 'Use arrow keys to adjust slider, Tab to switch to input field, Enter to confirm input value',
  },
  
  /** Minimal accessibility for performance-critical scenarios */
  MINIMAL: {
    announceValueChanges: false,
    announceValidation: true,
    announceRangeBoundaries: false,
    keyboardNavigation: true,
    showFocusIndicator: true,
    enhancedFocus: false,
    minTouchTarget: false,
    liveRegionPoliteness: 'polite' as const,
  },
} as const;

/**
 * Validation configuration presets
 */
export const SLIDER_INPUT_VALIDATION_PRESETS = {
  /** Real-time validation for immediate feedback */
  REALTIME: {
    enabled: true,
    mode: 'onChange' as const,
    debounceTime: 100,
    showFeedback: true,
    announceChanges: true,
    validateInputSeparately: false,
  },
  
  /** Validation on blur for less intrusive feedback */
  ON_BLUR: {
    enabled: true,
    mode: 'onBlur' as const,
    debounceTime: 0,
    showFeedback: true,
    announceChanges: true,
    validateInputSeparately: false,
  },
  
  /** Validation only on submit for minimal interruption */
  ON_SUBMIT: {
    enabled: true,
    mode: 'onSubmit' as const,
    debounceTime: 0,
    showFeedback: false,
    announceChanges: false,
    validateInputSeparately: false,
  },
} as const;

/**
 * Keyboard configuration presets
 */
export const SLIDER_INPUT_KEYBOARD_PRESETS = {
  /** Standard keyboard navigation */
  STANDARD: {
    enabled: true,
    smallStepKeys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
    largeStepKeys: ['PageUp', 'PageDown'],
    boundaryKeys: ['Home', 'End'],
    switchFocusKeys: ['Tab'],
    smallStepSize: 1,
    largeStepSize: 10,
    preventDefault: true,
    tabSwitchesElements: true,
  },
  
  /** Fine-grained control for precision tasks */
  PRECISE: {
    enabled: true,
    smallStepKeys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
    largeStepKeys: ['PageUp', 'PageDown'],
    boundaryKeys: ['Home', 'End'],
    switchFocusKeys: ['Tab'],
    smallStepSize: 0.1,
    largeStepSize: 1,
    preventDefault: true,
    tabSwitchesElements: true,
  },
  
  /** Fast navigation for broad ranges */
  FAST: {
    enabled: true,
    smallStepKeys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
    largeStepKeys: ['PageUp', 'PageDown'],
    boundaryKeys: ['Home', 'End'],
    switchFocusKeys: ['Tab'],
    smallStepSize: 5,
    largeStepSize: 25,
    preventDefault: true,
    tabSwitchesElements: true,
  },
} as const;

/**
 * Utility functions for BSliderInput
 */
export const SliderInputUtils = {
  /**
   * Clamp a value between min and max
   */
  clampValue: (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
  },
  
  /**
   * Snap a value to the nearest step
   */
  snapToStep: (value: number, step: number, min: number = 0): number => {
    if (step <= 0) return value;
    return Math.round((value - min) / step) * step + min;
  },
  
  /**
   * Calculate percentage from value and range
   */
  valueToPercentage: (value: number, min: number, max: number): number => {
    const range = max - min;
    if (range === 0) return 0;
    return ((value - min) / range) * 100;
  },
  
  /**
   * Calculate value from percentage and range
   */
  percentageToValue: (percentage: number, min: number, max: number): number => {
    const range = max - min;
    return min + (percentage / 100) * range;
  },
  
  /**
   * Format value with unit for display
   */
  formatDisplayValue: (value: number, unit?: string, decimalPlaces?: number): string => {
    let formatted = decimalPlaces !== undefined 
      ? value.toFixed(decimalPlaces) 
      : value.toString();
    return formatted + (unit || '');
  },
  
  /**
   * Parse string value to number
   */
  parseNumericValue: (value: string, fallback: number = 0): number => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? fallback : parsed;
  },
  
  /**
   * Check if value is at boundary
   */
  isAtBoundary: (value: number, min: number, max: number): 'min' | 'max' | null => {
    if (value <= min) return 'min';
    if (value >= max) return 'max';
    return null;
  },
  
  /**
   * Generate tick positions for a range
   */
  generateTickPositions: (min: number, max: number, stepCount: number): number[] => {
    if (stepCount <= 1) return [min, max];
    const step = (max - min) / (stepCount - 1);
    return Array.from({ length: stepCount }, (_, i) => min + (step * i));
  },
  
  /**
   * Debounce function for value changes
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
} as const;

/**
 * BSliderInput Vue plugin for global registration
 */
export default {
  install(Vue: App) {
    Vue.component('BSliderInput', BSliderInput);
  },
} as Plugin;

/**
 * Export the component for direct import
 */
export { BSliderInput };
/**
 * BRangeSlider accessibility props interface
 * Implements WCAG 2.1 AA standards for range slider components
 */
export interface BRangeSliderAccessibilityProps {
  /** Custom ARIA label for the entire range slider */
  ariaLabel?: string;
  /** Custom ARIA description for the range slider */
  ariaDescription?: string;
  /** ARIA label for the minimum handle */
  minHandleLabel?: string;
  /** ARIA label for the maximum handle */
  maxHandleLabel?: string;
  /** Whether to announce range changes */
  announceChanges?: boolean;
  /** Custom format function for value announcements */
  valueFormatter?: (value: number, unit: string) => string;
  /** Instructions text for screen readers */
  instructions?: string;
  /** Whether to use live regions for announcements */
  useLiveRegions?: boolean;
  /** Whether to announce when handles cross over */
  announceHandleCrossover?: boolean;
  /** Whether to announce step changes */
  announceStepChanges?: boolean;
  /** High contrast mode support */
  highContrast?: boolean;
  /** Reduced motion support */
  reduceMotion?: boolean;
  /** Whether to use enhanced focus management */
  enhancedFocus?: boolean;
  /** Minimum touch target size (default 44px) */
  minTouchTarget?: boolean;
  /** Screen reader instructions for interaction */
  screenReaderInstructions?: string;
  /** Live region politeness level for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Whether range slider supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Whether to announce range boundaries */
  announceRangeBoundaries?: boolean;
  /** Custom boundary announcement messages */
  boundaryMessages?: {
    minimum?: string;
    maximum?: string;
    range?: string;
  };
}

/**
 * Range values for the slider
 * Always contains exactly 2 numbers representing min and max values
 */
export type BRangeSliderValue = [number, number];

/**
 * Color configuration for range slider fills
 * Supports CSS color strings (hex, rgb, hsl, named colors)
 */
export type BRangeSliderFillColor = string;

/**
 * Range slider size variants
 */
export type BRangeSliderSize = 'small' | 'medium' | 'large';

/**
 * Configuration for range slider steps
 */
export interface BRangeSliderStep {
  /** The step value as a percentage (0-1) */
  value: number;
  /** Optional label for the step */
  label?: string;
  /** Optional description for accessibility */
  description?: string;
  /** Whether this step is a major milestone */
  major?: boolean;
  /** Custom aria-label for this step */
  ariaLabel?: string;
}

/**
 * Range slider orientation options
 */
export type BRangeSliderOrientation = 'horizontal' | 'vertical';

/**
 * Range slider interaction modes
 */
export type BRangeSliderInteractionMode = 'drag' | 'click' | 'keyboard';

/**
 * Range slider state interface for accessibility
 */
export interface BRangeSliderState {
  /** Current range values */
  currentRange: BRangeSliderValue;
  /** Previous range values */
  previousRange: BRangeSliderValue;
  /** Which handle is currently focused (0 = min, 1 = max) */
  focusedHandle: 0 | 1 | null;
  /** Whether handles have crossed over */
  handlesCrossed: boolean;
  /** Whether any handle is being dragged */
  isDragging: boolean;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Current interaction mode */
  interactionMode: BRangeSliderInteractionMode;
  /** Whether slider is disabled */
  isDisabled: boolean;
  /** Whether slider is in high contrast mode */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
  /** Current step indices for each handle */
  stepIndices: [number, number];
  /** Whether handles are at boundary values */
  atBoundaries: {
    minAtMin: boolean;
    minAtMax: boolean;
    maxAtMin: boolean;
    maxAtMax: boolean;
  };
}

/**
 * Range slider ARIA attributes interface
 */
export interface BRangeSliderAriaAttributes {
  /** Group role for the slider container */
  role: 'group';
  /** ARIA label for the group */
  'aria-labelledby'?: string;
  /** ARIA description for the group */
  'aria-describedby'?: string;
  /** ARIA orientation for the slider */
  'aria-orientation'?: 'horizontal' | 'vertical';
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
}

/**
 * Range slider handle ARIA attributes interface
 */
export interface BRangeSliderHandleAriaAttributes {
  /** Handle role (always 'slider') */
  role: 'slider';
  /** ARIA label for the handle */
  'aria-label'?: string;
  /** ARIA labelledby for complex labeling */
  'aria-labelledby'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** Current handle value */
  'aria-valuenow': number;
  /** Minimum handle value */
  'aria-valuemin': number;
  /** Maximum handle value */
  'aria-valuemax': number;
  /** Text description of current value */
  'aria-valuetext'?: string;
  /** ARIA orientation for the handle */
  'aria-orientation'?: 'horizontal' | 'vertical';
  /** Tab index for keyboard navigation */
  tabindex?: number;
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
}

/**
 * Range slider keyboard configuration
 */
export interface BRangeSliderKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for large increment/decrement */
  largeStepKeys?: string[];
  /** Keys for small increment/decrement */
  smallStepKeys?: string[];
  /** Keys for jumping to min/max values */
  boundaryKeys?: string[];
  /** Keys for switching between handles */
  handleSwitchKeys?: string[];
  /** Large step size */
  largeStepSize?: number;
  /** Small step size */
  smallStepSize?: number;
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
}

/**
 * Range slider drag configuration
 */
export interface BRangeSliderDragConfig {
  /** Whether dragging is enabled */
  enabled?: boolean;
  /** Whether to allow range dragging (moving both handles together) */
  allowRangeDrag?: boolean;
  /** Drag sensitivity multiplier */
  sensitivity?: number;
  /** Whether to constrain handles to prevent crossing */
  preventHandleCrossing?: boolean;
  /** Minimum distance between handles */
  minHandleDistance?: number;
  /** Whether to snap to steps during drag */
  snapToSteps?: boolean;
}

/**
 * Range slider tooltip configuration
 */
export interface BRangeSliderTooltipConfig {
  /** Whether to show tooltips */
  enabled?: boolean;
  /** Tooltip position relative to handle */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  /** Whether to show tooltips only on hover */
  showOnHover?: boolean;
  /** Whether to show tooltips only when dragging */
  showOnDrag?: boolean;
  /** Custom tooltip formatter */
  formatter?: (value: number, unit: string) => string;
  /** Whether to merge overlapping tooltips */
  mergeOverlapping?: boolean;
}

/**
 * Complete BRangeSlider props interface
 */
export interface BRangeSliderProps extends BRangeSliderAccessibilityProps {
  /** Current range values [min, max] */
  modelValue?: BRangeSliderValue;
  /** Size variant of the slider */
  size?: BRangeSliderSize;
  /** Maximum value for the slider range */
  max?: number;
  /** Minimum value for the slider range */
  min?: number;
  /** Unit to display in tooltips */
  unit?: string;
  /** Primary color for the slider */
  color?: string;
  /** Whether to show value tooltips */
  showTooltip?: boolean;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Slider orientation */
  orientation?: BRangeSliderOrientation;
  /** Whether to render the slider vertically (deprecated: use orientation) */
  vertical?: boolean;
  /** Array of colors for gradient fills along the range */
  fillColors?: BRangeSliderFillColor[];
  /** Step values for the slider */
  steps?: number[] | BRangeSliderStep[];
  /** Whether to use neutral background styling */
  neutralBackground?: boolean;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BRangeSliderKeyboardConfig;
  /** Drag interaction configuration */
  dragConfig?: BRangeSliderDragConfig;
  /** Tooltip configuration */
  tooltipConfig?: BRangeSliderTooltipConfig;
  /** Whether to allow handles to cross over */
  allowHandleCrossover?: boolean;
  /** Minimum distance between handles */
  minHandleDistance?: number;
  /** Whether to animate value changes */
  animate?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Custom track styling */
  trackStyle?: Record<string, any>;
  /** Custom handle styling */
  handleStyle?: Record<string, any>;
  /** Whether to show track marks for steps */
  showStepMarks?: boolean;
  /** Whether to show value labels */
  showValueLabels?: boolean;
}

/**
 * BRangeSlider emits interface
 */
export interface BRangeSliderEmits {
  /** Model value updated */
  'update:modelValue': [value: BRangeSliderValue];
  /** Range change started (drag or keyboard interaction) */
  'change-start': [value: BRangeSliderValue, handle: 0 | 1];
  /** Range change ended */
  'change-end': [value: BRangeSliderValue, handle: 0 | 1];
  /** Range value changed during interaction */
  'change': [value: BRangeSliderValue, previousValue: BRangeSliderValue];
  /** Handle focus changed */
  'handle-focus': [handle: 0 | 1 | null];
  /** Handle crossed over */
  'handle-crossover': [newValue: BRangeSliderValue];
  /** Boundary reached */
  'boundary-reached': [handle: 0 | 1, boundary: 'min' | 'max'];
  /** Step changed */
  'step-change': [handle: 0 | 1, step: number, stepValue: number];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Keyboard navigation event */
  'keyboard-nav': [event: KeyboardEvent, handle: 0 | 1];
  /** Drag event */
  'drag': [event: MouseEvent | TouchEvent, handle: 0 | 1];
}

/**
 * Range slider validation result
 */
export interface BRangeSliderValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Range slider configuration */
  config?: BRangeSliderProps;
}

/**
 * Range slider announcement templates
 */
export interface BRangeSliderAnnouncementTemplates {
  /** Template for range change announcement */
  rangeChange: string;
  /** Template for single handle change announcement */
  handleChange: string;
  /** Template for handle focus announcement */
  handleFocus: string;
  /** Template for boundary reached announcement */
  boundaryReached: string;
  /** Template for handle crossover announcement */
  handleCrossover: string;
  /** Template for step change announcement */
  stepChange: string;
  /** Template for range selection announcement */
  rangeSelection: string;
  /** Template for value formatting */
  valueFormat: string;
  /** Template for range bounds announcement */
  rangeBounds: string;
  /** Template for interaction mode change */
  interactionModeChange: string;
}

/**
 * Range slider theme configuration
 */
export interface BRangeSliderThemeConfig {
  /** Track background color */
  trackBackgroundColor?: string;
  /** Track fill color */
  trackFillColor?: string;
  /** Handle color */
  handleColor?: string;
  /** Handle border color */
  handleBorderColor?: string;
  /** Focus ring color */
  focusRingColor?: string;
  /** Disabled color */
  disabledColor?: string;
  /** Step mark color */
  stepMarkColor?: string;
  /** Tooltip background color */
  tooltipBackgroundColor?: string;
  /** Tooltip text color */
  tooltipTextColor?: string;
}

/**
 * Range slider accessibility helpers
 */
export interface BRangeSliderAccessibilityHelpers {
  /** Get ARIA attributes for range slider group */
  getGroupAriaAttributes: (state: BRangeSliderState, props: BRangeSliderProps) => BRangeSliderAriaAttributes;
  /** Get ARIA attributes for individual handle */
  getHandleAriaAttributes: (handle: 0 | 1, state: BRangeSliderState, props: BRangeSliderProps) => BRangeSliderHandleAriaAttributes;
  /** Format value for announcements */
  formatValueForAnnouncement: (value: number, unit?: string) => string;
  /** Get appropriate handle label */
  getHandleLabel: (handle: 0 | 1, value: number, unit?: string) => string;
  /** Check if handles have crossed over */
  checkHandleCrossover: (values: BRangeSliderValue) => boolean;
  /** Announce range change */
  announceRangeChange: (newValue: BRangeSliderValue, previousValue: BRangeSliderValue, unit?: string) => void;
  /** Get keyboard instructions */
  getKeyboardInstructions: (orientation: BRangeSliderOrientation, hasSteps: boolean) => string;
}

/**
 * Default configurations
 */
export const DEFAULT_RANGE_SLIDER_KEYBOARD_CONFIG: Required<BRangeSliderKeyboardConfig> = {
  enabled: true,
  largeStepKeys: ['PageUp', 'PageDown'],
  smallStepKeys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
  boundaryKeys: ['Home', 'End'],
  handleSwitchKeys: ['Tab'],
  largeStepSize: 10,
  smallStepSize: 1,
  preventDefault: true,
  stopPropagation: false,
};

export const DEFAULT_RANGE_SLIDER_ACCESSIBILITY_CONFIG: Required<BRangeSliderAccessibilityProps> = {
  ariaLabel: '',
  ariaDescription: '',
  minHandleLabel: 'Minimum value',
  maxHandleLabel: 'Maximum value',
  announceChanges: true,
  valueFormatter: (value: number, unit: string) => `${value.toFixed(1)}${unit}`,
  instructions: 'Use arrow keys to adjust values, Tab to switch handles, Home and End for boundaries',
  useLiveRegions: true,
  announceHandleCrossover: true,
  announceStepChanges: true,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Dual handle range slider with keyboard support',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  announceRangeBoundaries: true,
  boundaryMessages: {
    minimum: 'Minimum value reached',
    maximum: 'Maximum value reached',
    range: 'Range: {min} to {max}',
  },
};

export const DEFAULT_RANGE_SLIDER_DRAG_CONFIG: Required<BRangeSliderDragConfig> = {
  enabled: true,
  allowRangeDrag: false,
  sensitivity: 1,
  preventHandleCrossing: false,
  minHandleDistance: 0,
  snapToSteps: true,
};

export const DEFAULT_RANGE_SLIDER_TOOLTIP_CONFIG: Required<BRangeSliderTooltipConfig> = {
  enabled: false,
  position: 'top',
  showOnHover: true,
  showOnDrag: true,
  formatter: (value: number, unit: string) => `${value}${unit}`,
  mergeOverlapping: true,
};

export const DEFAULT_RANGE_SLIDER_ANNOUNCEMENTS: Required<BRangeSliderAnnouncementTemplates> = {
  rangeChange: 'Range updated: {min} to {max}',
  handleChange: '{handle}: {value}',
  handleFocus: '{handle} handle focused, value {value}',
  boundaryReached: '{handle} handle at {boundary} value',
  handleCrossover: 'Handle positions corrected to maintain valid range',
  stepChange: '{handle} handle moved to step {step}',
  rangeSelection: 'Selected range from {min} to {max}',
  valueFormat: '{value}{unit}',
  rangeBounds: 'Range limits: {min} to {max}',
  interactionModeChange: 'Interaction mode changed to {mode}',
};

/**
 * Range slider size configurations with accessibility considerations
 */
export const RANGE_SLIDER_SIZE_CONFIG: Record<BRangeSliderSize, {
  trackHeight: string;
  handleSize: string;
  minTouchTarget: boolean;
  focusRingSize: string;
}> = {
  small: {
    trackHeight: '0.5rem',
    handleSize: '1.25rem',
    minTouchTarget: true, // Will be enforced to 44px for touch
    focusRingSize: '2px',
  },
  medium: {
    trackHeight: '0.75rem',
    handleSize: '1.5rem',
    minTouchTarget: false,
    focusRingSize: '2px',
  },
  large: {
    trackHeight: '1rem',
    handleSize: '2rem',
    minTouchTarget: false,
    focusRingSize: '3px',
  },
};

/**
 * Keyboard navigation key mappings
 */
export const RANGE_SLIDER_KEY_MAPPINGS: Record<string, {
  action: string;
  increment: number;
  description: string;
}> = {
  ArrowRight: { action: 'increment', increment: 1, description: 'Increase value by small step' },
  ArrowLeft: { action: 'decrement', increment: 1, description: 'Decrease value by small step' },
  ArrowUp: { action: 'increment', increment: 1, description: 'Increase value by small step' },
  ArrowDown: { action: 'decrement', increment: 1, description: 'Decrease value by small step' },
  PageUp: { action: 'increment', increment: 10, description: 'Increase value by large step' },
  PageDown: { action: 'decrement', increment: 10, description: 'Decrease value by large step' },
  Home: { action: 'minimum', increment: 0, description: 'Jump to minimum value' },
  End: { action: 'maximum', increment: 0, description: 'Jump to maximum value' },
};

/**
 * Export all types for easy importing
 */
export type {
  BRangeSliderAccessibilityProps as AccessibilityProps,
  BRangeSliderProps as Props,
  BRangeSliderState as State,
  BRangeSliderAriaAttributes as AriaAttributes,
  BRangeSliderHandleAriaAttributes as HandleAriaAttributes,
  BRangeSliderKeyboardConfig as KeyboardConfig,
  BRangeSliderDragConfig as DragConfig,
  BRangeSliderTooltipConfig as TooltipConfig,
  BRangeSliderStep as Step,
  BRangeSliderEmits as Emits,
  BRangeSliderValidationResult as ValidationResult,
  BRangeSliderAnnouncementTemplates as AnnouncementTemplates,
  BRangeSliderThemeConfig as ThemeConfig,
  BRangeSliderAccessibilityHelpers as AccessibilityHelpers,
};
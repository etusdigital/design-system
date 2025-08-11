/**
 * BSlider accessibility props interface
 * Implements WCAG 2.1 AA standards for slider components
 */
export interface BSliderAccessibilityProps {
  /** ARIA label for the slider */
  ariaLabel?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Custom value text format function */
  ariaValueText?: (value: number) => string;
  /** Whether to announce value changes immediately */
  announceValueChanges?: boolean;
  /** Custom keyboard step size */
  keyboardStep?: number;
  /** Whether to announce step information */
  announceSteps?: boolean;
  /** Error message for invalid values */
  errorMessage?: string;
  /** Whether the slider is required in a form */
  required?: boolean;
  /** Form field name for error announcements */
  fieldName?: string;
  /** Whether to announce range boundaries */
  announceRangeBoundaries?: boolean;
  /** Whether to announce percentage values */
  announcePercentage?: boolean;
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
  /** Whether slider supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Custom announcement delay in milliseconds */
  announcementDelay?: number;
  /** Whether to announce milestone values */
  announceMilestones?: boolean;
  /** Milestone values to announce */
  milestones?: number[];
}

/**
 * Slider size variants
 */
export type BSliderSize = 'small' | 'medium' | 'large';

/**
 * Slider orientation options
 */
export type BSliderOrientation = 'horizontal' | 'vertical';

/**
 * Fill color configuration for gradient fills
 */
export interface BSliderFillColor {
  /** CSS color string */
  color: string;
  /** Percentage position (0-100) */
  percentage: number;
  /** Optional label for the color */
  label?: string;
}

/**
 * Step configuration for discrete slider values
 */
export interface BSliderStep {
  /** Step value */
  value: number;
  /** Optional label for the step */
  label?: string;
  /** Optional description for accessibility */
  description?: string;
  /** Whether this step is a major milestone */
  major?: boolean;
  /** Custom announcement for this step */
  announcement?: string;
}

/**
 * Slider interaction modes
 */
export type BSliderInteractionMode = 'drag' | 'click' | 'keyboard';

/**
 * Slider validation states
 */
export type BSliderValidationState = 'valid' | 'invalid' | 'pending' | 'none';

/**
 * Slider state interface for accessibility
 */
export interface BSliderState {
  /** Current slider value */
  currentValue: number;
  /** Previous value for comparison */
  previousValue: number;
  /** Whether slider has focus */
  hasFocus: boolean;
  /** Whether slider is being interacted with */
  isInteracting: boolean;
  /** Current interaction mode */
  interactionMode: BSliderInteractionMode;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Whether slider is at minimum value */
  atMinimum: boolean;
  /** Whether slider is at maximum value */
  atMaximum: boolean;
  /** Current validation state */
  validationState: BSliderValidationState;
  /** Whether slider is disabled */
  isDisabled: boolean;
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
  /** Last announced value to prevent duplicate announcements */
  lastAnnouncedValue: number | null;
}

/**
 * Slider ARIA attributes interface
 */
export interface BSliderAriaAttributes {
  /** ARIA role (always 'slider') */
  role: 'slider';
  /** ARIA label for the slider */
  'aria-label'?: string;
  /** ARIA labelledby for complex labeling */
  'aria-labelledby'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** Current slider value */
  'aria-valuenow': number;
  /** Minimum slider value */
  'aria-valuemin': number;
  /** Maximum slider value */
  'aria-valuemax': number;
  /** Text description of current value */
  'aria-valuetext'?: string;
  /** ARIA orientation for the slider */
  'aria-orientation'?: 'horizontal' | 'vertical';
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** ARIA required state */
  'aria-required'?: boolean;
  /** ARIA invalid state */
  'aria-invalid'?: boolean;
  /** Tab index for keyboard navigation */
  tabindex?: number;
}

/**
 * Slider keyboard configuration
 */
export interface BSliderKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for small increment/decrement */
  smallStepKeys?: string[];
  /** Keys for large increment/decrement */
  largeStepKeys?: string[];
  /** Keys for jumping to min/max values */
  boundaryKeys?: string[];
  /** Small step size */
  smallStepSize?: number;
  /** Large step size */
  largeStepSize?: number;
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom key handlers */
  customHandlers?: Record<string, () => void>;
}

/**
 * Slider tooltip configuration
 */
export interface BSliderTooltipConfig {
  /** Whether to show tooltip */
  enabled?: boolean;
  /** Tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  /** Whether to show tooltip only on hover */
  showOnHover?: boolean;
  /** Whether to show tooltip only when dragging */
  showOnDrag?: boolean;
  /** Custom tooltip formatter */
  formatter?: (value: number, unit?: string) => string;
  /** Whether to show tooltip on focus */
  showOnFocus?: boolean;
}

/**
 * Complete BSlider props interface
 */
export interface BSliderProps extends BSliderAccessibilityProps {
  /** Current slider value */
  modelValue?: number;
  /** Size variant of the slider */
  size?: BSliderSize;
  /** Maximum value for the slider */
  max?: number;
  /** Minimum value for the slider */
  min?: number;
  /** Unit to display in tooltips */
  unit?: string;
  /** Primary color for the slider */
  color?: string;
  /** Whether to show value tooltip */
  showTooltip?: boolean;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Slider orientation */
  orientation?: BSliderOrientation;
  /** Whether to render the slider vertically (deprecated: use orientation) */
  vertical?: boolean;
  /** Array of fill colors for gradient display */
  fillColors?: BSliderFillColor[];
  /** Step values for the slider */
  steps?: BSliderStep[];
  /** Whether to use neutral background styling */
  neutralBackground?: boolean;
  /** HTML id attribute */
  id?: string;
  /** Label ID for aria-labelledby */
  labelId?: string;
  /** Description ID for aria-describedby */
  descriptionId?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BSliderKeyboardConfig;
  /** Tooltip configuration */
  tooltipConfig?: BSliderTooltipConfig;
  /** Whether the slider is in an invalid state */
  invalid?: boolean;
  /** Whether to animate value changes */
  animate?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Custom track styling */
  trackStyle?: Record<string, any>;
  /** Custom thumb styling */
  thumbStyle?: Record<string, any>;
  /** Whether to show track marks for steps */
  showStepMarks?: boolean;
  /** Whether to show value labels */
  showValueLabels?: boolean;
  /** Debounce time for value changes in milliseconds */
  debounceTime?: number;
}

/**
 * BSlider emits interface
 */
export interface BSliderEmits {
  /** Model value updated */
  'update:modelValue': [value: number];
  /** Value changed with formatted display value */
  'value-change': [value: number, formattedValue: string];
  /** Slider focused */
  'focus': [event: FocusEvent];
  /** Slider blurred */
  'blur': [event: FocusEvent];
  /** Validation state changed */
  'validation-change': [isValid: boolean, errorMessage?: string];
  /** Drag started */
  'drag-start': [value: number, event: MouseEvent | TouchEvent];
  /** Drag ended */
  'drag-end': [value: number, event: MouseEvent | TouchEvent];
  /** Slider interaction started */
  'interaction-start': [value: number, mode: BSliderInteractionMode];
  /** Slider interaction ended */
  'interaction-end': [value: number, mode: BSliderInteractionMode];
  /** Step changed */
  'step-change': [step: BSliderStep, value: number];
  /** Milestone reached */
  'milestone': [milestone: number, percentage: number];
  /** Boundary reached */
  'boundary-reached': [boundary: 'min' | 'max', value: number];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Keyboard navigation event */
  'keyboard-nav': [event: KeyboardEvent, value: number];
}

/**
 * Slider validation result
 */
export interface BSliderValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Slider configuration */
  config?: BSliderProps;
}

/**
 * Slider announcement templates
 */
export interface BSliderAnnouncementTemplates {
  /** Template for value change announcement */
  valueChange: string;
  /** Template for focus announcement */
  sliderFocus: string;
  /** Template for boundary reached announcement */
  boundaryReached: string;
  /** Template for step change announcement */
  stepChange: string;
  /** Template for milestone announcement */
  milestoneReached: string;
  /** Template for validation error announcement */
  validationError: string;
  /** Template for range announcement */
  rangeAnnouncement: string;
  /** Template for keyboard instructions */
  keyboardInstructions: string;
  /** Template for percentage announcement */
  percentageAnnouncement: string;
}

/**
 * Slider theme configuration
 */
export interface BSliderThemeConfig {
  /** Track background color */
  trackBackgroundColor?: string;
  /** Track fill color */
  trackFillColor?: string;
  /** Thumb color */
  thumbColor?: string;
  /** Thumb border color */
  thumbBorderColor?: string;
  /** Focus ring color */
  focusRingColor?: string;
  /** Disabled color */
  disabledColor?: string;
  /** Invalid color */
  invalidColor?: string;
  /** Step mark color */
  stepMarkColor?: string;
  /** Tooltip background color */
  tooltipBackgroundColor?: string;
  /** Tooltip text color */
  tooltipTextColor?: string;
}

/**
 * Slider accessibility helpers
 */
export interface BSliderAccessibilityHelpers {
  /** Get ARIA attributes for slider */
  getSliderAriaAttributes: (state: BSliderState, props: BSliderProps) => BSliderAriaAttributes;
  /** Format value for announcements */
  formatValueForAnnouncement: (value: number, unit?: string) => string;
  /** Get appropriate value text */
  getValueText: (value: number, props: BSliderProps) => string;
  /** Check if value is at boundary */
  isAtBoundary: (value: number, min: number, max: number) => 'min' | 'max' | null;
  /** Get step information for value */
  getStepInfo: (value: number, steps?: BSliderStep[]) => BSliderStep | null;
  /** Announce value change */
  announceValueChange: (newValue: number, oldValue: number, props: BSliderProps) => void;
  /** Get keyboard instructions */
  getKeyboardInstructions: (orientation: BSliderOrientation, hasSteps: boolean) => string;
}

/**
 * Default configurations
 */
export const DEFAULT_SLIDER_KEYBOARD_CONFIG: Required<BSliderKeyboardConfig> = {
  enabled: true,
  smallStepKeys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
  largeStepKeys: ['PageUp', 'PageDown'],
  boundaryKeys: ['Home', 'End'],
  smallStepSize: 1,
  largeStepSize: 10,
  preventDefault: true,
  stopPropagation: false,
  customHandlers: {},
};

export const DEFAULT_SLIDER_ACCESSIBILITY_CONFIG: Required<BSliderAccessibilityProps> = {
  ariaLabel: '',
  ariaDescription: '',
  ariaValueText: (value: number) => value.toString(),
  announceValueChanges: true,
  keyboardStep: 1,
  announceSteps: true,
  errorMessage: '',
  required: false,
  fieldName: 'Slider',
  announceRangeBoundaries: true,
  announcePercentage: false,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Use arrow keys to adjust value, Home and End for boundaries',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  announcementDelay: 0,
  announceMilestones: false,
  milestones: [25, 50, 75],
};

export const DEFAULT_SLIDER_TOOLTIP_CONFIG: Required<BSliderTooltipConfig> = {
  enabled: false,
  position: 'top',
  showOnHover: true,
  showOnDrag: true,
  formatter: (value: number, unit?: string) => `${value}${unit || ''}`,
  showOnFocus: false,
};

export const DEFAULT_SLIDER_ANNOUNCEMENTS: Required<BSliderAnnouncementTemplates> = {
  valueChange: '{value}',
  sliderFocus: '{fieldName} {value}, range {min} to {max}',
  boundaryReached: '{boundary} value reached: {value}',
  stepChange: 'Step {label}: {value}',
  milestoneReached: 'Milestone reached: {percentage}%',
  validationError: 'Error in {fieldName}: {message}',
  rangeAnnouncement: 'Range from {min} to {max}',
  keyboardInstructions: 'Use arrow keys to adjust, Home and End for boundaries, Page Up and Page Down for larger steps',
  percentageAnnouncement: '{percentage}% of range',
};

/**
 * Slider size configurations with accessibility considerations
 */
export const SLIDER_SIZE_CONFIG: Record<BSliderSize, {
  trackHeight: string;
  thumbSize: string;
  minTouchTarget: boolean;
  focusRingSize: string;
}> = {
  small: {
    trackHeight: '0.5rem',
    thumbSize: '1.25rem',
    minTouchTarget: true, // Will be enforced to 44px for touch
    focusRingSize: '2px',
  },
  medium: {
    trackHeight: '0.75rem',
    thumbSize: '1.5rem',
    minTouchTarget: false,
    focusRingSize: '2px',
  },
  large: {
    trackHeight: '1rem',
    thumbSize: '2rem',
    minTouchTarget: false,
    focusRingSize: '3px',
  },
};

/**
 * Keyboard navigation key mappings
 */
export const SLIDER_KEY_MAPPINGS: Record<string, {
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
 * Common milestone percentages for announcements
 */
export const COMMON_SLIDER_MILESTONES = [0, 25, 50, 75, 100];

/**
 * Export all types for easy importing
 */
export type {
  BSliderAccessibilityProps as AccessibilityProps,
  BSliderProps as Props,
  BSliderState as State,
  BSliderAriaAttributes as AriaAttributes,
  BSliderKeyboardConfig as KeyboardConfig,
  BSliderTooltipConfig as TooltipConfig,
  BSliderFillColor as FillColor,
  BSliderStep as Step,
  BSliderEmits as Emits,
  BSliderValidationResult as ValidationResult,
  BSliderAnnouncementTemplates as AnnouncementTemplates,
  BSliderThemeConfig as ThemeConfig,
  BSliderAccessibilityHelpers as AccessibilityHelpers,
};
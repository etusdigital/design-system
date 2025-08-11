/**
 * BSliderInput accessibility props interface
 * Implements WCAG 2.1 AA standards for combined slider-input components
 */
export interface BSliderInputAccessibilityProps {
  /** ARIA label for the slider input component */
  ariaLabel?: string;
  /** ID of element that labels this slider input */
  ariaLabelledBy?: string;
  /** ID of element that describes this slider input */
  ariaDescribedBy?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Whether to announce validation changes to screen readers */
  announceValidation?: boolean;
  /** Whether to announce value changes to screen readers */
  announceValueChanges?: boolean;
  /** Custom error announcement message */
  customErrorAnnouncement?: string;
  /** Custom success announcement message */
  customSuccessAnnouncement?: string;
  /** Help text for complex slider input patterns */
  helpText?: string;
  /** Whether the slider input is part of a group */
  groupRole?: 'group' | 'radiogroup' | 'listbox' | undefined;
  /** ARIA expanded state for slider inputs with dropdown behavior */
  ariaExpanded?: boolean;
  /** ARIA controls reference for associated elements */
  ariaControls?: string;
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
  /** Whether slider input supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Auto-complete attribute for better UX */
  autocomplete?: string;
  /** Whether to announce range boundaries */
  announceRangeBoundaries?: boolean;
  /** Whether to announce percentage values */
  announcePercentage?: boolean;
  /** Whether to announce milestone values */
  announceMilestones?: boolean;
  /** Milestone values to announce */
  milestones?: number[];
  /** Custom value text format function */
  ariaValueText?: (value: number) => string;
  /** Custom announcement delay in milliseconds */
  announcementDelay?: number;
  /** Form field name for accessibility announcements */
  fieldName?: string;
}

/**
 * Slider input component sizes
 */
export type BSliderInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Slider input orientation options
 */
export type BSliderInputOrientation = 'horizontal' | 'vertical';

/**
 * Slider input interaction modes
 */
export type BSliderInputInteractionMode = 'slider' | 'input' | 'keyboard' | 'drag';

/**
 * Slider input validation states
 */
export type BSliderInputValidationState = 'valid' | 'invalid' | 'pending' | 'none';

/**
 * Slider input value type
 */
export type BSliderInputValue = number;

/**
 * Range mode configuration for dual-value sliders
 */
export interface BSliderInputRangeConfig {
  /** Whether range mode is enabled */
  enabled?: boolean;
  /** Minimum value of the range */
  minValue?: number;
  /** Maximum value of the range */
  maxValue?: number;
  /** Whether range values can overlap */
  allowOverlap?: boolean;
  /** Minimum distance between range values */
  minDistance?: number;
}

/**
 * Input field configuration for the text input portion
 */
export interface BSliderInputFieldConfig {
  /** Whether to show the input field */
  enabled?: boolean;
  /** Input field placeholder text */
  placeholder?: string;
  /** Input field width (CSS value) */
  width?: string;
  /** Input field position relative to slider */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** Whether input is readonly */
  readonly?: boolean;
  /** Custom input validation pattern */
  pattern?: string;
  /** Input field type attribute */
  type?: 'number' | 'text';
  /** Number of decimal places for number inputs */
  decimalPlaces?: number;
  /** Whether to format numbers with thousands separator */
  formatNumbers?: boolean;
  /** Custom number formatter function */
  numberFormatter?: (value: number) => string;
  /** Custom number parser function */
  numberParser?: (value: string) => number;
}

/**
 * Tick marks and labels configuration
 */
export interface BSliderInputTickConfig {
  /** Whether to show tick marks */
  showTicks?: boolean;
  /** Whether to show tick labels */
  showLabels?: boolean;
  /** Tick mark positions */
  positions?: number[];
  /** Custom tick labels */
  labels?: Record<number, string>;
  /** Tick mark size */
  size?: 'small' | 'medium' | 'large';
  /** Whether ticks are clickable */
  clickable?: boolean;
}

/**
 * Slider input state interface for accessibility
 */
export interface BSliderInputState {
  /** Current slider value */
  sliderValue: number;
  /** Current input field value */
  inputValue: string;
  /** Previous value for comparison */
  previousValue: number;
  /** Whether component has focus */
  hasFocus: boolean;
  /** Which part has focus (slider or input) */
  focusedElement: 'slider' | 'input' | null;
  /** Whether component has error */
  hasError: boolean;
  /** Whether component is being validated */
  isValidating: boolean;
  /** Current validation state */
  validationState: BSliderInputValidationState;
  /** Whether component is disabled */
  isDisabled: boolean;
  /** Whether component is required */
  isRequired: boolean;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Whether component is in range mode */
  isRangeMode: boolean;
  /** Whether component has content */
  hasContent: boolean;
  /** Whether component is in loading state */
  isLoading: boolean;
  /** Current interaction mode */
  interactionMode: BSliderInputInteractionMode;
  /** Whether slider is at minimum value */
  atMinimum: boolean;
  /** Whether slider is at maximum value */
  atMaximum: boolean;
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
  /** Last announced value to prevent duplicate announcements */
  lastAnnouncedValue: number | null;
  /** Range values for dual-value mode */
  rangeValues?: {
    min: number;
    max: number;
  };
}

/**
 * Slider input ARIA attributes interface
 */
export interface BSliderInputAriaAttributes {
  /** Unique ID for the slider input */
  id: string;
  /** ARIA role for the slider */
  role?: 'slider' | 'spinbutton' | 'group';
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelled by relationships */
  'aria-labelledby'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** ARIA invalid state */
  'aria-invalid'?: boolean;
  /** ARIA required state */
  'aria-required'?: boolean;
  /** ARIA busy state for loading */
  'aria-busy'?: boolean;
  /** ARIA expanded for dropdown behavior */
  'aria-expanded'?: boolean;
  /** ARIA controls for associated elements */
  'aria-controls'?: string;
  /** Current slider value */
  'aria-valuenow'?: number;
  /** Minimum slider value */
  'aria-valuemin'?: number;
  /** Maximum slider value */
  'aria-valuemax'?: number;
  /** Text description of current value */
  'aria-valuetext'?: string;
  /** ARIA orientation for the slider */
  'aria-orientation'?: 'horizontal' | 'vertical';
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** Tab index for keyboard navigation */
  tabindex?: number;
  /** Auto-complete attribute */
  autocomplete?: string;
}

/**
 * Slider input keyboard configuration
 */
export interface BSliderInputKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for small increment/decrement */
  smallStepKeys?: string[];
  /** Keys for large increment/decrement */
  largeStepKeys?: string[];
  /** Keys for jumping to min/max values */
  boundaryKeys?: string[];
  /** Keys for switching focus between slider and input */
  switchFocusKeys?: string[];
  /** Small step size */
  smallStepSize?: number;
  /** Large step size */
  largeStepSize?: number;
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom keyboard shortcuts */
  shortcuts?: Record<string, () => void>;
  /** Whether Tab key switches between slider and input */
  tabSwitchesElements?: boolean;
}

/**
 * Slider input validation configuration
 */
export interface BSliderInputValidationConfig {
  /** Whether validation is enabled */
  enabled?: boolean;
  /** Validation mode */
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'realtime';
  /** Custom validation function */
  validator?: (value: number) => boolean | string;
  /** Debounce time for real-time validation */
  debounceTime?: number;
  /** Whether to show validation feedback */
  showFeedback?: boolean;
  /** Whether to announce validation changes */
  announceChanges?: boolean;
  /** Whether to validate input field separately */
  validateInputSeparately?: boolean;
  /** Custom validation messages */
  messages?: {
    required?: string;
    invalid?: string;
    belowMin?: string;
    aboveMax?: string;
    invalidRange?: string;
    invalidStep?: string;
  };
}

/**
 * Slider input tooltip configuration
 */
export interface BSliderInputTooltipConfig {
  /** Whether to show tooltip */
  enabled?: boolean;
  /** Tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  /** Whether to show tooltip only on hover */
  showOnHover?: boolean;
  /** Whether to show tooltip only when dragging */
  showOnDrag?: boolean;
  /** Whether to show tooltip on focus */
  showOnFocus?: boolean;
  /** Custom tooltip formatter */
  formatter?: (value: number, unit?: string) => string;
  /** Whether to show tooltip for both slider and input */
  showForBoth?: boolean;
}

/**
 * Slider input synchronization configuration
 */
export interface BSliderInputSyncConfig {
  /** Synchronization debounce time */
  debounceTime?: number;
  /** Whether to sync immediately on change */
  immediate?: boolean;
  /** Whether to validate on sync */
  validateOnSync?: boolean;
  /** Custom sync handler */
  syncHandler?: (sliderValue: number, inputValue: string) => number;
  /** Whether to round values during sync */
  roundValues?: boolean;
  /** Rounding precision */
  roundingPrecision?: number;
}

/**
 * Complete BSliderInput props interface
 */
export interface BSliderInputProps extends BSliderInputAccessibilityProps {
  /** Input value */
  modelValue?: BSliderInputValue;
  /** Label text for the slider input */
  labelValue?: string;
  /** Maximum value (for slider and input validation) */
  max?: number;
  /** Minimum value (for slider and input validation) */
  min?: number;
  /** Step increment for slider and input */
  step?: number;
  /** Error message to display */
  errorMessage?: string;
  /** Info message to display */
  infoMessage?: string;
  /** Slider input size variant */
  size?: BSliderInputSize;
  /** Whether the slider input is disabled */
  disabled?: boolean;
  /** Whether the slider input has error state */
  isError?: boolean;
  /** Whether the slider input is required */
  required?: boolean;
  /** Placeholder text for input field */
  placeholder?: string;
  /** Unit to display (e.g., 'px', '%', 'em') */
  unit?: string;
  /** Primary color for the slider */
  color?: string;
  /** Slider orientation */
  orientation?: BSliderInputOrientation;
  /** Loading state for async validation */
  loading?: boolean;
  /** Validation state for screen reader feedback */
  validationState?: BSliderInputValidationState;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Range mode configuration */
  rangeConfig?: BSliderInputRangeConfig;
  /** Input field configuration */
  inputConfig?: BSliderInputFieldConfig;
  /** Tick marks configuration */
  tickConfig?: BSliderInputTickConfig;
  /** Keyboard navigation configuration */
  keyboardConfig?: BSliderInputKeyboardConfig;
  /** Validation configuration */
  validationConfig?: BSliderInputValidationConfig;
  /** Tooltip configuration */
  tooltipConfig?: BSliderInputTooltipConfig;
  /** Synchronization configuration */
  syncConfig?: BSliderInputSyncConfig;
  /** Custom input attributes */
  inputAttrs?: Record<string, any>;
  /** Custom slider attributes */
  sliderAttrs?: Record<string, any>;
  /** Whether to auto-focus on mount */
  autoFocus?: boolean;
  /** Whether input is readonly */
  readonly?: boolean;
  /** Whether to animate value changes */
  animate?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Whether to show value labels */
  showValueLabels?: boolean;
  /** Whether to show percentage display */
  showPercentage?: boolean;
  /** Custom track styling */
  trackStyle?: Record<string, any>;
  /** Custom thumb styling */
  thumbStyle?: Record<string, any>;
  /** Custom input styling */
  inputStyle?: Record<string, any>;
  /** Whether input field is visible */
  showInput?: boolean;
  /** Input field position relative to slider */
  inputPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Whether to format display values */
  formatDisplay?: boolean;
  /** Custom display formatter */
  displayFormatter?: (value: number) => string;
}

/**
 * BSliderInput emits interface
 */
export interface BSliderInputEmits {
  /** Model value updated */
  'update:modelValue': [value: BSliderInputValue];
  /** Slider input focused */
  'focus': [event: FocusEvent, element: 'slider' | 'input'];
  /** Slider input blurred */
  'blur': [event: FocusEvent, element: 'slider' | 'input'];
  /** Slider input value changed */
  'input': [value: BSliderInputValue, source: 'slider' | 'input'];
  /** Validation state changed */
  'validation-change': [state: BSliderInputValidationState, message?: string];
  /** Value synchronized between slider and input */
  'sync': [sliderValue: number, inputValue: string];
  /** Keyboard event */
  'keydown': [event: KeyboardEvent, element: 'slider' | 'input'];
  /** Key up event */
  'keyup': [event: KeyboardEvent, element: 'slider' | 'input'];
  /** Enter key pressed in input field */
  'enter': [value: BSliderInputValue];
  /** Escape key pressed */
  'escape': [];
  /** Slider drag started */
  'drag-start': [value: number, event: MouseEvent | TouchEvent];
  /** Slider drag ended */
  'drag-end': [value: number, event: MouseEvent | TouchEvent];
  /** Slider interaction started */
  'interaction-start': [value: number, mode: BSliderInputInteractionMode];
  /** Slider interaction ended */
  'interaction-end': [value: number, mode: BSliderInputInteractionMode];
  /** Range values changed (for range mode) */
  'range-change': [minValue: number, maxValue: number];
  /** Milestone reached */
  'milestone': [milestone: number, percentage: number];
  /** Boundary reached */
  'boundary-reached': [boundary: 'min' | 'max', value: number];
  /** Accessibility events */
  'accessibility': [type: string, data: any];
  /** Loading state change */
  'loading-change': [loading: boolean];
  /** Focus switched between slider and input */
  'focus-switch': [from: 'slider' | 'input', to: 'slider' | 'input'];
  /** Value formatted for display */
  'format': [value: number, formattedValue: string];
}

/**
 * Slider input validation result
 */
export interface BSliderInputValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Validation state */
  state: BSliderInputValidationState;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Slider input value that was validated */
  value?: BSliderInputValue;
  /** Validation details for slider */
  sliderValidation?: {
    isValid: boolean;
    errors: string[];
  };
  /** Validation details for input */
  inputValidation?: {
    isValid: boolean;
    errors: string[];
  };
}

/**
 * Slider input announcement templates
 */
export interface BSliderInputAnnouncementTemplates {
  /** Template for validation error announcement */
  validationError: string;
  /** Template for validation success announcement */
  validationSuccess: string;
  /** Template for validation pending announcement */
  validationPending: string;
  /** Template for value change announcement */
  valueChanged: string;
  /** Template for boundary reached announcement */
  boundaryReached: string;
  /** Template for milestone reached announcement */
  milestoneReached: string;
  /** Template for range change announcement */
  rangeChanged: string;
  /** Template for focus switch announcement */
  focusSwitched: string;
  /** Template for sync announcement */
  valuesSynced: string;
  /** Template for input validation error */
  inputValidationError: string;
  /** Template for slider validation error */
  sliderValidationError: string;
  /** Template for loading state */
  loadingState: string;
  /** Template for keyboard instructions */
  keyboardInstructions: string;
  /** Template for range instructions */
  rangeInstructions: string;
}

/**
 * Slider input accessibility helpers
 */
export interface BSliderInputAccessibilityHelpers {
  /** Get ARIA describedby relationships */
  getAriaDescribedBy: (props: BSliderInputProps, state: BSliderInputState) => string | undefined;
  /** Get appropriate placeholder text */
  getAccessiblePlaceholder: (unit?: string, placeholder?: string) => string;
  /** Announce validation state change */
  announceValidation: (state: BSliderInputValidationState, message?: string, element?: 'slider' | 'input') => void;
  /** Announce value change */
  announceValueChange: (newValue: number, oldValue: number, source: 'slider' | 'input') => void;
  /** Get validation message for state */
  getValidationMessage: (state: BSliderInputValidationState, errorMessage?: string) => string;
  /** Format value for announcement */
  formatValueForAnnouncement: (value: number, unit?: string) => string;
  /** Get keyboard instructions */
  getKeyboardInstructions: (props: BSliderInputProps) => string;
  /** Announce focus switch */
  announceFocusSwitch: (from: 'slider' | 'input', to: 'slider' | 'input') => void;
  /** Announce synchronization */
  announceSynchronization: (sliderValue: number, inputValue: string) => void;
}

/**
 * Default configurations
 */
export const DEFAULT_SLIDER_INPUT_KEYBOARD_CONFIG: Required<BSliderInputKeyboardConfig> = {
  enabled: true,
  smallStepKeys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
  largeStepKeys: ['PageUp', 'PageDown'],
  boundaryKeys: ['Home', 'End'],
  switchFocusKeys: ['Tab'],
  smallStepSize: 1,
  largeStepSize: 10,
  preventDefault: true,
  stopPropagation: false,
  shortcuts: {},
  tabSwitchesElements: true,
};

export const DEFAULT_SLIDER_INPUT_ACCESSIBILITY_CONFIG: Required<BSliderInputAccessibilityProps> = {
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  ariaDescription: '',
  announceValidation: true,
  announceValueChanges: true,
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
  screenReaderInstructions: 'Use arrow keys to adjust slider, or type directly in input field',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  autocomplete: '',
  announceRangeBoundaries: true,
  announcePercentage: false,
  announceMilestones: false,
  milestones: [25, 50, 75],
  ariaValueText: (value: number) => value.toString(),
  announcementDelay: 0,
  fieldName: 'Slider Input',
};

export const DEFAULT_SLIDER_INPUT_VALIDATION_CONFIG: Required<BSliderInputValidationConfig> = {
  enabled: true,
  mode: 'onChange',
  validator: undefined,
  debounceTime: 300,
  showFeedback: true,
  announceChanges: true,
  validateInputSeparately: false,
  messages: {
    required: 'This field is required',
    invalid: 'Please enter a valid value',
    belowMin: 'Value is below minimum',
    aboveMax: 'Value is above maximum',
    invalidRange: 'Invalid range values',
    invalidStep: 'Value does not match step increment',
  },
};

export const DEFAULT_SLIDER_INPUT_RANGE_CONFIG: Required<BSliderInputRangeConfig> = {
  enabled: false,
  minValue: 0,
  maxValue: 100,
  allowOverlap: false,
  minDistance: 1,
};

export const DEFAULT_SLIDER_INPUT_FIELD_CONFIG: Required<BSliderInputFieldConfig> = {
  enabled: true,
  placeholder: 'Enter value',
  width: '80px',
  position: 'right',
  readonly: false,
  pattern: '',
  type: 'number',
  decimalPlaces: 0,
  formatNumbers: false,
  numberFormatter: (value: number) => value.toString(),
  numberParser: (value: string) => parseFloat(value) || 0,
};

export const DEFAULT_SLIDER_INPUT_TICK_CONFIG: Required<BSliderInputTickConfig> = {
  showTicks: false,
  showLabels: false,
  positions: [],
  labels: {},
  size: 'medium',
  clickable: false,
};

export const DEFAULT_SLIDER_INPUT_TOOLTIP_CONFIG: Required<BSliderInputTooltipConfig> = {
  enabled: false,
  position: 'top',
  showOnHover: true,
  showOnDrag: true,
  showOnFocus: false,
  formatter: (value: number, unit?: string) => `${value}${unit || ''}`,
  showForBoth: false,
};

export const DEFAULT_SLIDER_INPUT_SYNC_CONFIG: Required<BSliderInputSyncConfig> = {
  debounceTime: 100,
  immediate: false,
  validateOnSync: true,
  syncHandler: (sliderValue: number) => sliderValue,
  roundValues: false,
  roundingPrecision: 2,
};

export const DEFAULT_SLIDER_INPUT_ANNOUNCEMENTS: Required<BSliderInputAnnouncementTemplates> = {
  validationError: 'Error: {message}',
  validationSuccess: 'Slider input is now valid',
  validationPending: 'Validating slider input',
  valueChanged: 'Value changed to {value}',
  boundaryReached: '{boundary} value {limit} reached',
  milestoneReached: 'Milestone reached: {percentage}%',
  rangeChanged: 'Range changed to {min} - {max}',
  focusSwitched: 'Focus moved to {target}',
  valuesSynced: 'Slider and input synchronized',
  inputValidationError: 'Input error: {message}',
  sliderValidationError: 'Slider error: {message}',
  loadingState: 'Slider input is {state}',
  keyboardInstructions: 'Use arrow keys for slider, or type in input field. Tab to switch focus.',
  rangeInstructions: 'Use Tab to switch between minimum and maximum values',
};

/**
 * Slider input size configurations
 */
export const SLIDER_INPUT_SIZE_CONFIG: Record<BSliderInputSize, {
  sliderHeight: string;
  thumbSize: string;
  inputWidth: string;
  inputHeight: string;
  fontSize: string;
  focusRingSize: string;
}> = {
  xs: {
    sliderHeight: '0.375rem',
    thumbSize: '1rem',
    inputWidth: '60px',
    inputHeight: '1.5rem',
    fontSize: '0.75rem',
    focusRingSize: '1px',
  },
  sm: {
    sliderHeight: '0.5rem',
    thumbSize: '1.25rem',
    inputWidth: '70px',
    inputHeight: '2rem',
    fontSize: '0.875rem',
    focusRingSize: '2px',
  },
  md: {
    sliderHeight: '0.75rem',
    thumbSize: '1.5rem',
    inputWidth: '80px',
    inputHeight: '2.5rem',
    fontSize: '1rem',
    focusRingSize: '2px',
  },
  lg: {
    sliderHeight: '1rem',
    thumbSize: '2rem',
    inputWidth: '90px',
    inputHeight: '3rem',
    fontSize: '1.125rem',
    focusRingSize: '3px',
  },
  xl: {
    sliderHeight: '1.25rem',
    thumbSize: '2.5rem',
    inputWidth: '100px',
    inputHeight: '3.5rem',
    fontSize: '1.25rem',
    focusRingSize: '3px',
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BSliderInputAccessibilityProps as AccessibilityProps,
  BSliderInputProps as Props,
  BSliderInputState as State,
  BSliderInputAriaAttributes as AriaAttributes,
  BSliderInputKeyboardConfig as KeyboardConfig,
  BSliderInputValidationConfig as ValidationConfig,
  BSliderInputRangeConfig as RangeConfig,
  BSliderInputFieldConfig as FieldConfig,
  BSliderInputTickConfig as TickConfig,
  BSliderInputTooltipConfig as TooltipConfig,
  BSliderInputSyncConfig as SyncConfig,
  BSliderInputEmits as Emits,
  BSliderInputValidationResult as ValidationResult,
  BSliderInputAnnouncementTemplates as AnnouncementTemplates,
  BSliderInputAccessibilityHelpers as AccessibilityHelpers,
};
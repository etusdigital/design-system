/**
 * BFormField accessibility props interface
 * Implements WCAG 2.1 AA standards for form field wrappers
 */
export interface BFormFieldAccessibilityProps {
  /** ARIA label for the field wrapper */
  ariaLabel?: string;
  /** ID of element that labels this field */
  ariaLabelledBy?: string;
  /** ID of element that describes this field */
  ariaDescribedBy?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Whether to announce validation changes to screen readers */
  announceValidation?: boolean;
  /** Whether to announce hint text */
  announceHints?: boolean;
  /** Custom error announcement message */
  customErrorAnnouncement?: string;
  /** Custom success announcement message */
  customSuccessAnnouncement?: string;
  /** Field role (for complex fields) */
  role?: 'group' | 'radiogroup' | 'listbox' | 'grid' | undefined;
  /** Whether field is part of a fieldset */
  fieldset?: boolean;
  /** Fieldset legend text */
  legend?: string;
  /** High contrast mode support */
  highContrast?: boolean;
  /** Reduced motion support */
  reduceMotion?: boolean;
  /** Whether to use enhanced focus management */
  enhancedFocus?: boolean;
  /** Minimum touch target size (default 44px) */
  minTouchTarget?: boolean;
  /** Screen reader instructions for field interaction */
  screenReaderInstructions?: string;
  /** Live region politeness level for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Whether field supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Context description for complex fields */
  contextDescription?: string;
}

/**
 * Form field validation states
 */
export type BFormFieldValidationState = 'idle' | 'validating' | 'valid' | 'invalid' | 'pending';

/**
 * Form field layout variants
 */
export type BFormFieldLayout = 'stacked' | 'horizontal' | 'inline' | 'floating';

/**
 * Form field size variants
 */
export type BFormFieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Label position options
 */
export type BFormFieldLabelPosition = 'top' | 'left' | 'right' | 'floating' | 'hidden';

/**
 * Error display modes
 */
export type BFormFieldErrorDisplay = 'inline' | 'tooltip' | 'summary' | 'hidden';

/**
 * Form field state interface
 */
export interface BFormFieldState {
  /** Field name/key */
  name: string;
  /** Field value */
  value: any;
  /** Previous field value */
  previousValue: any;
  /** Whether field has focus */
  hasFocus: boolean;
  /** Whether field has been touched */
  isTouched: boolean;
  /** Whether field value has changed */
  isDirty: boolean;
  /** Whether field is being validated */
  isValidating: boolean;
  /** Whether field is disabled */
  isDisabled: boolean;
  /** Whether field is readonly */
  isReadonly: boolean;
  /** Whether field is required */
  isRequired: boolean;
  /** Current validation state */
  validationState: BFormFieldValidationState;
  /** Field error messages */
  errors: string[];
  /** Field warning messages */
  warnings: string[];
  /** Field success messages */
  successes: string[];
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Field element reference */
  fieldElement: HTMLElement | null;
  /** Label element reference */
  labelElement: HTMLElement | null;
  /** Error element reference */
  errorElement: HTMLElement | null;
  /** Hint element reference */
  hintElement: HTMLElement | null;
}

/**
 * Form field ARIA attributes interface
 */
export interface BFormFieldAriaAttributes {
  /** Field group role */
  role?: 'group' | 'radiogroup' | 'listbox' | 'grid';
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelled by */
  'aria-labelledby'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** ARIA invalid state */
  'aria-invalid'?: boolean;
  /** ARIA required state */
  'aria-required'?: boolean;
  /** ARIA busy state */
  'aria-busy'?: boolean;
  /** ARIA live region */
  'aria-live'?: 'polite' | 'assertive' | 'off';
  /** ARIA atomic updates */
  'aria-atomic'?: boolean;
  /** ARIA relevant updates */
  'aria-relevant'?: string;
}

/**
 * Form field keyboard configuration
 */
export interface BFormFieldKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for field navigation */
  navigationKeys?: string[];
  /** Keys for field activation */
  activationKeys?: string[];
  /** Keys for field validation */
  validationKeys?: string[];
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom keyboard shortcuts */
  shortcuts?: Record<string, (event: KeyboardEvent) => void>;
}

/**
 * Form field validation configuration
 */
export interface BFormFieldValidationConfig {
  /** Whether validation is enabled */
  enabled?: boolean;
  /** Validation trigger */
  trigger?: 'blur' | 'change' | 'submit' | 'realtime' | 'manual';
  /** Custom validation function */
  validator?: (value: any) => boolean | string;
  /** Whether to show validation feedback */
  showFeedback?: boolean;
  /** Whether to announce validation changes */
  announceChanges?: boolean;
  /** Validation debounce time */
  debounceTime?: number;
  /** Custom validation messages */
  messages?: {
    required?: string;
    invalid?: string;
    success?: string;
  };
}

/**
 * Form field tooltip configuration
 */
export interface BFormFieldTooltipConfig {
  /** Whether tooltip is enabled */
  enabled?: boolean;
  /** Tooltip content */
  content?: string;
  /** Tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Tooltip trigger */
  trigger?: 'hover' | 'focus' | 'click';
  /** Tooltip delay */
  delay?: number;
  /** Whether tooltip is interactive */
  interactive?: boolean;
}

/**
 * Form field event interfaces
 */
export interface BFormFieldFocusEvent {
  /** Field name */
  name: string;
  /** Field value */
  value: any;
  /** Field state */
  state: BFormFieldState;
  /** Original focus event */
  originalEvent: FocusEvent;
}

export interface BFormFieldBlurEvent {
  /** Field name */
  name: string;
  /** Field value */
  value: any;
  /** Field state */
  state: BFormFieldState;
  /** Original blur event */
  originalEvent: FocusEvent;
}

export interface BFormFieldChangeEvent {
  /** Field name */
  name: string;
  /** New field value */
  newValue: any;
  /** Previous field value */
  previousValue: any;
  /** Field state */
  state: BFormFieldState;
  /** Original change event */
  originalEvent: Event;
}

export interface BFormFieldValidationEvent {
  /** Field name */
  name: string;
  /** Validation state */
  validationState: BFormFieldValidationState;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Success messages */
  successes: string[];
  /** Field state */
  state: BFormFieldState;
}

/**
 * Complete BFormField props interface
 */
export interface BFormFieldProps extends BFormFieldAccessibilityProps {
  /** Field name (required for form integration) */
  name: string;
  /** Field label text */
  label?: string;
  /** Field hint/help text */
  hint?: string;
  /** Field error message */
  error?: string;
  /** Field success message */
  success?: string;
  /** Field warning message */
  warning?: string;
  /** Whether field is required */
  required?: boolean;
  /** Whether field is disabled */
  disabled?: boolean;
  /** Whether field is readonly */
  readonly?: boolean;
  /** Whether field is loading */
  loading?: boolean;
  /** Field layout variant */
  layout?: BFormFieldLayout;
  /** Field size variant */
  size?: BFormFieldSize;
  /** Label position */
  labelPosition?: BFormFieldLabelPosition;
  /** Error display mode */
  errorDisplay?: BFormFieldErrorDisplay;
  /** Whether to show required indicator */
  showRequired?: boolean;
  /** Whether to show optional indicator */
  showOptional?: boolean;
  /** Required indicator text */
  requiredText?: string;
  /** Optional indicator text */
  optionalText?: string;
  /** Field CSS classes */
  class?: string;
  /** Field inline styles */
  style?: string | Record<string, any>;
  /** Label CSS classes */
  labelClass?: string;
  /** Hint CSS classes */
  hintClass?: string;
  /** Error CSS classes */
  errorClass?: string;
  /** Validation configuration */
  validationConfig?: BFormFieldValidationConfig;
  /** Keyboard configuration */
  keyboardConfig?: BFormFieldKeyboardConfig;
  /** Tooltip configuration */
  tooltipConfig?: BFormFieldTooltipConfig;
  /** Custom label HTML content */
  labelHtml?: string;
  /** Custom hint HTML content */
  hintHtml?: string;
  /** Custom error HTML content */
  errorHtml?: string;
  /** Field wrapper element tag */
  tag?: string;
  /** Label element tag */
  labelTag?: string;
  /** Whether to auto-generate IDs */
  autoId?: boolean;
  /** Custom field ID */
  fieldId?: string;
  /** Custom label ID */
  labelId?: string;
  /** Custom hint ID */
  hintId?: string;
  /** Custom error ID */
  errorId?: string;
}

/**
 * BFormField emits interface
 */
export interface BFormFieldEmits {
  /** Field focused */
  'focus': [event: BFormFieldFocusEvent];
  /** Field blurred */
  'blur': [event: BFormFieldBlurEvent];
  /** Field value changed */
  'change': [event: BFormFieldChangeEvent];
  /** Field validation state changed */
  'validation': [event: BFormFieldValidationEvent];
  /** Field error state changed */
  'error': [hasError: boolean, errors: string[]];
  /** Field touched state changed */
  'touched': [isTouched: boolean];
  /** Field dirty state changed */
  'dirty': [isDirty: boolean];
  /** Field loading state changed */
  'loading': [isLoading: boolean];
}

/**
 * Form field announcement templates
 */
export interface BFormFieldAnnouncementTemplates {
  /** Field required */
  fieldRequired: string;
  /** Field optional */
  fieldOptional: string;
  /** Field error */
  fieldError: string;
  /** Field success */
  fieldSuccess: string;
  /** Field warning */
  fieldWarning: string;
  /** Field hint */
  fieldHint: string;
  /** Validation started */
  validationStart: string;
  /** Validation complete */
  validationComplete: string;
}

/**
 * Default configurations
 */
export const DEFAULT_FORM_FIELD_VALIDATION_CONFIG: Required<BFormFieldValidationConfig> = {
  enabled: true,
  trigger: 'blur',
  validator: undefined,
  showFeedback: true,
  announceChanges: true,
  debounceTime: 300,
  messages: {
    required: 'This field is required',
    invalid: 'Please enter a valid value',
    success: 'Valid',
  },
};

export const DEFAULT_FORM_FIELD_KEYBOARD_CONFIG: Required<BFormFieldKeyboardConfig> = {
  enabled: true,
  navigationKeys: ['Tab', 'ArrowUp', 'ArrowDown'],
  activationKeys: ['Enter', 'Space'],
  validationKeys: ['Tab'],
  preventDefault: false,
  stopPropagation: false,
  shortcuts: {},
};

export const DEFAULT_FORM_FIELD_TOOLTIP_CONFIG: Required<BFormFieldTooltipConfig> = {
  enabled: false,
  content: '',
  position: 'top',
  trigger: 'hover',
  delay: 200,
  interactive: false,
};

export const DEFAULT_FORM_FIELD_ACCESSIBILITY_CONFIG: Required<BFormFieldAccessibilityProps> = {
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  ariaDescription: '',
  announceValidation: true,
  announceHints: true,
  customErrorAnnouncement: '',
  customSuccessAnnouncement: '',
  role: undefined,
  fieldset: false,
  legend: '',
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: '',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  contextDescription: '',
};

export const DEFAULT_FORM_FIELD_ANNOUNCEMENTS: Required<BFormFieldAnnouncementTemplates> = {
  fieldRequired: 'Required field',
  fieldOptional: 'Optional field',
  fieldError: 'Error: {message}',
  fieldSuccess: 'Success: {message}',
  fieldWarning: 'Warning: {message}',
  fieldHint: 'Hint: {message}',
  validationStart: 'Validating field',
  validationComplete: 'Field validation complete',
};

/**
 * Form field layout configurations
 */
export const FORM_FIELD_LAYOUT_CONFIG: Record<BFormFieldLayout, {
  direction: 'column' | 'row';
  labelPosition: BFormFieldLabelPosition;
  spacing: string;
  alignment: 'start' | 'center' | 'end';
}> = {
  stacked: {
    direction: 'column',
    labelPosition: 'top',
    spacing: '0.25rem',
    alignment: 'start',
  },
  horizontal: {
    direction: 'row',
    labelPosition: 'left',
    spacing: '1rem',
    alignment: 'center',
  },
  inline: {
    direction: 'row',
    labelPosition: 'left',
    spacing: '0.5rem',
    alignment: 'center',
  },
  floating: {
    direction: 'column',
    labelPosition: 'floating',
    spacing: '0',
    alignment: 'start',
  },
};

/**
 * Form field size configurations
 */
export const FORM_FIELD_SIZE_CONFIG: Record<BFormFieldSize, {
  labelSize: string;
  hintSize: string;
  errorSize: string;
  spacing: string;
  minHeight: string;
}> = {
  xs: {
    labelSize: '0.75rem',
    hintSize: '0.65rem',
    errorSize: '0.65rem',
    spacing: '0.25rem',
    minHeight: '1.5rem',
  },
  sm: {
    labelSize: '0.875rem',
    hintSize: '0.75rem',
    errorSize: '0.75rem',
    spacing: '0.375rem',
    minHeight: '2rem',
  },
  md: {
    labelSize: '0.875rem',
    hintSize: '0.75rem',
    errorSize: '0.75rem',
    spacing: '0.5rem',
    minHeight: '2.5rem',
  },
  lg: {
    labelSize: '1rem',
    hintSize: '0.875rem',
    errorSize: '0.875rem',
    spacing: '0.625rem',
    minHeight: '3rem',
  },
  xl: {
    labelSize: '1.125rem',
    hintSize: '1rem',
    errorSize: '1rem',
    spacing: '0.75rem',
    minHeight: '3.5rem',
  },
};

/**
 * Label position configurations
 */
export const LABEL_POSITION_CONFIG: Record<BFormFieldLabelPosition, {
  containerDirection: 'column' | 'row';
  labelOrder: number;
  fieldOrder: number;
  labelAlignment: 'start' | 'center' | 'end';
  labelWidth?: string;
}> = {
  top: {
    containerDirection: 'column',
    labelOrder: 1,
    fieldOrder: 2,
    labelAlignment: 'start',
  },
  left: {
    containerDirection: 'row',
    labelOrder: 1,
    fieldOrder: 2,
    labelAlignment: 'center',
    labelWidth: '25%',
  },
  right: {
    containerDirection: 'row',
    labelOrder: 2,
    fieldOrder: 1,
    labelAlignment: 'center',
    labelWidth: '25%',
  },
  floating: {
    containerDirection: 'column',
    labelOrder: 1,
    fieldOrder: 1,
    labelAlignment: 'start',
  },
  hidden: {
    containerDirection: 'column',
    labelOrder: 0,
    fieldOrder: 1,
    labelAlignment: 'start',
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BFormFieldAccessibilityProps as AccessibilityProps,
  BFormFieldProps as Props,
  BFormFieldState as State,
  BFormFieldAriaAttributes as AriaAttributes,
  BFormFieldKeyboardConfig as KeyboardConfig,
  BFormFieldValidationConfig as ValidationConfig,
  BFormFieldTooltipConfig as TooltipConfig,
  BFormFieldEmits as Emits,
  BFormFieldFocusEvent as FocusEvent,
  BFormFieldBlurEvent as BlurEvent,
  BFormFieldChangeEvent as ChangeEvent,
  BFormFieldValidationEvent as ValidationEvent,
  BFormFieldAnnouncementTemplates as AnnouncementTemplates,
};
/**
 * BForm accessibility props interface
 * Implements WCAG 2.1 AA standards for form components
 */
export interface BFormAccessibilityProps {
  /** ARIA label for the form */
  ariaLabel?: string;
  /** ID of element that labels this form */
  ariaLabelledBy?: string;
  /** ID of element that describes this form */
  ariaDescribedBy?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Whether to announce validation changes to screen readers */
  announceValidation?: boolean;
  /** Whether to announce form submission states */
  announceSubmission?: boolean;
  /** Custom error announcement message */
  customErrorAnnouncement?: string;
  /** Custom success announcement message */
  customSuccessAnnouncement?: string;
  /** Help text for complex forms */
  helpText?: string;
  /** Whether the form is part of a multi-step process */
  multiStep?: boolean;
  /** Current step number (1-based) */
  currentStep?: number;
  /** Total number of steps */
  totalSteps?: number;
  /** High contrast mode support */
  highContrast?: boolean;
  /** Reduced motion support */
  reduceMotion?: boolean;
  /** Whether to use enhanced focus management */
  enhancedFocus?: boolean;
  /** Minimum touch target size (default 44px) */
  minTouchTarget?: boolean;
  /** Screen reader instructions for form interaction */
  screenReaderInstructions?: string;
  /** Live region politeness level for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Whether form supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Whether to group related fields with fieldset/legend */
  useFieldGroups?: boolean;
}

/**
 * Form validation modes
 */
export type BFormValidationMode = 'submit' | 'blur' | 'change' | 'realtime' | 'manual';

/**
 * Form validation states
 */
export type BFormValidationState = 'idle' | 'validating' | 'valid' | 'invalid' | 'pending';

/**
 * Form submission states
 */
export type BFormSubmissionState = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Form field validation result
 */
export interface BFormFieldValidation {
  /** Field name/key */
  name: string;
  /** Whether field is valid */
  isValid: boolean;
  /** Validation state */
  state: BFormValidationState;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Field value that was validated */
  value?: any;
  /** Field element reference */
  element?: HTMLElement;
}

/**
 * Form validation configuration
 */
export interface BFormValidationConfig {
  /** Whether validation is enabled */
  enabled?: boolean;
  /** Validation mode */
  mode?: BFormValidationMode;
  /** Whether to show validation feedback */
  showFeedback?: boolean;
  /** Whether to announce validation changes */
  announceChanges?: boolean;
  /** Debounce time for real-time validation */
  debounceTime?: number;
  /** Whether to scroll to first error on validation */
  scrollToError?: boolean;
  /** Scroll behavior configuration */
  scrollBehavior?: ScrollBehavior;
  /** Scroll offset from top */
  scrollOffset?: number;
  /** Whether to focus first error field */
  focusError?: boolean;
  /** Whether to validate on mount */
  validateOnMount?: boolean;
  /** Custom validation function */
  validator?: (formData: Record<string, any>) => BFormValidationResult;
  /** Field-specific validation rules */
  fieldValidators?: Record<string, (value: any) => boolean | string>;
}

/**
 * Form submission configuration
 */
export interface BFormSubmissionConfig {
  /** Custom submission handler */
  handler?: (formData: Record<string, any>) => Promise<any> | any;
  /** HTTP method for form submission */
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  /** Form action URL */
  action?: string;
  /** Request headers */
  headers?: Record<string, string>;
  /** Whether to prevent default form submission */
  preventDefault?: boolean;
  /** Whether to disable form during submission */
  disableOnSubmit?: boolean;
  /** Whether to reset form after successful submission */
  resetAfterSubmit?: boolean;
  /** Success message to show */
  successMessage?: string;
  /** Error message template */
  errorMessage?: string;
  /** Submission timeout in milliseconds */
  timeout?: number;
  /** Retry configuration */
  retry?: {
    enabled: boolean;
    attempts: number;
    delay: number;
  };
}

/**
 * Form state interface
 */
export interface BFormState {
  /** Form data values */
  data: Record<string, any>;
  /** Previous form data (for dirty checking) */
  previousData: Record<string, any>;
  /** Form validation state */
  validationState: BFormValidationState;
  /** Form submission state */
  submissionState: BFormSubmissionState;
  /** Field validation results */
  fieldValidations: Record<string, BFormFieldValidation>;
  /** Whether form has been touched */
  isTouched: boolean;
  /** Whether form data has changed */
  isDirty: boolean;
  /** Whether form is currently being validated */
  isValidating: boolean;
  /** Whether form is currently being submitted */
  isSubmitting: boolean;
  /** Whether form is disabled */
  isDisabled: boolean;
  /** Whether form is readonly */
  isReadonly: boolean;
  /** Number of validation errors */
  errorCount: number;
  /** Number of validation warnings */
  warningCount: number;
  /** Currently focused field */
  focusedField: string | null;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Form element reference */
  formElement: HTMLFormElement | null;
  /** Last submission error */
  lastError: Error | null;
  /** Last submission result */
  lastResult: any;
}

/**
 * Form validation result
 */
export interface BFormValidationResult {
  /** Whether entire form is valid */
  isValid: boolean;
  /** Overall validation state */
  state: BFormValidationState;
  /** Field validation results */
  fields: Record<string, BFormFieldValidation>;
  /** Global form errors */
  errors: string[];
  /** Global form warnings */
  warnings: string[];
  /** Form data that was validated */
  data?: Record<string, any>;
  /** Validation timestamp */
  timestamp?: number;
}

/**
 * Form ARIA attributes interface
 */
export interface BFormAriaAttributes {
  /** Form role */
  role?: 'form' | 'search' | 'dialog';
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelled by */
  'aria-labelledby'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** ARIA invalid state */
  'aria-invalid'?: boolean;
  /** ARIA busy state */
  'aria-busy'?: boolean;
  /** ARIA live region */
  'aria-live'?: 'polite' | 'assertive' | 'off';
  /** ARIA atomic updates */
  'aria-atomic'?: boolean;
  /** ARIA relevant updates */
  'aria-relevant'?: string;
  /** Tab index */
  tabindex?: number;
  /** Auto-complete */
  autocomplete?: 'on' | 'off';
  /** No validate */
  novalidate?: boolean;
}

/**
 * Form keyboard configuration
 */
export interface BFormKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for form submission */
  submitKeys?: string[];
  /** Keys for form reset */
  resetKeys?: string[];
  /** Keys for next field navigation */
  nextFieldKeys?: string[];
  /** Keys for previous field navigation */
  previousFieldKeys?: string[];
  /** Keys for first field navigation */
  firstFieldKeys?: string[];
  /** Keys for last field navigation */
  lastFieldKeys?: string[];
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom keyboard shortcuts */
  shortcuts?: Record<string, (event: KeyboardEvent) => void>;
  /** Whether to enable field group navigation */
  enableGroupNavigation?: boolean;
  /** Keys for navigating between field groups */
  groupNavigationKeys?: string[];
}

/**
 * Form event interfaces
 */
export interface BFormChangeEvent {
  /** Field name that changed */
  fieldName: string;
  /** New field value */
  newValue: any;
  /** Previous field value */
  previousValue: any;
  /** Complete form data */
  formData: Record<string, any>;
  /** Form state */
  formState: BFormState;
  /** Original event */
  originalEvent: Event;
}

export interface BFormSubmitEvent {
  /** Form data being submitted */
  data: Record<string, any>;
  /** Form validation result */
  validation: BFormValidationResult;
  /** Form state */
  state: BFormState;
  /** Prevention callback */
  preventDefault: () => void;
  /** Whether default was prevented */
  defaultPrevented: boolean;
}

export interface BFormValidationEvent {
  /** Validation result */
  result: BFormValidationResult;
  /** Validation trigger */
  trigger: BFormValidationMode;
  /** Form state */
  state: BFormState;
  /** Validation timestamp */
  timestamp: number;
}

export interface BFormResetEvent {
  /** Previous form data */
  previousData: Record<string, any>;
  /** Reset form data */
  resetData: Record<string, any>;
  /** Form state */
  state: BFormState;
  /** Prevention callback */
  preventDefault: () => void;
}

/**
 * Form field registration interface
 */
export interface BFormFieldRegistration {
  /** Field name/key */
  name: string;
  /** Field element */
  element: HTMLElement;
  /** Field component instance */
  component?: any;
  /** Field validator function */
  validator?: (value: any) => boolean | string;
  /** Whether field is required */
  required?: boolean;
  /** Field group name */
  group?: string;
  /** Field dependencies */
  dependencies?: string[];
  /** Custom field options */
  options?: Record<string, any>;
}

/**
 * Complete BForm props interface
 */
export interface BFormProps extends BFormAccessibilityProps {
  /** Form data model */
  modelValue?: Record<string, any>;
  /** Form name attribute */
  name?: string;
  /** Form method */
  method?: 'GET' | 'POST';
  /** Form action */
  action?: string;
  /** Form encoding type */
  enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
  /** Form target */
  target?: '_self' | '_blank' | '_parent' | '_top';
  /** Whether to disable HTML5 validation */
  novalidate?: boolean;
  /** Auto-complete behavior */
  autocomplete?: 'on' | 'off';
  /** Whether the form is disabled */
  disabled?: boolean;
  /** Whether the form is readonly */
  readonly?: boolean;
  /** Whether the form is loading/submitting */
  loading?: boolean;
  /** Validation configuration */
  validationConfig?: BFormValidationConfig;
  /** Submission configuration */
  submissionConfig?: BFormSubmissionConfig;
  /** Keyboard navigation configuration */
  keyboardConfig?: BFormKeyboardConfig;
  /** Form CSS classes */
  class?: string;
  /** Form inline styles */
  style?: string | Record<string, any>;
  /** Whether to show error summary */
  showErrorSummary?: boolean;
  /** Error summary position */
  errorSummaryPosition?: 'top' | 'bottom';
  /** Whether to show success message */
  showSuccessMessage?: boolean;
  /** Custom success message */
  successMessage?: string;
  /** Custom error message */
  errorMessage?: string;
  /** Form layout orientation */
  layout?: 'vertical' | 'horizontal' | 'inline';
  /** Form size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Form spacing variant */
  spacing?: 'none' | 'compact' | 'normal' | 'comfortable' | 'spacious';
  /** Whether to auto-save form data */
  autoSave?: boolean;
  /** Auto-save debounce time */
  autoSaveDelay?: number;
  /** Auto-save storage key */
  autoSaveKey?: string;
}

/**
 * BForm emits interface
 */
export interface BFormEmits {
  /** Model value updated */
  'update:modelValue': [data: Record<string, any>];
  /** Form submitted */
  'submit': [event: BFormSubmitEvent];
  /** Form reset */
  'reset': [event: BFormResetEvent];
  /** Form field changed */
  'change': [event: BFormChangeEvent];
  /** Form validation state changed */
  'validation': [event: BFormValidationEvent];
  /** Form becomes valid */
  'valid': [result: BFormValidationResult];
  /** Form becomes invalid */
  'invalid': [result: BFormValidationResult];
  /** Form submission started */
  'submit-start': [data: Record<string, any>];
  /** Form submission succeeded */
  'submit-success': [result: any];
  /** Form submission failed */
  'submit-error': [error: Error];
  /** Form field focused */
  'field-focus': [fieldName: string, element: HTMLElement];
  /** Form field blurred */
  'field-blur': [fieldName: string, element: HTMLElement];
  /** Form field registered */
  'field-register': [registration: BFormFieldRegistration];
  /** Form field unregistered */
  'field-unregister': [fieldName: string];
  /** Form became dirty */
  'dirty': [isDirty: boolean];
  /** Form became touched */
  'touched': [isTouched: boolean];
  /** Auto-save triggered */
  'auto-save': [data: Record<string, any>];
}

/**
 * Form announcement templates
 */
export interface BFormAnnouncementTemplates {
  /** Form validation started */
  validationStart: string;
  /** Form validation completed */
  validationComplete: string;
  /** Form became valid */
  formValid: string;
  /** Form became invalid */
  formInvalid: string;
  /** Form submission started */
  submissionStart: string;
  /** Form submission succeeded */
  submissionSuccess: string;
  /** Form submission failed */
  submissionError: string;
  /** Form reset */
  formReset: string;
  /** Field error */
  fieldError: string;
  /** Field success */
  fieldSuccess: string;
  /** Auto-save */
  autoSave: string;
}

/**
 * Default configurations
 */
export const DEFAULT_FORM_VALIDATION_CONFIG: Required<BFormValidationConfig> = {
  enabled: true,
  mode: 'submit',
  showFeedback: true,
  announceChanges: true,
  debounceTime: 300,
  scrollToError: true,
  scrollBehavior: 'smooth',
  scrollOffset: 80,
  focusError: true,
  validateOnMount: false,
  validator: undefined,
  fieldValidators: {},
};

export const DEFAULT_FORM_SUBMISSION_CONFIG: Required<BFormSubmissionConfig> = {
  handler: undefined,
  method: 'POST',
  action: '',
  headers: {},
  preventDefault: true,
  disableOnSubmit: true,
  resetAfterSubmit: false,
  successMessage: 'Form submitted successfully',
  errorMessage: 'Form submission failed',
  timeout: 30000,
  retry: {
    enabled: false,
    attempts: 3,
    delay: 1000,
  },
};

export const DEFAULT_FORM_KEYBOARD_CONFIG: Required<BFormKeyboardConfig> = {
  enabled: true,
  submitKeys: ['Enter'],
  resetKeys: ['Escape'],
  nextFieldKeys: ['Tab', 'ArrowDown'],
  previousFieldKeys: ['ArrowUp'],
  firstFieldKeys: ['Home'],
  lastFieldKeys: ['End'],
  preventDefault: false,
  stopPropagation: false,
  shortcuts: {},
  enableGroupNavigation: false,
  groupNavigationKeys: ['ArrowLeft', 'ArrowRight'],
};

export const DEFAULT_FORM_ACCESSIBILITY_CONFIG: Required<BFormAccessibilityProps> = {
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  ariaDescription: '',
  announceValidation: true,
  announceSubmission: true,
  customErrorAnnouncement: '',
  customSuccessAnnouncement: '',
  helpText: '',
  multiStep: false,
  currentStep: 1,
  totalSteps: 1,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: '',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  useFieldGroups: true,
};

export const DEFAULT_FORM_ANNOUNCEMENTS: Required<BFormAnnouncementTemplates> = {
  validationStart: 'Validating form',
  validationComplete: 'Form validation complete',
  formValid: 'Form is valid',
  formInvalid: 'Form has {count} error(s)',
  submissionStart: 'Submitting form',
  submissionSuccess: 'Form submitted successfully',
  submissionError: 'Form submission failed: {error}',
  formReset: 'Form has been reset',
  fieldError: 'Field {name} has error: {message}',
  fieldSuccess: 'Field {name} is valid',
  autoSave: 'Form auto-saved',
};

/**
 * Form size configurations
 */
export const FORM_SIZE_CONFIG: Record<string, {
  fieldSpacing: string;
  fontSize: string;
  padding: string;
  borderRadius: string;
}> = {
  xs: {
    fieldSpacing: '0.5rem',
    fontSize: '0.75rem',
    padding: '0.5rem',
    borderRadius: '0.25rem',
  },
  sm: {
    fieldSpacing: '0.75rem',
    fontSize: '0.875rem',
    padding: '0.75rem',
    borderRadius: '0.375rem',
  },
  md: {
    fieldSpacing: '1rem',
    fontSize: '1rem',
    padding: '1rem',
    borderRadius: '0.5rem',
  },
  lg: {
    fieldSpacing: '1.25rem',
    fontSize: '1.125rem',
    padding: '1.25rem',
    borderRadius: '0.625rem',
  },
  xl: {
    fieldSpacing: '1.5rem',
    fontSize: '1.25rem',
    padding: '1.5rem',
    borderRadius: '0.75rem',
  },
};

/**
 * Form layout configurations
 */
export const FORM_LAYOUT_CONFIG: Record<string, {
  direction: 'column' | 'row';
  fieldLayout: 'stacked' | 'inline' | 'horizontal';
  labelPosition: 'top' | 'left' | 'right';
}> = {
  vertical: {
    direction: 'column',
    fieldLayout: 'stacked',
    labelPosition: 'top',
  },
  horizontal: {
    direction: 'column',
    fieldLayout: 'horizontal',
    labelPosition: 'left',
  },
  inline: {
    direction: 'row',
    fieldLayout: 'inline',
    labelPosition: 'left',
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BFormAccessibilityProps as AccessibilityProps,
  BFormProps as Props,
  BFormState as State,
  BFormAriaAttributes as AriaAttributes,
  BFormKeyboardConfig as KeyboardConfig,
  BFormValidationConfig as ValidationConfig,
  BFormSubmissionConfig as SubmissionConfig,
  BFormEmits as Emits,
  BFormValidationResult as ValidationResult,
  BFormAnnouncementTemplates as AnnouncementTemplates,
  BFormFieldValidation as FieldValidation,
  BFormFieldRegistration as FieldRegistration,
  BFormChangeEvent as ChangeEvent,
  BFormSubmitEvent as SubmitEvent,
  BFormValidationEvent as ValidationEvent,
  BFormResetEvent as ResetEvent,
};
/**
 * BInput accessibility props interface
 * Implements WCAG 2.1 AA standards for input components
 */
export interface BInputAccessibilityProps {
  /** ARIA label for the input */
  ariaLabel?: string;
  /** ID of element that labels this input */
  ariaLabelledBy?: string;
  /** ID of element that describes this input */
  ariaDescribedBy?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Whether to announce validation changes to screen readers */
  announceValidation?: boolean;
  /** Whether to announce character count changes */
  announceCharacterCount?: boolean;
  /** Custom error announcement message */
  customErrorAnnouncement?: string;
  /** Custom success announcement message */
  customSuccessAnnouncement?: string;
  /** Help text for complex input patterns */
  helpText?: string;
  /** Whether the input is part of a group */
  groupRole?: 'group' | 'radiogroup' | 'listbox' | undefined;
  /** ARIA expanded state for inputs with dropdown behavior */
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
  /** Whether input supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Auto-complete attribute for better UX */
  autocomplete?: string;
}

/**
 * Input component types
 */
export type BInputType = 'text' | 'number' | 'search' | 'color' | 'password' | 'file' | 'email' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local';

/**
 * Available input masks
 */
export type BInputMask = 'cpf' | 'cnpj' | 'cep' | 'domain' | 'url' | 'phone' | 'credit-card' | 'custom';

/**
 * Component sizes
 */
export type BInputSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '100';

/**
 * Text alignment options
 */
export type BInputTextAlign = 'start' | 'center' | 'end';

/**
 * Input value type - can be string, number, or File depending on input type
 */
export type BInputValue = string | number | File;

/**
 * Input validation states
 */
export type BInputValidationState = 'valid' | 'invalid' | 'pending' | 'none';

/**
 * Input loading states
 */
export type BInputLoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Input state interface for accessibility
 */
export interface BInputState {
  /** Whether input has focus */
  hasFocus: boolean;
  /** Whether input has error */
  hasError: boolean;
  /** Whether input is being validated */
  isValidating: boolean;
  /** Current validation state */
  validationState: BInputValidationState;
  /** Current character count */
  characterCount: number;
  /** Whether input is disabled */
  isDisabled: boolean;
  /** Whether input is required */
  isRequired: boolean;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Current input value */
  value: BInputValue | undefined;
  /** Whether input has content */
  hasContent: boolean;
  /** Whether input is in loading state */
  isLoading: boolean;
  /** File upload state (for file inputs) */
  fileState?: {
    hasFile: boolean;
    fileName: string;
    isDragging: boolean;
  };
}

/**
 * Input ARIA attributes interface
 */
export interface BInputAriaAttributes {
  /** Unique ID for the input */
  id: string;
  /** ARIA role */
  role?: string;
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
  /** ARIA autocomplete */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  /** Tab index for keyboard navigation */
  tabindex?: number;
  /** Auto-complete attribute */
  autocomplete?: string;
}

/**
 * Input keyboard configuration
 */
export interface BInputKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for submitting input */
  submitKeys?: string[];
  /** Keys for clearing input */
  clearKeys?: string[];
  /** Keys for showing/hiding password */
  togglePasswordKeys?: string[];
  /** Keys for number increment/decrement */
  numberControlKeys?: string[];
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom keyboard shortcuts */
  shortcuts?: Record<string, () => void>;
}

/**
 * Input validation configuration
 */
export interface BInputValidationConfig {
  /** Whether validation is enabled */
  enabled?: boolean;
  /** Validation mode */
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'realtime';
  /** Custom validation function */
  validator?: (value: BInputValue | undefined) => boolean | string;
  /** Debounce time for real-time validation */
  debounceTime?: number;
  /** Whether to show validation feedback */
  showFeedback?: boolean;
  /** Whether to announce validation changes */
  announceChanges?: boolean;
  /** Custom validation messages */
  messages?: {
    required?: string;
    invalid?: string;
    tooShort?: string;
    tooLong?: string;
    pattern?: string;
    min?: string;
    max?: string;
  };
}

/**
 * File input configuration
 */
export interface BInputFileConfig {
  /** Accepted file types */
  accept?: string;
  /** Whether to allow multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Whether drag and drop is enabled */
  dragDrop?: boolean;
  /** Custom file validation */
  validator?: (file: File) => boolean | string;
  /** Whether to show file preview */
  showPreview?: boolean;
}

/**
 * Complete BInput props interface
 */
export interface BInputProps extends BInputAccessibilityProps {
  /** Input value */
  modelValue?: BInputValue;
  /** Label text for the input */
  labelValue?: string;
  /** Input type */
  type?: BInputType;
  /** Input mask for formatting */
  mask?: BInputMask;
  /** Maximum value (for number inputs) or length (for text inputs) */
  max?: number;
  /** Minimum value (for number inputs) or length (for text inputs) */
  min?: number;
  /** Step value for number inputs */
  step?: number;
  /** Error message to display */
  errorMessage?: string;
  /** Info message to display */
  infoMessage?: string;
  /** Input size variant */
  size?: BInputSize;
  /** Whether to render as textarea */
  isTextArea?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input has error state */
  isError?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Text alignment */
  textAlign?: BInputTextAlign;
  /** Minimum width for tooltip */
  tooltipMinWidth?: string;
  /** Icon to display */
  icon?: string;
  /** Whether to append icon instead of prepend */
  appendIcon?: boolean;
  /** Loading state for async validation */
  loading?: boolean;
  /** Validation state for screen reader feedback */
  validationState?: BInputValidationState;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BInputKeyboardConfig;
  /** Validation configuration */
  validationConfig?: BInputValidationConfig;
  /** File input configuration */
  fileConfig?: BInputFileConfig;
  /** Custom input attributes */
  inputAttrs?: Record<string, any>;
  /** Whether to auto-focus on mount */
  autoFocus?: boolean;
  /** Whether input is readonly */
  readonly?: boolean;
  /** Rows for textarea */
  rows?: number;
  /** Resize behavior for textarea */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  /** Spellcheck attribute */
  spellcheck?: boolean;
}

/**
 * BInput emits interface
 */
export interface BInputEmits {
  /** Model value updated */
  'update:modelValue': [value: BInputValue | undefined];
  /** Input focused */
  'focus': [event: FocusEvent];
  /** Input blurred */
  'blur': [event: FocusEvent];
  /** Input value changed */
  'input': [value: BInputValue | undefined];
  /** Validation state changed */
  'validation-change': [state: BInputValidationState, message?: string];
  /** Character count changed */
  'character-count-change': [count: number, max?: number];
  /** Keyboard event */
  'keydown': [event: KeyboardEvent];
  /** Key up event */
  'keyup': [event: KeyboardEvent];
  /** Enter key pressed */
  'enter': [value: BInputValue | undefined];
  /** Clear button clicked */
  'clear': [];
  /** File selected (for file inputs) */
  'file-select': [file: File | File[]];
  /** File removed */
  'file-remove': [fileName: string];
  /** Drag and drop events */
  'drag-enter': [event: DragEvent];
  'drag-leave': [event: DragEvent];
  'drop': [event: DragEvent];
  /** Password visibility toggled */
  'password-toggle': [visible: boolean];
  /** Number input step events */
  'step-up': [newValue: number];
  'step-down': [newValue: number];
  /** Accessibility events */
  'accessibility': [type: string, data: any];
  /** Loading state change */
  'loading-change': [loading: boolean];
}

/**
 * Input validation result
 */
export interface BInputValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Validation state */
  state: BInputValidationState;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Input value that was validated */
  value?: BInputValue;
}

/**
 * Input announcement templates
 */
export interface BInputAnnouncementTemplates {
  /** Template for validation error announcement */
  validationError: string;
  /** Template for validation success announcement */
  validationSuccess: string;
  /** Template for validation pending announcement */
  validationPending: string;
  /** Template for character count announcement */
  characterCount: string;
  /** Template for character limit reached */
  characterLimitReached: string;
  /** Template for file selection announcement */
  fileSelected: string;
  /** Template for file removal announcement */
  fileRemoved: string;
  /** Template for value change announcement */
  valueChanged: string;
  /** Template for boundary reached announcement */
  boundaryReached: string;
  /** Template for password visibility toggle */
  passwordToggle: string;
  /** Template for loading state */
  loadingState: string;
}

/**
 * Input accessibility helpers
 */
export interface BInputAccessibilityHelpers {
  /** Get ARIA describedby relationships */
  getAriaDescribedBy: (props: BInputProps, state: BInputState) => string | undefined;
  /** Get appropriate placeholder text */
  getAccessiblePlaceholder: (type: BInputType, mask?: BInputMask, placeholder?: string) => string;
  /** Announce validation state change */
  announceValidation: (state: BInputValidationState, message?: string) => void;
  /** Announce character count milestone */
  announceCharacterCount: (count: number, max: number, threshold: number) => void;
  /** Get validation message for state */
  getValidationMessage: (state: BInputValidationState, errorMessage?: string) => string;
}

/**
 * Default configurations
 */
export const DEFAULT_INPUT_KEYBOARD_CONFIG: Required<BInputKeyboardConfig> = {
  enabled: true,
  submitKeys: ['Enter'],
  clearKeys: ['Escape'],
  togglePasswordKeys: [],
  numberControlKeys: ['ArrowUp', 'ArrowDown'],
  preventDefault: false,
  stopPropagation: false,
  shortcuts: {},
};

export const DEFAULT_INPUT_ACCESSIBILITY_CONFIG: Required<BInputAccessibilityProps> = {
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  ariaDescription: '',
  announceValidation: true,
  announceCharacterCount: false,
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
  screenReaderInstructions: '',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  autocomplete: '',
};

export const DEFAULT_INPUT_VALIDATION_CONFIG: Required<BInputValidationConfig> = {
  enabled: true,
  mode: 'onBlur',
  validator: undefined,
  debounceTime: 300,
  showFeedback: true,
  announceChanges: true,
  messages: {
    required: 'This field is required',
    invalid: 'Please enter a valid value',
    tooShort: 'Value is too short',
    tooLong: 'Value is too long',
    pattern: 'Value does not match required pattern',
    min: 'Value is below minimum',
    max: 'Value is above maximum',
  },
};

export const DEFAULT_INPUT_FILE_CONFIG: Required<BInputFileConfig> = {
  accept: '*/*',
  multiple: false,
  maxSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 1,
  dragDrop: true,
  validator: undefined,
  showPreview: false,
};

export const DEFAULT_INPUT_ANNOUNCEMENTS: Required<BInputAnnouncementTemplates> = {
  validationError: 'Error: {message}',
  validationSuccess: 'Input is now valid',
  validationPending: 'Validating input',
  characterCount: '{count} of {max} characters',
  characterLimitReached: 'Character limit reached',
  fileSelected: 'File selected: {fileName}',
  fileRemoved: 'File removed: {fileName}',
  valueChanged: 'Value changed to {value}',
  boundaryReached: '{boundary} value {limit} reached',
  passwordToggle: 'Password is now {state}',
  loadingState: 'Input is {state}',
};

/**
 * Input type configurations with accessibility considerations
 */
export const INPUT_TYPE_CONFIG: Record<BInputType, {
  defaultPlaceholder: string;
  validationPattern?: RegExp;
  requiresValidation: boolean;
  announceChanges: boolean;
  inputMode?: string;
}> = {
  text: {
    defaultPlaceholder: 'Enter text',
    requiresValidation: false,
    announceChanges: false,
  },
  number: {
    defaultPlaceholder: 'Enter number',
    requiresValidation: true,
    announceChanges: true,
    inputMode: 'numeric',
  },
  email: {
    defaultPlaceholder: 'Enter your email address',
    validationPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    requiresValidation: true,
    announceChanges: true,
    inputMode: 'email',
  },
  password: {
    defaultPlaceholder: 'Enter your password',
    requiresValidation: true,
    announceChanges: false,
  },
  tel: {
    defaultPlaceholder: 'Enter phone number',
    requiresValidation: true,
    announceChanges: false,
    inputMode: 'tel',
  },
  url: {
    defaultPlaceholder: 'Enter URL',
    validationPattern: /^https?:\/\/.+/,
    requiresValidation: true,
    announceChanges: false,
    inputMode: 'url',
  },
  search: {
    defaultPlaceholder: 'Search...',
    requiresValidation: false,
    announceChanges: false,
  },
  color: {
    defaultPlaceholder: '#000000',
    requiresValidation: false,
    announceChanges: true,
  },
  file: {
    defaultPlaceholder: 'Choose file or drag and drop',
    requiresValidation: false,
    announceChanges: true,
  },
  date: {
    defaultPlaceholder: 'Select date',
    requiresValidation: false,
    announceChanges: true,
  },
  time: {
    defaultPlaceholder: 'Select time',
    requiresValidation: false,
    announceChanges: true,
  },
  'datetime-local': {
    defaultPlaceholder: 'Select date and time',
    requiresValidation: false,
    announceChanges: true,
  },
};

/**
 * Input mask configurations
 */
export const INPUT_MASK_CONFIG: Record<BInputMask, {
  pattern: string;
  placeholder: string;
  validation?: RegExp;
  maxLength?: number;
}> = {
  cpf: {
    pattern: '000.000.000-00',
    placeholder: 'Enter CPF (000.000.000-00)',
    validation: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    maxLength: 14,
  },
  cnpj: {
    pattern: '00.000.000/0000-00',
    placeholder: 'Enter CNPJ (00.000.000/0000-00)',
    validation: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    maxLength: 18,
  },
  cep: {
    pattern: '00000-000',
    placeholder: 'Enter CEP (00000-000)',
    validation: /^\d{5}-\d{3}$/,
    maxLength: 9,
  },
  phone: {
    pattern: '(00) 00000-0000',
    placeholder: 'Enter phone number',
    validation: /^\(\d{2}\) \d{4,5}-\d{4}$/,
    maxLength: 15,
  },
  'credit-card': {
    pattern: '0000 0000 0000 0000',
    placeholder: 'Enter card number',
    validation: /^\d{4} \d{4} \d{4} \d{4}$/,
    maxLength: 19,
  },
  domain: {
    pattern: '',
    placeholder: 'Enter domain name',
    validation: /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  url: {
    pattern: '',
    placeholder: 'Enter URL',
    validation: /^https?:\/\/.+/,
  },
  custom: {
    pattern: '',
    placeholder: 'Enter value',
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BInputAccessibilityProps as AccessibilityProps,
  BInputProps as Props,
  BInputState as State,
  BInputAriaAttributes as AriaAttributes,
  BInputKeyboardConfig as KeyboardConfig,
  BInputValidationConfig as ValidationConfig,
  BInputFileConfig as FileConfig,
  BInputEmits as Emits,
  BInputValidationResult as ValidationResult,
  BInputAnnouncementTemplates as AnnouncementTemplates,
  BInputAccessibilityHelpers as AccessibilityHelpers,
};
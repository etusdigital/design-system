/**
 * BTagInput accessibility props interface
 * Implements WCAG 2.1 AA standards for tag input components
 */
export interface BTagInputAccessibilityProps {
  /** ARIA label for the tag input */
  ariaLabel?: string;
  /** ID of element that labels this tag input */
  ariaLabelledBy?: string;
  /** ID of element that describes this tag input */
  ariaDescribedBy?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Whether to announce tag changes to screen readers */
  announceChanges?: boolean;
  /** Custom announcement template for tag changes */
  announcementTemplate?: string;
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
  /** Whether to show tag count information */
  showTagCount?: boolean;
  /** Whether to provide detailed tag status */
  announceTagStatus?: boolean;
  /** Live region politeness level for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Role override for the tag input container */
  role?: 'group' | 'application' | 'textbox';
  /** Whether tag input supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to wrap navigation between tags */
  wrapNavigation?: boolean;
  /** Whether to enable type-ahead search */
  typeAheadSearch?: boolean;
}

/**
 * Supported mask types for tag validation
 */
export type BTagInputMask = "cpf" | "cnpj" | "cep" | "domain" | "url" | "email" | "phone" | "custom";

/**
 * Tag validation status
 */
export type BTagValidationStatus = 'valid' | 'invalid' | 'duplicate' | 'max-reached' | 'empty';

/**
 * Tag input size variants
 */
export type BTagInputSize = 'small' | 'medium' | 'large';

/**
 * Tag input state interface for accessibility
 */
export interface BTagInputState {
  /** Current number of tags */
  tagCount: number;
  /** Maximum allowed tags */
  maxTags?: number;
  /** Whether tag input has focus */
  hasFocus: boolean;
  /** Currently focused tag index (-1 for input) */
  focusedTagIndex: number;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Current input value */
  inputValue: string;
  /** Whether input has error */
  hasError: boolean;
  /** Current error message */
  errorMessage: string;
  /** Whether input is disabled */
  isDisabled: boolean;
  /** Whether field is required */
  isRequired: boolean;
  /** Available space for new tags */
  remainingSlots?: number;
}

/**
 * Tag input ARIA attributes interface
 */
export interface BTagInputAriaAttributes {
  /** ARIA role */
  role: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelled by relationships */
  'aria-labelledby'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** ARIA invalid state */
  'aria-invalid'?: boolean;
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** ARIA required state */
  'aria-required'?: boolean;
  /** ARIA expanded for combobox pattern */
  'aria-expanded'?: boolean;
  /** ARIA controls for associated listbox */
  'aria-controls'?: string;
  /** ARIA autocomplete behavior */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  /** ARIA live region */
  'aria-live'?: 'polite' | 'assertive';
  /** ARIA atomic for live regions */
  'aria-atomic'?: boolean;
}

/**
 * Individual tag ARIA attributes interface
 */
export interface BTagAriaAttributes {
  /** ARIA role for the tag */
  role: string;
  /** ARIA selected state */
  'aria-selected'?: boolean;
  /** ARIA label for the tag */
  'aria-label'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** Position in set */
  'aria-posinset'?: number;
  /** Set size */
  'aria-setsize'?: number;
  /** Tab index for keyboard navigation */
  tabindex?: number;
  /** ARIA roledescription for custom roles */
  'aria-roledescription'?: string;
}

/**
 * Tag input keyboard configuration
 */
export interface BTagInputKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for adding tags */
  addKeys?: string[];
  /** Keys for removing tags */
  removeKeys?: string[];
  /** Keys for navigating between tags */
  navigationKeys?: string[];
  /** Keys for selecting tags */
  selectionKeys?: string[];
  /** Keys for canceling actions */
  cancelKeys?: string[];
  /** Whether to enable Home/End navigation */
  homeEndNavigation?: boolean;
  /** Whether to wrap navigation at boundaries */
  wrapNavigation?: boolean;
  /** Whether to support multi-selection */
  multiSelection?: boolean;
}

/**
 * Tag validation configuration
 */
export interface BTagValidationConfig {
  /** Whether to allow duplicate tags */
  allowDuplicate?: boolean;
  /** Maximum number of tags */
  maxTags?: number;
  /** Minimum tag length */
  minLength?: number;
  /** Maximum tag length */
  maxLength?: number;
  /** Custom validation function */
  validator?: (tag: string) => boolean | string;
  /** Input mask for validation */
  mask?: BTagInputMask;
  /** Custom regex for validation */
  pattern?: RegExp;
  /** Whether validation is case sensitive */
  caseSensitive?: boolean;
  /** Whether to trim whitespace */
  trimWhitespace?: boolean;
}

/**
 * Complete BTagInput props interface
 */
export interface BTagInputProps extends BTagInputAccessibilityProps {
  /** Array of tag values */
  modelValue: string[];
  /** Label for the tag input */
  labelValue?: string;
  /** Error message to display */
  errorMessage?: string;
  /** Info message to display */
  infoMessage?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Whether duplicate tags are allowed */
  allowDuplicate?: boolean;
  /** Maximum number of tags allowed */
  max?: number;
  /** Whether to show error state */
  isError?: boolean;
  /** Placeholder text for input */
  placeholder?: string;
  /** Input mask for validation */
  mask?: BTagInputMask;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BTagInputKeyboardConfig;
  /** Tag validation configuration */
  validationConfig?: BTagValidationConfig;
  /** Size variant */
  size?: BTagInputSize;
  /** Whether to show tag tooltips */
  showTooltips?: boolean;
  /** Custom separators for multi-tag input */
  separators?: string[];
  /** Whether to auto-focus on mount */
  autoFocus?: boolean;
  /** Custom tag renderer */
  tagRenderer?: (tag: string, index: number) => string;
  /** Debounce delay for validation in milliseconds */
  debounceDelay?: number;
}

/**
 * BTagInput emits interface
 */
export interface BTagInputEmits {
  /** Model value updated */
  'update:modelValue': [value: string[]];
  /** Tag added */
  'tag-added': [tag: string, index: number];
  /** Tag removed */
  'tag-removed': [tag: string, index: number];
  /** Tag focused */
  'tag-focus': [tag: string, index: number];
  /** Tag blurred */
  'tag-blur': [tag: string, index: number];
  /** Input focused */
  'input-focus': [event: FocusEvent];
  /** Input blurred */
  'input-blur': [event: FocusEvent];
  /** Keyboard event */
  'keyboard': [event: KeyboardEvent, action: string];
  /** Validation error */
  'validation-error': [error: string, tag: string];
  /** Tag limit reached */
  'limit-reached': [currentCount: number, maxCount: number];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Tags reordered */
  'tags-reordered': [oldIndex: number, newIndex: number];
}

/**
 * Tag input validation result
 */
export interface BTagInputValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Validation status */
  status: BTagValidationStatus;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Tag value that was validated */
  tag?: string;
}

/**
 * Tag input announcement templates
 */
export interface BTagInputAnnouncementTemplates {
  /** Template for tag addition announcement */
  tagAdded: string;
  /** Template for tag removal announcement */
  tagRemoved: string;
  /** Template for tag focus announcement */
  tagFocused: string;
  /** Template for tag count announcement */
  tagCount: string;
  /** Template for validation error announcement */
  validationError: string;
  /** Template for limit reached announcement */
  limitReached: string;
  /** Template for navigation instructions */
  navigationHelp: string;
}

/**
 * Tag suggestion item
 */
export interface BTagSuggestion {
  /** Display value */
  label: string;
  /** Actual value */
  value: string;
  /** Optional description */
  description?: string;
  /** Whether suggestion is disabled */
  disabled?: boolean;
  /** Custom data */
  data?: any;
}

/**
 * Default configurations
 */
export const DEFAULT_TAG_INPUT_KEYBOARD_CONFIG: Required<BTagInputKeyboardConfig> = {
  enabled: true,
  addKeys: ['Enter', 'Tab', ','],
  removeKeys: ['Backspace', 'Delete'],
  navigationKeys: ['ArrowLeft', 'ArrowRight'],
  selectionKeys: ['Enter', ' '],
  cancelKeys: ['Escape'],
  homeEndNavigation: true,
  wrapNavigation: true,
  multiSelection: false,
};

export const DEFAULT_TAG_INPUT_ACCESSIBILITY_CONFIG: Required<BTagInputAccessibilityProps> = {
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  ariaDescription: '',
  announceChanges: true,
  announcementTemplate: '{action} tag: {tag}. {count} tags total',
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Type to add tags, use arrow keys to navigate, press Enter or Tab to add, Backspace to remove',
  showTagCount: true,
  announceTagStatus: true,
  liveRegionPoliteness: 'polite',
  role: 'group',
  keyboardNavigation: true,
  wrapNavigation: true,
  typeAheadSearch: false,
};

export const DEFAULT_TAG_INPUT_VALIDATION_CONFIG: Required<BTagValidationConfig> = {
  allowDuplicate: false,
  maxTags: undefined,
  minLength: 1,
  maxLength: 100,
  validator: undefined,
  mask: undefined,
  pattern: undefined,
  caseSensitive: false,
  trimWhitespace: true,
};

export const DEFAULT_TAG_INPUT_ANNOUNCEMENTS: Required<BTagInputAnnouncementTemplates> = {
  tagAdded: 'Added tag: {tag}. {count} tags total',
  tagRemoved: 'Removed tag: {tag}. {count} tags remaining',
  tagFocused: 'Tag {position} of {total}: {tag}',
  tagCount: '{count} tag{plural} {action}',
  validationError: 'Invalid tag: {tag}. {error}',
  limitReached: 'Maximum {maxCount} tags allowed. Cannot add more tags',
  navigationHelp: 'Use arrow keys to navigate between tags, Enter or Tab to add, Backspace to remove',
};

/**
 * Export all types for easy importing
 */
export type {
  BTagInputAccessibilityProps as AccessibilityProps,
  BTagInputProps as Props,
  BTagInputState as State,
  BTagInputAriaAttributes as AriaAttributes,
  BTagAriaAttributes as TagAriaAttributes,
  BTagInputKeyboardConfig as KeyboardConfig,
  BTagValidationConfig as ValidationConfig,
  BTagInputEmits as Emits,
  BTagInputValidationResult as ValidationResult,
  BTagInputAnnouncementTemplates as AnnouncementTemplates,
  BTagSuggestion as TagSuggestion,
};
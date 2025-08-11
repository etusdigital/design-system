/**
 * BTextarea accessibility props interface
 * Implements WCAG 2.1 AA standards for textarea components
 */
export interface BTextareaAccessibilityProps {
  /** ARIA label for the textarea */
  ariaLabel?: string;
  /** ID of element that labels this textarea */
  ariaLabelledBy?: string;
  /** ID of element that describes this textarea */
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
  /** Help text for complex textarea patterns */
  helpText?: string;
  /** Whether the textarea is part of a group */
  groupRole?: 'group' | 'region' | 'textbox' | undefined;
  /** ARIA expanded state for textareas with expandable behavior */
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
  /** Whether textarea supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Auto-complete attribute for better UX */
  autocomplete?: string;
  /** Whether to announce line count changes */
  announceLineCount?: boolean;
  /** Whether to announce resize actions */
  announceResize?: boolean;
  /** Custom line count announcement template */
  lineCountTemplate?: string;
}

/**
 * Textarea resize options
 */
export type BTextareaResize = 'none' | 'both' | 'horizontal' | 'vertical' | 'auto';

/**
 * Component sizes
 */
export type BTextareaSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '100';

/**
 * Text alignment options
 */
export type BTextareaTextAlign = 'start' | 'center' | 'end' | 'justify';

/**
 * Textarea validation states
 */
export type BTextareaValidationState = 'valid' | 'invalid' | 'pending' | 'none';

/**
 * Textarea loading states
 */
export type BTextareaLoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Auto-resize modes
 */
export type BTextareaAutoResize = 'none' | 'height' | 'content' | 'smart';

/**
 * Textarea wrap modes
 */
export type BTextareaWrap = 'soft' | 'hard' | 'off';

/**
 * Textarea state interface for accessibility
 */
export interface BTextareaState {
  /** Whether textarea has focus */
  hasFocus: boolean;
  /** Whether textarea has error */
  hasError: boolean;
  /** Whether textarea is being validated */
  isValidating: boolean;
  /** Current validation state */
  validationState: BTextareaValidationState;
  /** Current character count */
  characterCount: number;
  /** Current line count */
  lineCount: number;
  /** Current word count */
  wordCount: number;
  /** Whether textarea is disabled */
  isDisabled: boolean;
  /** Whether textarea is required */
  isRequired: boolean;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Current textarea value */
  value: string | undefined;
  /** Whether textarea has content */
  hasContent: boolean;
  /** Whether textarea is in loading state */
  isLoading: boolean;
  /** Whether textarea is being resized */
  isResizing: boolean;
  /** Current textarea dimensions */
  dimensions: {
    width: number;
    height: number;
    scrollHeight: number;
    scrollWidth: number;
  };
  /** Whether content overflows */
  hasOverflow: boolean;
  /** Current selection information */
  selection: {
    start: number;
    end: number;
    direction: 'forward' | 'backward' | 'none';
  };
}

/**
 * Textarea ARIA attributes interface
 */
export interface BTextareaAriaAttributes {
  /** Unique ID for the textarea */
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
  /** ARIA expanded for auto-resize behavior */
  'aria-expanded'?: boolean;
  /** ARIA controls for associated elements */
  'aria-controls'?: string;
  /** ARIA multiline (always true for textarea) */
  'aria-multiline': true;
  /** Tab index for keyboard navigation */
  tabindex?: number;
  /** Auto-complete attribute */
  autocomplete?: string;
  /** Spell check attribute */
  spellcheck?: boolean;
}

/**
 * Textarea keyboard configuration
 */
export interface BTextareaKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for submitting textarea */
  submitKeys?: string[];
  /** Keys for clearing textarea */
  clearKeys?: string[];
  /** Keys for auto-resizing */
  resizeKeys?: string[];
  /** Whether to enable tab indentation */
  tabIndentation?: boolean;
  /** Tab size in spaces */
  tabSize?: number;
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom keyboard shortcuts */
  shortcuts?: Record<string, () => void>;
  /** Whether to enable line navigation shortcuts */
  lineNavigation?: boolean;
  /** Whether to enable word navigation shortcuts */
  wordNavigation?: boolean;
  /** Whether to enable selection shortcuts */
  selectionShortcuts?: boolean;
}

/**
 * Textarea validation configuration
 */
export interface BTextareaValidationConfig {
  /** Whether validation is enabled */
  enabled?: boolean;
  /** Validation mode */
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'realtime';
  /** Custom validation function */
  validator?: (value: string | undefined) => boolean | string;
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
    minLines?: string;
    maxLines?: string;
    wordLimit?: string;
  };
  /** Minimum line count validation */
  minLines?: number;
  /** Maximum line count validation */
  maxLines?: number;
  /** Word limit validation */
  wordLimit?: number;
}

/**
 * Textarea auto-resize configuration
 */
export interface BTextareaAutoResizeConfig {
  /** Whether auto-resize is enabled */
  enabled?: boolean;
  /** Auto-resize mode */
  mode?: BTextareaAutoResize;
  /** Minimum height in pixels */
  minHeight?: number;
  /** Maximum height in pixels */
  maxHeight?: number;
  /** Resize animation duration in milliseconds */
  animationDuration?: number;
  /** Resize threshold in pixels */
  threshold?: number;
  /** Whether to resize on content change */
  onContentChange?: boolean;
  /** Whether to resize on window resize */
  onWindowResize?: boolean;
}

/**
 * Textarea count configuration
 */
export interface BTextareaCountConfig {
  /** Whether character count is enabled */
  showCharacterCount?: boolean;
  /** Whether line count is enabled */
  showLineCount?: boolean;
  /** Whether word count is enabled */
  showWordCount?: boolean;
  /** Character count display format */
  characterCountFormat?: 'count' | 'remaining' | 'fraction';
  /** Whether to announce count milestones */
  announceMilestones?: boolean;
  /** Milestone percentages for announcements */
  milestones?: number[];
  /** Count position */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'inline';
}

/**
 * Complete BTextarea props interface
 */
export interface BTextareaProps extends BTextareaAccessibilityProps {
  /** Textarea value */
  modelValue?: string;
  /** Label text for the textarea */
  labelValue?: string;
  /** Maximum length (character limit) */
  maxLength?: number;
  /** Minimum length validation */
  minLength?: number;
  /** Number of visible text lines (rows) */
  rows?: number;
  /** Number of visible text columns (cols) */
  cols?: number;
  /** Error message to display */
  errorMessage?: string;
  /** Info message to display */
  infoMessage?: string;
  /** Textarea size variant */
  size?: BTextareaSize;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Whether the textarea has error state */
  isError?: boolean;
  /** Whether the textarea is required */
  required?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Text alignment */
  textAlign?: BTextareaTextAlign;
  /** Resize behavior */
  resize?: BTextareaResize;
  /** Text wrapping mode */
  wrap?: BTextareaWrap;
  /** Loading state for async validation */
  loading?: boolean;
  /** Validation state for screen reader feedback */
  validationState?: BTextareaValidationState;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BTextareaKeyboardConfig;
  /** Validation configuration */
  validationConfig?: BTextareaValidationConfig;
  /** Auto-resize configuration */
  autoResizeConfig?: BTextareaAutoResizeConfig;
  /** Count display configuration */
  countConfig?: BTextareaCountConfig;
  /** Custom textarea attributes */
  textareaAttrs?: Record<string, any>;
  /** Whether to auto-focus on mount */
  autoFocus?: boolean;
  /** Whether textarea is readonly */
  readonly?: boolean;
  /** Spellcheck attribute */
  spellcheck?: boolean;
  /** Whether to show resize handle */
  showResizeHandle?: boolean;
  /** Whether to enable auto-resize */
  autoResize?: boolean;
  /** Whether to show character count */
  showCount?: boolean;
  /** Custom count template */
  countTemplate?: string;
  /** Minimum tooltip width */
  tooltipMinWidth?: string;
  /** Icon to display */
  icon?: string;
  /** Whether to append icon instead of prepend */
  appendIcon?: boolean;
}

/**
 * BTextarea emits interface
 */
export interface BTextareaEmits {
  /** Model value updated */
  'update:modelValue': [value: string | undefined];
  /** Textarea focused */
  'focus': [event: FocusEvent];
  /** Textarea blurred */
  'blur': [event: FocusEvent];
  /** Textarea value changed */
  'input': [value: string | undefined];
  /** Validation state changed */
  'validation-change': [state: BTextareaValidationState, message?: string];
  /** Character count changed */
  'character-count-change': [count: number, max?: number];
  /** Line count changed */
  'line-count-change': [count: number];
  /** Word count changed */
  'word-count-change': [count: number];
  /** Keyboard event */
  'keydown': [event: KeyboardEvent];
  /** Key up event */
  'keyup': [event: KeyboardEvent];
  /** Enter key pressed */
  'enter': [value: string | undefined];
  /** Clear button clicked */
  'clear': [];
  /** Textarea resized */
  'resize': [dimensions: { width: number; height: number }];
  /** Selection changed */
  'selection-change': [selection: { start: number; end: number; direction: string }];
  /** Paste event */
  'paste': [event: ClipboardEvent];
  /** Cut event */
  'cut': [event: ClipboardEvent];
  /** Copy event */
  'copy': [event: ClipboardEvent];
  /** Accessibility events */
  'accessibility': [type: string, data: any];
  /** Loading state change */
  'loading-change': [loading: boolean];
  /** Auto-resize triggered */
  'auto-resize': [newHeight: number];
  /** Scroll event */
  'scroll': [event: Event];
}

/**
 * Textarea validation result
 */
export interface BTextareaValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Validation state */
  state: BTextareaValidationState;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Textarea value that was validated */
  value?: string;
  /** Character count validation */
  characterCount?: {
    current: number;
    max?: number;
    valid: boolean;
  };
  /** Line count validation */
  lineCount?: {
    current: number;
    min?: number;
    max?: number;
    valid: boolean;
  };
  /** Word count validation */
  wordCount?: {
    current: number;
    limit?: number;
    valid: boolean;
  };
}

/**
 * Textarea announcement templates
 */
export interface BTextareaAnnouncementTemplates {
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
  /** Template for line count announcement */
  lineCount: string;
  /** Template for word count announcement */
  wordCount: string;
  /** Template for value change announcement */
  valueChanged: string;
  /** Template for resize announcement */
  resizeAnnouncement: string;
  /** Template for loading state */
  loadingState: string;
  /** Template for selection announcement */
  selectionChanged: string;
  /** Template for paste action */
  pasteAction: string;
  /** Template for auto-resize action */
  autoResizeAction: string;
}

/**
 * Textarea accessibility helpers
 */
export interface BTextareaAccessibilityHelpers {
  /** Get ARIA describedby relationships */
  getAriaDescribedBy: (props: BTextareaProps, state: BTextareaState) => string | undefined;
  /** Get appropriate placeholder text */
  getAccessiblePlaceholder: (placeholder?: string) => string;
  /** Announce validation state change */
  announceValidation: (state: BTextareaValidationState, message?: string) => void;
  /** Announce character count milestone */
  announceCharacterCount: (count: number, max: number, threshold: number) => void;
  /** Announce line count change */
  announceLineCount: (count: number) => void;
  /** Announce resize action */
  announceResize: (newDimensions: { width: number; height: number }) => void;
  /** Get validation message for state */
  getValidationMessage: (state: BTextareaValidationState, errorMessage?: string) => string;
}

/**
 * Default configurations
 */
export const DEFAULT_TEXTAREA_KEYBOARD_CONFIG: Required<BTextareaKeyboardConfig> = {
  enabled: true,
  submitKeys: ['Ctrl+Enter', 'Cmd+Enter'],
  clearKeys: ['Escape'],
  resizeKeys: ['Ctrl+Shift+R'],
  tabIndentation: true,
  tabSize: 2,
  preventDefault: false,
  stopPropagation: false,
  shortcuts: {},
  lineNavigation: true,
  wordNavigation: true,
  selectionShortcuts: true,
};

export const DEFAULT_TEXTAREA_ACCESSIBILITY_CONFIG: Required<BTextareaAccessibilityProps> = {
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
  announceLineCount: false,
  announceResize: true,
  lineCountTemplate: 'Line {current}',
};

export const DEFAULT_TEXTAREA_VALIDATION_CONFIG: Required<BTextareaValidationConfig> = {
  enabled: true,
  mode: 'onBlur',
  validator: undefined,
  debounceTime: 300,
  showFeedback: true,
  announceChanges: true,
  messages: {
    required: 'This field is required',
    invalid: 'Please enter a valid value',
    tooShort: 'Text is too short',
    tooLong: 'Text is too long',
    pattern: 'Text does not match required pattern',
    minLines: 'Minimum number of lines required',
    maxLines: 'Maximum number of lines exceeded',
    wordLimit: 'Word limit exceeded',
  },
  minLines: undefined,
  maxLines: undefined,
  wordLimit: undefined,
};

export const DEFAULT_TEXTAREA_AUTO_RESIZE_CONFIG: Required<BTextareaAutoResizeConfig> = {
  enabled: false,
  mode: 'content',
  minHeight: 60,
  maxHeight: 400,
  animationDuration: 150,
  threshold: 2,
  onContentChange: true,
  onWindowResize: true,
};

export const DEFAULT_TEXTAREA_COUNT_CONFIG: Required<BTextareaCountConfig> = {
  showCharacterCount: false,
  showLineCount: false,
  showWordCount: false,
  characterCountFormat: 'count',
  announceMilestones: true,
  milestones: [25, 50, 75, 90, 95],
  position: 'bottom-right',
};

export const DEFAULT_TEXTAREA_ANNOUNCEMENTS: Required<BTextareaAnnouncementTemplates> = {
  validationError: 'Error: {message}',
  validationSuccess: 'Textarea is now valid',
  validationPending: 'Validating textarea',
  characterCount: '{count} of {max} characters',
  characterLimitReached: 'Character limit reached',
  lineCount: '{count} lines',
  wordCount: '{count} words',
  valueChanged: 'Text changed',
  resizeAnnouncement: 'Textarea resized to {width} by {height} pixels',
  loadingState: 'Textarea is {state}',
  selectionChanged: 'Selection changed: {start} to {end}',
  pasteAction: 'Content pasted',
  autoResizeAction: 'Textarea automatically resized',
};

/**
 * Export all types for easy importing
 */
export type {
  BTextareaAccessibilityProps as AccessibilityProps,
  BTextareaProps as Props,
  BTextareaState as State,
  BTextareaAriaAttributes as AriaAttributes,
  BTextareaKeyboardConfig as KeyboardConfig,
  BTextareaValidationConfig as ValidationConfig,
  BTextareaAutoResizeConfig as AutoResizeConfig,
  BTextareaCountConfig as CountConfig,
  BTextareaEmits as Emits,
  BTextareaValidationResult as ValidationResult,
  BTextareaAnnouncementTemplates as AnnouncementTemplates,
  BTextareaAccessibilityHelpers as AccessibilityHelpers,
};
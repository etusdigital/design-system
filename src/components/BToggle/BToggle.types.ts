/**
 * BToggle accessibility props interface
 * Implements WCAG 2.1 AA standards for toggle/switch components
 */
export interface BToggleAccessibilityProps {
  /** ARIA label for the toggle */
  ariaLabel?: string;
  /** Detailed description for screen readers */
  ariaDescription?: string;
  /** Whether state changes should be announced */
  announceChanges?: boolean;
  /** Custom label for "on" state */
  onLabel?: string;
  /** Custom label for "off" state */
  offLabel?: string;
  /** Error message for validation */
  errorMessage?: string;
  /** Whether the toggle is in an invalid state */
  invalid?: boolean;
  /** Success message after successful validation */
  successMessage?: string;
  /** Loading message during processing */
  loadingMessage?: string;
  /** ARIA role override (defaults to 'switch') */
  role?: BToggleRole;
  /** Whether this toggle is part of a group */
  grouped?: boolean;
  /** Group label when part of a toggle group */
  groupLabel?: string;
  /** Position in group (1-based) */
  groupPosition?: number;
  /** Total items in group */
  groupSize?: number;
  /** Whether to announce validation changes */
  announceValidation?: boolean;
  /** Whether to announce loading states */
  announceLoading?: boolean;
  /** Custom announcement delay in milliseconds */
  announcementDelay?: number;
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
  /** Whether toggle supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Context description for complex toggles */
  contextDescription?: string;
  /** Whether to provide state confirmation prompts */
  requireStateConfirmation?: boolean;
  /** Custom confirmation message for state changes */
  stateConfirmationMessage?: string;
}

/**
 * Toggle role types for accessibility
 */
export type BToggleRole = 'switch' | 'checkbox' | 'button';

/**
 * Toggle size variants
 */
export type BToggleSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Toggle visual variants
 */
export type BToggleVariant = 'default' | 'ios' | 'material' | 'flat' | 'outline';

/**
 * Toggle validation states
 */
export type BToggleValidationState = 'none' | 'error' | 'success' | 'warning' | 'pending';

/**
 * Toggle animation types
 */
export type BToggleAnimationType = 'slide' | 'flip' | 'fade' | 'scale' | 'bounce';

/**
 * Toggle interaction modes
 */
export type BToggleInteractionMode = 'click' | 'keyboard' | 'api' | 'gesture';

/**
 * Toggle state interface for accessibility
 */
export interface BToggleState {
  /** Current toggle value */
  value: boolean;
  /** Previous toggle value */
  previousValue: boolean;
  /** Whether toggle has focus */
  hasFocus: boolean;
  /** Whether toggle is being interacted with */
  isInteracting: boolean;
  /** Current interaction mode */
  interactionMode: BToggleInteractionMode;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Whether toggle is disabled */
  isDisabled: boolean;
  /** Whether toggle is readonly */
  isReadonly: boolean;
  /** Whether toggle is loading */
  isLoading: boolean;
  /** Whether toggle is processing */
  isProcessing: boolean;
  /** Current validation state */
  validationState: BToggleValidationState;
  /** Validation message */
  validationMessage: string;
  /** Whether toggle is required */
  isRequired: boolean;
  /** Whether toggle is part of a group */
  isGrouped: boolean;
  /** Group position */
  groupPosition?: number;
  /** Group size */
  groupSize?: number;
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
  /** Last announced message to prevent duplicates */
  lastAnnouncedMessage: string | null;
}

/**
 * Toggle ARIA attributes interface
 */
export interface BToggleAriaAttributes {
  /** ARIA role for the toggle */
  role: BToggleRole;
  /** ARIA label for the toggle */
  'aria-label'?: string;
  /** ARIA labelledby for complex labeling */
  'aria-labelledby'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** ARIA checked state (for switch role) */
  'aria-checked'?: boolean;
  /** ARIA selected state (for checkbox role) */
  'aria-selected'?: boolean;
  /** ARIA pressed state (for button role) */
  'aria-pressed'?: boolean;
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** ARIA readonly state */
  'aria-readonly'?: boolean;
  /** ARIA required state */
  'aria-required'?: boolean;
  /** ARIA invalid state */
  'aria-invalid'?: boolean;
  /** ARIA busy state */
  'aria-busy'?: boolean;
  /** ARIA expanded state (for expandable toggles) */
  'aria-expanded'?: boolean;
  /** ARIA controls for what the toggle controls */
  'aria-controls'?: string;
  /** ARIA owns for ownership relationships */
  'aria-owns'?: string;
  /** ARIA setsize for group context */
  'aria-setsize'?: number;
  /** ARIA posinset for position in group */
  'aria-posinset'?: number;
  /** Tab index for keyboard navigation */
  tabindex?: number;
}

/**
 * Toggle keyboard configuration
 */
export interface BToggleKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for toggle activation */
  activationKeys?: string[];
  /** Keys for turning on (for switch role) */
  onKeys?: string[];
  /** Keys for turning off (for switch role) */
  offKeys?: string[];
  /** Keys for escaping/canceling */
  escapeKeys?: string[];
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom key handlers */
  customHandlers?: Record<string, (event: KeyboardEvent) => void>;
  /** Whether to enable group navigation */
  enableGroupNavigation?: boolean;
  /** Keys for navigating between group items */
  groupNavigationKeys?: string[];
}

/**
 * Toggle group configuration
 */
export interface BToggleGroupConfig {
  /** Group identifier */
  id?: string;
  /** Group label */
  label?: string;
  /** Group description */
  description?: string;
  /** Group orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Whether multiple toggles can be active */
  multiSelect?: boolean;
  /** Whether at least one toggle must be active */
  required?: boolean;
  /** Maximum number of active toggles */
  maxActive?: number;
  /** Minimum number of active toggles */
  minActive?: number;
  /** Custom validation function */
  validator?: (activeToggles: BToggleItem[]) => boolean;
}

/**
 * Toggle validation configuration
 */
export interface BToggleValidationConfig {
  /** Whether validation is enabled */
  enabled?: boolean;
  /** Validation mode */
  mode?: 'immediate' | 'onBlur' | 'onSubmit';
  /** Custom validation function */
  validator?: (value: boolean, context: BToggleState) => BToggleValidationResult;
  /** Whether to show validation messages */
  showMessages?: boolean;
  /** Validation message templates */
  messageTemplates?: BToggleValidationMessages;
}

/**
 * Toggle validation messages
 */
export interface BToggleValidationMessages {
  /** Required field message */
  required?: string;
  /** Custom validation error message */
  customError?: string;
  /** Success message */
  success?: string;
  /** Warning message */
  warning?: string;
}

/**
 * Toggle animation configuration
 */
export interface BToggleAnimationConfig {
  /** Whether animations are enabled */
  enabled?: boolean;
  /** Animation type */
  type?: BToggleAnimationType;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation easing function */
  easing?: string;
  /** Whether to respect reduced motion preference */
  respectReducedMotion?: boolean;
}

/**
 * Toggle item for grouped toggles
 */
export interface BToggleItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Toggle value */
  value: boolean;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether item is readonly */
  readonly?: boolean;
  /** Custom ARIA label */
  ariaLabel?: string;
  /** Custom description */
  description?: string;
  /** Icon name */
  icon?: string;
  /** Custom CSS classes */
  customClass?: string;
  /** Additional data */
  data?: Record<string, any>;
}

/**
 * Toggle event data interfaces
 */
export interface BToggleChangeEvent {
  /** New value */
  value: boolean;
  /** Previous value */
  previousValue: boolean;
  /** Source event */
  event: Event;
  /** Toggle state */
  state: BToggleState;
  /** Event source */
  source: BToggleInteractionMode;
}

export interface BToggleFocusEvent {
  /** Focus event */
  event: FocusEvent;
  /** Toggle state */
  state: BToggleState;
  /** Event type */
  type: 'focus' | 'blur';
}

export interface BToggleValidationEvent {
  /** Validation result */
  result: BToggleValidationResult;
  /** Toggle value */
  value: boolean;
  /** Toggle state */
  state: BToggleState;
}

export interface BToggleKeyboardEvent {
  /** Keyboard event */
  event: KeyboardEvent;
  /** Toggle state */
  state: BToggleState;
  /** Whether action was handled */
  handled: boolean;
}

/**
 * Complete BToggle props interface
 */
export interface BToggleProps extends BToggleAccessibilityProps {
  /** Unique identifier for the toggle */
  id?: string;
  /** Name attribute for form handling */
  name?: string;
  /** Current state of the toggle */
  modelValue?: boolean;
  /** Position toggle on right-hand side of label */
  rhs?: boolean;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Whether the toggle is required in a form */
  required?: boolean;
  /** Whether the toggle is readonly */
  readonly?: boolean;
  /** Loading/processing state */
  loading?: boolean;
  /** Size of the toggle */
  size?: BToggleSize;
  /** Visual variant */
  variant?: BToggleVariant;
  /** Form validation state */
  validationState?: BToggleValidationState;
  /** Auto-focus the toggle on mount */
  autofocus?: boolean;
  /** Form data value when checked */
  trueValue?: any;
  /** Form data value when unchecked */
  falseValue?: any;
  /** Whether toggle acts as indeterminate */
  indeterminate?: boolean;
  /** Custom icon for on state */
  onIcon?: string;
  /** Custom icon for off state */
  offIcon?: string;
  /** Custom color for on state */
  onColor?: string;
  /** Custom color for off state */
  offColor?: string;
  /** HTML id attribute */
  htmlId?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BToggleKeyboardConfig;
  /** Group configuration */
  groupConfig?: BToggleGroupConfig;
  /** Validation configuration */
  validationConfig?: BToggleValidationConfig;
  /** Animation configuration */
  animationConfig?: BToggleAnimationConfig;
  /** Whether to show state text */
  showStateText?: boolean;
  /** Custom renderer function */
  renderer?: (props: BToggleProps, state: BToggleState) => any;
}

/**
 * BToggle emits interface
 */
export interface BToggleEmits {
  /** Model value updated */
  'update:modelValue': [value: boolean];
  /** Toggle state changed */
  'toggle': [event: BToggleChangeEvent];
  /** Toggle focused */
  'focus': [event: BToggleFocusEvent];
  /** Toggle blurred */
  'blur': [event: BToggleFocusEvent];
  /** Validation performed */
  'validate': [event: BToggleValidationEvent];
  /** Validation error occurred */
  'error': [error: string];
  /** Validation success */
  'success': [message?: string];
  /** Loading state changed */
  'loading-change': [isLoading: boolean];
  /** State confirmation requested */
  'confirm-change': [value: boolean, confirmed: (proceed: boolean) => void];
  /** Keyboard event */
  'keydown': [event: BToggleKeyboardEvent];
  /** Animation started */
  'animation-start': [type: BToggleAnimationType];
  /** Animation ended */
  'animation-end': [type: BToggleAnimationType];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
}

/**
 * Toggle validation result
 */
export interface BToggleValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Success messages */
  successes: string[];
  /** Toggle configuration */
  config?: BToggleProps;
}

/**
 * Toggle announcement templates
 */
export interface BToggleAnnouncementTemplates {
  /** Template for state change announcement */
  stateChange: string;
  /** Template for activation announcement */
  activation: string;
  /** Template for deactivation announcement */
  deactivation: string;
  /** Template for validation error announcement */
  validationError: string;
  /** Template for validation success announcement */
  validationSuccess: string;
  /** Template for loading state announcement */
  loadingStart: string;
  /** Template for loading complete announcement */
  loadingComplete: string;
  /** Template for group state announcement */
  groupStateChange: string;
  /** Template for focus announcement */
  focus: string;
  /** Template for keyboard instructions */
  keyboardInstructions: string;
  /** Template for confirmation prompt */
  confirmationPrompt: string;
}

/**
 * Toggle theme configuration
 */
export interface BToggleThemeConfig {
  /** On state background color */
  onBackgroundColor?: string;
  /** Off state background color */
  offBackgroundColor?: string;
  /** Thumb color */
  thumbColor?: string;
  /** On state thumb color */
  onThumbColor?: string;
  /** Off state thumb color */
  offThumbColor?: string;
  /** Border color */
  borderColor?: string;
  /** Focus ring color */
  focusRingColor?: string;
  /** Disabled color */
  disabledColor?: string;
  /** Error state color */
  errorColor?: string;
  /** Success state color */
  successColor?: string;
  /** Warning state color */
  warningColor?: string;
  /** Track height */
  trackHeight?: string;
  /** Track width */
  trackWidth?: string;
  /** Thumb size */
  thumbSize?: string;
  /** Border radius */
  borderRadius?: string;
}

/**
 * Toggle accessibility helpers
 */
export interface BToggleAccessibilityHelpers {
  /** Get ARIA attributes for toggle */
  getToggleAriaAttributes: (state: BToggleState, props: BToggleProps) => BToggleAriaAttributes;
  /** Format state change announcement */
  formatStateChangeAnnouncement: (newValue: boolean, props: BToggleProps) => string;
  /** Format validation announcement */
  formatValidationAnnouncement: (result: BToggleValidationResult) => string;
  /** Check if announcement should be made */
  shouldAnnounce: (message: string, lastMessage: string | null) => boolean;
  /** Get keyboard instructions */
  getKeyboardInstructions: (role: BToggleRole, features: string[]) => string;
  /** Get appropriate role for toggle */
  getSemanticRole: (context: string, grouped: boolean) => BToggleRole;
  /** Announce toggle state change */
  announceToggleStateChange: (value: boolean, props: BToggleProps) => void;
  /** Validate toggle accessibility */
  validateAccessibility: (props: BToggleProps) => BToggleValidationResult;
}

/**
 * Default configurations
 */
export const DEFAULT_TOGGLE_KEYBOARD_CONFIG: Required<BToggleKeyboardConfig> = {
  enabled: true,
  activationKeys: [' ', 'Enter'],
  onKeys: ['ArrowRight'],
  offKeys: ['ArrowLeft'],
  escapeKeys: ['Escape'],
  preventDefault: true,
  stopPropagation: false,
  customHandlers: {},
  enableGroupNavigation: false,
  groupNavigationKeys: ['ArrowUp', 'ArrowDown'],
};

export const DEFAULT_TOGGLE_ACCESSIBILITY_CONFIG: Required<BToggleAccessibilityProps> = {
  ariaLabel: '',
  ariaDescription: '',
  announceChanges: true,
  onLabel: 'On',
  offLabel: 'Off',
  errorMessage: '',
  invalid: false,
  successMessage: '',
  loadingMessage: 'Processing...',
  role: 'switch',
  grouped: false,
  groupLabel: '',
  groupPosition: undefined,
  groupSize: undefined,
  announceValidation: true,
  announceLoading: true,
  announcementDelay: 0,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Press Space or Enter to toggle, arrow keys to change state',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  contextDescription: '',
  requireStateConfirmation: false,
  stateConfirmationMessage: 'Are you sure you want to change this setting?',
};

export const DEFAULT_TOGGLE_GROUP_CONFIG: Required<BToggleGroupConfig> = {
  id: '',
  label: '',
  description: '',
  orientation: 'horizontal',
  multiSelect: false,
  required: false,
  maxActive: 0,
  minActive: 0,
  validator: () => true,
};

export const DEFAULT_TOGGLE_VALIDATION_CONFIG: Required<BToggleValidationConfig> = {
  enabled: false,
  mode: 'immediate',
  validator: () => ({ isValid: true, errors: [], warnings: [], successes: [] }),
  showMessages: true,
  messageTemplates: {
    required: 'This field is required',
    customError: 'Invalid value',
    success: 'Valid',
    warning: 'Please review this value',
  },
};

export const DEFAULT_TOGGLE_ANIMATION_CONFIG: Required<BToggleAnimationConfig> = {
  enabled: true,
  type: 'slide',
  duration: 200,
  easing: 'ease-out',
  respectReducedMotion: true,
};

export const DEFAULT_TOGGLE_ANNOUNCEMENTS: Required<BToggleAnnouncementTemplates> = {
  stateChange: 'Toggle switched to {state}',
  activation: 'Toggle activated',
  deactivation: 'Toggle deactivated',
  validationError: 'Error: {message}',
  validationSuccess: 'Success: {message}',
  loadingStart: 'Processing toggle state',
  loadingComplete: 'Toggle processing complete',
  groupStateChange: '{count} of {total} toggles active',
  focus: 'Toggle focused, currently {state}',
  keyboardInstructions: 'Use Space or Enter to toggle, arrow keys to set state',
  confirmationPrompt: 'Confirm state change to {state}?',
};

/**
 * Toggle interaction patterns
 */
export const TOGGLE_INTERACTION_PATTERNS = {
  /** Standard on/off switch */
  SWITCH: 'switch',
  /** Checkbox-like toggle */
  CHECKBOX: 'checkbox',
  /** Button-like toggle */
  BUTTON: 'button',
  /** Settings toggle */
  SETTING: 'setting',
  /** Filter toggle */
  FILTER: 'filter',
  /** Mode toggle */
  MODE: 'mode',
} as const;

/**
 * Toggle semantic contexts
 */
export const TOGGLE_SEMANTIC_CONTEXTS = {
  /** Form control */
  FORM_CONTROL: 'form-control',
  /** Settings panel */
  SETTINGS: 'settings',
  /** Filter control */
  FILTER: 'filter',
  /** Navigation toggle */
  NAVIGATION: 'navigation',
  /** Feature toggle */
  FEATURE: 'feature',
  /** Mode switcher */
  MODE_SWITCHER: 'mode-switcher',
} as const;

/**
 * Keyboard navigation key mappings
 */
export const TOGGLE_KEY_MAPPINGS: Record<string, {
  action: string;
  description: string;
  role?: BToggleRole[];
}> = {
  Space: { action: 'toggle', description: 'Toggle state' },
  Enter: { action: 'toggle', description: 'Toggle state', role: ['switch'] },
  ArrowRight: { action: 'turnOn', description: 'Turn on', role: ['switch'] },
  ArrowLeft: { action: 'turnOff', description: 'Turn off', role: ['switch'] },
  ArrowUp: { action: 'previous', description: 'Previous toggle in group' },
  ArrowDown: { action: 'next', description: 'Next toggle in group' },
  Home: { action: 'first', description: 'First toggle in group' },
  End: { action: 'last', description: 'Last toggle in group' },
  Escape: { action: 'cancel', description: 'Cancel action or clear validation' },
};

/**
 * Toggle size configurations with accessibility considerations
 */
export const TOGGLE_SIZE_CONFIG: Record<BToggleSize, {
  trackWidth: string;
  trackHeight: string;
  thumbSize: string;
  minTouchTarget: boolean;
  fontSize: string;
}> = {
  small: {
    trackWidth: '1.8em',
    trackHeight: '1em',
    thumbSize: '0.75em',
    minTouchTarget: true,
    fontSize: '0.875rem',
  },
  medium: {
    trackWidth: '2em',
    trackHeight: '1.16em',
    thumbSize: '0.85em',
    minTouchTarget: false,
    fontSize: '1rem',
  },
  large: {
    trackWidth: '2.2em',
    trackHeight: '1.3em',
    thumbSize: '1em',
    minTouchTarget: false,
    fontSize: '1.125rem',
  },
  xlarge: {
    trackWidth: '2.5em',
    trackHeight: '1.5em',
    thumbSize: '1.2em',
    minTouchTarget: false,
    fontSize: '1.25rem',
  },
};

/**
 * Toggle role configurations
 */
export const TOGGLE_ROLE_CONFIG: Record<BToggleRole, {
  ariaAttribute: string;
  semanticMeaning: string;
  keyboardKeys: string[];
}> = {
  switch: {
    ariaAttribute: 'aria-checked',
    semanticMeaning: 'Binary on/off control',
    keyboardKeys: ['Space', 'Enter', 'ArrowLeft', 'ArrowRight'],
  },
  checkbox: {
    ariaAttribute: 'aria-selected',
    semanticMeaning: 'Selectable option',
    keyboardKeys: ['Space'],
  },
  button: {
    ariaAttribute: 'aria-pressed',
    semanticMeaning: 'Pressable action button',
    keyboardKeys: ['Space', 'Enter'],
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BToggleAccessibilityProps as AccessibilityProps,
  BToggleProps as Props,
  BToggleState as State,
  BToggleAriaAttributes as AriaAttributes,
  BToggleKeyboardConfig as KeyboardConfig,
  BToggleGroupConfig as GroupConfig,
  BToggleValidationConfig as ValidationConfig,
  BToggleAnimationConfig as AnimationConfig,
  BToggleItem as Item,
  BToggleChangeEvent as ChangeEvent,
  BToggleFocusEvent as FocusEvent,
  BToggleValidationEvent as ValidationEvent,
  BToggleKeyboardEvent as KeyboardEvent,
  BToggleEmits as Emits,
  BToggleValidationResult as ValidationResult,
  BToggleAnnouncementTemplates as AnnouncementTemplates,
  BToggleThemeConfig as ThemeConfig,
  BToggleAccessibilityHelpers as AccessibilityHelpers,
};
/**
 * BSwitch accessibility props interface
 * Implements WCAG 2.1 AA standards for iOS-style switch components
 */
export interface BSwitchAccessibilityProps {
  /** ARIA label for the switch */
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
  /** Whether the switch is in an invalid state */
  invalid?: boolean;
  /** Success message after successful validation */
  successMessage?: string;
  /** Loading message during processing */
  loadingMessage?: string;
  /** ARIA role override (defaults to 'switch') */
  role?: BSwitchRole;
  /** Whether this switch is part of a group */
  grouped?: boolean;
  /** Group label when part of a switch group */
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
  /** Whether switch supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Context description for complex switches */
  contextDescription?: string;
  /** Whether to provide state confirmation prompts */
  requireStateConfirmation?: boolean;
  /** Custom confirmation message for state changes */
  stateConfirmationMessage?: string;
}

/**
 * Switch role types for accessibility
 */
export type BSwitchRole = 'switch' | 'checkbox' | 'button';

/**
 * Switch size variants
 */
export type BSwitchSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Switch visual variants - iOS-style focused
 */
export type BSwitchVariant = 'ios' | 'modern' | 'minimal' | 'compact';

/**
 * Switch validation states
 */
export type BSwitchValidationState = 'none' | 'error' | 'success' | 'warning' | 'pending';

/**
 * Switch animation types - iOS-style animations
 */
export type BSwitchAnimationType = 'slide' | 'bounce' | 'spring' | 'elastic' | 'smooth';

/**
 * Switch interaction modes
 */
export type BSwitchInteractionMode = 'click' | 'keyboard' | 'api' | 'gesture' | 'swipe';

/**
 * Switch state interface for accessibility
 */
export interface BSwitchState {
  /** Current switch value */
  value: boolean;
  /** Previous switch value */
  previousValue: boolean;
  /** Whether switch has focus */
  hasFocus: boolean;
  /** Whether switch is being interacted with */
  isInteracting: boolean;
  /** Current interaction mode */
  interactionMode: BSwitchInteractionMode;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Whether switch is disabled */
  isDisabled: boolean;
  /** Whether switch is readonly */
  isReadonly: boolean;
  /** Whether switch is loading */
  isLoading: boolean;
  /** Whether switch is processing */
  isProcessing: boolean;
  /** Current validation state */
  validationState: BSwitchValidationState;
  /** Validation message */
  validationMessage: string;
  /** Whether switch is required */
  isRequired: boolean;
  /** Whether switch is part of a group */
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
  /** Whether thumb is transitioning */
  isTransitioning: boolean;
  /** Animation progress (0-1) */
  animationProgress: number;
}

/**
 * Switch ARIA attributes interface
 */
export interface BSwitchAriaAttributes {
  /** ARIA role for the switch */
  role: BSwitchRole;
  /** ARIA label for the switch */
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
  /** ARIA expanded state (for expandable switches) */
  'aria-expanded'?: boolean;
  /** ARIA controls for what the switch controls */
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
 * Switch keyboard configuration
 */
export interface BSwitchKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for switch activation */
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
 * Switch group configuration
 */
export interface BSwitchGroupConfig {
  /** Group identifier */
  id?: string;
  /** Group label */
  label?: string;
  /** Group description */
  description?: string;
  /** Group orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Whether multiple switches can be active */
  multiSelect?: boolean;
  /** Whether at least one switch must be active */
  required?: boolean;
  /** Maximum number of active switches */
  maxActive?: number;
  /** Minimum number of active switches */
  minActive?: number;
  /** Custom validation function */
  validator?: (activeSwitches: BSwitchItem[]) => boolean;
}

/**
 * Switch validation configuration
 */
export interface BSwitchValidationConfig {
  /** Whether validation is enabled */
  enabled?: boolean;
  /** Validation mode */
  mode?: 'immediate' | 'onBlur' | 'onSubmit';
  /** Custom validation function */
  validator?: (value: boolean, context: BSwitchState) => BSwitchValidationResult;
  /** Whether to show validation messages */
  showMessages?: boolean;
  /** Validation message templates */
  messageTemplates?: BSwitchValidationMessages;
}

/**
 * Switch validation messages
 */
export interface BSwitchValidationMessages {
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
 * Switch animation configuration - iOS focused
 */
export interface BSwitchAnimationConfig {
  /** Whether animations are enabled */
  enabled?: boolean;
  /** Animation type */
  type?: BSwitchAnimationType;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation easing function (CSS easing) */
  easing?: string;
  /** Whether to respect reduced motion preference */
  respectReducedMotion?: boolean;
  /** Spring tension for spring animations */
  springTension?: number;
  /** Spring damping for spring animations */
  springDamping?: number;
  /** Bounce factor for bounce animations */
  bounceFactor?: number;
}

/**
 * Switch item for grouped switches
 */
export interface BSwitchItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Switch value */
  value: boolean;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether item is readonly */
  readonly?: boolean;
  /** Custom ARIA label */
  ariaLabel?: string;
  /** Custom description */
  description?: string;
  /** Icon name for on state */
  onIcon?: string;
  /** Icon name for off state */
  offIcon?: string;
  /** Custom CSS classes */
  customClass?: string;
  /** Additional data */
  data?: Record<string, any>;
}

/**
 * Switch theme configuration - iOS-style colors
 */
export interface BSwitchThemeConfig {
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
  /** Border radius (typically more rounded for iOS) */
  borderRadius?: string;
  /** Shadow configuration */
  thumbShadow?: string;
  /** Track shadow */
  trackShadow?: string;
}

/**
 * Switch event data interfaces
 */
export interface BSwitchChangeEvent {
  /** New value */
  value: boolean;
  /** Previous value */
  previousValue: boolean;
  /** Source event */
  event: Event;
  /** Switch state */
  state: BSwitchState;
  /** Event source */
  source: BSwitchInteractionMode;
}

export interface BSwitchFocusEvent {
  /** Focus event */
  event: FocusEvent;
  /** Switch state */
  state: BSwitchState;
  /** Event type */
  type: 'focus' | 'blur';
}

export interface BSwitchValidationEvent {
  /** Validation result */
  result: BSwitchValidationResult;
  /** Switch value */
  value: boolean;
  /** Switch state */
  state: BSwitchState;
}

export interface BSwitchKeyboardEvent {
  /** Keyboard event */
  event: KeyboardEvent;
  /** Switch state */
  state: BSwitchState;
  /** Whether action was handled */
  handled: boolean;
}

export interface BSwitchAnimationEvent {
  /** Animation type */
  type: BSwitchAnimationType;
  /** Animation phase */
  phase: 'start' | 'progress' | 'end';
  /** Progress (0-1) */
  progress: number;
  /** Switch state */
  state: BSwitchState;
}

/**
 * Complete BSwitch props interface
 */
export interface BSwitchProps extends BSwitchAccessibilityProps {
  /** Unique identifier for the switch */
  id?: string;
  /** Name attribute for form handling */
  name?: string;
  /** Current state of the switch */
  modelValue?: boolean;
  /** Position switch on right-hand side of label */
  rhs?: boolean;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Whether the switch is required in a form */
  required?: boolean;
  /** Whether the switch is readonly */
  readonly?: boolean;
  /** Loading/processing state */
  loading?: boolean;
  /** Size of the switch */
  size?: BSwitchSize;
  /** Visual variant */
  variant?: BSwitchVariant;
  /** Form validation state */
  validationState?: BSwitchValidationState;
  /** Auto-focus the switch on mount */
  autofocus?: boolean;
  /** Form data value when checked */
  trueValue?: any;
  /** Form data value when unchecked */
  falseValue?: any;
  /** Whether switch acts as indeterminate */
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
  keyboardConfig?: BSwitchKeyboardConfig;
  /** Group configuration */
  groupConfig?: BSwitchGroupConfig;
  /** Validation configuration */
  validationConfig?: BSwitchValidationConfig;
  /** Animation configuration */
  animationConfig?: BSwitchAnimationConfig;
  /** Whether to show state text inside track */
  showStateText?: boolean;
  /** Whether to show icons inside thumb or track */
  showIcons?: boolean;
  /** Custom renderer function */
  renderer?: (props: BSwitchProps, state: BSwitchState) => any;
  /** Text to show when switch is on (inside track) */
  onText?: string;
  /** Text to show when switch is off (inside track) */
  offText?: string;
  /** Whether to enable haptic feedback */
  hapticFeedback?: boolean;
  /** Custom thumb content slot */
  thumbContent?: boolean;
  /** Whether to show loading spinner in thumb */
  showLoadingInThumb?: boolean;
}

/**
 * BSwitch emits interface
 */
export interface BSwitchEmits {
  /** Model value updated */
  'update:modelValue': [value: boolean];
  /** Switch state changed */
  'change': [event: BSwitchChangeEvent];
  /** Switch focused */
  'focus': [event: BSwitchFocusEvent];
  /** Switch blurred */
  'blur': [event: BSwitchFocusEvent];
  /** Validation performed */
  'validate': [event: BSwitchValidationEvent];
  /** Validation error occurred */
  'error': [error: string];
  /** Validation success */
  'success': [message?: string];
  /** Loading state changed */
  'loading-change': [isLoading: boolean];
  /** State confirmation requested */
  'confirm-change': [value: boolean, confirmed: (proceed: boolean) => void];
  /** Keyboard event */
  'keydown': [event: BSwitchKeyboardEvent];
  /** Animation started */
  'animation-start': [event: BSwitchAnimationEvent];
  /** Animation progress */
  'animation-progress': [event: BSwitchAnimationEvent];
  /** Animation ended */
  'animation-end': [event: BSwitchAnimationEvent];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Swipe gesture detected */
  'swipe': [direction: 'left' | 'right', event: TouchEvent];
}

/**
 * Switch validation result
 */
export interface BSwitchValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Success messages */
  successes: string[];
  /** Switch configuration */
  config?: BSwitchProps;
}

/**
 * Switch announcement templates
 */
export interface BSwitchAnnouncementTemplates {
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
 * Switch accessibility helpers
 */
export interface BSwitchAccessibilityHelpers {
  /** Get ARIA attributes for switch */
  getSwitchAriaAttributes: (state: BSwitchState, props: BSwitchProps) => BSwitchAriaAttributes;
  /** Format state change announcement */
  formatStateChangeAnnouncement: (newValue: boolean, props: BSwitchProps) => string;
  /** Format validation announcement */
  formatValidationAnnouncement: (result: BSwitchValidationResult) => string;
  /** Check if announcement should be made */
  shouldAnnounce: (message: string, lastMessage: string | null) => boolean;
  /** Get keyboard instructions */
  getKeyboardInstructions: (role: BSwitchRole, features: string[]) => string;
  /** Get appropriate role for switch */
  getSemanticRole: (context: string, grouped: boolean) => BSwitchRole;
  /** Announce switch state change */
  announceSwitchStateChange: (value: boolean, props: BSwitchProps) => void;
  /** Validate switch accessibility */
  validateAccessibility: (props: BSwitchProps) => BSwitchValidationResult;
}

/**
 * Default configurations
 */
export const DEFAULT_SWITCH_KEYBOARD_CONFIG: Required<BSwitchKeyboardConfig> = {
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

export const DEFAULT_SWITCH_ACCESSIBILITY_CONFIG: Required<BSwitchAccessibilityProps> = {
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
  screenReaderInstructions: 'Press Space or Enter to toggle, swipe left or right to change state',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  contextDescription: '',
  requireStateConfirmation: false,
  stateConfirmationMessage: 'Are you sure you want to change this setting?',
};

export const DEFAULT_SWITCH_GROUP_CONFIG: Required<BSwitchGroupConfig> = {
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

export const DEFAULT_SWITCH_VALIDATION_CONFIG: Required<BSwitchValidationConfig> = {
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

export const DEFAULT_SWITCH_ANIMATION_CONFIG: Required<BSwitchAnimationConfig> = {
  enabled: true,
  type: 'spring',
  duration: 300,
  easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  respectReducedMotion: true,
  springTension: 300,
  springDamping: 30,
  bounceFactor: 0.25,
};

export const DEFAULT_SWITCH_ANNOUNCEMENTS: Required<BSwitchAnnouncementTemplates> = {
  stateChange: 'Switch toggled to {state}',
  activation: 'Switch activated',
  deactivation: 'Switch deactivated',
  validationError: 'Error: {message}',
  validationSuccess: 'Success: {message}',
  loadingStart: 'Processing switch state',
  loadingComplete: 'Switch processing complete',
  groupStateChange: '{count} of {total} switches active',
  focus: 'Switch focused, currently {state}',
  keyboardInstructions: 'Use Space or Enter to toggle, arrow keys or swipe to set state',
  confirmationPrompt: 'Confirm state change to {state}?',
};

/**
 * Switch interaction patterns
 */
export const SWITCH_INTERACTION_PATTERNS = {
  /** iOS-style switch */
  IOS: 'ios',
  /** Modern switch */
  MODERN: 'modern',
  /** Minimal switch */
  MINIMAL: 'minimal',
  /** Compact switch */
  COMPACT: 'compact',
  /** Settings switch */
  SETTING: 'setting',
  /** Filter switch */
  FILTER: 'filter',
  /** Mode switch */
  MODE: 'mode',
} as const;

/**
 * Switch semantic contexts
 */
export const SWITCH_SEMANTIC_CONTEXTS = {
  /** Form control */
  FORM_CONTROL: 'form-control',
  /** Settings panel */
  SETTINGS: 'settings',
  /** Filter control */
  FILTER: 'filter',
  /** Navigation switch */
  NAVIGATION: 'navigation',
  /** Feature switch */
  FEATURE: 'feature',
  /** Mode switcher */
  MODE_SWITCHER: 'mode-switcher',
  /** iOS-style system switch */
  IOS_SYSTEM: 'ios-system',
} as const;

/**
 * Keyboard navigation key mappings
 */
export const SWITCH_KEY_MAPPINGS: Record<string, {
  action: string;
  description: string;
  role?: BSwitchRole[];
}> = {
  Space: { action: 'toggle', description: 'Toggle state' },
  Enter: { action: 'toggle', description: 'Toggle state', role: ['switch'] },
  ArrowRight: { action: 'turnOn', description: 'Turn on', role: ['switch'] },
  ArrowLeft: { action: 'turnOff', description: 'Turn off', role: ['switch'] },
  ArrowUp: { action: 'previous', description: 'Previous switch in group' },
  ArrowDown: { action: 'next', description: 'Next switch in group' },
  Home: { action: 'first', description: 'First switch in group' },
  End: { action: 'last', description: 'Last switch in group' },
  Escape: { action: 'cancel', description: 'Cancel action or clear validation' },
};

/**
 * Switch size configurations with iOS-style dimensions
 */
export const SWITCH_SIZE_CONFIG: Record<BSwitchSize, {
  trackWidth: string;
  trackHeight: string;
  thumbSize: string;
  minTouchTarget: boolean;
  fontSize: string;
  borderRadius: string;
}> = {
  sm: {
    trackWidth: '2.25rem', // 36px
    trackHeight: '1.375rem', // 22px
    thumbSize: '1.125rem', // 18px
    minTouchTarget: true,
    fontSize: '0.875rem',
    borderRadius: '0.75rem', // More rounded for iOS
  },
  md: {
    trackWidth: '2.75rem', // 44px
    trackHeight: '1.625rem', // 26px
    thumbSize: '1.375rem', // 22px
    minTouchTarget: false,
    fontSize: '1rem',
    borderRadius: '0.875rem',
  },
  lg: {
    trackWidth: '3.25rem', // 52px
    trackHeight: '1.875rem', // 30px
    thumbSize: '1.625rem', // 26px
    minTouchTarget: false,
    fontSize: '1.125rem',
    borderRadius: '1rem',
  },
  xl: {
    trackWidth: '3.75rem', // 60px
    trackHeight: '2.25rem', // 36px
    thumbSize: '2rem', // 32px
    minTouchTarget: false,
    fontSize: '1.25rem',
    borderRadius: '1.25rem',
  },
};

/**
 * Switch role configurations
 */
export const SWITCH_ROLE_CONFIG: Record<BSwitchRole, {
  ariaAttribute: string;
  semanticMeaning: string;
  keyboardKeys: string[];
}> = {
  switch: {
    ariaAttribute: 'aria-checked',
    semanticMeaning: 'iOS-style binary on/off control',
    keyboardKeys: ['Space', 'Enter', 'ArrowLeft', 'ArrowRight'],
  },
  checkbox: {
    ariaAttribute: 'aria-selected',
    semanticMeaning: 'Selectable iOS-style option',
    keyboardKeys: ['Space'],
  },
  button: {
    ariaAttribute: 'aria-pressed',
    semanticMeaning: 'Pressable iOS-style action button',
    keyboardKeys: ['Space', 'Enter'],
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BSwitchAccessibilityProps as AccessibilityProps,
  BSwitchProps as Props,
  BSwitchState as State,
  BSwitchAriaAttributes as AriaAttributes,
  BSwitchKeyboardConfig as KeyboardConfig,
  BSwitchGroupConfig as GroupConfig,
  BSwitchValidationConfig as ValidationConfig,
  BSwitchAnimationConfig as AnimationConfig,
  BSwitchItem as Item,
  BSwitchChangeEvent as ChangeEvent,
  BSwitchFocusEvent as FocusEvent,
  BSwitchValidationEvent as ValidationEvent,
  BSwitchKeyboardEvent as KeyboardEvent,
  BSwitchAnimationEvent as AnimationEvent,
  BSwitchEmits as Emits,
  BSwitchValidationResult as ValidationResult,
  BSwitchAnnouncementTemplates as AnnouncementTemplates,
  BSwitchThemeConfig as ThemeConfig,
  BSwitchAccessibilityHelpers as AccessibilityHelpers,
};
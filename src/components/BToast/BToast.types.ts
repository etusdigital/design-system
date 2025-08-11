/**
 * BToast accessibility props interface
 * Implements WCAG 2.1 AA standards for toast notification components
 */
export interface BToastAccessibilityProps {
  /** ARIA live region priority: 'polite' | 'assertive' | 'off' */
  ariaLive?: 'polite' | 'assertive' | 'off';
  /** ARIA role override */
  role?: 'alert' | 'status' | 'log';
  /** Custom ARIA label */
  ariaLabel?: string;
  /** ID of element that labels this toast */
  ariaLabelledBy?: string;
  /** ID of element that describes this toast */
  ariaDescribedBy?: string;
  /** Screen reader announcement text override */
  announcement?: string;
  /** Whether to announce the toast content */
  announceContent?: boolean;
  /** Focus management option */
  focusManagement?: 'none' | 'trap' | 'auto';
  /** Auto-dismiss behavior */
  autoDismiss?: boolean;
  /** Timeout for auto-dismiss (milliseconds) */
  dismissTimeout?: number;
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
  /** Whether toast supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to announce toast status changes */
  announceStatusChanges?: boolean;
}

/**
 * Toast type variants with accessibility priority mapping
 */
export type BToastType = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/**
 * Toast position configuration
 */
export interface BToastPosition {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

/**
 * Toast size variants
 */
export type BToastSize = 'small' | 'medium' | 'large';

/**
 * Toast state interface for accessibility
 */
export interface BToastState {
  /** Current number of active toasts */
  activeCount: number;
  /** Whether any toast has focus */
  hasFocus: boolean;
  /** Currently focused toast ID */
  focusedToastId: string | null;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Whether toast system is paused */
  isPaused: boolean;
  /** Progress percentage for timed toasts */
  progressPercentage?: number;
  /** Whether toast is dismissible */
  isDismissible: boolean;
  /** Whether toast has action button */
  hasAction: boolean;
  /** Time remaining for auto-dismiss */
  timeRemaining?: number;
}

/**
 * Toast ARIA attributes interface
 */
export interface BToastAriaAttributes {
  /** ARIA role */
  role: string;
  /** ARIA live region */
  'aria-live': 'polite' | 'assertive' | 'off';
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelled by relationships */
  'aria-labelledby'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** ARIA atomic for live regions */
  'aria-atomic'?: boolean;
  /** ARIA hidden for decorative elements */
  'aria-hidden'?: boolean;
  /** Tab index for keyboard navigation */
  tabindex?: number;
}

/**
 * Toast keyboard configuration
 */
export interface BToastKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for dismissing toast */
  dismissKeys?: string[];
  /** Keys for activating action button */
  actionKeys?: string[];
  /** Keys for navigating between toasts */
  navigationKeys?: string[];
  /** Keys for pausing/resuming */
  pauseKeys?: string[];
  /** Global shortcut for dismissing all */
  globalDismissShortcut?: string[];
  /** Whether to support focus trapping */
  focusTrap?: boolean;
  /** Whether to return focus after dismiss */
  returnFocus?: boolean;
}

/**
 * Enhanced toast options with accessibility features
 */
export interface BToastOptions extends BToastPosition, BToastAccessibilityProps {
  id: string;
  title?: string;
  message?: string;
  type?: BToastType;
  button?: string;
  action?: () => void;
  timeout?: number;
  /** Prevent auto-dismiss on hover/focus */
  persistOnHover?: boolean;
  /** Allow manual dismiss via keyboard */
  dismissible?: boolean;
  /** Custom icon for the toast */
  icon?: string;
  /** Progress indicator for timed toasts */
  showProgress?: boolean;
  /** Size variant */
  size?: BToastSize;
  /** Custom CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BToastKeyboardConfig;
  /** Whether to animate entrance/exit */
  animated?: boolean;
  /** Custom animation duration */
  animationDuration?: number;
  /** Z-index override */
  zIndex?: number;
}

/**
 * Internal toast object with enhanced accessibility properties
 */
export interface BToast extends Required<BToastPosition>, Required<BToastAccessibilityProps> {
  id: string;
  title: string;
  message: string;
  type: BToastType;
  button: string;
  action: () => void;
  visible: boolean;
  persistOnHover: boolean;
  dismissible: boolean;
  icon: string;
  showProgress: boolean;
  size: BToastSize;
  /** Timeout reference for cleanup */
  timeoutRef?: number;
  /** Progress animation state */
  progressPercentage?: number;
  /** Whether toast is currently hovered/focused */
  isPaused?: boolean;
  /** Focus trap reference */
  focusedElement?: HTMLElement;
  /** Creation timestamp */
  createdAt: number;
  /** Whether toast is currently active for keyboard nav */
  isActive?: boolean;
  /** Custom keyboard configuration */
  keyboardConfig?: BToastKeyboardConfig;
}

/**
 * BToast emits interface
 */
export interface BToastEmits {
  /** Toast opened */
  'toast-opened': [toast: BToast];
  /** Toast closed */
  'toast-closed': [id: string, reason: 'user' | 'timeout' | 'programmatic'];
  /** Toast focused */
  'toast-focus': [id: string];
  /** Toast blurred */
  'toast-blur': [id: string];
  /** Action button clicked */
  'action': [id: string, action: () => void];
  /** Toast paused (hover/focus) */
  'toast-paused': [id: string];
  /** Toast resumed */
  'toast-resumed': [id: string];
  /** Keyboard event */
  'keyboard': [event: KeyboardEvent, action: string];
  /** Progress updated */
  'progress': [id: string, percentage: number];
  /** All toasts dismissed */
  'all-dismissed': [];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Toast system status change */
  'status-change': [activeCount: number, focusedId: string | null];
}

/**
 * Toast validation result
 */
export interface BToastValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Toast configuration */
  config?: BToastOptions;
}

/**
 * Toast announcement templates
 */
export interface BToastAnnouncementTemplates {
  /** Template for toast opening announcement */
  toastOpened: string;
  /** Template for toast closing announcement */
  toastClosed: string;
  /** Template for toast focus announcement */
  toastFocused: string;
  /** Template for action available announcement */
  actionAvailable: string;
  /** Template for progress update announcement */
  progressUpdate: string;
  /** Template for pause announcement */
  toastPaused: string;
  /** Template for resume announcement */
  toastResumed: string;
  /** Template for navigation instructions */
  navigationHelp: string;
  /** Template for system status announcement */
  systemStatus: string;
  /** Template for dismiss all announcement */
  allDismissed: string;
}

/**
 * Toast container configuration
 */
export interface BToastContainer {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
  /** Maximum toasts in this container */
  maxToasts?: number;
  /** Container-specific ARIA label */
  ariaLabel?: string;
  /** Custom CSS classes */
  class?: string;
  /** Z-index for container */
  zIndex?: number;
}

/**
 * Toast system configuration
 */
export interface BToastSystemConfig {
  /** Maximum total toasts */
  maxToasts?: number;
  /** Default timeout for toasts */
  defaultTimeout?: number;
  /** Global keyboard shortcuts */
  globalShortcuts?: Record<string, () => void>;
  /** Default accessibility configuration */
  defaultAccessibility?: BToastAccessibilityProps;
  /** Default keyboard configuration */
  defaultKeyboard?: BToastKeyboardConfig;
  /** Whether to stack toasts */
  stackToasts?: boolean;
  /** Animation settings */
  animations?: {
    enabled?: boolean;
    duration?: number;
    easing?: string;
  };
}

/**
 * Default configurations
 */
export const DEFAULT_TOAST_KEYBOARD_CONFIG: Required<BToastKeyboardConfig> = {
  enabled: true,
  dismissKeys: ['Escape'],
  actionKeys: ['Enter', ' '],
  navigationKeys: ['ArrowUp', 'ArrowDown'],
  pauseKeys: [],
  globalDismissShortcut: ['Control', 'Shift', 'KeyD'],
  focusTrap: false,
  returnFocus: true,
};

export const DEFAULT_TOAST_ACCESSIBILITY_CONFIG: Required<BToastAccessibilityProps> = {
  ariaLive: 'polite',
  role: 'status',
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  announcement: '',
  announceContent: true,
  focusManagement: 'none',
  autoDismiss: true,
  dismissTimeout: 5000,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Press Escape to dismiss, use arrow keys to navigate between notifications',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  announceStatusChanges: true,
};

export const DEFAULT_TOAST_ANNOUNCEMENTS: Required<BToastAnnouncementTemplates> = {
  toastOpened: '{type} notification: {title}. {message}',
  toastClosed: 'Notification dismissed',
  toastFocused: 'Focused on {type} notification: {title}',
  actionAvailable: 'Action available: {button}. Press Enter or Space to activate',
  progressUpdate: '{percentage}% time remaining',
  toastPaused: 'Notification paused',
  toastResumed: 'Notification resumed',
  navigationHelp: 'Use arrow keys to navigate between notifications, Escape to dismiss',
  systemStatus: '{count} notification{plural} active',
  allDismissed: 'All notifications dismissed',
};

export const DEFAULT_TOAST_SYSTEM_CONFIG: Required<BToastSystemConfig> = {
  maxToasts: 5,
  defaultTimeout: 5000,
  globalShortcuts: {},
  defaultAccessibility: DEFAULT_TOAST_ACCESSIBILITY_CONFIG,
  defaultKeyboard: DEFAULT_TOAST_KEYBOARD_CONFIG,
  stackToasts: true,
  animations: {
    enabled: true,
    duration: 600,
    easing: 'ease-in-out',
  },
};

/**
 * Type mappings for toast configurations
 */
export const TOAST_TYPE_CONFIG: Record<BToastType, Partial<BToastAccessibilityProps & { icon: string; timeout: number }>> = {
  danger: {
    ariaLive: 'assertive',
    role: 'alert',
    autoDismiss: false,
    dismissTimeout: 0,
    icon: '❌',
  },
  warning: {
    ariaLive: 'assertive',
    role: 'alert',
    autoDismiss: false,
    dismissTimeout: 0,
    icon: '⚠️',
  },
  success: {
    ariaLive: 'polite',
    role: 'status',
    autoDismiss: true,
    dismissTimeout: 5000,
    icon: '✅',
  },
  info: {
    ariaLive: 'polite',
    role: 'status',
    autoDismiss: true,
    dismissTimeout: 5000,
    icon: 'ℹ️',
  },
  neutral: {
    ariaLive: 'polite',
    role: 'log',
    autoDismiss: true,
    dismissTimeout: 5000,
    icon: '📋',
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BToastAccessibilityProps as AccessibilityProps,
  BToastOptions as Options,
  BToast as Toast,
  BToastState as State,
  BToastAriaAttributes as AriaAttributes,
  BToastKeyboardConfig as KeyboardConfig,
  BToastEmits as Emits,
  BToastValidationResult as ValidationResult,
  BToastAnnouncementTemplates as AnnouncementTemplates,
  BToastContainer as Container,
  BToastSystemConfig as SystemConfig,
};
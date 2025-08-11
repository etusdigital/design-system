/**
 * BConfirm TypeScript Definitions
 * Comprehensive accessibility-focused types for confirmation dialogs
 */

/**
 * Urgency levels that determine dialog behavior and semantics
 */
export type BConfirmUrgency = 'low' | 'medium' | 'high' | 'critical';

/**
 * Focus target options for initial focus management
 */
export type BConfirmFocusTarget = 'confirm' | 'cancel' | 'none' | 'first' | 'last';

/**
 * Dialog role types based on urgency and context
 */
export type BConfirmRole = 'dialog' | 'alertdialog';

/**
 * Cancellation reasons for tracking user interactions
 */
export type BConfirmCancelReason = 'cancel' | 'escape' | 'outside';

/**
 * Button color options
 */
export type BConfirmButtonColor = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/**
 * Button variant options
 */
export type BConfirmButtonVariant = 'default' | 'secondary' | 'plain' | 'reverse';

/**
 * Focus management configuration
 */
export interface BConfirmFocusConfig {
  /** Initial focus target when dialog opens */
  initialFocus?: BConfirmFocusTarget;
  /** Whether to trap focus within the dialog */
  trapFocus?: boolean;
  /** Whether to restore focus when dialog closes */
  restoreFocus?: boolean;
  /** Custom selector for initial focus element */
  initialFocusSelector?: string;
}

/**
 * Keyboard navigation configuration
 */
export interface BConfirmKeyboardConfig {
  /** Whether Escape key closes the dialog */
  escapeToClose?: boolean;
  /** Whether Enter key confirms the action */
  enterToConfirm?: boolean;
  /** Whether to enable arrow key navigation between buttons */
  arrowKeyNavigation?: boolean;
  /** Custom keyboard shortcuts */
  customShortcuts?: Record<string, () => void>;
}

/**
 * Screen reader configuration
 */
export interface BConfirmScreenReaderConfig {
  /** Whether to announce dialog opening */
  announceOpen?: boolean;
  /** Whether to announce dialog closing */
  announceClose?: boolean;
  /** Whether to announce action results */
  announceResults?: boolean;
  /** Custom announcement texts */
  announcements?: {
    opening?: string;
    confirmed?: string;
    cancelled?: string;
    loading?: string;
    error?: string;
  };
}

/**
 * Accessibility configuration options
 */
export interface BConfirmAccessibilityConfig {
  /** Focus management settings */
  focus?: BConfirmFocusConfig;
  /** Keyboard navigation settings */
  keyboard?: BConfirmKeyboardConfig;
  /** Screen reader settings */
  screenReader?: BConfirmScreenReaderConfig;
  /** Whether to use high contrast mode */
  highContrast?: boolean;
  /** Whether to respect reduced motion preferences */
  respectReducedMotion?: boolean;
}

/**
 * Confirmation button configuration
 */
export interface BConfirmButtonConfig {
  /** Button text */
  text?: string;
  /** Button color */
  color?: BConfirmButtonColor;
  /** Button variant */
  variant?: BConfirmButtonVariant;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Custom ARIA label */
  ariaLabel?: string;
  /** Custom CSS classes */
  class?: string;
  /** Icon to display */
  icon?: string;
}

/**
 * Main BConfirm props interface
 */
export interface BConfirmProps {
  /** Whether the dialog is visible (v-model) */
  modelValue?: boolean;
  
  // Content
  /** Dialog title */
  title?: string;
  /** Dialog message content */
  message?: string;
  /** Icon to display */
  icon?: string;
  
  // Button Configuration
  /** Confirmation button configuration */
  confirmButton?: BConfirmButtonConfig;
  /** Cancel button configuration */
  cancelButton?: BConfirmButtonConfig;
  
  // Legacy button props for backward compatibility
  /** @deprecated Use confirmButton.text instead */
  acceptText?: string;
  /** @deprecated Use cancelButton.text instead */
  cancelText?: string;
  /** @deprecated Use confirmButton.color instead */
  confirmColor?: BConfirmButtonColor;
  /** @deprecated Use confirmButton.variant instead */
  confirmVariant?: BConfirmButtonVariant;
  /** @deprecated Use cancelButton.color instead */
  cancelColor?: BConfirmButtonColor;
  /** @deprecated Use cancelButton.variant instead */
  cancelVariant?: BConfirmButtonVariant;
  
  // Behavior
  /** Urgency level affecting dialog semantics and behavior */
  urgency?: BConfirmUrgency;
  /** Whether to show the cancel button */
  showCancel?: boolean;
  /** Whether clicking outside closes the dialog */
  allowOutsideClose?: boolean;
  /** Loading state for async operations */
  loading?: boolean;
  
  // Accessibility
  /** Accessibility configuration */
  accessibility?: BConfirmAccessibilityConfig;
  /** Dialog role (auto-determined from urgency if not specified) */
  role?: BConfirmRole;
  /** Custom ARIA label for the dialog */
  ariaLabel?: string;
  /** Custom ARIA description */
  ariaDescription?: string;
  /** @deprecated Use accessibility.focus.initialFocus instead */
  autoFocus?: BConfirmFocusTarget;
  
  // Advanced
  /** Custom CSS classes for the dialog */
  dialogClass?: string;
  /** Custom CSS classes for the content */
  contentClass?: string;
  /** Custom CSS classes for the button container */
  actionsClass?: string;
}

/**
 * Confirmation dialog options for event-based usage
 */
export interface BConfirmOptions extends Omit<BConfirmProps, 'modelValue'> {
  /** Callback for confirmation action */
  onConfirm?: () => boolean | void | Promise<boolean | void>;
  /** Callback for cancellation action */
  onCancel?: (reason: BConfirmCancelReason) => boolean | void;
  /** Callback for dialog opening */
  onOpen?: () => void;
  /** Callback for dialog closing */
  onClose?: () => void;
}

/**
 * Events emitted by BConfirm component
 */
export interface BConfirmEmits {
  /** Emitted when v-model value changes */
  "update:modelValue": [value: boolean];
  /** Emitted when user confirms the action */
  "confirm": [];
  /** Emitted when user cancels the action */
  "cancel": [reason: BConfirmCancelReason];
  /** Emitted when dialog opens */
  "open": [];
  /** Emitted when dialog closes */
  "close": [];
  /** Emitted when focus changes within the dialog */
  "focus-change": [element: HTMLElement];
  /** Emitted when keyboard navigation occurs */
  "keyboard-nav": [event: KeyboardEvent, action: string];
}

/**
 * Default accessibility configuration
 */
export const DEFAULT_ACCESSIBILITY_CONFIG: Required<BConfirmAccessibilityConfig> = {
  focus: {
    initialFocus: 'cancel',
    trapFocus: true,
    restoreFocus: true,
    initialFocusSelector: undefined,
  },
  keyboard: {
    escapeToClose: true,
    enterToConfirm: false, // Disabled by default for safety
    arrowKeyNavigation: true,
    customShortcuts: {},
  },
  screenReader: {
    announceOpen: true,
    announceClose: false,
    announceResults: true,
    announcements: {
      opening: 'Confirmation dialog opened',
      confirmed: 'Action confirmed',
      cancelled: 'Action cancelled',
      loading: 'Processing request, please wait',
      error: 'An error occurred',
    },
  },
  highContrast: false,
  respectReducedMotion: true,
};

/**
 * Urgency level mappings for dialog behavior
 */
export const URGENCY_CONFIG: Record<BConfirmUrgency, {
  role: BConfirmRole;
  defaultFocus: BConfirmFocusTarget;
  escapeToClose: boolean;
  announceOpen: boolean;
}> = {
  low: {
    role: 'dialog',
    defaultFocus: 'confirm',
    escapeToClose: true,
    announceOpen: false,
  },
  medium: {
    role: 'dialog',
    defaultFocus: 'cancel',
    escapeToClose: true,
    announceOpen: true,
  },
  high: {
    role: 'alertdialog',
    defaultFocus: 'cancel',
    escapeToClose: true,
    announceOpen: true,
  },
  critical: {
    role: 'alertdialog',
    defaultFocus: 'cancel',
    escapeToClose: false, // Prevent accidental cancellation
    announceOpen: true,
  },
};

/**
 * Utility type for component instance
 */
export type BConfirmInstance = {
  /** Opens the dialog with options */
  open: (options?: Partial<BConfirmOptions>) => void;
  /** Closes the dialog */
  close: () => void;
  /** Focuses the confirm button */
  focusConfirm: () => void;
  /** Focuses the cancel button */
  focusCancel: () => void;
  /** Gets the current focus element */
  getCurrentFocus: () => HTMLElement | null;
};
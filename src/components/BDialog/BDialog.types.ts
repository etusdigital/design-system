import type { Ref } from 'vue';

/**
 * Dialog variants that affect ARIA behavior and user experience
 */
export type DialogVariant = 'dialog' | 'alertdialog';

/**
 * Dialog size presets for consistent sizing
 */
export type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'auto';

/**
 * Dialog position presets for consistent positioning
 */
export type DialogPosition = 'center' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * Backdrop visual effects
 */
export type BackdropEffect = 'blur' | 'darken' | 'none';

/**
 * Loading state configuration
 */
export interface DialogLoadingConfig {
  /** Whether dialog is in loading state */
  loading: boolean;
  /** Loading message to display */
  message?: string;
  /** Custom loading component */
  component?: any;
  /** Loading spinner size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to block interactions during loading */
  blocking?: boolean;
}

/**
 * Focus target options for initial focus management
 */
export type InitialFocusTarget = 
  | 'first' 
  | 'last' 
  | 'dialog'
  | 'close-button'
  | HTMLElement 
  | (() => HTMLElement | null)
  | null;

/**
 * Return focus options for focus restoration
 */
export type ReturnFocusTarget = 
  | 'trigger' 
  | HTMLElement 
  | (() => HTMLElement | null)
  | null;

/**
 * Dialog close reasons for accessibility announcements
 */
export type DialogCloseReason = 
  | 'escape'
  | 'backdrop'
  | 'close-button'
  | 'action'
  | 'programmatic';

/**
 * Accessibility configuration interface for BDialog
 */
export interface DialogAccessibilityConfig {
  /**
   * Dialog variant - affects ARIA role and behavior
   * - 'dialog': Standard dialog (role="dialog")
   * - 'alertdialog': Alert dialog for critical information (role="alertdialog")
   * @default 'dialog'
   */
  variant?: DialogVariant;

  /**
   * Element ID that labels the dialog (aria-labelledby)
   * Should point to the dialog's title/header element
   */
  labelledBy?: string;

  /**
   * Element ID that describes the dialog (aria-describedby)
   * Should point to the dialog's description/content element
   */
  describedBy?: string;

  /**
   * Direct aria-label for the dialog
   * Use when labelledBy is not available
   */
  label?: string;

  /**
   * Initial focus target when dialog opens
   * @default 'first'
   */
  initialFocus?: InitialFocusTarget;

  /**
   * Where to return focus when dialog closes
   * @default 'trigger'
   */
  returnFocus?: ReturnFocusTarget;

  /**
   * Enable/disable focus trapping within dialog
   * @default true
   */
  trapFocus?: boolean;

  /**
   * Enable/disable backdrop click to close
   * @default false for alertdialog, true for dialog
   */
  dismissible?: boolean;

  /**
   * Enable/disable escape key to close
   * @default false for alertdialog, true for dialog
   */
  escapeToClose?: boolean;

  /**
   * Screen reader announcement when dialog opens
   * @default based on variant
   */
  openAnnouncement?: string | ((variant: DialogVariant) => string);

  /**
   * Screen reader announcement when dialog closes
   * @default based on close reason
   */
  closeAnnouncement?: string | ((reason: DialogCloseReason) => string);

  /**
   * Enable live region for dynamic content announcements
   * @default false
   */
  liveRegion?: boolean;

  /**
   * Delay before focusing initial element (ms)
   * Useful for transitions and animations
   * @default 100
   */
  focusDelay?: number;

  /**
   * Hide background content from screen readers
   * @default true
   */
  hideBackground?: boolean;
}

/**
 * Main props interface for BDialog component
 */
export interface BDialogProps {
  /**
   * Controls dialog visibility
   * @default false
   */
  modelValue?: boolean;

  /**
   * Dialog size preset or custom width
   * @default 'md'
   */
  size?: DialogSize | string;

  /**
   * Dialog width - can be preset size or custom CSS value
   * @default 'auto'
   */
  width?: DialogSize | string;

  /**
   * Dialog height - can be preset size or custom CSS value
   * @default 'auto'
   */
  height?: DialogSize | string;

  /**
   * Dialog position preset
   * @default 'center'
   */
  position?: DialogPosition;

  /**
   * Show close button in header
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Dialog title for header
   */
  title?: string;

  /**
   * Loading state configuration
   */
  loading?: boolean | DialogLoadingConfig;

  /**
   * Persistent dialog (prevents closing)
   * @default false
   */
  persistent?: boolean;

  /**
   * Backdrop visual effect
   * @default 'darken'
   */
  backdropEffect?: BackdropEffect;

  /**
   * Custom backdrop blur amount (when using blur effect)
   * @default '8px'
   */
  backdropBlur?: string;

  /**
   * Prevent body scroll when dialog is open
   * @default true
   */
  lockBodyScroll?: boolean;

  /**
   * Enable nested dialog support
   * @default true
   */
  nested?: boolean;

  /**
   * Custom CSS class for dialog container
   */
  class?: string;

  /**
   * z-index for dialog stacking (auto-calculated for nested)
   * @default 1000
   */
  zIndex?: number;

  /**
   * Enable/disable dialog animations
   * @default true
   */
  animated?: boolean;

  /**
   * Transition effect name
   * @default 'modal-bounce'
   */
  transition?: string;

  /**
   * Maximum width constraint
   */
  maxWidth?: string;

  /**
   * Maximum height constraint
   */
  maxHeight?: string;

  /**
   * Enable scrollable content within dialog
   * @default false
   */
  scrollable?: boolean;

  /**
   * Mobile responsive behavior
   * @default true
   */
  responsive?: boolean;

  /**
   * Comprehensive accessibility configuration
   */
  accessibility?: DialogAccessibilityConfig;

  // Legacy props for backward compatibility
  /**
   * @deprecated Use accessibility.dismissible instead
   */
  noOutsideClose?: boolean;

  /**
   * @deprecated Use accessibility.labelledBy
   */
  titleId?: string;

  /**
   * @deprecated Use accessibility.describedBy
   */
  descriptionId?: string;

  /**
   * @deprecated Use transition instead
   */
  animation?: string;
}

/**
 * Events emitted by BDialog component
 */
export interface BDialogEmits {
  /**
   * Emitted when dialog visibility changes
   */
  'update:modelValue': [value: boolean];

  /**
   * Emitted when dialog is about to open
   * Can be prevented by calling event.preventDefault()
   */
  'before-open': [event: { preventDefault: () => void }];

  /**
   * Emitted when dialog has opened and focus is set
   */
  'opened': [];

  /**
   * Emitted when dialog is about to close
   * Can be prevented by calling event.preventDefault()
   */
  'before-close': [event: { 
    reason: DialogCloseReason;
    preventDefault: () => void;
  }];

  /**
   * Emitted when dialog has closed and focus is restored
   */
  'closed': [reason: DialogCloseReason];

  /**
   * Emitted when escape key is pressed (regardless of escapeToClose setting)
   */
  'escape': [];

  /**
   * Emitted when backdrop is clicked (regardless of dismissible setting)
   */
  'backdrop-click': [];
}

/**
 * Slots available in BDialog component
 */
export interface BDialogSlots {
  /**
   * Default slot for dialog content
   */
  default: {};

  /**
   * Optional header slot
   */
  header?: {
    /**
     * Close dialog function
     */
    close: (reason?: DialogCloseReason) => void;
  };

  /**
   * Optional footer slot
   */
  footer?: {
    /**
     * Close dialog function
     */
    close: (reason?: DialogCloseReason) => void;
  };
}

/**
 * Focus trap utilities and state
 */
export interface DialogFocusState {
  /**
   * Previously focused element (for restoration)
   */
  previouslyFocused: Ref<HTMLElement | null>;

  /**
   * Current dialog element
   */
  dialogElement: Ref<HTMLElement | null>;

  /**
   * Focus trap activation state
   */
  isActive: Ref<boolean>;

  /**
   * Available focusable elements within dialog
   */
  focusableElements: Ref<HTMLElement[]>;

  /**
   * Currently focused element index
   */
  currentFocusIndex: Ref<number>;
}

/**
 * Dialog size configuration map
 */
export const DIALOG_SIZE_MAP: Record<DialogSize, { width: string; height: string; maxWidth?: string; maxHeight?: string }> = {
  xs: {
    width: '280px',
    height: 'auto',
    maxWidth: '95vw',
    maxHeight: '90vh'
  },
  sm: {
    width: '384px',
    height: 'auto',
    maxWidth: '95vw',
    maxHeight: '90vh'
  },
  md: {
    width: '512px',
    height: 'auto',
    maxWidth: '90vw',
    maxHeight: '90vh'
  },
  lg: {
    width: '768px',
    height: 'auto',
    maxWidth: '90vw',
    maxHeight: '90vh'
  },
  xl: {
    width: '1024px',
    height: 'auto',
    maxWidth: '90vw',
    maxHeight: '90vh'
  },
  '2xl': {
    width: '1280px',
    height: 'auto',
    maxWidth: '95vw',
    maxHeight: '90vh'
  },
  full: {
    width: '100vw',
    height: '100vh'
  },
  auto: {
    width: 'fit-content',
    height: 'fit-content',
    maxWidth: '90vw',
    maxHeight: '90vh'
  }
};

/**
 * Dialog position configuration map
 */
export const DIALOG_POSITION_MAP: Record<DialogPosition, { 
  alignItems: string; 
  justifyContent: string; 
  transform?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}> = {
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  top: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    top: '5vh'
  },
  bottom: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    bottom: '5vh'
  },
  'top-left': {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    top: '5vh',
    left: '5vw'
  },
  'top-right': {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    top: '5vh',
    right: '5vw'
  },
  'bottom-left': {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    bottom: '5vh',
    left: '5vw'
  },
  'bottom-right': {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    bottom: '5vh',
    right: '5vw'
  }
};

/**
 * Backdrop effect configuration
 */
export const BACKDROP_EFFECTS: Record<BackdropEffect, { 
  backdrop: string;
  filter?: string;
}> = {
  none: {
    backdrop: 'rgba(0, 0, 0, 0)'
  },
  darken: {
    backdrop: 'rgba(0, 0, 0, 0.5)'
  },
  blur: {
    backdrop: 'rgba(0, 0, 0, 0.25)',
    filter: 'blur(8px)'
  }
};

/**
 * Default accessibility configurations by variant
 */
export const DEFAULT_ACCESSIBILITY_CONFIG: Record<DialogVariant, Partial<DialogAccessibilityConfig>> = {
  dialog: {
    variant: 'dialog',
    initialFocus: 'first',
    returnFocus: 'trigger',
    trapFocus: true,
    dismissible: true,
    escapeToClose: true,
    openAnnouncement: 'Dialog opened',
    closeAnnouncement: (reason: DialogCloseReason) => {
      const reasonMap = {
        escape: 'Dialog closed with escape key',
        backdrop: 'Dialog closed by clicking outside',
        'close-button': 'Dialog closed',
        action: 'Dialog closed',
        programmatic: 'Dialog closed'
      };
      return reasonMap[reason] || 'Dialog closed';
    },
    liveRegion: false,
    focusDelay: 100,
    hideBackground: true
  },
  alertdialog: {
    variant: 'alertdialog',
    initialFocus: 'first',
    returnFocus: 'trigger',
    trapFocus: true,
    dismissible: false,
    escapeToClose: false,
    openAnnouncement: 'Alert dialog opened',
    closeAnnouncement: (reason: DialogCloseReason) => 'Alert dialog closed',
    liveRegion: true,
    focusDelay: 100,
    hideBackground: true
  }
};
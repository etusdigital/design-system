// Re-export all modern toast types from composables
export type {
  ToastPosition,
  ToastType,
  ToastPriority,
  ToastAnimation,
  ToastAction,
  ToastUndoAction,
  ToastOptions,
  Toast,
  ToastState,
  ToastQueueConfig,
} from '#composables/useToast';

// Re-export swipe gesture types
export type {
  SwipeDirection,
  SwipeConfig,
  SwipeGestureData,
  SwipeHandlers,
} from '#composables/useSwipeGesture';

// Re-export legacy compatibility types
export type {
  LegacyToastOptions,
} from '#composables/useToastLegacy';

/**
 * Modern toast emits interface
 */
export interface BToastModernEmits {
  /** Toast opened */
  'toast-opened': [toast: Toast];
  /** Toast closed */
  'toast-closed': [id: string, reason: 'user' | 'timeout' | 'programmatic'];
  /** Toast focused */
  'toast-focus': [id: string];
  /** Toast blurred */  
  'toast-blur': [id: string];
  /** Action button clicked */
  'action': [id: string, action: ToastAction];
  /** Undo action executed */
  'undo': [id: string, undoAction: ToastUndoAction];
  /** Toast paused (hover/focus) */
  'toast-paused': [id: string];
  /** Toast resumed */
  'toast-resumed': [id: string];
  /** Keyboard event */
  'keyboard': [event: KeyboardEvent, action: string];
  /** Swipe gesture detected */
  'swipe': [id: string, direction: SwipeDirection];
  /** Progress updated */
  'progress': [id: string, percentage: number];
  /** All toasts dismissed */
  'all-dismissed': [];
  /** Queue status change */
  'queue-change': [visibleCount: number, queueLength: number];
}

/**
 * Container position configuration for rendering
 */
export interface ToastContainer {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
  ariaLabel: string;
  toasts: Toast[];
}

/**
 * Animation configuration
 */
export interface ToastAnimationConfig {
  /** Animation type */
  type: ToastAnimation;
  /** Duration in milliseconds */
  duration: number;
  /** CSS easing function */
  easing: string;
  /** Whether to reduce motion for accessibility */
  respectReducedMotion: boolean;
}

/**
 * Toast notification system configuration
 */
export interface ToastSystemConfig extends ToastQueueConfig {
  /** Animation settings */
  animations: ToastAnimationConfig;
  /** Whether to setup legacy event bus compatibility */
  legacyMode: boolean;
  /** Global keyboard shortcuts */
  globalShortcuts: {
    dismissAll: string[];
    pauseAll: string[];
    resumeAll: string[];
  };
  /** Accessibility settings */
  accessibility: {
    announceToasts: boolean;
    announceProgress: boolean;
    announceActions: boolean;
    respectReducedMotion: boolean;
    highContrastMode: boolean;
  };
}

/**
 * Toast validation rules
 */
export interface ToastValidation {
  /** Maximum message length */
  maxMessageLength: number;
  /** Maximum title length */
  maxTitleLength: number;
  /** Required fields */
  requiredFields: (keyof ToastOptions)[];
  /** Custom validation function */
  customValidator?: (options: ToastOptions) => { valid: boolean; errors: string[] };
}

/**
 * Toast metrics and analytics
 */
export interface ToastMetrics {
  /** Total toasts created */
  totalCreated: number;
  /** Total toasts dismissed by user */
  totalDismissedByUser: number;
  /** Total toasts auto-dismissed */
  totalAutoDismissed: number;
  /** Total actions executed */
  totalActionsExecuted: number;
  /** Total undo actions executed */
  totalUndoActionsExecuted: number;
  /** Average display time */
  averageDisplayTime: number;
  /** Most common toast types */
  typeDistribution: Record<ToastType, number>;
  /** Most common positions */
  positionDistribution: Record<ToastPosition, number>;
}

/**
 * Default configurations for different toast types
 */
export const MODERN_TOAST_TYPE_CONFIG: Record<ToastType, Partial<ToastOptions>> = {
  danger: {
    duration: 0, // Don't auto-dismiss errors
    priority: 'high',
    position: 'top-center',
    showProgress: false,
    accessibility: {
      ariaLive: 'assertive',
      role: 'alert',
      announceContent: true,
    },
  },
  warning: {
    duration: 8000,
    priority: 'high', 
    position: 'top-right',
    showProgress: true,
    accessibility: {
      ariaLive: 'assertive',
      role: 'alert',
      announceContent: true,
    },
  },
  success: {
    duration: 5000,
    priority: 'normal',
    position: 'top-right',
    showProgress: true,
    accessibility: {
      ariaLive: 'polite',
      role: 'status',
      announceContent: true,
    },
  },
  info: {
    duration: 5000,
    priority: 'normal',
    position: 'top-right',
    showProgress: true,
    accessibility: {
      ariaLive: 'polite',
      role: 'status',
      announceContent: true,
    },
  },
  neutral: {
    duration: 4000,
    priority: 'low',
    position: 'bottom-right',
    showProgress: false,
    accessibility: {
      ariaLive: 'polite',
      role: 'log',
      announceContent: false,
    },
  },
};

/**
 * Default system configuration
 */
export const DEFAULT_TOAST_SYSTEM_CONFIG: ToastSystemConfig = {
  // Queue settings
  maxVisible: 5,
  maxInMemory: 50,
  overflowStrategy: 'shift',
  defaultPosition: 'top-right',
  defaultDuration: 5000,
  groupByPosition: true,
  
  // Animation settings
  animations: {
    enabled: true,
    duration: 600,
    easing: 'ease-in-out',
    type: 'slide',
    respectReducedMotion: true,
  },
  
  // Legacy compatibility
  legacyMode: true,
  
  // Global shortcuts
  globalShortcuts: {
    dismissAll: ['Control', 'Shift', 'KeyD'],
    pauseAll: ['Control', 'Shift', 'KeyP'],
    resumeAll: ['Control', 'Shift', 'KeyR'],
  },
  
  // Accessibility
  accessibility: {
    announceToasts: true,
    announceProgress: false, // Can be verbose
    announceActions: true,
    respectReducedMotion: true,
    highContrastMode: false,
  },
};

/**
 * Export all types for external use with better organization
 */
export type {
  // Core types
  Toast as ModernToast,
  ToastOptions as ModernToastOptions,
  ToastState as ModernToastState,
  ToastQueueConfig as ModernToastQueueConfig,
  
  // Action types
  ToastAction as ModernToastAction,
  ToastUndoAction as ModernToastUndoAction,
  
  // Enums
  ToastType as ModernToastType,
  ToastPosition as ModernToastPosition,
  ToastPriority as ModernToastPriority,
  ToastAnimation as ModernToastAnimation,
  
  // System types
  ToastSystemConfig as ModernToastSystemConfig,
  ToastAnimationConfig as ModernToastAnimationConfig,
  ToastValidation as ModernToastValidation,
  ToastMetrics as ModernToastMetrics,
  ToastContainer as ModernToastContainer,
  
  // Legacy compatibility
  LegacyToastOptions,
};
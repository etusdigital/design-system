import { ref, reactive, computed, nextTick, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import { useScreenReader } from './useScreenReader';

/**
 * Modern toast position enum - replaces boolean flags
 */
export type ToastPosition = 
  | 'top-center' | 'top-left' | 'top-right'
  | 'bottom-center' | 'bottom-left' | 'bottom-right'
  | 'center'
  // Legacy support for existing boolean-based positioning
  | 'top' | 'bottom';

/**
 * Toast type with enhanced variants
 */
export type ToastType = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/**
 * Priority levels for toast queue management
 */
export type ToastPriority = 'low' | 'normal' | 'high' | 'urgent';

/**
 * Animation types for toast entrance/exit
 */
export type ToastAnimation = 'slide' | 'fade' | 'bounce' | 'flip' | 'zoom';

/**
 * Action button configuration
 */
export interface ToastAction {
  /** Button label */
  label: string;
  /** Action handler function */
  handler: () => void | Promise<void>;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Button color */
  color?: ToastType;
  /** Whether action auto-closes toast */
  autoClose?: boolean;
}

/**
 * Undo action configuration
 */
export interface ToastUndoAction {
  /** Undo button label */
  label: string;
  /** Undo handler function */
  handler: () => void | Promise<void>;
  /** Timeout before undo is no longer available (ms) */
  timeout?: number;
}

/**
 * Modern toast options interface
 */
export interface ToastOptions {
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Toast title */
  title?: string;
  /** Toast message */
  message: string;
  /** Toast type/variant */
  type?: ToastType;
  /** Display position */
  position?: ToastPosition;
  /** Auto-dismiss duration (0 = no auto-dismiss) */
  duration?: number;
  /** Priority level for queue management */
  priority?: ToastPriority;
  /** Whether toast can be manually dismissed */
  closable?: boolean;
  /** Pause auto-dismiss on hover/focus */
  pauseOnHover?: boolean;
  /** Show progress bar for timed toasts */
  showProgress?: boolean;
  /** Custom icon (overrides type default) */
  icon?: string;
  /** Primary action button */
  action?: ToastAction;
  /** Undo action configuration */
  undoAction?: ToastUndoAction;
  /** Animation type */
  animation?: ToastAnimation;
  /** Custom CSS classes */
  class?: string | string[];
  /** Inline styles */
  style?: Record<string, any>;
  /** Accessibility options */
  accessibility?: {
    ariaLive?: 'polite' | 'assertive' | 'off';
    role?: 'alert' | 'status' | 'log';
    ariaLabel?: string;
    announcement?: string;
    announceContent?: boolean;
  };
  /** Whether toast persists across route changes */
  persistent?: boolean;
  /** Group ID for batch operations */
  group?: string;
  /** Custom component to render instead of default */
  component?: any;
  /** Props to pass to custom component */
  componentProps?: Record<string, any>;
}

/**
 * Internal toast object with enhanced properties
 */
export interface Toast extends Required<Omit<ToastOptions, 'action' | 'undoAction' | 'accessibility' | 'componentProps'>> {
  /** Unique identifier */
  id: string;
  /** Creation timestamp */
  timestamp: number;
  /** Whether toast is currently visible */
  visible: boolean;
  /** Whether toast is paused (hover/focus) */
  paused: boolean;
  /** Progress percentage (0-100) */
  progress: number;
  /** Timeout reference for cleanup */
  timeoutRef?: number;
  /** Animation frame reference */
  animationRef?: number;
  /** Action configuration */
  action?: ToastAction;
  /** Undo action configuration */
  undoAction?: ToastUndoAction;
  /** Accessibility options */
  accessibility: {
    ariaLive: 'polite' | 'assertive' | 'off';
    role: 'alert' | 'status' | 'log';
    ariaLabel?: string;
    announcement?: string;
    announceContent: boolean;
  };
  /** Props for custom component */
  componentProps?: Record<string, any>;
  /** Whether undo is still available */
  undoAvailable?: boolean;
  /** Undo timeout reference */
  undoTimeoutRef?: number;
}

/**
 * Toast queue configuration
 */
export interface ToastQueueConfig {
  /** Maximum number of toasts to show simultaneously */
  maxVisible: number;
  /** Maximum number of toasts to keep in memory */
  maxInMemory: number;
  /** How to handle queue overflow */
  overflowStrategy: 'shift' | 'replace' | 'reject';
  /** Default position for new toasts */
  defaultPosition: ToastPosition;
  /** Default duration for auto-dismiss */
  defaultDuration: number;
  /** Whether to group toasts by position */
  groupByPosition: boolean;
  /** Animation settings */
  animations: {
    enabled: boolean;
    duration: number;
    easing: string;
  };
}

/**
 * Toast system state
 */
export interface ToastState {
  /** All toasts in memory */
  toasts: Toast[];
  /** Currently visible toasts */
  visible: Toast[];
  /** Queue configuration */
  config: ToastQueueConfig;
  /** Active toast for keyboard navigation */
  activeToastId: string | null;
  /** Whether keyboard mode is active */
  keyboardMode: boolean;
  /** Total toasts created this session */
  totalCreated: number;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: ToastQueueConfig = {
  maxVisible: 5,
  maxInMemory: 50,
  overflowStrategy: 'shift',
  defaultPosition: 'top-right',
  defaultDuration: 5000,
  groupByPosition: true,
  animations: {
    enabled: true,
    duration: 600,
    easing: 'ease-in-out',
  },
};

/**
 * Toast type to default configuration mapping
 */
const TYPE_DEFAULTS: Record<ToastType, Partial<ToastOptions>> = {
  danger: {
    duration: 0, // Don't auto-dismiss errors
    priority: 'high',
    accessibility: { ariaLive: 'assertive', role: 'alert' },
    icon: '❌',
  },
  warning: {
    duration: 8000,
    priority: 'high',
    accessibility: { ariaLive: 'assertive', role: 'alert' },
    icon: '⚠️',
  },
  success: {
    duration: 5000,
    priority: 'normal',
    accessibility: { ariaLive: 'polite', role: 'status' },
    icon: '✅',
  },
  info: {
    duration: 5000,
    priority: 'normal',
    accessibility: { ariaLive: 'polite', role: 'status' },
    icon: 'ℹ️',
  },
  neutral: {
    duration: 5000,
    priority: 'normal',
    accessibility: { ariaLive: 'polite', role: 'log' },
    icon: '📋',
  },
};

/**
 * Generate unique toast ID
 */
function generateToastId(): string {
  return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Priority to numeric value for sorting
 */
function getPriorityValue(priority: ToastPriority): number {
  const values = { low: 1, normal: 2, high: 3, urgent: 4 };
  return values[priority] || 2;
}

/**
 * Global toast state - singleton pattern for app-wide toast management
 */
const globalState = reactive<ToastState>({
  toasts: [],
  visible: [],
  config: { ...DEFAULT_CONFIG },
  activeToastId: null,
  keyboardMode: false,
  totalCreated: 0,
});

/**
 * Modern Vue 3 composable for toast management
 * Replaces event bus pattern with reactive state management
 */
export function useToast(config?: Partial<ToastQueueConfig>) {
  // Merge provided config with defaults
  if (config) {
    Object.assign(globalState.config, config);
  }

  const screenReader = useScreenReader();

  // Computed properties
  const toasts = computed(() => globalState.toasts);
  const visibleToasts = computed(() => globalState.visible);
  const toastsByPosition = computed(() => {
    const grouped: Record<ToastPosition, Toast[]> = {} as Record<ToastPosition, Toast[]>;
    globalState.visible.forEach(toast => {
      if (!grouped[toast.position]) {
        grouped[toast.position] = [];
      }
      grouped[toast.position].push(toast);
    });
    return grouped;
  });

  const hasToasts = computed(() => globalState.visible.length > 0);
  const queueLength = computed(() => globalState.toasts.length - globalState.visible.length);

  /**
   * Create and display a toast
   */
  const show = (options: ToastOptions): string => {
    const typeDefaults = TYPE_DEFAULTS[options.type || 'info'];
    
    // Create toast with merged defaults
    const toast: Toast = {
      id: options.id || generateToastId(),
      title: options.title || '',
      message: options.message,
      type: options.type || 'info',
      position: options.position || globalState.config.defaultPosition,
      duration: options.duration !== undefined ? options.duration : typeDefaults.duration || globalState.config.defaultDuration,
      priority: options.priority || typeDefaults.priority || 'normal',
      closable: options.closable !== false,
      pauseOnHover: options.pauseOnHover !== false,
      showProgress: options.showProgress === true,
      icon: options.icon || typeDefaults.icon || '',
      animation: options.animation || 'slide',
      class: options.class || '',
      style: options.style || {},
      persistent: options.persistent === true,
      group: options.group || '',
      component: options.component,
      componentProps: options.componentProps,
      
      // Internal state
      timestamp: Date.now(),
      visible: false,
      paused: false,
      progress: 100,
      
      // Action configurations
      action: options.action,
      undoAction: options.undoAction,
      
      // Accessibility
      accessibility: {
        ariaLive: options.accessibility?.ariaLive || typeDefaults.accessibility?.ariaLive || 'polite',
        role: options.accessibility?.role || typeDefaults.accessibility?.role || 'status',
        ariaLabel: options.accessibility?.ariaLabel,
        announcement: options.accessibility?.announcement,
        announceContent: options.accessibility?.announceContent !== false,
      },
      
      // Undo state
      undoAvailable: !!options.undoAction,
    };

    // Add to global state
    globalState.toasts.push(toast);
    globalState.totalCreated++;

    // Queue management
    manageQueue();
    
    // Make visible and setup auto-dismiss
    makeVisible(toast.id);
    
    return toast.id;
  };

  /**
   * Dismiss a specific toast
   */
  const dismiss = (id: string, reason: 'user' | 'timeout' | 'programmatic' = 'programmatic'): void => {
    const toast = globalState.toasts.find(t => t.id === id);
    if (!toast) return;

    // Clear any timeouts
    if (toast.timeoutRef) {
      clearTimeout(toast.timeoutRef);
    }
    if (toast.animationRef) {
      cancelAnimationFrame(toast.animationRef);
    }
    if (toast.undoTimeoutRef) {
      clearTimeout(toast.undoTimeoutRef);
    }

    // Announce dismissal
    if (reason === 'user' && toast.accessibility.announceContent) {
      const message = `${toast.title || 'Notification'} dismissed`;
      screenReader.announcePolitely(message);
    }

    // Remove from visible toasts
    globalState.visible = globalState.visible.filter(t => t.id !== id);
    
    // Mark as not visible and remove after animation
    toast.visible = false;
    
    setTimeout(() => {
      globalState.toasts = globalState.toasts.filter(t => t.id !== id);
      
      // Manage queue after removal
      manageQueue();
    }, globalState.config.animations.duration);
  };

  /**
   * Clear all toasts or toasts in a specific group
   */
  const clear = (group?: string): void => {
    const toastsToClear = group 
      ? globalState.visible.filter(t => t.group === group)
      : globalState.visible;

    toastsToClear.forEach(toast => {
      dismiss(toast.id, 'programmatic');
    });

    if (toastsToClear.length > 0) {
      const message = group 
        ? `All notifications in group ${group} dismissed`
        : 'All notifications dismissed';
      screenReader.announcePolitely(message);
    }
  };

  /**
   * Update toast configuration
   */
  const updateConfig = (newConfig: Partial<ToastQueueConfig>): void => {
    Object.assign(globalState.config, newConfig);
    manageQueue(); // Reapply queue management with new config
  };

  /**
   * Pause/resume a toast
   */
  const pause = (id: string, paused = true): void => {
    const toast = globalState.toasts.find(t => t.id === id);
    if (!toast) return;

    toast.paused = paused;
    
    if (paused) {
      // Pause auto-dismiss timer
      if (toast.timeoutRef) {
        clearTimeout(toast.timeoutRef);
      }
      if (toast.animationRef) {
        cancelAnimationFrame(toast.animationRef);
      }
    } else {
      // Resume auto-dismiss if duration > 0
      if (toast.duration > 0) {
        setupAutoDismiss(toast);
      }
    }
  };

  /**
   * Execute undo action if available
   */
  const undo = (id: string): void => {
    const toast = globalState.toasts.find(t => t.id === id);
    if (!toast?.undoAction || !toast.undoAvailable) return;

    // Execute undo handler
    toast.undoAction.handler();
    
    // Dismiss toast after undo
    dismiss(id, 'user');
    
    // Announce undo action
    if (toast.accessibility.announceContent) {
      screenReader.announcePolitely(`${toast.undoAction.label} executed`);
    }
  };

  /**
   * Get toast by ID
   */
  const getToast = (id: string): Toast | undefined => {
    return globalState.toasts.find(t => t.id === id);
  };

  /**
   * Get toasts by group
   */
  const getToastsByGroup = (group: string): Toast[] => {
    return globalState.toasts.filter(t => t.group === group);
  };

  /**
   * Manage toast queue based on configuration
   */
  const manageQueue = (): void => {
    // Sort toasts by priority and timestamp
    globalState.toasts.sort((a, b) => {
      const priorityDiff = getPriorityValue(b.priority) - getPriorityValue(a.priority);
      return priorityDiff !== 0 ? priorityDiff : a.timestamp - b.timestamp;
    });

    // Manage memory limit
    if (globalState.toasts.length > globalState.config.maxInMemory) {
      const excess = globalState.toasts.length - globalState.config.maxInMemory;
      const toRemove = globalState.toasts
        .filter(t => !t.visible)
        .slice(0, excess);
      
      toRemove.forEach(toast => {
        globalState.toasts = globalState.toasts.filter(t => t.id !== toast.id);
      });
    }

    // Manage visible toasts
    const currentVisible = globalState.visible.length;
    const maxVisible = globalState.config.maxVisible;
    
    if (currentVisible < maxVisible) {
      // Show more toasts if possible
      const toShow = Math.min(maxVisible - currentVisible, globalState.toasts.length - currentVisible);
      const candidateToasts = globalState.toasts
        .filter(t => !t.visible)
        .slice(0, toShow);
      
      candidateToasts.forEach(toast => {
        makeVisible(toast.id);
      });
    } else if (currentVisible > maxVisible) {
      // Hide excess toasts based on strategy
      const excess = currentVisible - maxVisible;
      const toHide = globalState.visible.slice(0, excess);
      
      toHide.forEach(toast => {
        toast.visible = false;
        globalState.visible = globalState.visible.filter(t => t.id !== toast.id);
      });
    }
  };

  /**
   * Make a toast visible and set up auto-dismiss
   */
  const makeVisible = (id: string): void => {
    const toast = globalState.toasts.find(t => t.id === id);
    if (!toast || toast.visible) return;

    toast.visible = true;
    globalState.visible.push(toast);

    // Announce toast
    if (toast.accessibility.announceContent) {
      const announcement = toast.accessibility.announcement || 
        `${toast.type} notification: ${toast.title || toast.message}`;
      
      if (toast.accessibility.ariaLive === 'assertive') {
        screenReader.announceAssertively(announcement);
      } else {
        screenReader.announcePolitely(announcement);
      }
    }

    // Setup auto-dismiss
    if (toast.duration > 0) {
      setupAutoDismiss(toast);
    }

    // Setup undo timeout
    if (toast.undoAction && toast.undoAction.timeout) {
      toast.undoTimeoutRef = setTimeout(() => {
        toast.undoAvailable = false;
      }, toast.undoAction.timeout) as unknown as number;
    }

    // Set as active toast for keyboard navigation
    if (!globalState.activeToastId) {
      globalState.activeToastId = toast.id;
    }
  };

  /**
   * Setup auto-dismiss with progress tracking
   */
  const setupAutoDismiss = (toast: Toast): void => {
    if (toast.duration <= 0) return;

    const startTime = Date.now();
    const duration = toast.duration;

    const updateProgress = () => {
      if (!toast.visible || toast.paused) {
        // Reschedule if paused
        if (toast.visible && toast.paused) {
          toast.animationRef = requestAnimationFrame(updateProgress) as unknown as number;
        }
        return;
      }

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      const percentage = Math.max(0, (remaining / duration) * 100);

      toast.progress = percentage;

      if (remaining <= 0) {
        dismiss(toast.id, 'timeout');
        return;
      }

      toast.animationRef = requestAnimationFrame(updateProgress) as unknown as number;
    };

    updateProgress();
  };

  // Cleanup on unmount
  onBeforeUnmount(() => {
    // Clear all timeouts and animation frames
    globalState.toasts.forEach(toast => {
      if (toast.timeoutRef) clearTimeout(toast.timeoutRef);
      if (toast.animationRef) cancelAnimationFrame(toast.animationRef);
      if (toast.undoTimeoutRef) clearTimeout(toast.undoTimeoutRef);
    });
  });

  // Return composable API
  return {
    // State
    toasts: readonly(toasts),
    visibleToasts: readonly(visibleToasts),
    toastsByPosition: readonly(toastsByPosition),
    hasToasts: readonly(hasToasts),
    queueLength: readonly(queueLength),
    config: readonly(computed(() => globalState.config)),
    
    // Actions
    show,
    dismiss,
    clear,
    pause,
    resume: (id: string) => pause(id, false),
    undo,
    
    // Getters
    getToast,
    getToastsByGroup,
    
    // Configuration
    updateConfig,
    
    // Convenience methods
    success: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => 
      show({ ...options, message, type: 'success' }),
    error: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => 
      show({ ...options, message, type: 'danger' }),
    warning: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => 
      show({ ...options, message, type: 'warning' }),
    info: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => 
      show({ ...options, message, type: 'info' }),
  };
}

/**
 * Global toast instance for app-wide access
 * This provides the same interface as the composable but as a singleton
 */
export const toast = {
  ...useToast(),
  
  // Install method for Vue plugin
  install(app: any) {
    app.config.globalProperties.$toast = this;
    app.provide('toast', this);
  },
};

// Export types for external use
export type {
  ToastOptions,
  Toast,
  ToastState,
  ToastQueueConfig,
  ToastAction,
  ToastUndoAction,
};
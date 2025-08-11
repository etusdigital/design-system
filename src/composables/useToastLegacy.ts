import { useToast } from './useToast';
import type { ToastOptions as ModernToastOptions, ToastPosition as ModernToastPosition } from './useToast';
import event from '#utils/event';

/**
 * Legacy toast options interface for backward compatibility
 * Maps old boolean-based positioning to modern enum system
 */
export interface LegacyToastOptions {
  id: string;
  title?: string;
  message?: string;
  type?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  // Legacy positioning system
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  // Action configuration
  button?: string;
  action?: () => void;
  timeout?: number;
  // Legacy accessibility props
  ariaLive?: 'polite' | 'assertive' | 'off';
  role?: 'alert' | 'status' | 'log';
  ariaLabel?: string;
  announcement?: string;
  announceContent?: boolean;
  focusManagement?: 'none' | 'trap' | 'auto';
  autoDismiss?: boolean;
  dismissTimeout?: number;
  persistOnHover?: boolean;
  dismissible?: boolean;
  icon?: string;
  showProgress?: boolean;
}

/**
 * Convert legacy positioning flags to modern position enum
 */
function convertLegacyPosition(options: LegacyToastOptions): ModernToastPosition {
  const { top, bottom, left, right } = options;
  
  // Default to top-right if no position specified
  if (!top && !bottom && !left && !right) {
    return 'top-right';
  }
  
  // Determine vertical position
  const vertical = bottom ? 'bottom' : 'top';
  
  // Determine horizontal position
  const horizontal = left ? 'left' : 'right';
  
  return `${vertical}-${horizontal}` as ModernToastPosition;
}

/**
 * Convert legacy options to modern toast options
 */
function convertLegacyOptions(legacyOptions: LegacyToastOptions): ModernToastOptions {
  const position = convertLegacyPosition(legacyOptions);
  
  return {
    id: legacyOptions.id,
    title: legacyOptions.title,
    message: legacyOptions.message || '',
    type: legacyOptions.type,
    position,
    duration: legacyOptions.timeout !== undefined ? legacyOptions.timeout : legacyOptions.dismissTimeout,
    closable: legacyOptions.dismissible,
    pauseOnHover: legacyOptions.persistOnHover,
    showProgress: legacyOptions.showProgress,
    icon: legacyOptions.icon,
    action: legacyOptions.button && legacyOptions.action ? {
      label: legacyOptions.button,
      handler: legacyOptions.action,
    } : undefined,
    accessibility: {
      ariaLive: legacyOptions.ariaLive,
      role: legacyOptions.role,
      ariaLabel: legacyOptions.ariaLabel,
      announcement: legacyOptions.announcement,
      announceContent: legacyOptions.announceContent,
    },
  };
}

/**
 * Global toast instance for legacy support
 */
const globalToast = useToast();

/**
 * Legacy event handlers that bridge old event bus to new composable
 */
function handleOpenToast(options: LegacyToastOptions) {
  const modernOptions = convertLegacyOptions(options);
  return globalToast.show(modernOptions);
}

function handleCloseToast(id: string) {
  globalToast.dismiss(id, 'programmatic');
}

function handleDismissAllToasts() {
  globalToast.clear();
}

/**
 * Set up legacy event bus handlers
 * This maintains backward compatibility for existing code using event.emit()
 */
export function setupLegacyEventHandlers() {
  // Set up event listeners that bridge to modern composable
  event.on('open-toast', handleOpenToast);
  event.on('close-toast', handleCloseToast);  
  event.on('dismiss-all-toasts', handleDismissAllToasts);
  
  return () => {
    // Cleanup function
    event.off('open-toast', handleOpenToast);
    event.off('close-toast', handleCloseToast);
    event.off('dismiss-all-toasts', handleDismissAllToasts);
  };
}

/**
 * Legacy API functions for backward compatibility
 * These maintain the same interface as before but use the new composable
 */
export const legacyToastAPI = {
  /**
   * Show a toast using legacy options format
   */
  show: (options: LegacyToastOptions): string => {
    const modernOptions = convertLegacyOptions(options);
    return globalToast.show(modernOptions);
  },
  
  /**
   * Dismiss a specific toast
   */
  dismiss: (id: string): void => {
    globalToast.dismiss(id, 'programmatic');
  },
  
  /**
   * Clear all toasts
   */
  clear: (): void => {
    globalToast.clear();
  },
  
  /**
   * Legacy convenience methods
   */
  success: (message: string, options?: Partial<LegacyToastOptions>): string => {
    return legacyToastAPI.show({
      id: `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message,
      type: 'success',
      ...options,
    });
  },
  
  error: (message: string, options?: Partial<LegacyToastOptions>): string => {
    return legacyToastAPI.show({
      id: `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message,
      type: 'danger',
      ...options,
    });
  },
  
  warning: (message: string, options?: Partial<LegacyToastOptions>): string => {
    return legacyToastAPI.show({
      id: `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message,
      type: 'warning',
      ...options,
    });
  },
  
  info: (message: string, options?: Partial<LegacyToastOptions>): string => {
    return legacyToastAPI.show({
      id: `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message,
      type: 'info',
      ...options,
    });
  },
};

/**
 * Vue plugin for backward compatibility
 * Provides global $toast instance and sets up event bus handlers
 */
export const ToastLegacyPlugin = {
  install(app: any, options: { setupEventBus?: boolean } = {}) {
    // Set up event bus handlers by default
    if (options.setupEventBus !== false) {
      setupLegacyEventHandlers();
    }
    
    // Provide global $toast instance
    app.config.globalProperties.$toast = legacyToastAPI;
    app.provide('$toast', legacyToastAPI);
    
    // Provide modern toast instance as well
    app.config.globalProperties.$toastModern = globalToast;
    app.provide('toast', globalToast);
  },
};

/**
 * Export types for backward compatibility
 */
export type { LegacyToastOptions };

/**
 * Default export for easy plugin installation
 */
export default ToastLegacyPlugin;

/**
 * Global toast instance for direct usage
 */
export { legacyToastAPI as toast };
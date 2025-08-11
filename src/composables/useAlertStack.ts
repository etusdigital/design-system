import { ref, computed, reactive, nextTick } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type { AlertType, AlertPosition } from '../components/BAlert/BAlert.types';

/**
 * Alert stack item interface
 */
export interface AlertStackItem {
  /** Unique identifier for the alert */
  id: string;
  /** Alert type/severity */
  type: AlertType;
  /** Alert title */
  title?: string;
  /** Alert message */
  message: string;
  /** HTML content flag */
  html?: boolean;
  /** Position in the stack */
  position: AlertPosition;
  /** Whether the alert is dismissible */
  dismissible?: boolean;
  /** Auto-dismiss duration in milliseconds */
  autoDismiss?: number;
  /** Custom CSS classes */
  class?: string | string[] | Record<string, boolean>;
  /** Z-index for stacking */
  zIndex: number;
  /** Whether the alert is visible */
  visible: boolean;
  /** Creation timestamp */
  timestamp: number;
  /** Custom actions */
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
  }>;
}

/**
 * Alert stack configuration options
 */
export interface AlertStackOptions {
  /** Maximum number of alerts to show simultaneously */
  maxAlerts?: number;
  /** Default position for new alerts */
  defaultPosition?: AlertPosition;
  /** Base z-index for alert stacking */
  baseZIndex?: number;
  /** Default auto-dismiss duration */
  defaultAutoDismiss?: number;
  /** Spacing between stacked alerts in pixels */
  stackSpacing?: number;
  /** Whether to auto-remove dismissed alerts */
  autoRemove?: boolean;
  /** Animation duration for enter/leave transitions */
  animationDuration?: number;
}

/**
 * Alert stack return interface
 */
export interface AlertStackReturn {
  /** Array of all alerts in the stack */
  alerts: Ref<AlertStackItem[]>;
  /** Computed alerts grouped by position */
  alertsByPosition: ComputedRef<Record<AlertPosition, AlertStackItem[]>>;
  /** Add a new alert to the stack */
  addAlert: (alert: Omit<AlertStackItem, 'id' | 'zIndex' | 'visible' | 'timestamp'>) => string;
  /** Remove an alert by ID */
  removeAlert: (id: string) => void;
  /** Clear all alerts */
  clearAll: () => void;
  /** Clear alerts by position */
  clearByPosition: (position: AlertPosition) => void;
  /** Clear alerts by type */
  clearByType: (type: AlertType) => void;
  /** Get alert by ID */
  getAlert: (id: string) => AlertStackItem | undefined;
  /** Update an existing alert */
  updateAlert: (id: string, updates: Partial<AlertStackItem>) => boolean;
  /** Check if position has alerts */
  hasAlertsAtPosition: (position: AlertPosition) => boolean;
  /** Get alert count by position */
  getCountByPosition: (position: AlertPosition) => number;
  /** Total alert count */
  totalCount: ComputedRef<number>;
}

/**
 * Global alert counter for unique IDs
 */
let alertCounter = 0;

/**
 * Generate unique alert ID
 */
function generateAlertId(): string {
  return `alert-${++alertCounter}-${Date.now()}`;
}

/**
 * Composable for managing alert stacking and queuing
 * 
 * Provides comprehensive alert management with positioning, z-index handling,
 * and automatic cleanup for multiple alerts in different screen positions.
 * 
 * @param options - Configuration options for the alert stack
 * @returns Alert stack management utilities and reactive state
 * 
 * @example
 * ```typescript
 * const { alerts, addAlert, removeAlert, alertsByPosition } = useAlertStack({
 *   maxAlerts: 5,
 *   defaultPosition: 'top-right',
 *   baseZIndex: 1000
 * });
 * 
 * // Add alerts
 * const alertId = addAlert({
 *   type: 'success',
 *   message: 'Operation completed successfully',
 *   position: 'top-right',
 *   dismissible: true,
 *   autoDismiss: 5000
 * });
 * 
 * // Remove specific alert
 * removeAlert(alertId);
 * ```
 */
export function useAlertStack(options: AlertStackOptions = {}): AlertStackReturn {
  const {
    maxAlerts = 10,
    defaultPosition = 'top-right',
    baseZIndex = 1000,
    defaultAutoDismiss = 0,
    stackSpacing = 16,
    autoRemove = true,
    animationDuration = 300
  } = options;

  // Internal state
  const alerts = ref<AlertStackItem[]>([]);
  const timers = reactive<Map<string, NodeJS.Timeout>>(new Map());

  // Computed alerts grouped by position
  const alertsByPosition = computed(() => {
    const grouped: Record<AlertPosition, AlertStackItem[]> = {
      'top': [],
      'bottom': [],
      'top-right': [],
      'top-left': [],
      'bottom-right': [],
      'bottom-left': [],
      'center': []
    };

    alerts.value
      .filter(alert => alert.visible)
      .forEach(alert => {
        grouped[alert.position].push(alert);
      });

    // Sort by timestamp (newest first for top positions, oldest first for bottom)
    Object.keys(grouped).forEach(position => {
      const pos = position as AlertPosition;
      if (pos.includes('top') || pos === 'center') {
        grouped[pos].sort((a, b) => b.timestamp - a.timestamp);
      } else {
        grouped[pos].sort((a, b) => a.timestamp - b.timestamp);
      }
    });

    return grouped;
  });

  // Total alert count
  const totalCount = computed(() => alerts.value.filter(alert => alert.visible).length);

  /**
   * Calculate z-index for new alert based on position and existing alerts
   */
  const calculateZIndex = (position: AlertPosition): number => {
    const positionAlerts = alertsByPosition.value[position];
    const baseIndex = baseZIndex + positionAlerts.length;
    return baseIndex;
  };

  /**
   * Clean up timer for specific alert
   */
  const cleanupTimer = (id: string): void => {
    const timer = timers.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.delete(id);
    }
  };

  /**
   * Set up auto-dismiss timer for alert
   */
  const setupAutoDismiss = (alert: AlertStackItem): void => {
    if (alert.autoDismiss && alert.autoDismiss > 0) {
      const timer = setTimeout(() => {
        removeAlert(alert.id);
      }, alert.autoDismiss);
      timers.set(alert.id, timer);
    }
  };

  /**
   * Add a new alert to the stack
   */
  const addAlert = (alertData: Omit<AlertStackItem, 'id' | 'zIndex' | 'visible' | 'timestamp'>): string => {
    const position = alertData.position || defaultPosition;
    const id = generateAlertId();

    // Check max alerts limit
    const visibleAlerts = alerts.value.filter(alert => alert.visible);
    if (visibleAlerts.length >= maxAlerts) {
      // Remove oldest alert
      const oldest = visibleAlerts.reduce((prev, current) => 
        prev.timestamp < current.timestamp ? prev : current
      );
      removeAlert(oldest.id);
    }

    // Create new alert
    const newAlert: AlertStackItem = {
      ...alertData,
      id,
      position,
      zIndex: calculateZIndex(position),
      visible: true,
      timestamp: Date.now(),
      autoDismiss: alertData.autoDismiss || defaultAutoDismiss,
      dismissible: alertData.dismissible ?? true
    };

    alerts.value.push(newAlert);

    // Setup auto-dismiss if configured
    if (newAlert.autoDismiss) {
      setupAutoDismiss(newAlert);
    }

    return id;
  };

  /**
   * Remove an alert by ID
   */
  const removeAlert = (id: string): void => {
    const alertIndex = alerts.value.findIndex(alert => alert.id === id);
    
    if (alertIndex === -1) return;

    const alert = alerts.value[alertIndex];
    
    // Clean up timer
    cleanupTimer(id);

    // Mark as not visible for transition
    alert.visible = false;

    // Remove from array after animation
    if (autoRemove) {
      setTimeout(() => {
        const currentIndex = alerts.value.findIndex(a => a.id === id);
        if (currentIndex !== -1) {
          alerts.value.splice(currentIndex, 1);
        }
      }, animationDuration);
    }
  };

  /**
   * Clear all alerts
   */
  const clearAll = (): void => {
    alerts.value.forEach(alert => {
      cleanupTimer(alert.id);
      alert.visible = false;
    });

    if (autoRemove) {
      setTimeout(() => {
        alerts.value = [];
      }, animationDuration);
    }
  };

  /**
   * Clear alerts by position
   */
  const clearByPosition = (position: AlertPosition): void => {
    alerts.value
      .filter(alert => alert.position === position)
      .forEach(alert => removeAlert(alert.id));
  };

  /**
   * Clear alerts by type
   */
  const clearByType = (type: AlertType): void => {
    alerts.value
      .filter(alert => alert.type === type)
      .forEach(alert => removeAlert(alert.id));
  };

  /**
   * Get alert by ID
   */
  const getAlert = (id: string): AlertStackItem | undefined => {
    return alerts.value.find(alert => alert.id === id);
  };

  /**
   * Update an existing alert
   */
  const updateAlert = (id: string, updates: Partial<AlertStackItem>): boolean => {
    const alert = getAlert(id);
    if (!alert) return false;

    // Apply updates
    Object.assign(alert, updates);

    // Handle auto-dismiss timer changes
    if ('autoDismiss' in updates) {
      cleanupTimer(id);
      if (updates.autoDismiss && updates.autoDismiss > 0) {
        setupAutoDismiss(alert);
      }
    }

    return true;
  };

  /**
   * Check if position has alerts
   */
  const hasAlertsAtPosition = (position: AlertPosition): boolean => {
    return alertsByPosition.value[position].length > 0;
  };

  /**
   * Get alert count by position
   */
  const getCountByPosition = (position: AlertPosition): number => {
    return alertsByPosition.value[position].length;
  };

  return {
    alerts,
    alertsByPosition,
    addAlert,
    removeAlert,
    clearAll,
    clearByPosition,
    clearByType,
    getAlert,
    updateAlert,
    hasAlertsAtPosition,
    getCountByPosition,
    totalCount
  };
}

/**
 * Default alert stack instance for global usage
 */
export const globalAlertStack = useAlertStack({
  maxAlerts: 8,
  defaultPosition: 'top-right',
  baseZIndex: 1050,
  defaultAutoDismiss: 0,
  autoRemove: true
});

/**
 * Convenience function to show a quick alert
 */
export function showAlert(
  message: string,
  type: AlertType = 'info',
  options: Partial<Omit<AlertStackItem, 'id' | 'zIndex' | 'visible' | 'timestamp' | 'message' | 'type'>> = {}
): string {
  return globalAlertStack.addAlert({
    message,
    type,
    position: 'top-right',
    dismissible: true,
    autoDismiss: type === 'info' ? 5000 : type === 'success' ? 4000 : 0,
    ...options
  });
}
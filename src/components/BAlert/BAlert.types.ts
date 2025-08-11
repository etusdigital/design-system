import type { Component } from 'vue';

/**
 * Alert severity levels that determine styling and accessibility behavior
 */
export type AlertType = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/**
 * Alert sizes
 */
export type AlertSize = 'small' | 'medium' | 'large';

/**
 * Alert position variants for stacking/placement
 */
export type AlertPosition = 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';

/**
 * Icon positioning within the alert
 */
export type AlertIconPosition = 'start' | 'center' | 'end';

/**
 * ARIA alert roles for different contexts
 */
export type AlertRole = 'alert' | 'status' | 'log';

/**
 * Live region politeness levels
 */
export type AlertPoliteness = 'polite' | 'assertive' | 'off';

/**
 * Auto-dismiss configuration
 */
export interface AlertAutoDismiss {
  /** Duration in milliseconds before auto-dismissal */
  duration: number;
  /** Whether to pause auto-dismiss on hover */
  pauseOnHover?: boolean;
  /** Whether to pause auto-dismiss on focus */
  pauseOnFocus?: boolean;
  /** Whether to announce remaining time to screen readers */
  announceTimer?: boolean;
}

/**
 * Alert accessibility configuration
 */
export interface AlertAccessibility {
  /** ARIA role override (defaults based on alert type) */
  role?: AlertRole;
  /** Live region politeness (defaults based on alert severity) */
  politeness?: AlertPoliteness;
  /** Whether the alert should be atomic for screen readers */
  atomic?: boolean;
  /** Whether to automatically announce the alert content */
  autoAnnounce?: boolean;
  /** Custom announcement text override */
  customAnnouncement?: string;
  /** Whether to focus the alert when it appears (for urgent alerts) */
  autoFocus?: boolean;
  /** Whether alert can be dismissed with Escape key */
  escapeToClose?: boolean;
  /** Additional ARIA describedby references */
  describedBy?: string;
  /** Additional ARIA labelledby references */
  labelledBy?: string;
}

/**
 * Icon accessibility configuration
 */
export interface AlertIconConfig {
  /** Icon name/component */
  name?: string | Component;
  /** Alternative text for the icon */
  alt?: string;
  /** Whether the icon is decorative only */
  decorative?: boolean;
  /** Custom ARIA label for the icon */
  ariaLabel?: string;
}

/**
 * Alert action button configuration
 */
export interface AlertAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Button variant/style */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Whether the action is destructive */
  destructive?: boolean;
  /** ARIA label override */
  ariaLabel?: string;
  /** Whether this action dismisses the alert */
  dismisses?: boolean;
}

/**
 * HTML content configuration with sanitization options
 */
export interface AlertHtmlConfig {
  /** Whether to allow HTML content */
  enabled: boolean;
  /** Custom sanitization options (uses DOMPurify defaults if not provided) */
  sanitizeOptions?: {
    /** Allowed HTML tags */
    allowedTags?: string[];
    /** Allowed HTML attributes */
    allowedAttributes?: Record<string, string[]>;
    /** Whether to strip unknown tags instead of escaping them */
    stripUnknown?: boolean;
  };
}

/**
 * Main BAlert component props interface
 */
export interface BAlertProps {
  /** Alert title */
  title?: string;
  /** Alert message content */
  message?: string;
  /** Alert type/severity */
  type?: AlertType;
  /** Alert size */
  size?: AlertSize;
  /** Icon configuration */
  icon?: string | AlertIconConfig;
  /** Icon position */
  iconPosition?: AlertIconPosition;
  /** Whether the alert can be expanded to show full content */
  expandable?: boolean;
  /** Whether the alert can be dismissed */
  closable?: boolean;
  /** Whether to show the type icon (positive naming) */
  showIcon?: boolean;
  /** Whether to hide the type icon (deprecated, use showIcon instead) */
  hideIcon?: boolean;
  /** HTML content configuration with sanitization */
  html?: boolean | AlertHtmlConfig;
  /** Alert position for stacking/placement */
  position?: AlertPosition;
  /** Auto-dismiss configuration */
  autoDismiss?: AlertAutoDismiss | number; // number for simple duration
  /** Accessibility configuration */
  accessibility?: AlertAccessibility;
  /** Action buttons */
  actions?: AlertAction[];
  /** Custom CSS classes */
  class?: string | string[] | Record<string, boolean>;
  /** Component test ID */
  testId?: string;
}

/**
 * BAlert component events
 */
export interface BAlertEvents {
  /** Emitted when alert is closed */
  close: [];
  /** Emitted when alert is expanded/collapsed */
  expand: [expanded: boolean];
  /** Emitted when auto-dismiss timer starts */
  timerStart: [duration: number];
  /** Emitted when auto-dismiss timer is paused */
  timerPause: [];
  /** Emitted when auto-dismiss timer resumes */
  timerResume: [];
  /** Emitted when an action button is clicked */
  action: [action: AlertAction, index: number];
}

/**
 * Alert context for nested components
 */
export interface AlertContext {
  /** Alert ID for ARIA relationships */
  alertId: string;
  /** Alert type */
  type: AlertType;
  /** Whether alert is expandable */
  expandable: boolean;
  /** Expansion state */
  isExpanded: boolean;
  /** Close handler */
  close: () => void;
  /** Expand/collapse handler */
  toggleExpanded: () => void;
}

/**
 * Screen reader announcement templates
 */
export interface AlertAnnouncements {
  /** Announcement when alert appears */
  appeared: string;
  /** Announcement when alert is dismissed */
  dismissed: string;
  /** Announcement when alert is expanded */
  expanded: string;
  /** Announcement when alert is collapsed */
  collapsed: string;
  /** Announcement for remaining auto-dismiss time */
  timerUpdate: string;
}

/**
 * Default alert configurations by type
 */
export const ALERT_TYPE_CONFIGS: Record<AlertType, {
  defaultRole: AlertRole;
  defaultPoliteness: AlertPoliteness;
  defaultIcon: string;
  defaultAutoFocus: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
}> = {
  info: {
    defaultRole: 'status',
    defaultPoliteness: 'polite',
    defaultIcon: 'info',
    defaultAutoFocus: false,
    severity: 'low',
  },
  neutral: {
    defaultRole: 'status', 
    defaultPoliteness: 'polite',
    defaultIcon: 'info',
    defaultAutoFocus: false,
    severity: 'low',
  },
  success: {
    defaultRole: 'status',
    defaultPoliteness: 'polite',
    defaultIcon: 'check_circle',
    defaultAutoFocus: false,
    severity: 'medium',
  },
  warning: {
    defaultRole: 'alert',
    defaultPoliteness: 'assertive',
    defaultIcon: 'warning',
    defaultAutoFocus: true,
    severity: 'high',
  },
  danger: {
    defaultRole: 'alert',
    defaultPoliteness: 'assertive',
    defaultIcon: 'error',
    defaultAutoFocus: true,
    severity: 'critical',
  },
};

/**
 * Utility type for component slots
 */
export interface BAlertSlots {
  /** Default slot for custom content */
  default?: () => any;
  /** Slot for custom actions */
  actions?: () => any;
  /** Slot for custom icon */
  icon?: () => any;
  /** Slot for alert title */
  title?: () => any;
  /** Slot for alert message */
  message?: () => any;
}

/**
 * Type guard to check if value is AlertIconConfig
 */
export function isAlertIconConfig(value: any): value is AlertIconConfig {
  return typeof value === 'object' && value !== null && 
         ('name' in value || 'alt' in value || 'decorative' in value || 'ariaLabel' in value);
}

/**
 * Type guard to check if value is AlertAutoDismiss config
 */
export function isAlertAutoDismissConfig(value: any): value is AlertAutoDismiss {
  return typeof value === 'object' && value !== null && 'duration' in value;
}

/**
 * Type guard to check if value is AlertHtmlConfig
 */
export function isAlertHtmlConfig(value: any): value is AlertHtmlConfig {
  return typeof value === 'object' && value !== null && 'enabled' in value;
}

/**
 * Default HTML sanitization configuration for safety
 */
export const DEFAULT_HTML_SANITIZE_OPTIONS = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br', 'span', 'div', 'p'],
  allowedAttributes: {
    'a': ['href', 'title', 'target', 'rel'],
    'span': ['class'],
    'div': ['class'],
    'p': ['class']
  },
  stripUnknown: true
} as const;
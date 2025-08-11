/**
 * TypeScript interfaces for BDateFilter component with comprehensive accessibility support
 * 
 * Implements WCAG 2.1 AA standards for date filter widgets including:
 * - ARIA attributes for filter functionality
 * - Screen reader support for filter presets and custom ranges
 * - Keyboard navigation for filter options
 * - Announcements for applied filters
 */

import type { ComputedRef } from 'vue';

/**
 * Date option type for predefined date ranges with accessibility support
 */
export interface BDateFilterOption {
  /** Display label for the option */
  label: string;
  /** Unique value identifier */
  value: string;
  /** Function to calculate the date range */
  calculate: () => Date[];
  /** Whether this option is selected */
  selected?: boolean;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** ARIA description for complex date ranges */
  ariaDescription?: string;
  /** Screen reader announcement when selected */
  announcement?: string;
}

/**
 * Date filter model value type - array of dates representing a date range
 */
export type BDateFilterModelValue = Date[] | undefined;

/**
 * Accessibility configuration for keyboard navigation
 */
export interface KeyboardNavigationConfig {
  /** Enable arrow key navigation for filter presets */
  enableArrowKeys?: boolean;
  /** Enable home/end keys for first/last preset */
  enableHomeEnd?: boolean;
  /** Enable type-ahead search for presets */
  enableTypeAhead?: boolean;
  /** Custom key handlers */
  customHandlers?: Record<string, (event: KeyboardEvent) => void>;
}

/**
 * Screen reader announcement configuration
 */
export interface ScreenReaderConfig {
  /** Announce when filter is opened/closed */
  announceStateChanges?: boolean;
  /** Announce when preset is selected */
  announcePresetSelection?: boolean;
  /** Announce when custom date range is selected */
  announceDateRange?: boolean;
  /** Announce when filter is cleared */
  announceClear?: boolean;
  /** Announce when filter is applied */
  announceApply?: boolean;
  /** Custom announcement messages */
  customMessages?: {
    filterOpened?: string;
    filterClosed?: string;
    presetSelected?: (preset: string) => string;
    dateRangeSelected?: (startDate: string, endDate?: string) => string;
    filterCleared?: string;
    filterApplied?: (dateRange: string) => string;
  };
}

/**
 * ARIA attributes configuration for date filter
 */
export interface AriaConfig {
  /** ARIA label for the date filter widget */
  label?: string;
  /** ARIA description for the date filter */
  description?: string;
  /** ARIA describedby ID for additional instructions */
  describedBy?: string;
  /** ARIA labelledby ID for external label */
  labelledBy?: string;
  /** Role for the filter container (defaults to 'search') */
  role?: 'search' | 'group' | 'region';
  /** ARIA live region politeness for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
}

/**
 * Focus management configuration
 */
export interface FocusConfig {
  /** Automatically focus first preset when opened */
  autoFocusFirstPreset?: boolean;
  /** Return focus to trigger after selection */
  returnFocusAfterSelection?: boolean;
  /** Trap focus within the filter dropdown */
  trapFocus?: boolean;
  /** Visible focus indicators */
  visibleFocusIndicators?: boolean;
  /** Focus outline style */
  focusOutlineStyle?: 'default' | 'high-contrast' | 'custom';
}

/**
 * Comprehensive accessibility props for BDateFilter component
 */
export interface BDateFilterAccessibilityProps {
  /** Keyboard navigation configuration */
  keyboardNavigation?: KeyboardNavigationConfig;
  /** Screen reader announcement configuration */
  screenReader?: ScreenReaderConfig;
  /** ARIA attributes configuration */
  aria?: AriaConfig;
  /** Focus management configuration */
  focus?: FocusConfig;
  /** Enable high contrast mode support */
  highContrast?: boolean;
  /** Enable reduced motion support */
  reducedMotion?: boolean;
  /** Custom CSS classes for accessibility states */
  accessibilityClasses?: {
    focused?: string;
    selected?: string;
    disabled?: string;
    error?: string;
    highContrast?: string;
  };
}

/**
 * Extended props interface including accessibility features
 */
export interface BDateFilterProps {
  /** The selected date range */
  modelValue?: BDateFilterModelValue;
  /** Label text to display */
  labelValue?: string;
  /** Language locale for date formatting */
  lang?: string;
  /** Maximum allowed initial date */
  maxInit?: Date;
  /** Maximum allowed end date */
  maxEnd?: Date;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is in error state */
  isError?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Whether to use absolute positioning */
  absolute?: boolean;
  /** Whether the component is required */
  required?: boolean;
  /** Available date options */
  options?: BDateFilterOption[];
  
  // Accessibility props
  /** Comprehensive accessibility configuration */
  accessibility?: BDateFilterAccessibilityProps;
  /** ARIA label for the date filter */
  ariaLabel?: string;
  /** ARIA description for the date filter */
  ariaDescription?: string;
  /** ID for ARIA describedby */
  ariaDescribedBy?: string;
  /** Enable screen reader announcements */
  enableAnnouncements?: boolean;
  /** Custom announcement messages */
  announcementMessages?: ScreenReaderConfig['customMessages'];
}

/**
 * Emitted events from BDateFilter component
 */
export interface BDateFilterEmits {
  /** Emitted when model value changes */
  'update:modelValue': [value: BDateFilterModelValue];
  /** Emitted when filter is applied */
  'apply': [value: BDateFilterModelValue];
  /** Emitted when preset is selected */
  'preset-selected': [preset: BDateFilterOption];
  /** Emitted when custom date range is selected */
  'date-range-selected': [dateRange: Date[]];
  /** Emitted when filter is cleared */
  'filter-cleared': [];
  /** Emitted when filter dropdown opens */
  'filter-opened': [];
  /** Emitted when filter dropdown closes */
  'filter-closed': [];
}

/**
 * Computed accessibility attributes
 */
export interface AccessibilityAttributes {
  /** Container ARIA attributes */
  containerAria: ComputedRef<Record<string, string | boolean>>;
  /** Trigger button ARIA attributes */
  triggerAria: ComputedRef<Record<string, string | boolean>>;
  /** Preset options ARIA attributes */
  presetAria: ComputedRef<Record<string, string | boolean>>;
  /** Calendar ARIA attributes */
  calendarAria: ComputedRef<Record<string, string | boolean>>;
  /** Action buttons ARIA attributes */
  actionAria: ComputedRef<Record<string, string | boolean>>;
}

/**
 * Date formatting utilities with accessibility support
 */
export interface DateFormattingUtils {
  /** Format date for display */
  formatDate: (date: Date) => string;
  /** Format date range for screen readers */
  formatDateRangeForScreenReader: (startDate: Date, endDate?: Date) => string;
  /** Format date range for display */
  formatDateRangeForDisplay: (startDate: Date, endDate?: Date) => string;
  /** Get relative date description (e.g., "3 days ago") */
  getRelativeDateDescription: (date: Date) => string;
}

/**
 * Filter state management
 */
export interface FilterState {
  /** Currently selected preset */
  selectedPreset: string;
  /** Custom date range */
  customDateRange: Date[];
  /** Whether filter dropdown is open */
  isOpen: boolean;
  /** Currently focused preset index */
  focusedPresetIndex: number;
  /** Whether user is navigating with keyboard */
  isKeyboardNavigation: boolean;
}

/**
 * Validation utilities for date filters
 */
export interface ValidationUtils {
  /** Validate date range */
  validateDateRange: (startDate: Date, endDate?: Date) => {
    isValid: boolean;
    errors: string[];
  };
  /** Check if date is within allowed bounds */
  isDateWithinBounds: (date: Date) => boolean;
  /** Get validation error message */
  getValidationMessage: (errors: string[]) => string;
}
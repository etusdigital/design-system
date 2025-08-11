import type { Ref } from 'vue';

/**
 * Date comparator model value type - can be single date range or comparison of two date ranges
 */
export type BDateComparatorModelValue = Date[] | Date[][];

/**
 * Comparison operator types for date comparison
 */
export type ComparisonOperator = 'equals' | 'before' | 'after' | 'between' | 'not-between';

/**
 * Validation state interface
 */
export interface ValidationState {
  isValid: boolean;
  errors: string[];
}

/**
 * Accessibility-focused props interface for BDateComparator
 */
export interface BDateComparatorProps {
  /** The selected date range(s) - v-model binding */
  modelValue?: BDateComparatorModelValue;
  
  /** Language locale for date formatting and screen reader announcements */
  lang?: string;
  
  /** Whether to enable comparison mode (two date ranges) */
  isCompare?: boolean;
  
  /** Maximum allowed initial date */
  maxInit?: Date;
  
  /** Maximum allowed end date */
  maxEnd?: Date;
  
  /** Comparison operator when in comparison mode */
  operator?: ComparisonOperator;
  
  /** Whether the component is disabled */
  disabled?: boolean;
  
  /** Whether the component is required for form validation */
  required?: boolean;
  
  /** Whether the component is in an invalid state */
  invalid?: boolean;
  
  /** Validation error messages */
  error?: string | string[];
  
  // Accessibility Props
  
  /** ARIA label for the date comparator fieldset */
  'aria-label'?: string;
  
  /** ID of element that labels the date comparator */
  'aria-labelledby'?: string;
  
  /** ID of element that describes the date comparator */
  'aria-describedby'?: string;
  
  /** Additional ARIA attributes for screen reader context */
  'aria-details'?: string;
  
  /** Custom accessible name for the comparison widget */
  accessibleName?: string;
  
  /** Custom accessible description for usage instructions */
  accessibleDescription?: string;
  
  /** Whether to announce comparison results to screen readers */
  announceResults?: boolean;
  
  /** Custom format for date announcements to screen readers */
  screenReaderDateFormat?: Intl.DateTimeFormatOptions;
  
  /** Instructions text for screen reader users */
  instructions?: string;
  
  /** Whether to show visual focus indicators for keyboard navigation */
  showFocusIndicators?: boolean;
  
  /** Reduced motion preference for animations */
  reduceMotion?: boolean;
  
  /** High contrast mode support */
  highContrast?: boolean;
}

/**
 * Events emitted by BDateComparator
 */
export interface BDateComparatorEmits {
  /** Emitted when the model value changes */
  'update:modelValue': [value: BDateComparatorModelValue];
  
  /** Emitted when the comparison operator changes */
  'update:operator': [operator: ComparisonOperator];
  
  /** Emitted when a date range is selected */
  'date-selected': [dates: Date[], rangeIndex?: number];
  
  /** Emitted when comparison is completed */
  'comparison-complete': [result: ComparisonResult];
  
  /** Emitted when validation state changes */
  'validation-change': [state: ValidationState];
  
  /** Emitted when focus enters the component */
  'focus': [event: FocusEvent];
  
  /** Emitted when focus leaves the component */
  'blur': [event: FocusEvent];
}

/**
 * Comparison result interface for screen reader announcements
 */
export interface ComparisonResult {
  operator: ComparisonOperator;
  firstRange: Date[];
  secondRange?: Date[];
  isValid: boolean;
  description: string;
  accessibleDescription: string;
}

/**
 * Operator option interface for combobox accessibility
 */
export interface OperatorOption {
  value: ComparisonOperator;
  label: string;
  accessibleLabel: string;
  description: string;
  shortcut?: string;
}

/**
 * Date comparator accessibility configuration
 */
export interface AccessibilityConfig {
  /** Fieldset legend text */
  legendText: string;
  
  /** Instructions for keyboard navigation */
  keyboardInstructions: string;
  
  /** Instructions for screen reader users */
  screenReaderInstructions: string;
  
  /** Operator selection instructions */
  operatorInstructions: string;
  
  /** Error announcement patterns */
  errorAnnouncements: {
    required: string;
    invalidRange: string;
    maxDateExceeded: string;
    invalidComparison: string;
  };
  
  /** Success announcement patterns */
  successAnnouncements: {
    rangeSelected: string;
    comparisonComplete: string;
    operatorChanged: string;
  };
  
  /** Operator labels and descriptions */
  operatorLabels: Record<ComparisonOperator, OperatorOption>;
}

/**
 * Keyboard navigation state for date comparator
 */
export interface KeyboardNavigationState {
  currentFocus: 'operator' | 'first-range' | 'second-range';
  operatorExpanded: boolean;
  activeOperatorIndex: number;
  keyboardMode: boolean;
}

/**
 * Screen reader announcement queue item
 */
export interface AnnouncementQueueItem {
  message: string;
  priority: 'polite' | 'assertive';
  delay?: number;
  id?: string;
}

/**
 * Focus management interface for date comparator
 */
export interface FocusManagement {
  /** Current focused element type */
  focusedElement: Ref<'none' | 'fieldset' | 'operator' | 'calendar-1' | 'calendar-2'>;
  
  /** Whether focus is within the component */
  isFocusWithin: Ref<boolean>;
  
  /** Focus trap state for modal-like behavior */
  focusTrapped: Ref<boolean>;
  
  /** Methods for programmatic focus management */
  focusOperator: () => void;
  focusFirstCalendar: () => void;
  focusSecondCalendar: () => void;
  focusNext: () => void;
  focusPrevious: () => void;
  releaseFocus: () => void;
}

/**
 * Extended date comparator props with computed accessibility attributes
 */
export interface BDateComparatorAccessibilityProps extends BDateComparatorProps {
  /** Computed ARIA attributes for the fieldset */
  fieldsetAria: Record<string, any>;
  
  /** Computed ARIA attributes for the operator combobox */
  operatorAria: Record<string, any>;
  
  /** Computed ARIA attributes for each calendar */
  calendarAria: Array<Record<string, any>>;
  
  /** Computed error IDs for ARIA describedby */
  errorIds: string[];
  
  /** Computed instruction IDs for ARIA describedby */
  instructionIds: string[];
}

/**
 * Complete date comparator accessibility interface
 */
export interface BDateComparatorAccessibility {
  props: BDateComparatorAccessibilityProps;
  state: KeyboardNavigationState;
  focus: FocusManagement;
  config: AccessibilityConfig;
  validation: ValidationState;
  announcements: AnnouncementQueueItem[];
}
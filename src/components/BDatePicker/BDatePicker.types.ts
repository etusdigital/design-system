import type { Ref } from 'vue';

/**
 * Date picker input field accessibility configuration
 */
export interface BDatePickerInputConfig {
  /** ARIA label for the input field */
  inputLabel?: string;
  /** ARIA described by IDs for the input field */
  inputAriaDescribedBy?: string;
  /** Placeholder text with accessibility considerations */
  placeholder?: string;
  /** Error message for invalid input format */
  formatErrorMessage?: string;
  /** Instructions for manual date entry */
  inputInstructions?: string;
  /** Input format hint (e.g., "MM/DD/YYYY") */
  formatHint?: string;
}

/**
 * Calendar grid accessibility configuration
 */
export interface BDatePickerCalendarConfig {
  /** ARIA label for the calendar widget */
  calendarLabel?: string;
  /** ARIA label for the calendar grid */
  gridLabel?: string;
  /** ARIA labels for month/year navigation */
  navigationLabels?: {
    previousMonth?: string;
    nextMonth?: string;
    previousYear?: string;
    nextYear?: string;
    monthSelect?: string;
    yearSelect?: string;
  };
  /** Custom instructions for calendar navigation */
  gridInstructions?: string;
  /** Today button accessibility label */
  todayButtonLabel?: string;
  /** Clear button accessibility label */
  clearButtonLabel?: string;
  /** Apply button accessibility label */
  applyButtonLabel?: string;
}

/**
 * Date picker keyboard navigation configuration
 */
export interface BDatePickerKeyboardConfig {
  /** Enable arrow keys for date navigation in calendar grid */
  enableArrowKeys?: boolean;
  /** Enable Page Up/Down for month navigation */
  enableMonthNavigation?: boolean;
  /** Enable Shift+Page Up/Down for year navigation */
  enableYearNavigation?: boolean;
  /** Enable Home/End for first/last day of month */
  enableHomeEndKeys?: boolean;
  /** Enable Escape to close calendar */
  enableEscapeKey?: boolean;
  /** Enable Tab to move between calendar sections */
  enableTabNavigation?: boolean;
  /** Enable Enter/Space to select dates */
  enableSelection?: boolean;
  /** Custom key bindings for date picker */
  customKeyBindings?: Record<string, (event: KeyboardEvent) => void>;
}

/**
 * Screen reader announcement configuration for date picker
 */
export interface BDatePickerAnnouncementConfig {
  /** Announce when calendar opens/closes */
  announceCalendarState?: boolean;
  /** Announce date selection with full context */
  announceDateSelection?: boolean;
  /** Announce month/year changes during navigation */
  announceNavigation?: boolean;
  /** Announce validation errors */
  announceValidation?: boolean;
  /** Announce when focus moves within calendar */
  announceFocus?: boolean;
  /** Announce available actions for current date */
  announceActions?: boolean;
  /** Custom announcement templates */
  customAnnouncements?: {
    calendarOpened?: () => string;
    calendarClosed?: () => string;
    dateSelected?: (date: Date) => string;
    monthChanged?: (month: string, year: number) => string;
    yearChanged?: (year: number) => string;
    focusedDate?: (date: Date, isSelectable: boolean, isSelected: boolean) => string;
    validationError?: (message: string) => string;
    rangeStart?: (date: Date) => string;
    rangeEnd?: (startDate: Date, endDate: Date) => string;
  };
}

/**
 * Date picker validation configuration
 */
export interface BDatePickerValidationConfig {
  /** Custom validation function */
  validator?: (date: Date) => boolean | string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disabled dates array or function */
  disabledDates?: Date[] | ((date: Date) => boolean);
  /** Required field validation */
  required?: boolean;
  /** Custom error messages */
  errorMessages?: {
    required?: string;
    minDate?: string;
    maxDate?: string;
    disabledDate?: string;
    invalidFormat?: string;
    custom?: string;
  };
}

/**
 * Date picker accessibility configuration
 */
export interface BDatePickerAccessibilityConfig {
  /** High contrast mode support */
  highContrast?: boolean;
  /** Respect user's reduced motion preferences */
  respectReducedMotion?: boolean;
  /** Force visible focus indicators */
  forceFocusIndicators?: boolean;
  /** Large touch targets for mobile accessibility */
  largeTouchTargets?: boolean;
  /** Screen reader optimizations */
  screenReaderOptimized?: boolean;
  /** Voice control support */
  voiceControlSupport?: boolean;
  /** Announce live region politeness level */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Focus management strategy */
  focusManagement?: {
    returnFocusOnClose?: boolean;
    trapFocusInCalendar?: boolean;
    focusFirstSelectableDate?: boolean;
  };
}

/**
 * Date picker display configuration
 */
export interface BDatePickerDisplayConfig {
  /** Date format for display */
  displayFormat?: 'short' | 'medium' | 'long' | 'full' | 'custom';
  /** Custom display format string */
  customFormat?: string;
  /** Show week numbers in calendar */
  showWeekNumbers?: boolean;
  /** Show today button */
  showTodayButton?: boolean;
  /** Show clear button */
  showClearButton?: boolean;
  /** Calendar position relative to input */
  calendarPosition?: 'bottom' | 'top' | 'auto';
  /** Calendar alignment */
  calendarAlignment?: 'start' | 'center' | 'end';
}

/**
 * Comprehensive BDatePicker component props
 */
export interface BDatePickerProps {
  /** Selected date value (v-model) */
  modelValue?: Date | undefined;
  
  /** Calendar expanded state (v-model:expanded) */
  expanded?: boolean;
  
  /** Field label text */
  labelValue?: string;
  
  /** Locale for date formatting */
  lang?: string;
  
  /** Minimum selectable date (legacy - use validation.minDate) */
  maxInit?: Date;
  
  /** Maximum selectable date (legacy - use validation.maxDate) */
  maxEnd?: Date;
  
  /** Disable the date picker */
  disabled?: boolean;
  
  /** Mark field as required */
  required?: boolean;
  
  /** Error state indicator */
  isError?: boolean;
  
  /** Error message to display */
  errorMessage?: string;
  
  /** Use absolute positioning for calendar dropdown */
  absolute?: boolean;
  
  /** Align calendar dropdown to the right */
  alignRight?: boolean;
  
  /** Input field accessibility configuration */
  inputConfig?: BDatePickerInputConfig;
  
  /** Calendar accessibility configuration */
  calendarConfig?: BDatePickerCalendarConfig;
  
  /** Keyboard navigation configuration */
  keyboardConfig?: BDatePickerKeyboardConfig;
  
  /** Screen reader announcement configuration */
  announcementConfig?: BDatePickerAnnouncementConfig;
  
  /** Date validation configuration */
  validationConfig?: BDatePickerValidationConfig;
  
  /** Accessibility enhancements configuration */
  accessibilityConfig?: BDatePickerAccessibilityConfig;
  
  /** Display configuration */
  displayConfig?: BDatePickerDisplayConfig;
  
  /** ARIA label for the date picker widget */
  ariaLabel?: string;
  
  /** ARIA described by - references to describing elements */
  ariaDescribedBy?: string;
  
  /** ARIA label for the input field specifically */
  inputAriaLabel?: string;
  
  /** ARIA label for the calendar widget specifically */
  calendarAriaLabel?: string;
  
  /** Custom ARIA attributes for the container */
  ariaAttributes?: Record<string, string | boolean>;
  
  /** Tab index for the trigger element */
  tabindex?: number;
  
  /** Auto-focus the input when component mounts */
  autofocus?: boolean;
  
  /** Enable manual text input in addition to calendar selection */
  allowTextInput?: boolean;
  
  /** Validate input on blur */
  validateOnBlur?: boolean;
  
  /** Validate input on change */
  validateOnChange?: boolean;
  
  /** Loading state for async date validation */
  loading?: boolean;
  
  /** Loading message for screen readers */
  loadingMessage?: string;
}

/**
 * Events emitted by the BDatePicker component
 */
export interface BDatePickerEmits {
  /** Emitted when the selected date changes */
  'update:modelValue': [value: Date | undefined];
  
  /** Emitted when the expanded state changes */
  'update:expanded': [value: boolean];
  
  /** Emitted when apply button is clicked */
  'apply': [value: Date | undefined];
  
  /** Emitted when a date is selected (with additional context) */
  'dateSelected': [event: BDatePickerSelectionEvent];
  
  /** Emitted when validation state changes */
  'validationChanged': [isValid: boolean, errors: string[]];
  
  /** Emitted when calendar navigation occurs */
  'navigate': [event: BDatePickerNavigationEvent];
  
  /** Emitted when keyboard navigation occurs */
  'keyboardNavigation': [event: BDatePickerKeyboardEvent];
  
  /** Emitted for accessibility announcements */
  'accessibilityAnnouncement': [message: string, politeness: 'polite' | 'assertive'];
  
  /** Emitted when focus changes within the date picker */
  'focusChanged': [event: BDatePickerFocusEvent];
  
  /** Emitted when input value changes (for text input mode) */
  'inputChanged': [value: string, isValid: boolean];
  
  /** Emitted when today button is clicked */
  'todaySelected': [date: Date];
  
  /** Emitted when clear button is clicked */
  'cleared': [];
}

/**
 * Date selection event with comprehensive context
 */
export interface BDatePickerSelectionEvent {
  /** Selected date */
  date: Date;
  /** Formatted date string for display */
  formatted: string;
  /** Whether selection was made via keyboard */
  viaKeyboard: boolean;
  /** Whether selection was made via text input */
  viaTextInput: boolean;
  /** Source of the selection */
  source: 'calendar' | 'today-button' | 'text-input' | 'programmatic';
  /** Validation state at time of selection */
  isValid: boolean;
  /** Any validation errors */
  validationErrors: string[];
}

/**
 * Calendar navigation event
 */
export interface BDatePickerNavigationEvent {
  /** Navigation action performed */
  action: 'next-month' | 'prev-month' | 'next-year' | 'prev-year' | 'month-select' | 'year-select';
  /** Target month (1-12) */
  month: number;
  /** Target year */
  year: number;
  /** Whether navigation was triggered by keyboard */
  viaKeyboard: boolean;
}

/**
 * Keyboard navigation event for date picker
 */
export interface BDatePickerKeyboardEvent {
  /** Key that was pressed */
  key: string;
  /** Target component section */
  target: 'input' | 'calendar' | 'navigation' | 'actions';
  /** Navigation action performed */
  action: 'navigate' | 'select' | 'open' | 'close' | 'apply' | 'clear';
  /** Current focused date (if in calendar) */
  focusedDate?: Date;
  /** Direction of navigation (if applicable) */
  direction?: 'up' | 'down' | 'left' | 'right' | 'home' | 'end' | 'page-up' | 'page-down';
}

/**
 * Focus change event for date picker
 */
export interface BDatePickerFocusEvent {
  /** Component section that received focus */
  target: 'input' | 'calendar' | 'date-cell' | 'navigation' | 'actions' | 'none';
  /** Focused date (if target is date-cell) */
  date?: Date;
  /** Whether focus is entering or leaving */
  type: 'focus' | 'blur';
  /** Whether focus change was triggered by keyboard */
  viaKeyboard: boolean;
}

/**
 * Date picker validation result
 */
export interface BDatePickerValidationResult {
  /** Whether the date is valid */
  isValid: boolean;
  /** Array of error messages */
  errors: string[];
  /** Warnings (non-blocking issues) */
  warnings: string[];
  /** Whether the date is selectable */
  isSelectable: boolean;
}

/**
 * Composable return type for date picker accessibility
 */
export interface UseDatePickerAccessibilityReturn {
  /** Generate ARIA attributes for input */
  getInputAriaAttributes: () => Record<string, string | boolean>;
  
  /** Generate ARIA attributes for calendar */
  getCalendarAriaAttributes: () => Record<string, string | boolean>;
  
  /** Generate ARIA attributes for date cells */
  getDateCellAriaAttributes: (date: Date) => Record<string, string | boolean>;
  
  /** Handle keyboard navigation in calendar */
  handleCalendarKeyboard: (event: KeyboardEvent) => boolean;
  
  /** Handle keyboard navigation in input */
  handleInputKeyboard: (event: KeyboardEvent) => boolean;
  
  /** Announce calendar state changes */
  announceCalendarState: (isOpen: boolean) => void;
  
  /** Announce date selection */
  announceDateSelection: (date: Date, viaKeyboard?: boolean) => void;
  
  /** Announce navigation changes */
  announceNavigation: (month: number, year: number) => void;
  
  /** Announce focus changes */
  announceFocusChange: (date: Date, isSelectable: boolean, isSelected: boolean) => void;
  
  /** Announce validation errors */
  announceValidationError: (errors: string[]) => void;
  
  /** Validate date input */
  validateDate: (date: Date | string) => BDatePickerValidationResult;
  
  /** Format date for screen reader */
  formatDateForScreenReader: (date: Date) => string;
  
  /** Get calendar instructions */
  getCalendarInstructions: () => string;
  
  /** Manage focus within date picker */
  manageFocus: {
    focusInput: () => void;
    focusCalendar: () => void;
    focusDate: (date: Date) => void;
    returnFocus: () => void;
    trapFocus: (enable: boolean) => void;
  };
  
  /** Current accessibility state */
  accessibilityState: Ref<{
    isCalendarOpen: boolean;
    focusedDate: Date | null;
    selectedDate: Date | null;
    currentMonth: number;
    currentYear: number;
    hasValidationErrors: boolean;
    isKeyboardMode: boolean;
    inputHasFocus: boolean;
    calendarHasFocus: boolean;
  }>;
}

/**
 * Default input accessibility configuration
 */
export const defaultBDatePickerInputConfig: Required<BDatePickerInputConfig> = {
  inputLabel: 'Date',
  inputAriaDescribedBy: '',
  placeholder: 'Select a date',
  formatErrorMessage: 'Please enter a valid date',
  inputInstructions: 'Enter date manually or press Enter to open calendar',
  formatHint: 'Expected format: MM/DD/YYYY',
};

/**
 * Default calendar accessibility configuration
 */
export const defaultBDatePickerCalendarConfig: Required<BDatePickerCalendarConfig> = {
  calendarLabel: 'Calendar',
  gridLabel: 'Calendar grid',
  navigationLabels: {
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    previousYear: 'Previous year',
    nextYear: 'Next year',
    monthSelect: 'Select month',
    yearSelect: 'Select year',
  },
  gridInstructions: 'Use arrow keys to navigate dates, Enter or Space to select, Page Up/Down to change months, Home/End for first/last day of month',
  todayButtonLabel: 'Select today',
  clearButtonLabel: 'Clear selected date',
  applyButtonLabel: 'Apply selected date and close calendar',
};

/**
 * Default keyboard configuration
 */
export const defaultBDatePickerKeyboardConfig: Required<BDatePickerKeyboardConfig> = {
  enableArrowKeys: true,
  enableMonthNavigation: true,
  enableYearNavigation: true,
  enableHomeEndKeys: true,
  enableEscapeKey: true,
  enableTabNavigation: true,
  enableSelection: true,
  customKeyBindings: {},
};

/**
 * Default announcement configuration
 */
export const defaultBDatePickerAnnouncementConfig: Required<BDatePickerAnnouncementConfig> = {
  announceCalendarState: true,
  announceDateSelection: true,
  announceNavigation: true,
  announceValidation: true,
  announceFocus: true,
  announceActions: true,
  customAnnouncements: {
    calendarOpened: () => 'Calendar opened. Use arrow keys to navigate dates.',
    calendarClosed: () => 'Calendar closed',
    dateSelected: (date: Date) => `Selected ${date.toLocaleDateString()}`,
    monthChanged: (month: string, year: number) => `Viewing ${month} ${year}`,
    yearChanged: (year: number) => `Viewing year ${year}`,
    focusedDate: (date: Date, isSelectable: boolean, isSelected: boolean) => {
      const dateString = date.toLocaleDateString();
      let announcement = dateString;
      if (isSelected) announcement += ', selected';
      if (!isSelectable) announcement += ', unavailable';
      return announcement;
    },
    validationError: (message: string) => `Error: ${message}`,
    rangeStart: (date: Date) => `Range start: ${date.toLocaleDateString()}`,
    rangeEnd: (startDate: Date, endDate: Date) => 
      `Range selected from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
  },
};

/**
 * Default accessibility configuration
 */
export const defaultBDatePickerAccessibilityConfig: Required<BDatePickerAccessibilityConfig> = {
  highContrast: false,
  respectReducedMotion: true,
  forceFocusIndicators: true,
  largeTouchTargets: false,
  screenReaderOptimized: true,
  voiceControlSupport: true,
  liveRegionPoliteness: 'polite',
  focusManagement: {
    returnFocusOnClose: true,
    trapFocusInCalendar: true,
    focusFirstSelectableDate: true,
  },
};
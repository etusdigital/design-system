import type { Ref } from 'vue';

/**
 * Date display format options
 */
export type BDateFormat = 
  | 'full' // Thursday, December 20, 2012
  | 'long' // December 20, 2012
  | 'medium' // Dec 20, 2012
  | 'short' // 12/20/12
  | 'relative' // 2 days ago, yesterday, today, etc.
  | 'time' // 3:30 PM
  | 'datetime' // Dec 20, 2012, 3:30 PM
  | 'custom'; // Use custom format string

/**
 * Relative time units for accessibility announcements
 */
export type RelativeTimeUnit = 
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year';

/**
 * Date selection modes
 */
export type BDateSelectionMode = 
  | 'single' // Single date selection
  | 'range' // Date range selection (period)
  | 'multiple'; // Multiple individual dates

/**
 * Keyboard navigation configuration
 */
export interface BDateKeyboardConfig {
  /** Enable arrow key navigation */
  enableArrowKeys?: boolean;
  /** Enable Page Up/Down for month navigation */
  enablePageKeys?: boolean;
  /** Enable Home/End for first/last day of month */
  enableHomeEndKeys?: boolean;
  /** Enable Escape to close calendar */
  enableEscapeKey?: boolean;
  /** Custom key bindings */
  customKeyBindings?: Record<string, () => void>;
}

/**
 * Screen reader announcement configuration
 */
export interface BDateAnnouncementConfig {
  /** Announce date format changes */
  announceFormatChanges?: boolean;
  /** Announce relative time updates */
  announceRelativeTime?: boolean;
  /** Announce timezone information */
  announceTimezone?: boolean;
  /** Announce locale changes */
  announceLocale?: boolean;
  /** Custom announcement templates */
  customAnnouncements?: {
    dateSelected?: (date: Date) => string;
    monthChanged?: (month: string, year: number) => string;
    yearChanged?: (year: number) => string;
    rangeSelected?: (startDate: Date, endDate: Date) => string;
    relativeTime?: (value: number, unit: RelativeTimeUnit) => string;
  };
}

/**
 * Timezone configuration for accessibility
 */
export interface BDateTimezoneConfig {
  /** Display timezone in announcements */
  showTimezone?: boolean;
  /** Timezone identifier (e.g., 'America/New_York') */
  timezone?: string;
  /** Custom timezone display format */
  timezoneFormat?: 'short' | 'long' | 'offset';
  /** Announce timezone changes */
  announceTimezoneChanges?: boolean;
}

/**
 * Locale configuration for internationalization
 */
export interface BDateLocaleConfig {
  /** Locale identifier (e.g., 'en-US', 'fr-FR') */
  locale?: string;
  /** Calendar system (gregorian, islamic, etc.) */
  calendar?: string;
  /** Number system (latn, arab, etc.) */
  numberingSystem?: string;
  /** Hour cycle (h11, h12, h23, h24) */
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
  /** First day of week (0 = Sunday, 1 = Monday, etc.) */
  firstDayOfWeek?: number;
  /** Announce locale changes */
  announceLocaleChanges?: boolean;
}

/**
 * Accessibility configuration for high contrast and reduced motion
 */
export interface BDateAccessibilityConfig {
  /** High contrast mode support */
  highContrast?: boolean;
  /** Respect prefers-reduced-motion */
  respectReducedMotion?: boolean;
  /** Force focus outline visibility */
  forceFocusOutlines?: boolean;
  /** Increase touch target sizes */
  largeTouchTargets?: boolean;
  /** Additional ARIA labels */
  customAriaLabels?: {
    calendar?: string;
    nextMonth?: string;
    previousMonth?: string;
    selectDate?: string;
    selectMonth?: string;
    selectYear?: string;
    instructions?: string;
  };
}

/**
 * Comprehensive BDate component props with accessibility features
 */
export interface BDateProps {
  /** The selected date(s) - can be single date, array of dates, or date ranges */
  modelValue?: Date | Date[] | null;
  
  /** Language/locale for date formatting */
  lang?: string;
  
  /** Enable period/range selection */
  isPeriod?: boolean;
  
  /** Oldest selectable date */
  maxInit?: Date;
  
  /** Newest selectable date */
  maxEnd?: Date;
  
  /** Date display format */
  format?: BDateFormat;
  
  /** Custom date format string (when format is 'custom') */
  customFormat?: string;
  
  /** Selection mode */
  selectionMode?: BDateSelectionMode;
  
  /** Show relative time (e.g., "2 days ago") */
  showRelativeTime?: boolean;
  
  /** Update relative time automatically */
  autoUpdateRelativeTime?: boolean;
  
  /** Relative time update interval in milliseconds */
  relativeTimeUpdateInterval?: number;
  
  /** Reference date for relative time calculations (defaults to now) */
  relativeTo?: Date;
  
  /** Keyboard navigation configuration */
  keyboardConfig?: BDateKeyboardConfig;
  
  /** Screen reader announcement configuration */
  announcementConfig?: BDateAnnouncementConfig;
  
  /** Timezone configuration */
  timezoneConfig?: BDateTimezoneConfig;
  
  /** Locale configuration */
  localeConfig?: BDateLocaleConfig;
  
  /** Accessibility configuration */
  accessibilityConfig?: BDateAccessibilityConfig;
  
  /** ARIA label for the date input/display */
  ariaLabel?: string;
  
  /** ARIA described by - references to elements that describe this date */
  ariaDescribedBy?: string;
  
  /** ARIA label for the calendar widget */
  calendarAriaLabel?: string;
  
  /** Whether the date input is required */
  required?: boolean;
  
  /** Whether the date input is disabled */
  disabled?: boolean;
  
  /** Whether the date input is read-only */
  readonly?: boolean;
  
  /** Error state with accessibility announcements */
  error?: boolean;
  
  /** Error message for screen readers */
  errorMessage?: string;
  
  /** Success state with accessibility announcements */
  success?: boolean;
  
  /** Success message for screen readers */
  successMessage?: string;
  
  /** Loading state with accessibility announcements */
  loading?: boolean;
  
  /** Loading message for screen readers */
  loadingMessage?: string;
  
  /** HTML time element datetime attribute value */
  datetime?: string;
  
  /** Whether to render as HTML time element */
  useTimeElement?: boolean;
  
  /** Additional time element attributes */
  timeAttributes?: Record<string, string | number | boolean>;
  
  /** Custom ARIA live region politeness */
  liveRegionPoliteness?: 'polite' | 'assertive';
  
  /** Custom instructions for screen reader users */
  screenReaderInstructions?: string;
  
  /** Context information for date (e.g., "Event date", "Due date") */
  dateContext?: string;
  
  /** Show visual date format example */
  showFormatExample?: boolean;
  
  /** Custom format example text */
  formatExampleText?: string;
}

/**
 * Events emitted by the BDate component
 */
export interface BDateEmits {
  /** Emitted when the model value changes */
  'update:modelValue': [value: Date | Date[] | null];
  
  /** Emitted when date selection changes (with additional context) */
  'dateSelected': [event: BDateSelectionEvent];
  
  /** Emitted when date format changes */
  'formatChanged': [format: BDateFormat];
  
  /** Emitted when timezone changes */
  'timezoneChanged': [timezone: string];
  
  /** Emitted when locale changes */
  'localeChanged': [locale: string];
  
  /** Emitted when relative time updates */
  'relativeTimeUpdated': [relativeTime: string];
  
  /** Emitted for accessibility announcements */
  'accessibilityAnnouncement': [message: string, politeness: 'polite' | 'assertive'];
  
  /** Emitted when calendar view changes (month/year) */
  'viewChanged': [view: { month: number; year: number }];
  
  /** Emitted when keyboard navigation occurs */
  'keyboardNavigation': [event: BDateKeyboardEvent];
  
  /** Emitted when focus changes in calendar */
  'focusChanged': [date: Date | null];
}

/**
 * Date selection event with context
 */
export interface BDateSelectionEvent {
  /** Selected date(s) */
  date: Date | Date[];
  /** Selection mode used */
  mode: BDateSelectionMode;
  /** Whether selection was made via keyboard */
  viaKeyboard: boolean;
  /** Formatted date string */
  formatted: string;
  /** Relative time string (if applicable) */
  relativeTime?: string;
  /** Selection context */
  context?: string;
}

/**
 * Keyboard navigation event
 */
export interface BDateKeyboardEvent {
  /** Key that was pressed */
  key: string;
  /** Navigation action performed */
  action: 'navigate' | 'select' | 'close' | 'changeView';
  /** Target date (if applicable) */
  targetDate?: Date;
  /** Direction of navigation (if applicable) */
  direction?: 'up' | 'down' | 'left' | 'right' | 'home' | 'end' | 'pageup' | 'pagedown';
}

/**
 * Composable return type for date accessibility
 */
export interface UseDateAccessibilityReturn {
  /** Format date with accessibility considerations */
  formatAccessibleDate: (date: Date, format?: BDateFormat) => string;
  
  /** Get relative time string */
  getRelativeTime: (date: Date, relativeTo?: Date) => string;
  
  /** Announce date selection */
  announceDateSelection: (date: Date | Date[], viaKeyboard?: boolean) => void;
  
  /** Announce format change */
  announceFormatChange: (format: BDateFormat) => void;
  
  /** Announce timezone change */
  announceTimezoneChange: (timezone: string) => void;
  
  /** Announce locale change */
  announceLocaleChange: (locale: string) => void;
  
  /** Get ARIA attributes for date element */
  getDateAriaAttributes: () => Record<string, string | boolean>;
  
  /** Get keyboard event handlers */
  getKeyboardHandlers: () => Record<string, (event: KeyboardEvent) => void>;
  
  /** Update relative time */
  updateRelativeTime: () => void;
  
  /** Start/stop automatic relative time updates */
  startAutoUpdate: () => void;
  stopAutoUpdate: () => void;
  
  /** Current accessibility state */
  accessibilityState: Ref<{
    currentFormat: BDateFormat;
    relativeTime?: string;
    timezone?: string;
    locale: string;
    isKeyboardMode: boolean;
    hasErrors: boolean;
    isLoading: boolean;
  }>;
}

/**
 * Default accessibility configuration
 */
export const defaultBDateAccessibilityConfig: Required<BDateAccessibilityConfig> = {
  highContrast: false,
  respectReducedMotion: true,
  forceFocusOutlines: false,
  largeTouchTargets: false,
  customAriaLabels: {
    calendar: 'Calendar',
    nextMonth: 'Go to next month',
    previousMonth: 'Go to previous month',
    selectDate: 'Select date',
    selectMonth: 'Select month',
    selectYear: 'Select year',
    instructions: 'Use arrow keys to navigate dates. Enter or Space to select. Page Up/Page Down to change months. Home/End for first/last day of month.',
  },
};

/**
 * Default keyboard configuration
 */
export const defaultBDateKeyboardConfig: Required<BDateKeyboardConfig> = {
  enableArrowKeys: true,
  enablePageKeys: true,
  enableHomeEndKeys: true,
  enableEscapeKey: true,
  customKeyBindings: {},
};

/**
 * Default announcement configuration
 */
export const defaultBDateAnnouncementConfig: Required<BDateAnnouncementConfig> = {
  announceFormatChanges: true,
  announceRelativeTime: true,
  announceTimezone: true,
  announceLocale: true,
  customAnnouncements: {
    dateSelected: (date: Date) => `Selected ${date.toLocaleDateString()}`,
    monthChanged: (month: string, year: number) => `Viewing ${month} ${year}`,
    yearChanged: (year: number) => `Viewing year ${year}`,
    rangeSelected: (startDate: Date, endDate: Date) => 
      `Selected date range from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
    relativeTime: (value: number, unit: RelativeTimeUnit) => 
      `${Math.abs(value)} ${unit}${Math.abs(value) !== 1 ? 's' : ''} ${value < 0 ? 'ago' : 'from now'}`,
  },
};
import type { Ref } from 'vue';

/**
 * Date option type for predefined date ranges
 */
export interface DateOption {
  label: string;
  value: string;
  calculate: () => Date[];
  selected?: boolean;
  disabled?: boolean;
}

/**
 * Date comparator filter model value type
 */
export type BDateComparatorFilterModelValue = Date[] | Date[][] | undefined;

/**
 * Date template type for formatting
 */
export type DateTemplate = Intl.DateTimeFormatOptions;

/**
 * Loading states for the date comparator filter
 */
export type FilterLoadingState = 'idle' | 'loading' | 'applying' | 'clearing';

/**
 * Filter result information for screen reader announcements
 */
export interface FilterResultInfo {
  /** Number of active filters */
  activeFilterCount: number;
  /** Description of active filters */
  activeFilterDescription: string;
  /** Whether filters are currently applied */
  hasActiveFilters: boolean;
  /** Loading state for filter operations */
  loadingState: FilterLoadingState;
}

/**
 * Accessibility configuration for the date comparator filter
 */
export interface BDateComparatorFilterAccessibilityConfig {
  /** Custom label for the filter widget */
  filterLabel?: string;
  /** Description text for screen readers */
  filterDescription?: string;
  /** Whether to announce filter changes */
  announceChanges?: boolean;
  /** Whether to announce loading states */
  announceLoadingStates?: boolean;
  /** Custom messages for filter operations */
  messages?: {
    applied?: string;
    cleared?: string;
    loading?: string;
    compareEnabled?: string;
    compareDisabled?: string;
    noFiltersActive?: string;
    multipleFiltersActive?: (count: number) => string;
  };
}

/**
 * Keyboard navigation configuration
 */
export interface KeyboardNavigationConfig {
  /** Whether to enable keyboard shortcuts */
  enableKeyboardShortcuts?: boolean;
  /** Custom keyboard handlers */
  customKeyHandlers?: Record<string, (event: KeyboardEvent) => void>;
  /** Whether to use arrow key navigation in options */
  enableArrowKeyNavigation?: boolean;
}

/**
 * Props interface for the BDateComparatorFilter component with accessibility
 */
export interface BDateComparatorFilterProps {
  /** The selected date range(s) */
  modelValue?: BDateComparatorFilterModelValue;
  /** Label text to display */
  labelValue?: string;
  /** Language locale for date formatting */
  lang?: string;
  /** Separator text between date ranges in comparison mode */
  separator?: string;
  /** Whether to enable comparison mode */
  isCompare?: boolean;
  /** Maximum allowed initial date */
  maxInit?: Date;
  /** Maximum allowed end date */
  maxEnd?: Date;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is required */
  required?: boolean;
  /** Whether the component is in error state */
  isError?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Whether to use absolute positioning */
  absolute?: boolean;
  /** Whether the dropdown is expanded */
  expanded?: boolean;
  /** Whether to align dropdown to the right */
  alignRight?: boolean;
  /** Available date options */
  options?: DateOption[];
  /** Loading state for filter operations */
  loadingState?: FilterLoadingState;
  /** Accessibility configuration */
  accessibility?: BDateComparatorFilterAccessibilityConfig;
  /** Keyboard navigation configuration */
  keyboardNavigation?: KeyboardNavigationConfig;
  /** Whether to enable high contrast mode */
  highContrast?: boolean;
  /** Whether to respect reduced motion preferences */
  respectReducedMotion?: boolean;
  /** Custom ARIA label for the filter */
  ariaLabel?: string;
  /** ID of element that describes the filter */
  ariaDescribedBy?: string;
  /** Filter result information for screen reader announcements */
  filterResultInfo?: FilterResultInfo;
}

/**
 * Events interface for the BDateComparatorFilter component
 */
export interface BDateComparatorFilterEmits {
  /** Emitted when the model value changes */
  "update:modelValue": [value: BDateComparatorFilterModelValue];
  /** Emitted when the expanded state changes */
  "update:expanded": [value: boolean];
  /** Emitted when the comparison mode changes */
  "update:isCompare": [value: boolean];
  /** Emitted when the loading state changes */
  "update:loadingState": [state: FilterLoadingState];
  /** Emitted when filters are applied */
  "apply": [value: BDateComparatorFilterModelValue];
  /** Emitted when filters are cleared */
  "clear": [];
  /** Emitted when filter results change (for external tracking) */
  "filterResultChange": [resultInfo: FilterResultInfo];
}

/**
 * Composable return type for date comparator filter accessibility
 */
export interface UseDateComparatorFilterAccessibility {
  /** ARIA attributes for the main filter container */
  filterAriaAttrs: Ref<Record<string, any>>;
  /** ARIA attributes for the filter button/trigger */
  triggerAriaAttrs: Ref<Record<string, any>>;
  /** ARIA attributes for the options list */
  optionsListAriaAttrs: Ref<Record<string, any>>;
  /** ARIA attributes for the clear button */
  clearButtonAriaAttrs: Ref<Record<string, any>>;
  /** ARIA attributes for the apply button */
  applyButtonAriaAttrs: Ref<Record<string, any>>;
  /** Live region for filter announcements */
  liveRegion: Ref<HTMLElement | null>;
  /** Function to announce filter changes */
  announceFilterChange: (message: string, assertive?: boolean) => void;
  /** Function to announce loading states */
  announceLoadingState: (state: FilterLoadingState) => void;
  /** Function to get filter status description */
  getFilterStatusDescription: () => string;
  /** Function to get active filter count */
  getActiveFilterCount: () => number;
  /** Generated unique IDs for accessibility */
  ids: {
    filter: string;
    trigger: string;
    optionsList: string;
    clearButton: string;
    applyButton: string;
    liveRegion: string;
    description: string;
  };
}
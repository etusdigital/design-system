/**
 * WCAG 2.1 AA Accessibility Types for BAutoComplete Component
 * 
 * This file defines comprehensive TypeScript interfaces for implementing
 * accessible autocomplete functionality following ARIA 1.1 combobox pattern.
 */

import type { Ref } from 'vue';

/**
 * Base interface for autocomplete items that can be objects with label/value or primitives
 */
export interface BAutoCompleteItem<TValue = unknown> {
  [key: string]: unknown;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Optional ID for ARIA relationships */
  id?: string;
  /** Optional ARIA label override */
  ariaLabel?: string;
}

/**
 * Union type for autocomplete items - can be objects or primitive values
 */
export type BAutoCompleteItemType<TValue = unknown> = BAutoCompleteItem<TValue> | TValue;

/**
 * Loading states for async autocomplete operations
 */
export type AutoCompleteLoadingState = 'idle' | 'loading' | 'error' | 'success';

/**
 * Search result announcement configuration
 */
export interface SearchResultAnnouncement {
  /** Whether to announce result counts */
  announceCount?: boolean;
  /** Custom message template for result count (uses ${count} placeholder) */
  countMessage?: string;
  /** Whether to announce when no results are found */
  announceNoResults?: boolean;
  /** Custom message for no results */
  noResultsMessage?: string;
  /** Debounce delay for announcements in milliseconds */
  debounceDelay?: number;
}

/**
 * Keyboard navigation configuration for autocomplete
 */
export interface AutoCompleteKeyboardConfig {
  /** Whether to loop navigation (wrap from last to first) */
  loop?: boolean;
  /** Whether to auto-select first item on search */
  autoSelectFirst?: boolean;
  /** Whether to clear selection on escape */
  clearOnEscape?: boolean;
  /** Custom key bindings */
  customKeys?: Record<string, (event: KeyboardEvent, context: AutoCompleteKeyboardContext) => void>;
}

/**
 * Context provided to custom keyboard handlers
 */
export interface AutoCompleteKeyboardContext {
  /** Current active index */
  activeIndex: number;
  /** Total number of items */
  totalItems: number;
  /** Current search value */
  searchValue: string;
  /** Whether dropdown is expanded */
  isExpanded: boolean;
  /** Function to select current item */
  selectCurrent: () => void;
  /** Function to close dropdown */
  close: () => void;
}

/**
 * ARIA combobox configuration
 */
export interface ComboboxAriaConfig {
  /** Role for the combobox (default: 'combobox') */
  role?: 'combobox';
  /** Whether combobox has popup (default: 'listbox') */
  hasPopup?: 'listbox' | 'menu' | 'tree' | 'grid' | 'dialog';
  /** Whether to use aria-activedescendant pattern */
  useActiveDescendant?: boolean;
  /** Custom ARIA label for the combobox */
  ariaLabel?: string;
  /** ID of element that labels the combobox */
  ariaLabelledBy?: string;
  /** ID of element that describes the combobox */
  ariaDescribedBy?: string;
}

/**
 * Screen reader announcement configuration
 */
export interface ScreenReaderConfig {
  /** Configuration for search result announcements */
  searchResults?: SearchResultAnnouncement;
  /** Whether to announce selections */
  announceSelection?: boolean;
  /** Custom selection announcement template */
  selectionMessage?: string;
  /** Whether to announce loading states */
  announceLoading?: boolean;
  /** Custom loading message */
  loadingMessage?: string;
  /** Custom loaded message */
  loadedMessage?: string;
}

/**
 * Multi-select configuration
 */
export interface MultiSelectConfig {
  /** Whether multi-select is enabled */
  enabled?: boolean;
  /** Maximum number of selections (0 = unlimited) */
  maxSelections?: number;
  /** Whether to show selection count */
  showCount?: boolean;
  /** Custom separator for selected values display */
  separator?: string;
  /** Whether to allow deselection by clicking selected items */
  allowDeselect?: boolean;
}

/**
 * Async search configuration
 */
export interface AsyncSearchConfig {
  /** Search function that returns a Promise */
  searchFn?: (query: string) => Promise<BAutoCompleteItemType[]>;
  /** Debounce delay for search requests in milliseconds */
  debounceDelay?: number;
  /** Minimum query length to trigger search */
  minQueryLength?: number;
  /** Whether to show loading indicator */
  showLoadingIndicator?: boolean;
  /** Custom loading text */
  loadingText?: string;
  /** Whether to cache search results */
  cacheResults?: boolean;
  /** Cache duration in milliseconds */
  cacheDuration?: number;
}

/**
 * Main accessibility properties interface for BAutoComplete
 */
export interface BAutoCompleteAccessibilityProps {
  /** ARIA combobox configuration */
  combobox?: ComboboxAriaConfig;
  
  /** Keyboard navigation configuration */
  keyboard?: AutoCompleteKeyboardConfig;
  
  /** Screen reader announcement configuration */
  screenReader?: ScreenReaderConfig;
  
  /** Multi-select configuration */
  multiSelect?: MultiSelectConfig;
  
  /** Async search configuration */
  asyncSearch?: AsyncSearchConfig;
  
  /** Current loading state */
  loadingState?: AutoCompleteLoadingState;
  
  /** Whether to announce focus changes */
  announceFocus?: boolean;
  
  /** Custom ARIA live region politeness */
  liveRegionPoliteness?: 'polite' | 'assertive';
  
  /** Whether to use roving tabindex pattern */
  useRovingTabindex?: boolean;
  
  /** Custom CSS classes for accessibility states */
  accessibilityClasses?: {
    /** Class for keyboard-focused items */
    keyboardFocus?: string;
    /** Class for selected items */
    selected?: string;
    /** Class for disabled items */
    disabled?: string;
    /** Class for loading state */
    loading?: string;
  };
}

/**
 * Extended props interface that includes all accessibility features
 */
export interface BAutoCompleteProps<T = unknown> extends BAutoCompleteAccessibilityProps {
  /** Current input value */
  modelValue?: T | T[];
  
  /** Whether the autocomplete dropdown is expanded */
  expanded?: boolean;
  
  /** Label for the autocomplete field */
  labelValue?: string;
  
  /** Array of autocomplete items */
  items?: BAutoCompleteItemType<T>[];
  
  /** Key to use for labels when items are objects */
  labelKey?: string;
  
  /** Key to use for values when items are objects */
  valueKey?: string;
  
  /** Whether to use absolute positioning */
  absolute?: boolean;
  
  /** Whether the field is disabled */
  disabled?: boolean;
  
  /** Whether to show error state */
  isError?: boolean;
  
  /** Error message to display */
  errorMessage?: string;
  
  /** Info message to display */
  infoMessage?: string;
  
  /** Whether the field is required */
  required?: boolean;
  
  /** Placeholder text for the input */
  placeholder?: string;
  
  /** Maximum height for the dropdown */
  maxHeight?: string;
  
  /** Minimum width for the component */
  minWidth?: string;
  
  /** Whether to show clear button */
  clearable?: boolean;
  
  /** Custom clear button ARIA label */
  clearButtonLabel?: string;
  
  /** Whether search is case sensitive */
  caseSensitive?: boolean;
  
  /** Custom filter function */
  filterFn?: (item: BAutoCompleteItemType<T>, query: string) => boolean;
  
  /** Debounce delay for search functionality in milliseconds */
  debounceDelay?: number;
}

/**
 * Events emitted by BAutoComplete
 */
export interface BAutoCompleteEvents<T = unknown> {
  /** Emitted when value changes */
  'update:modelValue': (value: T | T[], extra?: { index: number; item: BAutoCompleteItemType<T> }) => void;
  
  /** Emitted when expanded state changes */
  'update:expanded': (expanded: boolean) => void;
  
  /** Emitted when loading state changes */
  'update:loadingState': (state: AutoCompleteLoadingState) => void;
  
  /** Emitted when search query changes */
  'search': (query: string) => void;
  
  /** Emitted when an item is selected */
  'select': (item: BAutoCompleteItemType<T>, index: number) => void;
  
  /** Emitted when an item is deselected (multi-select) */
  'deselect': (item: BAutoCompleteItemType<T>, index: number) => void;
  
  /** Emitted when clear button is clicked */
  'clear': () => void;
  
  /** Emitted when focus enters the component */
  'focus': (event: FocusEvent) => void;
  
  /** Emitted when focus leaves the component */
  'blur': (event: FocusEvent) => void;
  
  /** Emitted for accessibility events (screen reader announcements, etc.) */
  'accessibility': (event: { type: string; message: string; data?: any }) => void;
}

/**
 * Composable return type for useAutoCompleteAccessibility
 */
export interface UseAutoCompleteAccessibilityReturn {
  /** Reactive ARIA attributes for combobox */
  comboboxAttrs: Ref<Record<string, any>>;
  
  /** Reactive ARIA attributes for listbox */
  listboxAttrs: Ref<Record<string, any>>;
  
  /** Function to get ARIA attributes for options */
  getOptionAttrs: (item: BAutoCompleteItemType, index: number, isActive: boolean, isSelected: boolean) => Record<string, any>;
  
  /** Current active descendant ID */
  activeDescendantId: Ref<string>;
  
  /** Function to handle keyboard navigation */
  handleKeydown: (event: KeyboardEvent) => boolean;
  
  /** Function to announce messages to screen readers */
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
  
  /** Function to announce search results */
  announceSearchResults: (count: number) => void;
  
  /** Function to announce selection */
  announceSelection: (item: BAutoCompleteItemType, isSelected: boolean) => void;
  
  /** Function to announce loading state */
  announceLoadingState: (state: AutoCompleteLoadingState) => void;
  
  /** Unique IDs for accessibility */
  ids: {
    combobox: string;
    listbox: string;
    label?: string;
    description?: string;
    liveRegion: string;
  };
}
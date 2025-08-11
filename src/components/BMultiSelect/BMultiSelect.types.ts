import type { Ref } from 'vue';

/**
 * Extra information for multi-select model value changes
 */
export interface BMultiSelectModelExtra<TItem = unknown> {
  /** Array of selected items */
  selected: TItem[];
  /** Array of deselected items */
  deselected: TItem[];
}

/**
 * Extra information for expanded state changes in multi-select
 */
export interface BMultiSelectExpandedExtra {
  source: 'click' | 'blur-sm' | 'value-selected' | 'keyboard';
}

/**
 * Interface for multi-select items that can be objects with label/value or primitives
 */
export interface BMultiSelectItem {
  [key: string]: unknown;
  /** Whether the item is disabled */
  disabled?: boolean;
}

/**
 * Union type for multi-select items - can be objects or primitive values
 */
export type BMultiSelectItemType<TValue = unknown> = BMultiSelectItem | TValue;

/**
 * Accessibility configuration for BMultiSelect component
 */
export interface BMultiSelectAccessibilityProps {
  /** ARIA label for the multi-select combobox */
  ariaLabel?: string;
  
  /** ID of element that labels the multi-select */
  ariaLabelledBy?: string;
  
  /** ID of element that describes the multi-select */
  ariaDescribedBy?: string;
  
  /** Custom ARIA description for screen readers */
  ariaDescription?: string;
  
  /** Maximum number of items that can be selected */
  maxSelections?: number;
  
  /** Message announced when selection limit is reached */
  selectionLimitMessage?: string;
  
  /** Message announced when items are selected/deselected */
  selectionChangeMessage?: string;
  
  /** Whether to announce search results count */
  announceSearchResults?: boolean;
  
  /** Custom message template for search results announcement */
  searchResultsMessage?: string;
  
  /** Whether to provide detailed keyboard instructions */
  keyboardInstructions?: boolean;
  
  /** Instructions text for keyboard navigation */
  keyboardInstructionsText?: string;
  
  /** Whether to show selection count in status */
  showSelectionCount?: boolean;
  
  /** Custom formatter for selected items announcement */
  selectedItemsAnnouncement?: (count: number, items: BMultiSelectItemType[]) => string;
  
  /** Whether selected items can be removed via keyboard */
  removableSelections?: boolean;
  
  /** Message for removing selected items */
  removeSelectionMessage?: string;
  
  /** Whether to group selected items together */
  groupSelectedItems?: boolean;
  
  /** ARIA live region politeness level for announcements */
  ariaLive?: 'polite' | 'assertive';
  
  /** Whether to announce when dropdown opens/closes */
  announceStateChanges?: boolean;
  
  /** Custom messages for state changes */
  stateChangeMessages?: {
    opened?: string;
    closed?: string;
    searching?: string;
    filtered?: string;
  };
}

/**
 * Keyboard navigation configuration for multi-select
 */
export interface BMultiSelectKeyboardConfig {
  /** Whether to enable keyboard navigation */
  enabled?: boolean;
  
  /** Whether to wrap around at list boundaries */
  wrapNavigation?: boolean;
  
  /** Whether to auto-select on focus */
  selectOnFocus?: boolean;
  
  /** Keys that trigger selection/deselection */
  selectionKeys?: string[];
  
  /** Keys that close the dropdown */
  closeKeys?: string[];
  
  /** Keys that open the dropdown */
  openKeys?: string[];
  
  /** Whether to clear search on Escape */
  clearSearchOnEscape?: boolean;
}

/**
 * Screen reader configuration for multi-select
 */
export interface BMultiSelectScreenReaderConfig {
  /** Whether to announce selection changes */
  announceSelections?: boolean;
  
  /** Whether to announce search filtering */
  announceFiltering?: boolean;
  
  /** Whether to announce option count changes */
  announceOptionCount?: boolean;
  
  /** Whether to use polite or assertive announcements */
  announcementLevel?: 'polite' | 'assertive';
  
  /** Delay before making announcements (ms) */
  announcementDelay?: number;
}

/**
 * Selected item display configuration
 */
export interface BMultiSelectSelectedItemConfig {
  /** How to display selected items */
  displayMode?: 'tags' | 'count' | 'summary' | 'hidden';
  
  /** Whether selected items are keyboard focusable */
  focusable?: boolean;
  
  /** Whether to show remove buttons for selected items */
  showRemoveButton?: boolean;
  
  /** Maximum number of visible selected item tags */
  maxVisibleTags?: number;
  
  /** Text to show when more items are selected than visible */
  overflowText?: string;
  
  /** Whether to show selected items above or below the input */
  position?: 'above' | 'below' | 'inline';
}

/**
 * Complete props interface for BMultiSelect component
 */
export interface BMultiSelectProps<T = unknown> extends BMultiSelectAccessibilityProps {
  /** Array of items for multi-selection */
  modelValue: BMultiSelectItemType<T>[];
  
  /** Label for the multi-select */
  labelValue?: string;
  
  /** Icon to display */
  icon?: string;
  
  /** Whether the multi-select is expanded */
  expanded?: boolean;
  
  /** Key to use for labels when items are objects */
  labelKey?: string;
  
  /** Key to use for selection state when items are objects */
  selectedKey?: string;
  
  /** Whether search functionality is enabled */
  searchable?: boolean;
  
  /** Whether the multi-select is disabled */
  disabled?: boolean;
  
  /** Whether the field is required */
  required?: boolean;
  
  /** Whether to show error state */
  isError?: boolean;
  
  /** Error message to display */
  errorMessage?: string;
  
  /** Info message to display */
  infoMessage?: string;
  
  /** Whether to use absolute positioning */
  absolute?: boolean;
  
  /** Custom formatter function for item labels */
  labelFormatter?: (item: BMultiSelectItemType<T>) => string;
  
  /** Placeholder text for search input */
  placeholder?: string;
  
  /** Whether to show "Select All" option */
  showSelectAll?: boolean;
  
  /** Text for "Select All" option */
  selectAllText?: string;
  
  /** Whether to show "Clear All" option */
  showClearAll?: boolean;
  
  /** Text for "Clear All" option */
  clearAllText?: string;
  
  /** Keyboard navigation configuration */
  keyboardConfig?: BMultiSelectKeyboardConfig;
  
  /** Screen reader configuration */
  screenReaderConfig?: BMultiSelectScreenReaderConfig;
  
  /** Selected items display configuration */
  selectedItemConfig?: BMultiSelectSelectedItemConfig;
  
  /** Whether to enable virtual scrolling for large option lists */
  virtualized?: boolean;
  
  /** Height of each option in pixels for virtual scrolling */
  optionHeight?: number;
  
  /** Container height for virtual scrolling in pixels */
  virtualContainerHeight?: number;
  
  /** Number of extra items to render outside visible area for smooth scrolling */
  overscan?: number;
  
  /** Minimum number of items to enable virtualization */
  virtualizationThreshold?: number;
  
  /** Whether to enable type-ahead search */
  typeAhead?: boolean;
  
  /** Debounce delay for search (ms) */
  searchDebounce?: number;
  
  /** Minimum characters to start search */
  minSearchLength?: number;
  
  /** No options message */
  noOptionsMessage?: string;
  
  /** Loading state message */
  loadingMessage?: string;
  
  /** Whether items are loading */
  loading?: boolean;
}

/**
 * Emits interface for BMultiSelect component
 */
export interface BMultiSelectEmits<T = unknown> {
  'update:modelValue': [value: BMultiSelectItemType<T>[], extra: BMultiSelectModelExtra<BMultiSelectItemType<T>>];
  'update:expanded': [value: boolean, extra: BMultiSelectExpandedExtra];
  'search': [query: string];
  'selectionLimitReached': [limit: number];
  'focus': [event: FocusEvent];
  'blur': [event: FocusEvent];
}

/**
 * Slots interface for BMultiSelect component
 */
export interface BMultiSelectSlots<T = unknown> {
  /** Default slot content displayed in the select trigger */
  default?: () => any;
  
  /** Custom search input placeholder */
  searchText?: () => any;
  
  /** Status display when items are selected */
  status?: (props: { selected: number }) => any;
  
  /** Status text when items are selected */
  'status-text'?: (props: { selected: number }) => any;
  
  /** Custom item display */
  item?: (props: { item: BMultiSelectItemType<T>; index: number; selected: boolean }) => any;
  
  /** Selected item display */
  'selected-item'?: (props: { item: BMultiSelectItemType<T>; index: number; removable: boolean }) => any;
  
  /** Custom actions in dropdown */
  actions?: () => any;
  
  /** Custom header in dropdown */
  header?: (props: { selectedCount: number; totalCount: number }) => any;
  
  /** Custom footer in dropdown */
  footer?: (props: { selectedCount: number; totalCount: number }) => any;
  
  /** No options state */
  'no-options'?: () => any;
  
  /** Loading state */
  loading?: () => any;
}

/**
 * Selection state for individual items
 */
export interface BMultiSelectItemState {
  /** Whether the item is selected */
  selected: boolean;
  
  /** Whether the item is disabled */
  disabled: boolean;
  
  /** Whether the item is focused for keyboard navigation */
  focused: boolean;
  
  /** Item's display label */
  label: string;
  
  /** Item's unique identifier */
  id: string;
  
  /** Item's index in the list */
  index: number;
}

/**
 * Component instance type for BMultiSelect
 */
export interface BMultiSelectInstance<T = unknown> {
  /** Focus the multi-select input */
  focus(): void;
  
  /** Blur the multi-select input */
  blur(): void;
  
  /** Programmatically open the dropdown */
  open(): void;
  
  /** Programmatically close the dropdown */
  close(): void;
  
  /** Select all available items */
  selectAll(): void;
  
  /** Clear all selected items */
  clearAll(): void;
  
  /** Select specific item by index */
  selectItem(index: number): void;
  
  /** Deselect specific item by index */
  deselectItem(index: number): void;
  
  /** Get current selection state */
  getSelectedItems(): BMultiSelectItemType<T>[];
  
  /** Get filtered items based on current search */
  getFilteredItems(): BMultiSelectItemType<T>[];
  
  /** Update search query */
  setSearchQuery(query: string): void;
  
  /** Clear search query */
  clearSearch(): void;
}
/**
 * BSmartSelect accessibility props interface
 * Implements WCAG 2.1 AA standards for smart select components
 */
export interface BSmartSelectAccessibilityProps {
  /** ARIA label for the combobox */
  ariaLabel?: string;
  /** ARIA described by IDs */
  ariaDescribedBy?: string;
  /** Whether to announce selection changes */
  announceSelections?: boolean;
  /** Whether to show option count in live region */
  announceCount?: boolean;
  /** Custom autocomplete behavior */
  autoComplete?: 'none' | 'list' | 'inline' | 'both';
  /** Custom role for accessibility (defaults to combobox) */
  role?: 'combobox' | 'textbox';
  /** Whether the combobox supports autocomplete */
  autoCompleteList?: boolean;
  /** Whether to announce loading states */
  announceLoading?: boolean;
  /** Whether to announce validation changes */
  announceValidation?: boolean;
  /** Custom announcement delay in milliseconds */
  announcementDelay?: number;
  /** High contrast mode support */
  highContrast?: boolean;
  /** Reduced motion support */
  reduceMotion?: boolean;
  /** Whether to use enhanced focus management */
  enhancedFocus?: boolean;
  /** Minimum touch target size (default 44px) */
  minTouchTarget?: boolean;
  /** Screen reader instructions for interaction */
  screenReaderInstructions?: string;
  /** Live region politeness level for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Whether smart select supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Whether to announce when no options are available */
  announceEmptyState?: boolean;
  /** Custom empty state message */
  emptyStateMessage?: string;
  /** Whether to announce option descriptions */
  announceDescriptions?: boolean;
  /** Whether to announce group changes in grouped options */
  announceGroups?: boolean;
}

/**
 * Smart select item with accessibility properties
 */
export interface BSmartSelectItem {
  /** The display label */
  label: string;
  /** The value */
  value: unknown;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Additional description for screen readers */
  description?: string;
  /** Group this item belongs to */
  group?: string;
  /** Icon to display */
  icon?: string;
  /** Whether item is loading (for async scenarios) */
  loading?: boolean;
  /** Custom ARIA label for the item */
  ariaLabel?: string;
  /** Custom announcement text */
  announcement?: string;
  /** Badge count for the item */
  badgeCount?: number;
  /** Custom CSS classes */
  customClass?: string;
  /** Additional data */
  data?: Record<string, unknown>;
  /** Custom properties */
  [key: string]: unknown;
}

/**
 * Union type for select items - can be objects or primitive values
 */
export type BSmartSelectItemType = BSmartSelectItem | string | number;

/**
 * Smart select model value type for multiple selection
 */
export type BSmartSelectMultiValue = BSmartSelectItemType[] | undefined;

/**
 * Smart select model value type for single selection
 */
export type BSmartSelectSingleValue = BSmartSelectItemType | undefined;

/**
 * Smart select model value type - can be single or multiple
 */
export type BSmartSelectModelValue = BSmartSelectSingleValue | BSmartSelectMultiValue;

/**
 * Internal item type with selection state and accessibility info
 */
export interface BSmartSelectInternalItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label */
  label: string;
  /** Item value */
  value: unknown;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether item is selected */
  selected?: boolean;
  /** Additional description for screen readers */
  description?: string;
  /** Group this item belongs to */
  group?: string;
  /** Icon to display */
  icon?: string;
  /** Whether item is loading */
  loading?: boolean;
  /** Original item data */
  originalItem: BSmartSelectItemType;
  /** Additional properties */
  [key: string]: unknown;
}

/**
 * Internal model type - can be single item or array of items with selection state
 */
export type BSmartSelectInternalModel = BSmartSelectInternalItem | BSmartSelectInternalItem[] | null;

/**
 * Loading state for async operations
 */
export interface BSmartSelectLoadingState {
  /** Whether loading is active */
  loading: boolean;
  /** Loading message to display */
  message?: string;
  /** Loading progress percentage */
  progress?: number;
}

/**
 * Validation state
 */
export type BSmartSelectValidationState = 'success' | 'error' | 'warning' | undefined;

/**
 * Smart select expansion source types
 */
export type BSmartSelectExpandedSource = 'click' | 'value-selected' | 'keyboard' | 'search' | 'focus' | 'blur';

/**
 * Smart select expanded extra data
 */
export interface BSmartSelectExpandedExtra {
  /** Source of the expansion change */
  source: BSmartSelectExpandedSource;
}

/**
 * Smart select state interface for accessibility
 */
export interface BSmartSelectState {
  /** Whether dropdown is expanded */
  isExpanded: boolean;
  /** Currently focused option index */
  focusedIndex: number;
  /** Current search term */
  searchTerm: string;
  /** Whether component is loading */
  isLoading: boolean;
  /** Currently selected items */
  selectedItems: BSmartSelectInternalItem[];
  /** Filtered available options */
  filteredOptions: BSmartSelectInternalItem[];
  /** Whether search has focus */
  hasSearchFocus: boolean;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Current validation state */
  validationState: BSmartSelectValidationState;
  /** Whether component is disabled */
  isDisabled: boolean;
  /** Whether multiple selection is enabled */
  isMultiSelect: boolean;
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
  /** Last announced message to prevent duplicates */
  lastAnnouncedMessage: string | null;
}

/**
 * Smart select ARIA attributes interface
 */
export interface BSmartSelectAriaAttributes {
  /** ARIA role for the combobox */
  role: 'combobox' | 'textbox';
  /** ARIA label for the combobox */
  'aria-label'?: string;
  /** ARIA labelledby for complex labeling */
  'aria-labelledby'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** ARIA expanded state */
  'aria-expanded': boolean;
  /** ARIA haspopup for indicating dropdown */
  'aria-haspopup': 'listbox' | 'tree' | 'grid' | 'dialog';
  /** ARIA controls for listbox reference */
  'aria-controls'?: string;
  /** ARIA autocomplete behavior */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  /** ARIA activedescendant for current option */
  'aria-activedescendant'?: string;
  /** ARIA invalid for validation state */
  'aria-invalid'?: boolean;
  /** ARIA required for required fields */
  'aria-required'?: boolean;
  /** ARIA busy for loading states */
  'aria-busy'?: boolean;
  /** ARIA owns for ownership relationships */
  'aria-owns'?: string;
}

/**
 * Smart select option ARIA attributes interface
 */
export interface BSmartSelectOptionAriaAttributes {
  /** ARIA role (always 'option') */
  role: 'option';
  /** ARIA selected state */
  'aria-selected': boolean;
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** ARIA describedby for option description */
  'aria-describedby'?: string;
  /** ARIA posinset for position in list */
  'aria-posinset'?: number;
  /** ARIA setsize for total items count */
  'aria-setsize'?: number;
  /** ARIA label for option */
  'aria-label'?: string;
}

/**
 * Smart select keyboard configuration
 */
export interface BSmartSelectKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for navigating options */
  navigationKeys?: string[];
  /** Keys for selecting options */
  selectionKeys?: string[];
  /** Keys for opening/closing dropdown */
  toggleKeys?: string[];
  /** Keys for clearing selection */
  clearKeys?: string[];
  /** Keys for multi-selection */
  multiSelectKeys?: string[];
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom keyboard shortcuts */
  shortcuts?: Record<string, () => void>;
}

/**
 * Smart select search configuration
 */
export interface BSmartSelectSearchConfig {
  /** Whether search is enabled */
  enabled?: boolean;
  /** Search placeholder text */
  placeholder?: string;
  /** Minimum characters before search */
  minLength?: number;
  /** Debounce delay for search */
  debounceDelay?: number;
  /** Whether to search in descriptions */
  searchDescriptions?: boolean;
  /** Custom search filter function */
  customFilter?: (items: BSmartSelectInternalItem[], term: string) => BSmartSelectInternalItem[];
  /** Whether search is case sensitive */
  caseSensitive?: boolean;
  /** Whether to highlight search matches */
  highlightMatches?: boolean;
}

/**
 * Complete BSmartSelect props interface
 */
export interface BSmartSelectProps extends BSmartSelectAccessibilityProps {
  /** The current selected value(s) */
  modelValue?: BSmartSelectModelValue;
  /** Label text to display */
  labelValue?: string;
  /** Array of items to select from */
  items: BSmartSelectItemType[];
  /** Icon to display */
  icon?: string;
  /** Whether the dropdown is expanded */
  expanded?: boolean;
  /** Key to use for item value when items are objects */
  valueKey?: string;
  /** Key to use for item label when items are objects */
  labelKey?: string;
  /** Whether search is enabled */
  searchable?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is required */
  required?: boolean;
  /** Validation state */
  validationState?: BSmartSelectValidationState;
  /** Whether multiple selection is enabled */
  isMultiple?: boolean;
  /** Whether to return the full object or just the value */
  getObject?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Info message to display */
  infoMessage?: string;
  /** Success message to display */
  successMessage?: string;
  /** Warning message to display */
  warningMessage?: string;
  /** Help text for accessibility */
  helpText?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether to use absolute positioning */
  absolute?: boolean;
  /** Whether the component is clearable */
  clearable?: boolean;
  /** Loading state for async operations */
  loading?: boolean | BSmartSelectLoadingState;
  /** Maximum number of items to show before virtualization */
  maxDisplayItems?: number;
  /** Whether to allow custom values (tags) */
  allowCustom?: boolean;
  /** Filter function for custom search logic */
  filterFunction?: (items: BSmartSelectInternalItem[], searchTerm: string) => BSmartSelectInternalItem[];
  /** Async function to load items */
  loadItems?: (searchTerm: string) => Promise<BSmartSelectItemType[]>;
  /** Debounce delay for async search */
  debounceDelay?: number;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BSmartSelectKeyboardConfig;
  /** Search configuration */
  searchConfig?: BSmartSelectSearchConfig;
  /** Maximum height of dropdown */
  maxHeight?: string | number;
  /** Whether to show selected items in dropdown */
  showSelected?: boolean;
  /** Whether to close dropdown after selection */
  closeOnSelect?: boolean;
  /** Custom item renderer */
  itemRenderer?: (item: BSmartSelectInternalItem) => any;
  /** Theme variant */
  variant?: 'default' | 'compact' | 'minimal';
}

/**
 * BSmartSelect emits interface
 */
export interface BSmartSelectEmits {
  /** Model value updated */
  'update:modelValue': [value: BSmartSelectModelValue];
  /** Dropdown expanded state changed */
  'update:expanded': [value: boolean, extra: BSmartSelectExpandedExtra];
  /** Search term changed */
  'search': [searchTerm: string];
  /** Item selected or deselected */
  'select': [item: BSmartSelectInternalItem, isSelected: boolean];
  /** Selection cleared */
  'clear': [];
  /** Load more items requested */
  'loadMore': [searchTerm: string];
  /** Focus changed */
  'focus': [event: FocusEvent];
  /** Blur event */
  'blur': [event: FocusEvent];
  /** Validation state changed */
  'validation-change': [state: BSmartSelectValidationState, message?: string];
  /** Option hovered */
  'option-hover': [item: BSmartSelectInternalItem | null, index: number];
  /** Keyboard navigation event */
  'keyboard-nav': [event: KeyboardEvent, focusedIndex: number];
  /** Loading state changed */
  'loading-change': [isLoading: boolean, message?: string];
  /** Custom value created */
  'create-option': [value: string];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
}

/**
 * Smart select validation result
 */
export interface BSmartSelectValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Smart select configuration */
  config?: BSmartSelectProps;
}

/**
 * Smart select announcement templates
 */
export interface BSmartSelectAnnouncementTemplates {
  /** Template for item selection announcement */
  itemSelected: string;
  /** Template for item deselection announcement */
  itemDeselected: string;
  /** Template for multiple selection count */
  multipleSelectionCount: string;
  /** Template for option count announcement */
  optionCount: string;
  /** Template for no options announcement */
  noOptions: string;
  /** Template for search results announcement */
  searchResults: string;
  /** Template for loading announcement */
  loadingOptions: string;
  /** Template for error announcement */
  loadingError: string;
  /** Template for clear all announcement */
  clearAll: string;
  /** Template for validation error announcement */
  validationError: string;
  /** Template for dropdown opened announcement */
  dropdownOpened: string;
  /** Template for dropdown closed announcement */
  dropdownClosed: string;
}

/**
 * Smart select theme configuration
 */
export interface BSmartSelectThemeConfig {
  /** Input background color */
  inputBackgroundColor?: string;
  /** Input text color */
  inputTextColor?: string;
  /** Input border color */
  inputBorderColor?: string;
  /** Dropdown background color */
  dropdownBackgroundColor?: string;
  /** Option hover background color */
  optionHoverBackgroundColor?: string;
  /** Option selected background color */
  optionSelectedBackgroundColor?: string;
  /** Option text color */
  optionTextColor?: string;
  /** Focus ring color */
  focusRingColor?: string;
  /** Error color */
  errorColor?: string;
  /** Success color */
  successColor?: string;
  /** Warning color */
  warningColor?: string;
}

/**
 * Smart select accessibility helpers
 */
export interface BSmartSelectAccessibilityHelpers {
  /** Get ARIA attributes for combobox */
  getComboboxAriaAttributes: (state: BSmartSelectState, props: BSmartSelectProps) => BSmartSelectAriaAttributes;
  /** Get ARIA attributes for option */
  getOptionAriaAttributes: (item: BSmartSelectInternalItem, index: number, state: BSmartSelectState) => BSmartSelectOptionAriaAttributes;
  /** Format selection announcement */
  formatSelectionAnnouncement: (items: BSmartSelectInternalItem[], isMultiple: boolean) => string;
  /** Format option count announcement */
  formatOptionCountAnnouncement: (count: number, searchTerm?: string) => string;
  /** Check if item should be announced */
  shouldAnnounceItem: (item: BSmartSelectInternalItem, previousItem?: BSmartSelectInternalItem) => boolean;
  /** Get keyboard navigation instructions */
  getKeyboardInstructions: (isMultiple: boolean, isSearchable: boolean) => string;
  /** Announce loading state */
  announceLoadingState: (isLoading: boolean, message?: string) => void;
}

/**
 * Default configurations
 */
export const DEFAULT_SMART_SELECT_KEYBOARD_CONFIG: Required<BSmartSelectKeyboardConfig> = {
  enabled: true,
  navigationKeys: ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'],
  selectionKeys: ['Enter', ' '],
  toggleKeys: ['Enter', ' '],
  clearKeys: ['Escape'],
  multiSelectKeys: ['Control+Enter'],
  preventDefault: true,
  stopPropagation: false,
  shortcuts: {},
};

export const DEFAULT_SMART_SELECT_ACCESSIBILITY_CONFIG: Required<BSmartSelectAccessibilityProps> = {
  ariaLabel: '',
  ariaDescribedBy: '',
  announceSelections: true,
  announceCount: true,
  autoComplete: 'list',
  role: 'combobox',
  autoCompleteList: true,
  announceLoading: true,
  announceValidation: true,
  announcementDelay: 0,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Use arrow keys to navigate options, Enter to select, Escape to close',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  announceEmptyState: true,
  emptyStateMessage: 'No options available',
  announceDescriptions: true,
  announceGroups: false,
};

export const DEFAULT_SMART_SELECT_SEARCH_CONFIG: Required<BSmartSelectSearchConfig> = {
  enabled: true,
  placeholder: 'Search...',
  minLength: 0,
  debounceDelay: 300,
  searchDescriptions: false,
  customFilter: undefined,
  caseSensitive: false,
  highlightMatches: false,
};

export const DEFAULT_SMART_SELECT_ANNOUNCEMENTS: Required<BSmartSelectAnnouncementTemplates> = {
  itemSelected: 'Selected {label}',
  itemDeselected: 'Deselected {label}',
  multipleSelectionCount: '{count} items selected',
  optionCount: '{count} options available',
  noOptions: 'No options available',
  searchResults: '{count} options found for "{term}"',
  loadingOptions: 'Loading options...',
  loadingError: 'Error loading options',
  clearAll: 'All selections cleared',
  validationError: 'Error: {message}',
  dropdownOpened: 'Options list opened',
  dropdownClosed: 'Options list closed',
};

/**
 * Smart select interaction patterns
 */
export const SMART_SELECT_INTERACTION_PATTERNS = {
  /** Single select combobox pattern */
  SINGLE_SELECT: 'single-select',
  /** Multi-select combobox pattern */
  MULTI_SELECT: 'multi-select',
  /** Autocomplete pattern */
  AUTOCOMPLETE: 'autocomplete',
  /** Search combobox pattern */
  SEARCH: 'search',
  /** Tag input pattern */
  TAG_INPUT: 'tag-input',
} as const;

/**
 * Keyboard navigation key mappings
 */
export const SMART_SELECT_KEY_MAPPINGS: Record<string, {
  action: string;
  description: string;
}> = {
  ArrowDown: { action: 'next', description: 'Move to next option' },
  ArrowUp: { action: 'previous', description: 'Move to previous option' },
  Home: { action: 'first', description: 'Move to first option' },
  End: { action: 'last', description: 'Move to last option' },
  PageDown: { action: 'pageNext', description: 'Move down by page' },
  PageUp: { action: 'pagePrevious', description: 'Move up by page' },
  Enter: { action: 'select', description: 'Select current option' },
  Space: { action: 'select', description: 'Select current option' },
  Escape: { action: 'close', description: 'Close dropdown' },
  Backspace: { action: 'removeLastSelected', description: 'Remove last selected item' },
  Delete: { action: 'removeSelected', description: 'Remove focused selected item' },
};

/**
 * Export all types for easy importing
 */
export type {
  BSmartSelectAccessibilityProps as AccessibilityProps,
  BSmartSelectProps as Props,
  BSmartSelectState as State,
  BSmartSelectAriaAttributes as AriaAttributes,
  BSmartSelectOptionAriaAttributes as OptionAriaAttributes,
  BSmartSelectKeyboardConfig as KeyboardConfig,
  BSmartSelectSearchConfig as SearchConfig,
  BSmartSelectItem as Item,
  BSmartSelectInternalItem as InternalItem,
  BSmartSelectLoadingState as LoadingState,
  BSmartSelectExpandedExtra as ExpandedExtra,
  BSmartSelectEmits as Emits,
  BSmartSelectValidationResult as ValidationResult,
  BSmartSelectAnnouncementTemplates as AnnouncementTemplates,
  BSmartSelectThemeConfig as ThemeConfig,
  BSmartSelectAccessibilityHelpers as AccessibilityHelpers,
};
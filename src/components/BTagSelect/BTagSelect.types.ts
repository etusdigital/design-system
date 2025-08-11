/**
 * BTagSelect accessibility props interface
 * Implements WCAG 2.1 AA standards for tag selection components
 */
export interface BTagSelectAccessibilityProps {
  /** ARIA label for the tag select container */
  ariaLabel?: string;
  /** ID of element that labels this tag select */
  ariaLabelledBy?: string;
  /** ID of element that describes this tag select */
  ariaDescribedBy?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Whether to announce tag changes to screen readers */
  announceChanges?: boolean;
  /** Custom announcement template for tag changes */
  announcementTemplate?: string;
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
  /** Whether to show tag count information */
  showTagCount?: boolean;
  /** Whether to provide detailed selection status */
  announceSelectionStatus?: boolean;
  /** Live region politeness level for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Role override for the tag select container */
  role?: 'combobox' | 'listbox' | 'group';
  /** Whether tag select supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to wrap navigation between options */
  wrapNavigation?: boolean;
  /** Whether to enable type-ahead search */
  typeAheadSearch?: boolean;
  /** Whether to enable multi-selection mode */
  multiSelection?: boolean;
}

/**
 * Tag selection item types
 */
export type BTagSelectItem = string | Record<string, unknown>;

/**
 * Tag select model value type
 */
export type BTagSelectModelValue = BTagSelectItem[];

/**
 * Tag select size variants
 */
export type BTagSelectSize = 'small' | 'medium' | 'large';

/**
 * Tag select state interface for accessibility
 */
export interface BTagSelectState {
  /** Currently selected tags count */
  selectedCount: number;
  /** Available items count */
  availableCount: number;
  /** Whether dropdown is expanded */
  isExpanded: boolean;
  /** Whether component has focus */
  hasFocus: boolean;
  /** Currently focused option index */
  focusedOptionIndex: number;
  /** Currently focused tag index (-1 for input) */
  focusedTagIndex: number;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Current search/filter text */
  searchValue: string;
  /** Whether component has error */
  hasError: boolean;
  /** Current error message */
  errorMessage: string;
  /** Whether component is disabled */
  isDisabled: boolean;
  /** Whether field is required */
  isRequired: boolean;
  /** Filtered items based on search */
  filteredItems: BTagSelectItem[];
}

/**
 * Tag select ARIA attributes interface
 */
export interface BTagSelectAriaAttributes {
  /** ARIA role */
  role: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelled by relationships */
  'aria-labelledby'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** ARIA invalid state */
  'aria-invalid'?: boolean;
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** ARIA required state */
  'aria-required'?: boolean;
  /** ARIA expanded for combobox pattern */
  'aria-expanded'?: boolean;
  /** ARIA controls for associated listbox */
  'aria-controls'?: string;
  /** ARIA autocomplete behavior */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  /** ARIA multiselectable for listbox */
  'aria-multiselectable'?: boolean;
  /** ARIA live region */
  'aria-live'?: 'polite' | 'assertive';
  /** ARIA atomic for live regions */
  'aria-atomic'?: boolean;
}

/**
 * Individual option ARIA attributes interface
 */
export interface BTagSelectOptionAriaAttributes {
  /** ARIA role for the option */
  role: string;
  /** ARIA selected state */
  'aria-selected'?: boolean;
  /** ARIA label for the option */
  'aria-label'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** Position in set */
  'aria-posinset'?: number;
  /** Set size */
  'aria-setsize'?: number;
  /** Tab index for keyboard navigation */
  tabindex?: number;
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
}

/**
 * Selected tag ARIA attributes interface
 */
export interface BTagSelectTagAriaAttributes {
  /** ARIA role for the selected tag */
  role: string;
  /** ARIA label for the tag */
  'aria-label'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** Position in set */
  'aria-posinset'?: number;
  /** Set size */
  'aria-setsize'?: number;
  /** Tab index for keyboard navigation */
  tabindex?: number;
  /** ARIA roledescription for custom roles */
  'aria-roledescription'?: string;
}

/**
 * Tag select keyboard configuration
 */
export interface BTagSelectKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for opening/closing dropdown */
  toggleKeys?: string[];
  /** Keys for selecting options */
  selectionKeys?: string[];
  /** Keys for removing tags */
  removeKeys?: string[];
  /** Keys for navigating between options */
  navigationKeys?: string[];
  /** Keys for navigating between tags */
  tagNavigationKeys?: string[];
  /** Keys for canceling actions */
  cancelKeys?: string[];
  /** Whether to enable Home/End navigation */
  homeEndNavigation?: boolean;
  /** Whether to wrap navigation at boundaries */
  wrapNavigation?: boolean;
  /** Whether to support multi-selection */
  multiSelection?: boolean;
  /** Whether to enable search functionality */
  searchEnabled?: boolean;
}

/**
 * Tag select search configuration
 */
export interface BTagSelectSearchConfig {
  /** Whether search is enabled */
  enabled?: boolean;
  /** Minimum characters to trigger search */
  minCharacters?: number;
  /** Search debounce delay in milliseconds */
  debounceDelay?: number;
  /** Whether search is case sensitive */
  caseSensitive?: boolean;
  /** Whether to search in item descriptions */
  searchDescriptions?: boolean;
  /** Custom search function */
  searchFunction?: (items: BTagSelectItem[], query: string) => BTagSelectItem[];
  /** Whether to highlight matches */
  highlightMatches?: boolean;
}

/**
 * Extended container source type
 */
export type BSelectExpandedExtra = {
  source: 'click' | 'keyboard' | 'value-selected' | 'search' | 'focus';
};

/**
 * Complete BTagSelect props interface
 */
export interface BTagSelectProps extends BTagSelectAccessibilityProps {
  /** Array of currently selected tags */
  modelValue?: BTagSelectModelValue;
  /** Array of available tag items */
  items?: BTagSelectItem[];
  /** Label text to display */
  labelValue?: string;
  /** Icon to display */
  icon?: string;
  /** Whether the dropdown is expanded */
  expanded?: boolean;
  /** Key to use for item labels */
  labelKey?: string;
  /** Key to use for item values */
  valueKey?: string;
  /** Error message to display */
  errorMessage?: string;
  /** Info message to display */
  infoMessage?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is required */
  required?: boolean;
  /** Whether the component is in error state */
  isError?: boolean;
  /** Whether to use absolute positioning */
  absolute?: boolean;
  /** Text for the add button */
  buttonText?: string;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BTagSelectKeyboardConfig;
  /** Search configuration */
  searchConfig?: BTagSelectSearchConfig;
  /** Size variant */
  size?: BTagSelectSize;
  /** Maximum number of selected tags */
  maxTags?: number;
  /** Whether to allow duplicate selections */
  allowDuplicates?: boolean;
  /** Whether to show selected count */
  showSelectedCount?: boolean;
  /** Custom placeholder text for search */
  searchPlaceholder?: string;
  /** Whether to auto-focus on mount */
  autoFocus?: boolean;
  /** Custom tag renderer */
  tagRenderer?: (tag: BTagSelectItem, index: number) => string;
  /** Custom option renderer */
  optionRenderer?: (option: BTagSelectItem, index: number) => string;
}

/**
 * BTagSelect emits interface
 */
export interface BTagSelectEmits {
  /** Model value updated */
  'update:modelValue': [value: BTagSelectModelValue];
  /** Items array updated */
  'update:items': [value: BTagSelectItem[]];
  /** Expanded state updated */
  'update:expanded': [value: boolean, extra: BSelectExpandedExtra];
  /** Tag selected */
  'tag-selected': [tag: BTagSelectItem, index: number];
  /** Tag removed */
  'tag-removed': [tag: BTagSelectItem, index: number];
  /** Tag focused */
  'tag-focus': [tag: BTagSelectItem, index: number];
  /** Tag blurred */
  'tag-blur': [tag: BTagSelectItem, index: number];
  /** Option focused */
  'option-focus': [option: BTagSelectItem, index: number];
  /** Option blurred */
  'option-blur': [option: BTagSelectItem, index: number];
  /** Search value changed */
  'search': [query: string, filteredItems: BTagSelectItem[]];
  /** Dropdown opened */
  'dropdown-open': [event: Event];
  /** Dropdown closed */
  'dropdown-close': [event: Event];
  /** Keyboard event */
  'keyboard': [event: KeyboardEvent, action: string];
  /** Validation error */
  'validation-error': [error: string];
  /** Maximum tags reached */
  'max-reached': [currentCount: number, maxCount: number];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
}

/**
 * Tag select validation result
 */
export interface BTagSelectValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Selected tags count */
  selectedCount?: number;
}

/**
 * Tag select announcement templates
 */
export interface BTagSelectAnnouncementTemplates {
  /** Template for tag selection announcement */
  tagSelected: string;
  /** Template for tag removal announcement */
  tagRemoved: string;
  /** Template for tag focus announcement */
  tagFocused: string;
  /** Template for option focus announcement */
  optionFocused: string;
  /** Template for selection count announcement */
  selectionCount: string;
  /** Template for search result announcement */
  searchResults: string;
  /** Template for dropdown open announcement */
  dropdownOpen: string;
  /** Template for dropdown close announcement */
  dropdownClose: string;
  /** Template for navigation instructions */
  navigationHelp: string;
  /** Template for validation error announcement */
  validationError: string;
  /** Template for maximum limit reached */
  maxReached: string;
}

/**
 * Tag select option data interface
 */
export interface BTagSelectOptionData {
  /** Display label */
  label: string;
  /** Actual value */
  value: unknown;
  /** Optional description */
  description?: string;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Whether option is selected */
  selected?: boolean;
  /** Custom data */
  data?: any;
  /** ARIA attributes for this option */
  ariaAttributes?: BTagSelectOptionAriaAttributes;
}

/**
 * Default configurations
 */
export const DEFAULT_TAG_SELECT_KEYBOARD_CONFIG: Required<BTagSelectKeyboardConfig> = {
  enabled: true,
  toggleKeys: ['Enter', ' ', 'ArrowDown', 'ArrowUp'],
  selectionKeys: ['Enter', ' '],
  removeKeys: ['Backspace', 'Delete'],
  navigationKeys: ['ArrowDown', 'ArrowUp'],
  tagNavigationKeys: ['ArrowLeft', 'ArrowRight'],
  cancelKeys: ['Escape'],
  homeEndNavigation: true,
  wrapNavigation: true,
  multiSelection: true,
  searchEnabled: true,
};

export const DEFAULT_TAG_SELECT_ACCESSIBILITY_CONFIG: Required<BTagSelectAccessibilityProps> = {
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  ariaDescription: '',
  announceChanges: true,
  announcementTemplate: '{action} {tag}. {count} tags selected',
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Type to search, use arrow keys to navigate options, Enter to select, Backspace to remove tags',
  showTagCount: true,
  announceSelectionStatus: true,
  liveRegionPoliteness: 'polite',
  role: 'combobox',
  keyboardNavigation: true,
  wrapNavigation: true,
  typeAheadSearch: true,
  multiSelection: true,
};

export const DEFAULT_TAG_SELECT_SEARCH_CONFIG: Required<BTagSelectSearchConfig> = {
  enabled: true,
  minCharacters: 0,
  debounceDelay: 300,
  caseSensitive: false,
  searchDescriptions: false,
  searchFunction: undefined,
  highlightMatches: true,
};

export const DEFAULT_TAG_SELECT_ANNOUNCEMENTS: Required<BTagSelectAnnouncementTemplates> = {
  tagSelected: 'Selected {tag}. {count} tags selected',
  tagRemoved: 'Removed {tag}. {count} tags remaining',
  tagFocused: 'Tag {position} of {total}: {tag}',
  optionFocused: 'Option {position} of {total}: {option}',
  selectionCount: '{count} tag{plural} selected',
  searchResults: '{count} option{plural} found for "{query}"',
  dropdownOpen: 'Dropdown opened. {count} options available',
  dropdownClose: 'Dropdown closed. {count} tags selected',
  navigationHelp: 'Use arrow keys to navigate, Enter to select, Backspace to remove tags',
  validationError: 'Invalid selection: {error}',
  maxReached: 'Maximum {maxCount} tags allowed. Cannot select more tags',
};

/**
 * Export all types for easy importing
 */
export type {
  BTagSelectAccessibilityProps as AccessibilityProps,
  BTagSelectProps as Props,
  BTagSelectState as State,
  BTagSelectAriaAttributes as AriaAttributes,
  BTagSelectOptionAriaAttributes as OptionAriaAttributes,
  BTagSelectTagAriaAttributes as TagAriaAttributes,
  BTagSelectKeyboardConfig as KeyboardConfig,
  BTagSelectSearchConfig as SearchConfig,
  BTagSelectEmits as Emits,
  BTagSelectValidationResult as ValidationResult,
  BTagSelectAnnouncementTemplates as AnnouncementTemplates,
  BTagSelectOptionData as OptionData,
};
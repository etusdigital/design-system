/**
 * WCAG 2.1 AA Accessibility Types for BSelect Component
 * 
 * Comprehensive TypeScript interfaces for select accessibility configuration,
 * supporting screen readers, keyboard navigation, combobox/listbox patterns,
 * and ARIA standards.
 */

export interface BSelectAccessibilityProps {
  /** Accessible label for the select component */
  ariaLabel?: string;
  
  /** ID for the select element */
  id?: string;
  
  /** Describes the select purpose for screen readers */
  ariaDescription?: string;
  
  /** Indicates if the select is required */
  ariaRequired?: boolean;
  
  /** Indicates if the select is invalid */
  ariaInvalid?: boolean;
  
  /** ID of element that describes the select */
  ariaDescribedBy?: string;
  
  /** ID of element that labels the select */
  ariaLabelledBy?: string;
  
  /** Whether to announce selection changes to screen readers */
  announceSelectionChanges?: boolean;
  
  /** Template for selection announcements (e.g., "Selected {item}, {position} of {total}") */
  selectionAnnouncementTemplate?: string;
  
  /** Template for option focus announcements */
  focusAnnouncementTemplate?: string;
  
  /** Template for opening dropdown announcements */
  openAnnouncementTemplate?: string;
  
  /** Template for closing dropdown announcements */
  closeAnnouncementTemplate?: string;
  
  /** Additional ARIA attributes for the combobox element */
  comboboxAriaAttrs?: Record<string, string>;
  
  /** Additional ARIA attributes for the listbox element */
  listboxAriaAttrs?: Record<string, string>;
}

export interface BSelectKeyboardNavigation {
  /** Whether to enable arrow key navigation between options */
  enableArrowKeys?: boolean;
  
  /** Whether to enable Home/End key navigation to first/last options */
  enableHomeEndKeys?: boolean;
  
  /** Whether to enable Page Up/Page Down key navigation */
  enablePageUpDownKeys?: boolean;
  
  /** Whether to enable type-ahead search */
  enableTypeAhead?: boolean;
  
  /** Delay in ms for type-ahead search reset */
  typeAheadDelay?: number;
  
  /** Whether to wrap navigation at the beginning/end of options */
  wrapNavigation?: boolean;
  
  /** Whether to close dropdown on Escape key */
  closeOnEscape?: boolean;
  
  /** Whether to open dropdown on Enter/Space when closed */
  openOnEnterSpace?: boolean;
  
  /** Custom keyboard event handlers */
  customKeyHandlers?: Record<string, (event: KeyboardEvent) => boolean>;
}

export interface BSelectScreenReaderConfig {
  /** Whether to use live regions for announcements */
  useLiveRegions?: boolean;
  
  /** Politeness level for selection announcements */
  selectionPoliteness?: 'polite' | 'assertive';
  
  /** Politeness level for focus announcements */
  focusPoliteness?: 'polite' | 'assertive';
  
  /** Whether to announce when dropdown opens/closes */
  announceDropdownState?: boolean;
  
  /** Whether to announce the number of available options */
  announceOptionCount?: boolean;
  
  /** Whether to announce filtered results when searching */
  announceFilteredResults?: boolean;
  
  /** Custom announcement templates */
  customAnnouncements?: {
    selection?: ((item: string, position: number, total: number) => string) | string;
    focus?: ((item: string, position: number, total: number) => string) | string;
    opened?: ((optionCount: number) => string) | string;
    closed?: ((selectedItem?: string) => string) | string;
    filtered?: ((resultCount: number, searchTerm: string) => string) | string;
    noResults?: ((searchTerm: string) => string) | string;
  };
}

export interface BSelectFocusManagement {
  /** Whether to trap focus within dropdown when open */
  trapFocus?: boolean;
  
  /** Whether to restore focus to trigger element when closing */
  restoreFocus?: boolean;
  
  /** Whether to focus the first option when opening dropdown */
  focusFirstOption?: boolean;
  
  /** Whether to focus the selected option when opening dropdown */
  focusSelectedOption?: boolean;
  
  /** CSS selector for focusable elements within options */
  focusableSelector?: string;
  
  /** Whether to show focus indicators */
  showFocusIndicators?: boolean;
  
  /** Custom focus management handlers */
  customFocusHandlers?: {
    onOpen?: (selectElement: HTMLElement) => void;
    onClose?: (selectElement: HTMLElement) => void;
    onOptionFocus?: (optionElement: HTMLElement, optionData: any) => void;
  };
}

export interface BSelectTypeAheadConfig {
  /** Whether type-ahead search is enabled */
  enabled?: boolean;
  
  /** Minimum characters needed to trigger type-ahead */
  minCharacters?: number;
  
  /** Delay in ms before resetting type-ahead buffer */
  resetDelay?: number;
  
  /** Whether type-ahead should be case sensitive */
  caseSensitive?: boolean;
  
  /** Whether type-ahead should match from start of option text only */
  matchFromStart?: boolean;
  
  /** Custom type-ahead matcher function */
  customMatcher?: (searchTerm: string, optionText: string) => boolean;
  
  /** Whether to announce type-ahead matches */
  announceMatches?: boolean;
}

export interface BSelectOptionGrouping {
  /** Whether the select supports option groups */
  supportsGroups?: boolean;
  
  /** Key to use for group labels in option data */
  groupLabelKey?: string;
  
  /** Whether group headers are focusable */
  focusableGroupHeaders?: boolean;
  
  /** Custom group announcement template */
  groupAnnouncementTemplate?: string;
  
  /** Additional ARIA attributes for group elements */
  groupAriaAttrs?: Record<string, string>;
}

export interface BSelectMultiSelectConfig {
  /** Whether multi-select is enabled */
  enabled?: boolean;
  
  /** How to display selected items (tags, count, list) */
  displayMode?: 'tags' | 'count' | 'list';
  
  /** Maximum number of items that can be selected */
  maxSelections?: number;
  
  /** Template for multiple selection announcements */
  multiSelectionTemplate?: string;
  
  /** Whether to close dropdown after each selection */
  closeOnSelection?: boolean;
  
  /** Keyboard shortcut for selecting all (Ctrl+A) */
  enableSelectAll?: boolean;
}

export interface BSelectValidation {
  /** Whether the select is required */
  required?: boolean;
  
  /** Custom validation function */
  validator?: (value: any) => boolean | string;
  
  /** Error message for validation failures */
  errorMessage?: string;
  
  /** Whether to show validation errors immediately */
  immediateValidation?: boolean;
  
  /** Whether to announce validation errors */
  announceErrors?: boolean;
}

export interface BSelectLoadingState {
  /** Whether options are being loaded */
  loading?: boolean;
  
  /** Loading message for screen readers */
  loadingMessage?: string;
  
  /** Whether to disable interaction while loading */
  disableWhileLoading?: boolean;
  
  /** Whether to show loading indicator */
  showLoadingIndicator?: boolean;
}

export interface BSelectEmits {
  /** Emitted when the selected value changes */
  'update:modelValue': [value: any, extra: { index: number }];
  
  /** Emitted when the dropdown expanded state changes */
  'update:expanded': [value: boolean, extra: { source: string }];
  
  /** Emitted when an option receives focus */
  'option-focus': [option: any, index: number];
  
  /** Emitted when an option loses focus */
  'option-blur': [option: any, index: number];
  
  /** Emitted when search text changes (searchable select) */
  'search': [searchTerm: string, filteredOptions: any[]];
  
  /** Emitted for keyboard navigation events */
  'keyboard-navigation': [event: KeyboardEvent, action: string];
  
  /** Emitted when dropdown opens */
  'opened': [optionCount: number];
  
  /** Emitted when dropdown closes */
  'closed': [selectedValue?: any];
  
  /** Emitted for validation events */
  'validation': [isValid: boolean, error?: string];
}

export interface BSelectSlots {
  /** Default slot content shown when no option is selected */
  default?: () => any;
  
  /** Custom search input content */
  'search-input'?: (props: { searchTerm: string; onInput: (value: string) => void }) => any;
  
  /** Custom search placeholder content */
  'search-placeholder'?: () => any;
  
  /** Custom option content */
  'option'?: (props: { item: any; index: number; selected: boolean; focused: boolean }) => any;
  
  /** Custom option group header content */
  'option-group'?: (props: { group: string; options: any[] }) => any;
  
  /** Custom selected value display content */
  'selection'?: (props: { item: any; index: number }) => any;
  
  /** Custom loading indicator content */
  'loading'?: () => any;
  
  /** Custom no options content */
  'no-options'?: () => any;
  
  /** Custom dropdown actions content */
  'actions'?: (props: { close: () => void }) => any;
}

export interface BSelectExpose {
  /** Focus the select trigger element */
  focus: () => void;
  
  /** Blur the select trigger element */
  blur: () => void;
  
  /** Open the dropdown */
  open: () => void;
  
  /** Close the dropdown */
  close: () => void;
  
  /** Select an option by index */
  selectOption: (index: number) => void;
  
  /** Focus an option by index */
  focusOption: (index: number) => void;
  
  /** Clear the current selection */
  clearSelection: () => void;
  
  /** Trigger validation */
  validate: () => boolean;
  
  /** Announce a custom message to screen readers */
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
  
  /** Get the current accessibility state */
  getAccessibilityState: () => {
    isOpen: boolean;
    selectedIndex: number;
    selectedValue: any;
    optionCount: number;
    focusedIndex: number;
    searchTerm: string;
  };
}

export interface BSelectAccessibilityConfig {
  /** Basic accessibility properties */
  props?: BSelectAccessibilityProps;
  
  /** Keyboard navigation configuration */
  keyboard?: BSelectKeyboardNavigation;
  
  /** Screen reader configuration */
  screenReader?: BSelectScreenReaderConfig;
  
  /** Focus management configuration */
  focus?: BSelectFocusManagement;
  
  /** Type-ahead search configuration */
  typeAhead?: BSelectTypeAheadConfig;
  
  /** Option grouping configuration */
  grouping?: BSelectOptionGrouping;
  
  /** Multi-select configuration */
  multiSelect?: BSelectMultiSelectConfig;
  
  /** Validation configuration */
  validation?: BSelectValidation;
  
  /** Loading state configuration */
  loading?: BSelectLoadingState;
}

export type { BSelectAccessibilityConfig as default };

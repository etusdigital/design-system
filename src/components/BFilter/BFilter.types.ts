/**
 * Filter selection modes
 */
export type BFilterMode = 'single' | 'multi';

/**
 * Filter landmark roles for accessibility
 */
export type BFilterLandmarkRole = 'search' | 'region' | 'group' | 'none';

/**
 * Accessibility properties for BFilter component
 */
export interface BFilterAccessibilityProps {
  /** ARIA label for the filter widget */
  ariaLabel?: string;
  
  /** ARIA description for complex filter functionality */
  ariaDescription?: string;
  
  /** ID of element that describes the filter */
  ariaDescribedBy?: string;
  
  /** ID of element that labels the filter */
  ariaLabelledBy?: string;
  
  /** Filter landmark role for screen reader navigation */
  landmarkRole?: BFilterLandmarkRole;
  
  /** Whether to announce filter changes to screen readers */
  announceChanges?: boolean;
  
  /** Custom announcement template for filter changes */
  changeAnnouncementTemplate?: string;
  
  /** Whether to announce active filter count */
  announceActiveCount?: boolean;
  
  /** Custom announcement for active filter count */
  activeCountAnnouncementTemplate?: string;
  
  /** Whether to announce individual filter selections */
  announceSelections?: boolean;
  
  /** Custom announcement template for selections */
  selectionAnnouncementTemplate?: string;
  
  /** Whether to announce clear filter action */
  announceClear?: boolean;
  
  /** Custom announcement for clear action */
  clearAnnouncementTemplate?: string;
  
  /** Whether to announce apply filter action */
  announceApply?: boolean;
  
  /** Custom announcement for apply action */
  applyAnnouncementTemplate?: string;
  
  /** Instructions for screen reader users */
  instructions?: string;
  
  /** Live region politeness level */
  livePoliteness?: 'polite' | 'assertive';
}

/**
 * Search functionality accessibility properties
 */
export interface BFilterSearchAccessibilityProps {
  /** ARIA label for search input */
  searchAriaLabel?: string;
  
  /** Search combobox role configuration */
  useComboboxRole?: boolean;
  
  /** Whether search has autocomplete */
  searchAutocomplete?: 'none' | 'list' | 'both';
  
  /** Search results announcement */
  searchResultsAnnouncement?: string;
  
  /** No results found announcement */
  noResultsAnnouncement?: string;
  
  /** Search input help text */
  searchHelpText?: string;
}

/**
 * Category accessibility properties
 */
export interface BFilterCategoryAccessibilityProps {
  /** ARIA label for category sections */
  categoryAriaLabel?: string;
  
  /** Whether categories are collapsible */
  categoriesCollapsible?: boolean;
  
  /** Announcement for category expansion */
  categoryExpandAnnouncement?: string;
  
  /** Announcement for category collapse */
  categoryCollapseAnnouncement?: string;
  
  /** ARIA level for category headings */
  categoryHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  
  /** Whether to use group role for categories */
  useCategoryGroups?: boolean;
}

/**
 * Option accessibility properties
 */
export interface BFilterOptionAccessibilityProps {
  /** Selection mode for filter options */
  selectionMode?: BFilterMode;
  
  /** Whether options are checkboxes or radio buttons */
  optionRole?: 'checkbox' | 'radio' | 'option';
  
  /** ARIA label template for options */
  optionAriaLabelTemplate?: string;
  
  /** Whether to show selection state in labels */
  includeStateInLabels?: boolean;
  
  /** Position information for options */
  includePositionInfo?: boolean;
}

/**
 * Keyboard navigation accessibility properties
 */
export interface BFilterKeyboardAccessibilityProps {
  /** Whether to enable keyboard navigation for options */
  enableKeyboardNavigation?: boolean;
  
  /** Whether to use typeahead search */
  enableTypeahead?: boolean;
  
  /** Typeahead timeout in milliseconds */
  typeaheadTimeout?: number;
  
  /** Whether to loop navigation at boundaries */
  keyboardLoop?: boolean;
  
  /** Whether to use horizontal navigation in categories */
  horizontalCategoryNav?: boolean;
  
  /** Custom keyboard shortcuts */
  customKeyboardShortcuts?: Record<string, string>;
}

/**
 * Focus management accessibility properties
 */
export interface BFilterFocusAccessibilityProps {
  /** Whether to trap focus within expanded filter */
  trapFocus?: boolean;
  
  /** Whether to restore focus after filter closes */
  restoreFocus?: boolean;
  
  /** Initial focus target when filter opens */
  initialFocus?: 'trigger' | 'first-option' | 'search';
  
  /** Focus management strategy */
  focusManagement?: 'manual' | 'automatic' | 'hybrid';
  
  /** Whether to show focus indicators */
  showFocusRing?: boolean;
  
  /** Custom focus ring styles */
  customFocusStyles?: Record<string, string>;
}

/**
 * Comprehensive accessibility interface for BFilter
 */
export interface BFilterAccessibility extends 
  BFilterAccessibilityProps,
  BFilterSearchAccessibilityProps,
  BFilterCategoryAccessibilityProps,
  BFilterOptionAccessibilityProps,
  BFilterKeyboardAccessibilityProps,
  BFilterFocusAccessibilityProps {
  /** Whether accessibility features are enabled */
  enableAccessibility?: boolean;
  
  /** High contrast mode support */
  supportHighContrast?: boolean;
  
  /** Reduced motion support */
  respectReducedMotion?: boolean;
  
  /** Large text/zoom support */
  supportLargeText?: boolean;
  
  /** Touch/mobile accessibility */
  enhancedTouchTargets?: boolean;
}

/**
 * Filter item with accessibility information
 */
export interface BFilterItem {
  [key: string]: unknown;
  /** Whether the item is selected */
  selected?: boolean;
  /** Display label for the item */
  label?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** ARIA label override for this item */
  ariaLabel?: string;
  /** Description for this specific item */
  description?: string;
  /** Whether this item is required in selection */
  required?: boolean;
}

/**
 * Filter model value with accessibility metadata
 */
export interface BFilterModelValue {
  [categoryKey: string]: BFilterItem[];
}

/**
 * Enhanced model extra information with accessibility data
 */
export interface BFilterModelExtra {
  /** Newly selected items */
  selected: BFilterItem[];
  /** Newly deselected items */
  deselected: BFilterItem[];
  /** Total selected count */
  totalSelected: number;
  /** Changed categories */
  changedCategories: string[];
  /** Selection mode used */
  selectionMode: BFilterMode;
  /** Whether to announce the change */
  shouldAnnounce?: boolean;
}

/**
 * Filter events with accessibility information
 */
export interface BFilterEvents {
  "update:modelValue": [value: BFilterModelValue, extra: BFilterModelExtra];
  "update:expandedModel": [value: boolean];
  "apply": [selectedItems: BFilterItem[], totalCount: number];
  "clear": [previouslySelected: BFilterItem[]];
  "categoryToggle": [categoryKey: string, expanded: boolean];
  "search": [query: string, categoryKey?: string];
  "focus": [target: 'trigger' | 'search' | 'option', payload?: any];
  "blur": [target: 'trigger' | 'search' | 'option', payload?: any];
}

/**
 * Complete BFilter props interface
 */
export interface BFilterProps extends BFilterAccessibility {
  /** Filter data organized by categories */
  modelValue: BFilterModelValue;
  /** Label for the filter button */
  labelValue?: string;
  /** Icon to display */
  icon?: string;
  /** Whether the filter is expanded */
  expanded?: boolean;
  /** Key to use for item labels */
  labelKey?: string;
  /** Key to use for selection state */
  selectedKey?: string;
  /** Placeholder text for search */
  searchText?: string;
  /** Whether search is enabled */
  searchable?: boolean;
  /** Whether the filter is disabled */
  disabled?: boolean;
  /** Whether to use absolute positioning */
  absolute?: boolean;
  /** Whether to show error state */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Info message to display */
  infoMessage?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether to close on blur */
  closeOnBlur?: boolean;
  /** Whether to hide bottom section */
  hideBottom?: boolean;
  /** Maximum height of dropdown */
  maxHeight?: string;
  /** Minimum width of dropdown */
  minWidth?: string;
  /** Whether to use secondary styling */
  secondary?: boolean;
  /** Whether to hide the dropdown arrow */
  hideArrow?: boolean;
  /** Component ID for accessibility */
  id?: string;
  /** Component name for form handling */
  name?: string;
  /** Debounce delay for search functionality in milliseconds */
  debounceDelay?: number;
}

/**
 * Default accessibility configuration
 */
export const DEFAULT_FILTER_ACCESSIBILITY: Required<BFilterAccessibility> = {
  enableAccessibility: true,
  ariaLabel: '',
  ariaDescription: '',
  ariaDescribedBy: '',
  ariaLabelledBy: '',
  landmarkRole: 'region',
  announceChanges: true,
  changeAnnouncementTemplate: '{count} filter{plural} selected',
  announceActiveCount: true,
  activeCountAnnouncementTemplate: '{count} of {total} filters active',
  announceSelections: true,
  selectionAnnouncementTemplate: '{label} {state}',
  announceClear: true,
  clearAnnouncementTemplate: 'All filters cleared',
  announceApply: true,
  applyAnnouncementTemplate: 'Filters applied, {count} item{plural} selected',
  instructions: 'Use arrow keys to navigate, Space or Enter to select, Escape to close',
  livePoliteness: 'polite',
  searchAriaLabel: 'Search filter options',
  useComboboxRole: true,
  searchAutocomplete: 'list',
  searchResultsAnnouncement: '{count} result{plural} found',
  noResultsAnnouncement: 'No results found',
  searchHelpText: 'Type to filter options',
  categoryAriaLabel: 'Filter category',
  categoriesCollapsible: true,
  categoryExpandAnnouncement: '{category} expanded',
  categoryCollapseAnnouncement: '{category} collapsed',
  categoryHeadingLevel: 3,
  useCategoryGroups: true,
  selectionMode: 'multi',
  optionRole: 'checkbox',
  optionAriaLabelTemplate: '{label}',
  includeStateInLabels: true,
  includePositionInfo: false,
  enableKeyboardNavigation: true,
  enableTypeahead: true,
  typeaheadTimeout: 1000,
  keyboardLoop: true,
  horizontalCategoryNav: false,
  customKeyboardShortcuts: {},
  trapFocus: true,
  restoreFocus: true,
  initialFocus: 'search',
  focusManagement: 'hybrid',
  showFocusRing: true,
  customFocusStyles: {},
  supportHighContrast: true,
  respectReducedMotion: true,
  supportLargeText: true,
  enhancedTouchTargets: true,
};
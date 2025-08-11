import type { BContainerModelExtra } from "../../utils/components/BContainerModelExtra.types";

/**
 * BSelectContainer accessibility props interface
 * Implements WCAG 2.1 AA standards for select container components
 */
export interface BSelectContainerAccessibilityProps {
  /** ARIA label for the select container */
  ariaLabel?: string;
  /** ID of element that labels this select container */
  ariaLabelledBy?: string;
  /** ID of element that describes this select container */
  ariaDescribedBy?: string;
  /** Help text for screen readers */
  helpText?: string;
  /** Whether to announce state changes to screen readers */
  announceChanges?: boolean;
  /** Whether to announce selection changes */
  announceSelections?: boolean;
  /** Custom announcement template for state changes */
  stateAnnouncementTemplate?: string;
  /** Custom announcement template for selections */
  selectionAnnouncementTemplate?: string;
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
  /** Whether to show keyboard instructions */
  showKeyboardInstructions?: boolean;
  /** Live region politeness level */
  liveRegionPoliteness?: 'polite' | 'assertive';
}

/**
 * Select container keyboard navigation configuration
 */
export interface BSelectContainerKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys that open the container */
  openKeys?: string[];
  /** Keys that close the container */
  closeKeys?: string[];
  /** Keys that select items */
  selectKeys?: string[];
  /** Whether to support type-ahead search */
  typeAhead?: boolean;
  /** Debounce time for type-ahead in milliseconds */
  typeAheadDelay?: number;
  /** Whether arrow keys should wrap around */
  wrapNavigation?: boolean;
  /** Whether Home/End keys jump to first/last items */
  homeEndNavigation?: boolean;
}

/**
 * Select container focus management configuration
 */
export interface BSelectContainerFocusConfig {
  /** Whether to trap focus within expanded container */
  trapFocus?: boolean;
  /** Element to focus when container opens */
  initialFocus?: 'first-item' | 'search' | 'container' | 'none';
  /** Whether to restore focus to trigger when closing */
  restoreFocus?: boolean;
  /** Whether to auto-focus on hover (mouse users) */
  autoFocusOnHover?: boolean;
  /** Focus ring customization */
  focusRingStyle?: {
    color?: string;
    width?: string;
    offset?: string;
  };
}

/**
 * Select container item interface for accessibility
 */
export interface BSelectContainerItem {
  /** Unique identifier for the item */
  id: string;
  /** Display value */
  label: string;
  /** Data value */
  value: any;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether item is selected */
  selected?: boolean;
  /** ARIA description for the item */
  ariaDescription?: string;
  /** Help text for the item */
  helpText?: string;
  /** Icon name or component for the item */
  icon?: string;
  /** Category for grouping items */
  category?: string;
  /** Whether this is a separator/divider */
  separator?: boolean;
}

/**
 * Select container state interface
 */
export interface BSelectContainerState {
  /** Whether the container is expanded */
  isExpanded: boolean;
  /** Whether the container is disabled */
  isDisabled: boolean;
  /** Whether the container has focus */
  hasFocus: boolean;
  /** Whether the container is in error state */
  hasError: boolean;
  /** Whether the container is required */
  isRequired: boolean;
  /** Whether the container is loading */
  isLoading: boolean;
  /** Current search query */
  searchQuery?: string;
  /** Currently focused item index */
  focusedItemIndex?: number;
  /** Selected items */
  selectedItems: BSelectContainerItem[];
  /** Total number of items */
  totalItems: number;
  /** Number of filtered items */
  filteredItems: number;
}

/**
 * Select container ARIA attributes interface
 */
export interface BSelectContainerAriaAttributes {
  /** ARIA role for the container */
  role: string;
  /** ARIA expanded state */
  'aria-expanded': boolean;
  /** ARIA haspopup attribute */
  'aria-haspopup': 'listbox' | 'menu' | 'tree' | 'grid' | 'dialog';
  /** ARIA controls relationship */
  'aria-controls'?: string;
  /** ARIA owns relationship */
  'aria-owns'?: string;
  /** ARIA activedescendant for navigation */
  'aria-activedescendant'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** ARIA labelled by relationships */
  'aria-labelledby'?: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA invalid state */
  'aria-invalid'?: boolean;
  /** ARIA required state */
  'aria-required'?: boolean;
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** ARIA busy state for loading */
  'aria-busy'?: boolean;
  /** ARIA multiselectable for multi-select containers */
  'aria-multiselectable'?: boolean;
}

/**
 * Complete BSelectContainer props interface
 */
export interface BSelectContainerProps extends BSelectContainerAccessibilityProps {
  /** Current model value (expanded state) */
  modelValue?: boolean;
  /** Label text for the container trigger */
  labelValue?: string;
  /** ARIA role override */
  role?: string;
  /** Whether to use absolute positioning */
  absolute?: boolean;
  /** Whether the container is disabled */
  disabled?: boolean;
  /** Whether container is in error state */
  isError?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Info message to display */
  infoMessage?: string;
  /** Whether the container is required */
  required?: boolean;
  /** Whether to close on blur events */
  closeOnBlur?: boolean;
  /** Whether to ignore max height constraints */
  dontHaveMaxHeight?: boolean;
  /** Maximum height for the container content */
  maxHeight?: string;
  /** Minimum width for the container */
  minWidth?: string;
  /** Whether to use secondary styling */
  secondary?: boolean;
  /** Whether to hide the expand/collapse arrow */
  hideArrow?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Items to display in the container */
  items?: BSelectContainerItem[];
  /** Whether container supports multiple selections */
  multiSelect?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Whether search is enabled */
  searchable?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Keyboard navigation configuration */
  keyboardConfig?: BSelectContainerKeyboardConfig;
  /** Focus management configuration */
  focusConfig?: BSelectContainerFocusConfig;
}

/**
 * BSelectContainer emits interface
 */
export interface BSelectContainerEmits {
  /** Model value update */
  'update:modelValue': [value: boolean, extra: BContainerModelExtra];
  /** Container opened event */
  'opened': [state: BSelectContainerState];
  /** Container closed event */
  'closed': [state: BSelectContainerState];
  /** Item selected event */
  'item-selected': [item: BSelectContainerItem, state: BSelectContainerState];
  /** Item deselected event */
  'item-deselected': [item: BSelectContainerItem, state: BSelectContainerState];
  /** Search query changed event */
  'search-changed': [query: string, filteredItems: BSelectContainerItem[]];
  /** Focus change event */
  'focus-changed': [focusedIndex: number, item: BSelectContainerItem | null];
  /** Keyboard event */
  'keyboard': [event: KeyboardEvent, action: string];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
}

/**
 * BSelectContainer validation result
 */
export interface BSelectContainerValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Field name for error reporting */
  fieldName?: string;
}

/**
 * BSelectContainer instance methods
 */
export interface BSelectContainerRef {
  /** Open the container */
  open: () => void;
  /** Close the container */
  close: () => void;
  /** Toggle container state */
  toggle: () => void;
  /** Focus specific item by index */
  focusItem: (index: number) => void;
  /** Focus first item */
  focusFirst: () => void;
  /** Focus last item */
  focusLast: () => void;
  /** Select item by index */
  selectItem: (index: number) => void;
  /** Clear all selections */
  clearSelections: () => void;
  /** Get current state */
  getState: () => BSelectContainerState;
  /** Validate current state */
  validate: () => BSelectContainerValidationResult;
  /** Force update accessibility attributes */
  updateAccessibility: () => void;
}

/**
 * Default configurations
 */
export const DEFAULT_KEYBOARD_CONFIG: Required<BSelectContainerKeyboardConfig> = {
  enabled: true,
  openKeys: ['Enter', ' ', 'ArrowDown', 'ArrowUp'],
  closeKeys: ['Escape'],
  selectKeys: ['Enter', ' '],
  typeAhead: true,
  typeAheadDelay: 500,
  wrapNavigation: true,
  homeEndNavigation: true,
};

export const DEFAULT_FOCUS_CONFIG: Required<BSelectContainerFocusConfig> = {
  trapFocus: true,
  initialFocus: 'first-item',
  restoreFocus: true,
  autoFocusOnHover: false,
  focusRingStyle: {
    color: 'var(--color-primary-interaction-default)',
    width: '2px',
    offset: '2px',
  },
};

export const DEFAULT_ACCESSIBILITY_CONFIG: Required<BSelectContainerAccessibilityProps> = {
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  helpText: '',
  announceChanges: true,
  announceSelections: true,
  stateAnnouncementTemplate: 'Select container {state}. {itemCount} items available.',
  selectionAnnouncementTemplate: '{label} {action}. {selectedCount} items selected.',
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Use arrow keys to navigate, Enter or Space to select, Escape to close.',
  showKeyboardInstructions: false,
  liveRegionPoliteness: 'polite',
};

/**
 * Export all types for easy importing
 */
export type {
  BSelectContainerAccessibilityProps as AccessibilityProps,
  BSelectContainerKeyboardConfig as KeyboardConfig,
  BSelectContainerFocusConfig as FocusConfig,
  BSelectContainerProps as Props,
  BSelectContainerEmits as Emits,
  BSelectContainerItem as Item,
  BSelectContainerState as State,
  BSelectContainerAriaAttributes as AriaAttributes,
  BSelectContainerValidationResult as ValidationResult,
  BSelectContainerRef as ComponentRef,
};
import type { Item } from '../../utils/types/MenuItem';

/**
 * Menu model value type - can be either a string or the full Item object
 */
export type BMenuModelValue = string | Item | undefined;

/**
 * Menu type definitions for different menu patterns
 */
export type BMenuType = 'navigation' | 'context' | 'dropdown' | 'menubar';

/**
 * Menu orientation for keyboard navigation
 */
export type BMenuOrientation = 'vertical' | 'horizontal';

/**
 * Configuration for menu accessibility features
 */
export interface BMenuAccessibilityConfig {
  /** Whether to announce navigation changes to screen readers */
  announceNavigation?: boolean;
  /** Whether to automatically focus the first item when opened */
  autoFocus?: boolean;
  /** Whether to show skip links for better navigation */
  showSkipLinks?: boolean;
  /** Custom announcement prefix for screen readers */
  announcementPrefix?: string;
  /** Whether to announce item position in the menu */
  announcePosition?: boolean;
  /** Whether to announce submenu levels */
  announceLevels?: boolean;
  /** Whether to provide keyboard shortcut hints */
  showKeyboardHints?: boolean;
  /** Whether to enable high contrast mode support */
  highContrastSupport?: boolean;
  /** Whether to respect reduced motion preferences */
  respectReducedMotion?: boolean;
}

/**
 * Configuration for menu keyboard navigation
 */
export interface BMenuKeyboardConfig {
  /** Whether keyboard navigation loops from last to first item */
  loop?: boolean;
  /** Whether to enable type-ahead search */
  enableTypeAhead?: boolean;
  /** Delay in ms for type-ahead search reset */
  typeAheadDelay?: number;
  /** Whether to close menu on selection */
  closeOnSelection?: boolean;
  /** Custom key bindings */
  customKeys?: Record<string, (event: KeyboardEvent, activeIndex: number) => void>;
}

/**
 * Configuration for submenu behavior
 */
export interface BSubmenuConfig {
  /** Delay in ms before opening submenu on hover */
  hoverOpenDelay?: number;
  /** Delay in ms before closing submenu on mouse leave */
  hoverCloseDelay?: number;
  /** Whether to open submenus on click or hover */
  openOnHover?: boolean;
  /** Maximum nesting level for submenus */
  maxNestingLevel?: number;
  /** Whether to show submenu indicators */
  showIndicators?: boolean;
}

/**
 * Menu item with enhanced accessibility properties
 */
export interface BMenuItemAccessible extends Item {
  /** ARIA role for the menu item */
  role?: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'none' | 'separator';
  /** Whether the item has a popup/submenu */
  hasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  /** Whether the item's submenu is expanded */
  expanded?: boolean;
  /** ARIA description for additional context */
  ariaDescription?: string;
  /** Keyboard shortcut for the item */
  shortcut?: string;
  /** Whether the item is checked (for checkable items) */
  checked?: boolean | 'mixed';
  /** Level of nesting for hierarchical menus */
  level?: number;
  /** Position in the current group */
  positionInGroup?: number;
  /** Total items in the current group */
  groupSize?: number;
  /** Custom ARIA attributes */
  ariaAttributes?: Record<string, string | number | boolean>;
}

/**
 * Comprehensive props interface for BMenu component
 */
export interface BMenuProps {
  /** The current selected value */
  modelValue?: BMenuModelValue;
  /** Array of menu items to display */
  items: BMenuItemAccessible[];
  /** Whether to emit the full object or just the value */
  getObject?: boolean;
  
  // Basic Menu Configuration
  /** Type of menu for appropriate ARIA patterns */
  type?: BMenuType;
  /** Orientation for keyboard navigation */
  orientation?: BMenuOrientation;
  /** Whether the menu is disabled */
  disabled?: boolean;
  /** Whether the menu is in loading state */
  loading?: boolean;
  
  // ARIA Labels and Descriptions
  /** Accessible label for the menu */
  ariaLabel?: string;
  /** ID of element that labels this menu */
  ariaLabelledBy?: string;
  /** ID of element that describes this menu */
  ariaDescribedBy?: string;
  /** Additional description for the menu */
  ariaDescription?: string;
  
  // Menu State Management
  /** Whether the menu is open (for dropdown/popup menus) */
  open?: boolean;
  /** Whether the menu supports multiple selection */
  multiSelect?: boolean;
  /** Selected items for multi-select menus */
  selectedItems?: string[];
  
  // Trigger Element Props (for dropdown menus)
  /** ID of the trigger button */
  triggerId?: string;
  /** Whether the trigger has popup */
  triggerHasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  /** Whether the trigger's popup is expanded */
  triggerExpanded?: boolean;
  /** ARIA label for the trigger button */
  triggerAriaLabel?: string;
  
  // Accessibility Configuration
  /** Comprehensive accessibility settings */
  accessibility?: BMenuAccessibilityConfig;
  /** Keyboard navigation configuration */
  keyboard?: BMenuKeyboardConfig;
  /** Submenu behavior configuration */
  submenu?: BSubmenuConfig;
  
  // Focus Management
  /** Whether to trap focus within the menu */
  trapFocus?: boolean;
  /** Element to focus when menu closes */
  returnFocusTo?: HTMLElement | string;
  /** Whether to restore focus on close */
  restoreFocus?: boolean;
  
  // Screen Reader Support
  /** Whether to announce menu opening */
  announceOpen?: boolean;
  /** Whether to announce menu closing */
  announceClose?: boolean;
  /** Whether to announce item selection */
  announceSelection?: boolean;
  /** Custom messages for screen reader announcements */
  screenReaderMessages?: {
    menuOpened?: string;
    menuClosed?: string;
    itemSelected?: string;
    submenuOpened?: string;
    submenuClosed?: string;
    navigationInstructions?: string;
  };
  
  // Visual and Interaction
  /** Whether to show keyboard focus indicators */
  showFocusIndicators?: boolean;
  /** Whether to show selection indicators */
  showSelectionIndicators?: boolean;
  /** Size variant for the menu */
  size?: 'small' | 'medium' | 'large';
  /** Visual variant */
  variant?: 'default' | 'compact' | 'comfortable';
  
  // Advanced Features
  /** Whether to enable search/filter functionality */
  searchable?: boolean;
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  /** Whether to group similar items */
  enableGrouping?: boolean;
  /** Whether to show dividers between groups */
  showGroupDividers?: boolean;
  
  // Performance
  /** Whether to use virtual scrolling for large lists */
  virtual?: boolean;
  /** Number of items to render in virtual mode */
  virtualItemCount?: number;
  /** Height of each virtual item */
  virtualItemHeight?: number;
}

/**
 * Events emitted by the BMenu component
 */
export interface BMenuEmits {
  /** Emitted when model value changes */
  'update:modelValue': [value: BMenuModelValue];
  /** Emitted when selected items change (multi-select) */
  'update:selectedItems': [items: string[]];
  /** Emitted when menu opens */
  'menu:open': [];
  /** Emitted when menu closes */
  'menu:close': [];
  /** Emitted when an item is selected */
  'item:select': [item: BMenuItemAccessible, index: number];
  /** Emitted when an item receives focus */
  'item:focus': [item: BMenuItemAccessible, index: number];
  /** Emitted when a submenu opens */
  'submenu:open': [item: BMenuItemAccessible, level: number];
  /** Emitted when a submenu closes */
  'submenu:close': [item: BMenuItemAccessible, level: number];
  /** Emitted on keyboard navigation */
  'keyboard:navigate': [direction: 'up' | 'down' | 'left' | 'right' | 'home' | 'end'];
  /** Emitted when search query changes */
  'search:change': [query: string];
}

/**
 * Slots available for the BMenu component
 */
export interface BMenuSlots {
  /** Default slot for menu content */
  default?: () => any;
  /** Slot for menu header content */
  header?: () => any;
  /** Slot for menu footer content */
  footer?: () => any;
  /** Slot for custom menu item rendering */
  item?: (props: { item: BMenuItemAccessible; index: number; active: boolean; selected: boolean }) => any;
  /** Slot for submenu indicator */
  submenuIndicator?: (props: { item: BMenuItemAccessible; expanded: boolean }) => any;
  /** Slot for search input */
  search?: (props: { query: string; placeholder: string }) => any;
  /** Slot for loading state */
  loading?: () => any;
  /** Slot for empty state */
  empty?: () => any;
  /** Slot for group headers */
  groupHeader?: (props: { group: string; items: BMenuItemAccessible[] }) => any;
}

/**
 * Menu focus management utilities
 */
export interface BMenuFocusManager {
  /** Focus the first item */
  focusFirst(): void;
  /** Focus the last item */
  focusLast(): void;
  /** Focus a specific item by index */
  focusItem(index: number): void;
  /** Focus the next item */
  focusNext(): void;
  /** Focus the previous item */
  focusPrevious(): void;
  /** Get the currently focused item index */
  getFocusedIndex(): number;
  /** Check if an item is focused */
  isItemFocused(index: number): boolean;
}

/**
 * Menu search functionality
 */
export interface BMenuSearchManager {
  /** Current search query */
  query: string;
  /** Set search query */
  setQuery(query: string): void;
  /** Clear search query */
  clearQuery(): void;
  /** Get filtered items based on search */
  getFilteredItems(): BMenuItemAccessible[];
  /** Check if search is active */
  isSearchActive(): boolean;
}

/**
 * Complete menu instance interface
 */
export interface BMenuInstance extends BMenuFocusManager, BMenuSearchManager {
  /** Open the menu */
  open(): void;
  /** Close the menu */
  close(): void;
  /** Toggle menu open/close state */
  toggle(): void;
  /** Select an item by index */
  selectItem(index: number): void;
  /** Get the current selection */
  getSelection(): BMenuModelValue;
  /** Check if the menu is open */
  isOpen(): boolean;
  /** Get menu accessibility attributes */
  getAccessibilityAttributes(): Record<string, string | number | boolean>;
}
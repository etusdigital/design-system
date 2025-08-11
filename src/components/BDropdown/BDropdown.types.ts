import type { Ref } from 'vue';
import type { Item } from '#utils/types/DropItem';

/**
 * Accessibility configuration for dropdown components
 */
export interface DropdownAccessibilityConfig {
  /** Dropdown pattern type - menu for actions, listbox for selections */
  pattern?: 'menu' | 'listbox';
  /** ARIA label for the dropdown trigger */
  label?: string;
  /** ARIA description for the dropdown */
  description?: string;
  /** Whether to announce selection changes */
  announceChanges?: boolean;
  /** Custom screen reader messages */
  messages?: DropdownAccessibilityMessages;
}

/**
 * Screen reader messages for dropdown interactions
 */
export interface DropdownAccessibilityMessages {
  /** Message when dropdown opens */
  opened?: string;
  /** Message when dropdown closes */
  closed?: string;
  /** Message when item is selected */
  selected?: string;
  /** Message for item count */
  itemCount?: string;
  /** Message for filtered results */
  filteredCount?: string;
  /** Message for submenu expansion */
  submenuExpanded?: string;
  /** Message for submenu collapse */
  submenuCollapsed?: string;
  /** Message for loading state */
  loading?: string;
  /** Message for no results */
  noResults?: string;
}

/**
 * Enhanced dropdown item type with accessibility features
 */
export interface AccessibleDropdownItem extends Item {
  /** ARIA description for the item */
  ariaDescription?: string;
  /** Whether the item is focusable via keyboard */
  focusable?: boolean;
  /** Keyboard shortcut key */
  shortcut?: string;
  /** Whether item has loading state */
  loading?: boolean;
}

/**
 * Keyboard navigation state for dropdown
 */
export interface DropdownNavigationState {
  /** Currently focused item index */
  activeIndex: Ref<number>;
  /** Whether keyboard navigation is active */
  isNavigating: Ref<boolean>;
  /** Total number of navigable items */
  itemCount: Ref<number>;
  /** Whether focus is trapped within dropdown */
  focusTrapped: Ref<boolean>;
}

/**
 * Focus management configuration
 */
export interface DropdownFocusConfig {
  /** Whether to trap focus within dropdown when opened */
  trapFocus?: boolean;
  /** Whether to restore focus to trigger when closed */
  restoreFocus?: boolean;
  /** Custom focus target selector */
  focusTarget?: string;
  /** Whether to focus first item on open */
  focusFirstOnOpen?: boolean;
}

/**
 * WCAG compliance levels
 */
export type WCAGLevel = 'A' | 'AA' | 'AAA';

/**
 * Complete accessibility props interface for BDropdown
 */
export interface BDropdownAccessibilityProps {
  /** Accessibility configuration */
  accessibility?: DropdownAccessibilityConfig;
  /** Focus management configuration */
  focus?: DropdownFocusConfig;
  /** WCAG compliance level to target */
  wcagLevel?: WCAGLevel;
}
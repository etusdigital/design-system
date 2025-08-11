
/**
 * Configuration for the menu trigger button
 */
export interface RoundMenuTrigger {
  /** Icon to display on the trigger button */
  icon?: string;
  /** Background color for the trigger button */
  background?: string;
  /** Custom ARIA label for the trigger button */
  ariaLabel?: string;
}

/**
 * Base interface for radial navigation items
 */
export interface RadialNavigationItem {
  id: string;
  label: string;
  position?: number; // 0-based index for circular position
  disabled?: boolean;
}

/**
 * Round menu item interface with comprehensive accessibility support
 */
export interface RoundMenuItem extends RadialNavigationItem {
  /** Icon to display on the menu item */
  icon?: string;
  /** Text to display on the menu item */
  text?: string;
  /** Background color for the menu item */
  background?: string;
  /** Action to execute when item is selected */
  action: () => Promise<void> | void;
  /** Custom ARIA label for detailed accessibility description */
  ariaLabel?: string;
  /** Whether this item is in a loading state */
  loading?: boolean;
}

/**
 * Props interface for the BRoundMenu component
 */
export interface RoundMenuProps {
  /** Array of menu items to display */
  items: RoundMenuItem[];
  /** Label for the menu trigger button */
  triggerLabel?: string;
  /** ARIA label for the entire menu */
  menuLabel?: string;
  /** Optional description of the menu for screen readers */
  menuDescription?: string;
  /** Loading state for the menu */
  loading?: boolean;
  /** Disabled state for the menu */
  disabled?: boolean;
  /** Custom trigger button configuration */
  trigger?: RoundMenuTrigger;
}

/**
 * Keyboard navigation keys supported by the radial menu
 */
export type RadialMenuKey = 
  | 'ArrowRight' 
  | 'ArrowLeft' 
  | 'ArrowUp' 
  | 'ArrowDown'
  | 'Home'
  | 'End'
  | 'Enter'
  | ' '  // Space
  | 'Escape';

/**
 * Clock position for screen reader announcements
 */
export type ClockPosition = 
  | '12 o\'clock'
  | '1 o\'clock'
  | '2 o\'clock'
  | '3 o\'clock'
  | '4 o\'clock'
  | '5 o\'clock'
  | '6 o\'clock'
  | '7 o\'clock'
  | '8 o\'clock'
  | '9 o\'clock'
  | '10 o\'clock'
  | '11 o\'clock';

/**
 * Menu state for accessibility management
 */
export interface MenuState {
  /** Whether the menu is currently expanded */
  isExpanded: boolean;
  /** Index of the currently active item */
  activeIndex: number;
  /** Whether keyboard navigation is active */
  isNavigating: boolean;
  /** Set of item IDs that are currently loading */
  loadingItems: Set<string>;
}

/**
 * Accessibility configuration options
 */
export interface AccessibilityOptions {
  /** Whether to announce position changes */
  announcePositions?: boolean;
  /** Whether to use clock position announcements */
  useClockPositions?: boolean;
  /** Whether to provide verbose descriptions */
  verboseDescriptions?: boolean;
  /** Custom announcement format */
  announcementFormat?: 'standard' | 'verbose' | 'minimal';
}

/**
 * Screen reader announcement messages
 */
export interface AnnouncementMessages {
  /** Message when menu opens */
  menuOpened: string;
  /** Message when menu closes */
  menuClosed: string;
  /** Message template for item selection */
  itemSelected: string;
  /** Message template for item position */
  itemPosition: string;
  /** Message for loading states */
  itemLoading: string;
  /** Message for completed actions */
  actionCompleted: string;
  /** Message for errors */
  actionError: string;
}
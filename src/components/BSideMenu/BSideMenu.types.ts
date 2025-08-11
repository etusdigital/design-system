/**
 * BSideMenu accessibility props interface
 * Implements WCAG 2.1 AA standards for side menu components
 */
export interface BSideMenuAccessibilityProps {
  /** ARIA label for the navigation menu */
  ariaLabel?: string;
  /** Whether to announce navigation changes to screen readers */
  announceNavigation?: boolean;
  /** Whether to announce level changes in nested menus */
  announceLevels?: boolean;
  /** Custom announcement prefix for screen readers */
  announcementPrefix?: string;
  /** Whether to auto-focus the first item on mount */
  autoFocus?: boolean;
  /** Whether to show skip links for keyboard navigation */
  showSkipLinks?: boolean;
  /** Custom skip link text */
  skipLinkText?: string;
  /** Whether to announce selection changes */
  announceSelection?: boolean;
  /** Whether to announce expansion/collapse of items */
  announceExpansion?: boolean;
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
  /** Whether side menu supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Whether to use tree navigation patterns */
  useTreeNavigation?: boolean;
  /** Custom landmark role for the navigation */
  landmarkRole?: string;
  /** Whether to announce breadcrumb path for deeply nested items */
  announceBreadcrumbs?: boolean;
  /** Maximum depth for breadcrumb announcements */
  maxBreadcrumbDepth?: number;
}

/**
 * Side menu item interface with accessibility support
 */
export interface BSideMenuItem {
  /** Unique identifier for the item */
  value: string;
  /** Display label for the item */
  label: string;
  /** Optional icon identifier */
  icon?: string;
  /** URL path for navigation */
  path?: string;
  /** Whether the item is currently selected */
  selected?: boolean;
  /** Whether the item is expanded (for items with children) */
  expanded?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Child menu items */
  items?: BSideMenuItem[];
  /** Additional data for the item */
  data?: Record<string, any>;
  /** Custom ARIA label for the item */
  ariaLabel?: string;
  /** Custom ARIA description */
  ariaDescription?: string;
  /** Badge count for the item */
  badgeCount?: number;
  /** Whether item requires authentication */
  requiresAuth?: boolean;
  /** Custom CSS classes */
  customClass?: string;
  /** Keyboard shortcut for the item */
  shortcut?: string;
  /** Whether item should be announced differently */
  customAnnouncement?: string;
  /** Item type for semantic meaning */
  type?: 'default' | 'heading' | 'separator' | 'action';
  /** External link indicator */
  external?: boolean;
  /** Target for external links */
  target?: string;
}

/**
 * Side menu tree node interface for navigation
 */
export interface BSideMenuTreeNode {
  /** Unique node ID */
  id: string;
  /** Node label */
  label: string;
  /** Node value */
  value: string;
  /** Nesting level (0-based) */
  level: number;
  /** Whether node is expanded */
  expanded?: boolean;
  /** Whether node is selected */
  selected?: boolean;
  /** Whether node is disabled */
  disabled?: boolean;
  /** Parent node ID */
  parentId?: string;
  /** Child nodes */
  children?: BSideMenuTreeNode[];
  /** Original menu item data */
  item?: BSideMenuItem;
}

/**
 * Side menu navigation state
 */
export interface BSideMenuState {
  /** Currently focused item ID */
  focusedItemId: string | null;
  /** Currently selected item IDs */
  selectedItemIds: Set<string>;
  /** Currently expanded item IDs */
  expandedItemIds: Set<string>;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Current navigation level */
  currentLevel: number;
  /** Navigation history for breadcrumbs */
  navigationPath: string[];
  /** Whether multi-selection is enabled */
  isMultiSelect: boolean;
  /** Whether menu is collapsed */
  isCollapsed: boolean;
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
  /** Last announced item for preventing duplicate announcements */
  lastAnnouncedItem: string | null;
}

/**
 * Side menu ARIA attributes interface
 */
export interface BSideMenuAriaAttributes {
  /** Navigation role */
  role: 'navigation' | 'tree';
  /** ARIA label for the navigation */
  'aria-label'?: string;
  /** ARIA labelledby for complex labeling */
  'aria-labelledby'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** ARIA orientation for the menu */
  'aria-orientation'?: 'vertical' | 'horizontal';
  /** ARIA multiselectable for multi-select menus */
  'aria-multiselectable'?: boolean;
}

/**
 * Side menu item ARIA attributes interface
 */
export interface BSideMenuItemAriaAttributes {
  /** Item role */
  role: 'treeitem' | 'menuitem' | 'option';
  /** ARIA label for the item */
  'aria-label'?: string;
  /** ARIA labelledby for complex labeling */
  'aria-labelledby'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** ARIA level for nested items */
  'aria-level'?: number;
  /** ARIA expanded for expandable items */
  'aria-expanded'?: boolean;
  /** ARIA selected for selectable items */
  'aria-selected'?: boolean;
  /** ARIA disabled for disabled items */
  'aria-disabled'?: boolean;
  /** ARIA current for current page items */
  'aria-current'?: 'page' | 'step' | 'location' | 'true' | 'false';
  /** ARIA setsize for item count in group */
  'aria-setsize'?: number;
  /** ARIA positionset for position in group */
  'aria-posinset'?: number;
  /** Tab index for keyboard navigation */
  tabindex?: number;
}

/**
 * Side menu keyboard configuration
 */
export interface BSideMenuKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for navigating up/down */
  navigationKeys?: string[];
  /** Keys for expanding/collapsing items */
  expansionKeys?: string[];
  /** Keys for selecting items */
  activationKeys?: string[];
  /** Keys for multi-selection */
  multiSelectKeys?: string[];
  /** Keys for jumping to first/last items */
  boundaryKeys?: string[];
  /** Keys for type-ahead search */
  searchKeys?: string[];
  /** Type-ahead timeout in milliseconds */
  typeAheadTimeout?: number;
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom keyboard shortcuts */
  shortcuts?: Record<string, () => void>;
}

/**
 * Side menu collapse configuration
 */
export interface BSideMenuCollapseConfig {
  /** Whether menu can be collapsed */
  collapsible?: boolean;
  /** Whether menu starts collapsed */
  startCollapsed?: boolean;
  /** Breakpoint for auto-collapse */
  collapseBreakpoint?: number;
  /** Whether to show tooltips when collapsed */
  showTooltipsWhenCollapsed?: boolean;
  /** Whether to remember collapse state */
  rememberCollapseState?: boolean;
  /** Animation duration for collapse/expand */
  animationDuration?: number;
}

/**
 * Complete BSideMenu props interface
 */
export interface BSideMenuProps extends BSideMenuAccessibilityProps {
  /** Current selected value (v-model) */
  modelValue?: string | BSideMenuItem;
  /** Menu items to display */
  items: BSideMenuItem[];
  /** Parent path for nested routing */
  parentPath?: string;
  /** Whether to return object instead of string value */
  getObject?: boolean;
  /** Whether to enable multi-selection */
  multiSelect?: boolean;
  /** Main label for the navigation */
  label?: string;
  /** Whether to auto-expand parent items */
  autoExpand?: boolean;
  /** Whether the menu is collapsible */
  collapsible?: boolean;
  /** Whether the menu starts collapsed */
  collapsed?: boolean;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BSideMenuKeyboardConfig;
  /** Collapse configuration */
  collapseConfig?: BSideMenuCollapseConfig;
  /** Maximum nesting depth */
  maxDepth?: number;
  /** Whether to show item icons */
  showIcons?: boolean;
  /** Whether to show badges */
  showBadges?: boolean;
  /** Custom item renderer */
  itemRenderer?: (item: BSideMenuItem) => any;
  /** Theme variant */
  variant?: 'default' | 'compact' | 'minimal';
  /** Width of the side menu */
  width?: string | number;
  /** Minimum width when collapsed */
  minWidth?: string | number;
}

/**
 * BSideMenu emits interface
 */
export interface BSideMenuEmits {
  /** Model value updated */
  'update:modelValue': [value: string | BSideMenuItem];
  /** Focus changed to different item */
  'focus-change': [nodeId: string | null];
  /** Selection changed */
  'selection-change': [selectedIds: string[]];
  /** Item expansion state changed */
  'expansion-change': [expandedIds: string[]];
  /** Skip navigation requested */
  'skip-navigation': [];
  /** Item clicked */
  'item-click': [item: BSideMenuItem, event: MouseEvent | KeyboardEvent];
  /** Item hover */
  'item-hover': [item: BSideMenuItem | null];
  /** Menu collapsed/expanded */
  'collapse-change': [collapsed: boolean];
  /** Navigation level changed */
  'level-change': [level: number, path: string[]];
  /** Search query changed */
  'search-change': [query: string];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Keyboard shortcut activated */
  'shortcut': [shortcut: string, item: BSideMenuItem];
  /** External link clicked */
  'external-link': [item: BSideMenuItem, event: MouseEvent];
}

/**
 * Side menu validation result
 */
export interface BSideMenuValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Side menu configuration */
  config?: BSideMenuProps;
}

/**
 * Side menu announcement templates
 */
export interface BSideMenuAnnouncementTemplates {
  /** Template for item selection announcement */
  itemSelected: string;
  /** Template for item focus announcement */
  itemFocused: string;
  /** Template for item expansion announcement */
  itemExpanded: string;
  /** Template for item collapse announcement */
  itemCollapsed: string;
  /** Template for level change announcement */
  levelChanged: string;
  /** Template for breadcrumb announcement */
  breadcrumb: string;
  /** Template for search result announcement */
  searchResults: string;
  /** Template for navigation help */
  navigationHelp: string;
  /** Template for multi-selection announcement */
  multiSelection: string;
  /** Template for boundary reached announcement */
  boundaryReached: string;
}

/**
 * Side menu theme configuration
 */
export interface BSideMenuThemeConfig {
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Active item background color */
  activeBackgroundColor?: string;
  /** Active item text color */
  activeTextColor?: string;
  /** Hover background color */
  hoverBackgroundColor?: string;
  /** Border color */
  borderColor?: string;
  /** Focus ring color */
  focusRingColor?: string;
  /** Icon color */
  iconColor?: string;
  /** Badge background color */
  badgeBackgroundColor?: string;
  /** Badge text color */
  badgeTextColor?: string;
}

/**
 * Side menu accessibility helpers
 */
export interface BSideMenuAccessibilityHelpers {
  /** Get ARIA attributes for menu container */
  getMenuAriaAttributes: (state: BSideMenuState, props: BSideMenuProps) => BSideMenuAriaAttributes;
  /** Get ARIA attributes for menu item */
  getItemAriaAttributes: (item: BSideMenuItem, level: number, state: BSideMenuState) => BSideMenuItemAriaAttributes;
  /** Get breadcrumb path for item */
  getBreadcrumbPath: (item: BSideMenuItem, items: BSideMenuItem[]) => string[];
  /** Format breadcrumb for announcement */
  formatBreadcrumbAnnouncement: (path: string[]) => string;
  /** Get item level for accessibility */
  getItemLevel: (item: BSideMenuItem, items: BSideMenuItem[]) => number;
  /** Check if item is focusable */
  isItemFocusable: (item: BSideMenuItem) => boolean;
  /** Announce navigation change */
  announceNavigationChange: (item: BSideMenuItem, type: string) => void;
}

/**
 * Default configurations
 */
export const DEFAULT_SIDE_MENU_KEYBOARD_CONFIG: Required<BSideMenuKeyboardConfig> = {
  enabled: true,
  navigationKeys: ['ArrowUp', 'ArrowDown'],
  expansionKeys: ['ArrowRight', 'ArrowLeft'],
  activationKeys: ['Enter', ' '],
  multiSelectKeys: ['Control+Enter'],
  boundaryKeys: ['Home', 'End'],
  searchKeys: [], // All printable characters
  typeAheadTimeout: 500,
  preventDefault: true,
  stopPropagation: false,
  shortcuts: {},
};

export const DEFAULT_SIDE_MENU_ACCESSIBILITY_CONFIG: Required<BSideMenuAccessibilityProps> = {
  ariaLabel: 'Navigation menu',
  announceNavigation: true,
  announceLevels: true,
  announcementPrefix: 'Navigation menu.',
  autoFocus: false,
  showSkipLinks: true,
  skipLinkText: 'Skip to main content',
  announceSelection: true,
  announceExpansion: true,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Use arrow keys to navigate, Enter to select, Right arrow to expand, Left arrow to collapse',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  useTreeNavigation: true,
  landmarkRole: 'navigation',
  announceBreadcrumbs: false,
  maxBreadcrumbDepth: 3,
};

export const DEFAULT_SIDE_MENU_COLLAPSE_CONFIG: Required<BSideMenuCollapseConfig> = {
  collapsible: false,
  startCollapsed: false,
  collapseBreakpoint: 768,
  showTooltipsWhenCollapsed: true,
  rememberCollapseState: true,
  animationDuration: 300,
};

export const DEFAULT_SIDE_MENU_ANNOUNCEMENTS: Required<BSideMenuAnnouncementTemplates> = {
  itemSelected: '{label} selected',
  itemFocused: 'Focused on {label}',
  itemExpanded: '{label} expanded',
  itemCollapsed: '{label} collapsed',
  levelChanged: 'Navigation level {level}',
  breadcrumb: 'Location: {path}',
  searchResults: '{count} items found',
  navigationHelp: 'Use arrow keys to navigate, Enter to select',
  multiSelection: '{count} items selected',
  boundaryReached: '{boundary} of navigation reached',
};

/**
 * Side menu item type configurations
 */
export const SIDE_MENU_ITEM_TYPE_CONFIG: Record<string, {
  defaultRole: string;
  requiresLabel: boolean;
  allowsChildren: boolean;
  announcement: string;
}> = {
  default: {
    defaultRole: 'treeitem',
    requiresLabel: true,
    allowsChildren: true,
    announcement: 'Navigation item',
  },
  heading: {
    defaultRole: 'presentation',
    requiresLabel: true,
    allowsChildren: false,
    announcement: 'Navigation heading',
  },
  separator: {
    defaultRole: 'separator',
    requiresLabel: false,
    allowsChildren: false,
    announcement: 'Navigation separator',
  },
  action: {
    defaultRole: 'menuitem',
    requiresLabel: true,
    allowsChildren: false,
    announcement: 'Action item',
  },
};

/**
 * Keyboard navigation key mappings
 */
export const SIDE_MENU_KEY_MAPPINGS: Record<string, {
  action: string;
  description: string;
}> = {
  ArrowDown: { action: 'next', description: 'Move to next item' },
  ArrowUp: { action: 'previous', description: 'Move to previous item' },
  ArrowRight: { action: 'expand', description: 'Expand item or move to first child' },
  ArrowLeft: { action: 'collapse', description: 'Collapse item or move to parent' },
  Home: { action: 'first', description: 'Move to first item' },
  End: { action: 'last', description: 'Move to last item' },
  Enter: { action: 'activate', description: 'Activate/select item' },
  Space: { action: 'activate', description: 'Activate/select item' },
  Escape: { action: 'close', description: 'Close expanded items or exit navigation' },
  '*': { action: 'expandAll', description: 'Expand all items at current level' },
};

/**
 * Export all types for easy importing
 */
export type {
  BSideMenuAccessibilityProps as AccessibilityProps,
  BSideMenuProps as Props,
  BSideMenuState as State,
  BSideMenuAriaAttributes as AriaAttributes,
  BSideMenuItemAriaAttributes as ItemAriaAttributes,
  BSideMenuKeyboardConfig as KeyboardConfig,
  BSideMenuCollapseConfig as CollapseConfig,
  BSideMenuItem as MenuItem,
  BSideMenuTreeNode as TreeNode,
  BSideMenuEmits as Emits,
  BSideMenuValidationResult as ValidationResult,
  BSideMenuAnnouncementTemplates as AnnouncementTemplates,
  BSideMenuThemeConfig as ThemeConfig,
  BSideMenuAccessibilityHelpers as AccessibilityHelpers,
};
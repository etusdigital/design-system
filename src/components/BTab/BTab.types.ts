/**
 * BTab accessibility props interface
 * Implements WCAG 2.1 AA standards for tab components
 */
export interface BTabAccessibilityProps {
  /** Accessible label for the tab list */
  ariaLabel?: string;
  /** ID of element that describes the tab list */
  ariaDescribedBy?: string;
  /** Orientation of the tab list (affects arrow key navigation) */
  orientation?: 'horizontal' | 'vertical';
  /** Whether to enable automatic tab activation on focus */
  activationMode?: 'automatic' | 'manual';
  /** Whether to enable tab deletion with keyboard */
  enableTabDeletion?: boolean;
  /** Whether to announce tab changes */
  announceChanges?: boolean;
  /** Whether to announce tab position and total */
  announcePosition?: boolean;
  /** Whether to announce when tabs are closed */
  announceClosures?: boolean;
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
  /** Whether tab supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Whether to support tab reordering */
  supportReordering?: boolean;
  /** Whether to announce when tabs are reordered */
  announceReordering?: boolean;
  /** Whether to show keyboard shortcuts in tooltips */
  showKeyboardShortcuts?: boolean;
  /** Custom context description for complex tabs */
  contextDescription?: string;
}

/**
 * Tab item interface for object-based tabs
 */
export interface BTabItem {
  /** Unique identifier for the tab */
  value: string;
  /** Display label for the tab */
  label?: string;
  /** Icon to display in the tab */
  icon?: string;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Whether the tab can be closed/deleted */
  closable?: boolean;
  /** Custom ARIA label for accessibility */
  ariaLabel?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Badge count to display */
  badgeCount?: number;
  /** Custom CSS classes */
  customClass?: string;
  /** Whether tab is loading */
  loading?: boolean;
  /** Tab priority for keyboard navigation order */
  priority?: number;
  /** Additional data */
  data?: Record<string, unknown>;
  /** Custom properties */
  [key: string]: unknown;
}

/**
 * Tab item type - can be a simple string or TabItem object
 */
export type BTabItemType = string | BTabItem;

/**
 * Tab activation modes for accessibility
 */
export type BTabActivationMode = 'automatic' | 'manual';

/**
 * Tab orientation options
 */
export type BTabOrientation = 'horizontal' | 'vertical';

/**
 * Tab size variants
 */
export type BTabSize = 'small' | 'medium' | 'large';

/**
 * Tab variant styles
 */
export type BTabVariant = 'default' | 'minimal' | 'pills' | 'underlined' | 'bordered';

/**
 * Tab position options
 */
export type BTabPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Enhanced tab item with accessibility information
 */
export interface BTabEnhancedItem {
  /** Original item data */
  original: BTabItemType;
  /** Tab value */
  value: string;
  /** Display label */
  label: string;
  /** Icon name */
  icon?: string;
  /** Whether disabled */
  disabled: boolean;
  /** Whether closable */
  closable: boolean;
  /** ARIA label */
  ariaLabel?: string;
  /** ARIA description */
  ariaDescription?: string;
  /** Generated tab ID for ARIA */
  tabId: string;
  /** Generated panel ID for ARIA */
  panelId: string;
  /** Position in list (1-indexed) */
  position: number;
  /** Total number of tabs */
  total: number;
  /** Whether currently active */
  isActive: boolean;
  /** Whether currently focused */
  isFocused: boolean;
  /** Badge count */
  badgeCount?: number;
  /** Whether loading */
  loading?: boolean;
}

/**
 * Tab state interface for accessibility
 */
export interface BTabState {
  /** Currently active tab value */
  activeTab: string | null;
  /** Currently focused tab index */
  focusedIndex: number;
  /** Whether tab list has keyboard focus */
  hasKeyboardFocus: boolean;
  /** Current activation mode */
  activationMode: BTabActivationMode;
  /** Current orientation */
  orientation: BTabOrientation;
  /** Whether tab deletion is enabled */
  deletionEnabled: boolean;
  /** Total number of tabs */
  totalTabs: number;
  /** List of disabled tab indices */
  disabledTabs: number[];
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
  /** Whether component is in loading state */
  isLoading: boolean;
}

/**
 * Tab ARIA attributes interface
 */
export interface BTabAriaAttributes {
  /** ARIA role for tab */
  role: 'tab';
  /** Tab ID */
  id: string;
  /** Controls which panel */
  'aria-controls': string;
  /** Whether tab is selected */
  'aria-selected': boolean;
  /** Whether tab is disabled */
  'aria-disabled'?: boolean;
  /** ARIA label for the tab */
  'aria-label'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** Tab index for keyboard navigation */
  tabindex: number;
}

/**
 * Tab list ARIA attributes interface
 */
export interface BTabListAriaAttributes {
  /** ARIA role for tablist */
  role: 'tablist';
  /** ARIA label for the tab list */
  'aria-label'?: string;
  /** ARIA labelledby for complex labeling */
  'aria-labelledby'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** ARIA orientation for the tab list */
  'aria-orientation'?: 'horizontal' | 'vertical';
  /** ARIA multiselectable for multi-tab scenarios */
  'aria-multiselectable'?: boolean;
}

/**
 * Tab panel ARIA attributes interface
 */
export interface BTabPanelAriaAttributes {
  /** ARIA role for tabpanel */
  role: 'tabpanel';
  /** Panel ID */
  id: string;
  /** ARIA labelledby reference to tab */
  'aria-labelledby': string;
  /** Whether panel is hidden */
  hidden?: boolean;
  /** Tab index for panel focus */
  tabindex: number;
}

/**
 * Tab keyboard configuration
 */
export interface BTabKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for navigation (default: arrow keys) */
  navigationKeys?: string[];
  /** Keys for activation (default: Enter, Space) */
  activationKeys?: string[];
  /** Keys for deletion (default: Delete, Backspace) */
  deletionKeys?: string[];
  /** Keys for boundary navigation (default: Home, End) */
  boundaryKeys?: string[];
  /** Whether to prevent default behavior */
  preventDefault?: boolean;
  /** Whether to stop propagation */
  stopPropagation?: boolean;
  /** Custom key handlers */
  customHandlers?: Record<string, (event: KeyboardEvent) => void>;
  /** Whether to enable tab reordering */
  enableReordering?: boolean;
  /** Keys for reordering tabs */
  reorderKeys?: string[];
}

/**
 * Tab change event data
 */
export interface BTabChangeEvent {
  /** New active tab */
  newTab: BTabItemType;
  /** Previously active tab */
  previousTab?: BTabItemType;
  /** New tab index */
  newIndex: number;
  /** Previous tab index */
  previousIndex: number;
  /** Enhanced tab item */
  enhancedItem: BTabEnhancedItem;
  /** Source of change */
  source: 'click' | 'keyboard' | 'api';
}

/**
 * Tab close event data
 */
export interface BTabCloseEvent {
  /** Tab being closed */
  tab: BTabItemType;
  /** Tab index */
  index: number;
  /** Enhanced tab item */
  enhancedItem: BTabEnhancedItem;
  /** Source of close action */
  source: 'click' | 'keyboard' | 'api';
}

/**
 * Tab focus event data
 */
export interface BTabFocusEvent {
  /** Tab receiving focus */
  tab: BTabItemType;
  /** Tab index */
  index: number;
  /** Enhanced tab item */
  enhancedItem: BTabEnhancedItem;
  /** Source of focus */
  source: 'keyboard' | 'mouse' | 'api';
}

/**
 * Tab accessibility configuration
 */
export interface BTabAccessibilityConfig extends BTabAccessibilityProps {
  /** Custom screen reader announcements */
  customAnnouncements?: {
    /** Custom tab change announcement */
    tabChange?: (label: string, position: number, total: number) => string;
    /** Custom tab closed announcement */
    tabClosed?: (label: string) => string;
    /** Custom tab added announcement */
    tabAdded?: (label: string) => string;
    /** Custom focus announcement */
    tabFocused?: (label: string, position: number, total: number) => string;
    /** Custom loading announcement */
    tabLoading?: (label: string) => string;
    /** Custom disabled announcement */
    tabDisabled?: (label: string) => string;
  };
}

/**
 * Complete BTab props interface
 */
export interface BTabProps extends BTabAccessibilityProps {
  /** Current selected tab value */
  modelValue?: BTabItemType;
  /** Array of tab items */
  items: BTabItemType[];
  /** Whether to show only icons (for icon-only tabs) */
  isIcon?: boolean;
  /** Whether to disable card styling */
  notCard?: boolean;
  /** Whether tabs can be closed/deleted */
  closableTabs?: boolean;
  /** Tab size variant */
  size?: BTabSize;
  /** Tab style variant */
  variant?: BTabVariant;
  /** Tab position */
  position?: BTabPosition;
  /** Whether tabs are scrollable */
  scrollable?: boolean;
  /** Maximum number of visible tabs before scrolling */
  maxVisibleTabs?: number;
  /** Whether to center tabs */
  centered?: boolean;
  /** Whether tabs fill available width */
  fullWidth?: boolean;
  /** Whether tabs are in loading state */
  loading?: boolean;
  /** Custom loading message */
  loadingMessage?: string;
  /** Whether to animate tab changes */
  animated?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BTabKeyboardConfig;
  /** Accessibility configuration */
  accessibility?: BTabAccessibilityConfig;
  /** Whether to lazy load tab panels */
  lazy?: boolean;
  /** Whether to keep panel content when not active */
  keepAlive?: boolean;
  /** Custom tab renderer */
  tabRenderer?: (item: BTabEnhancedItem) => any;
  /** Custom panel renderer */
  panelRenderer?: (item: BTabEnhancedItem) => any;
  /** @deprecated Use accessibility.ariaLabel instead */
  ariaLabel?: string;
}

/**
 * BTab emits interface
 */
export interface BTabEmits {
  /** Model value updated */
  'update:modelValue': [value: BTabItemType];
  /** Tab changed */
  'tab-change': [event: BTabChangeEvent];
  /** Tab closed */
  'tab-close': [event: BTabCloseEvent];
  /** Tab focused */
  'tab-focus': [event: BTabFocusEvent];
  /** Before tab change (cancellable) */
  'before-tab-change': [{
    newTab: BTabItemType;
    previousTab?: BTabItemType;
    newIndex: number;
    previousIndex: number;
    cancel: () => void;
  }];
  /** Before tab close (cancellable) */
  'before-tab-close': [{
    tab: BTabItemType;
    index: number;
    cancel: () => void;
  }];
  /** Tab added */
  'tab-add': [event: { tab: BTabItemType; index: number }];
  /** Tab moved/reordered */
  'tab-move': [event: { tab: BTabItemType; oldIndex: number; newIndex: number }];
  /** Tab loading state changed */
  'loading-change': [isLoading: boolean, tabIndex?: number];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Keyboard navigation event */
  'keyboard-nav': [event: KeyboardEvent, tabIndex: number];
}

/**
 * Tab validation result
 */
export interface BTabValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Tab configuration */
  config?: BTabProps;
}

/**
 * Tab announcement templates
 */
export interface BTabAnnouncementTemplates {
  /** Template for tab change announcement */
  tabChange: string;
  /** Template for tab focus announcement */
  tabFocus: string;
  /** Template for tab close announcement */
  tabClose: string;
  /** Template for tab add announcement */
  tabAdd: string;
  /** Template for tab disabled announcement */
  tabDisabled: string;
  /** Template for tab loading announcement */
  tabLoading: string;
  /** Template for tab position announcement */
  tabPosition: string;
  /** Template for keyboard instructions */
  keyboardInstructions: string;
  /** Template for orientation change announcement */
  orientationChange: string;
  /** Template for activation mode change */
  activationModeChange: string;
}

/**
 * Tab theme configuration
 */
export interface BTabThemeConfig {
  /** Tab background color */
  tabBackgroundColor?: string;
  /** Active tab background color */
  activeTabBackgroundColor?: string;
  /** Tab text color */
  tabTextColor?: string;
  /** Active tab text color */
  activeTabTextColor?: string;
  /** Tab border color */
  tabBorderColor?: string;
  /** Active tab border color */
  activeTabBorderColor?: string;
  /** Disabled tab color */
  disabledTabColor?: string;
  /** Focus ring color */
  focusRingColor?: string;
  /** Close button hover color */
  closeButtonHoverColor?: string;
  /** Tab hover background color */
  tabHoverBackgroundColor?: string;
}

/**
 * Tab accessibility helpers
 */
export interface BTabAccessibilityHelpers {
  /** Get ARIA attributes for tab */
  getTabAriaAttributes: (item: BTabEnhancedItem, state: BTabState) => BTabAriaAttributes;
  /** Get ARIA attributes for tablist */
  getTabListAriaAttributes: (state: BTabState, props: BTabProps) => BTabListAriaAttributes;
  /** Get ARIA attributes for tabpanel */
  getTabPanelAriaAttributes: (item: BTabEnhancedItem, state: BTabState) => BTabPanelAriaAttributes;
  /** Format tab change announcement */
  formatTabChangeAnnouncement: (item: BTabEnhancedItem) => string;
  /** Format tab position announcement */
  formatTabPositionAnnouncement: (position: number, total: number) => string;
  /** Check if tab should receive focus */
  shouldReceiveFocus: (item: BTabEnhancedItem, state: BTabState) => boolean;
  /** Get keyboard instructions */
  getKeyboardInstructions: (orientation: BTabOrientation, features: string[]) => string;
  /** Announce tab state change */
  announceTabStateChange: (type: string, item: BTabEnhancedItem, message?: string) => void;
}

/**
 * Default configurations
 */
export const DEFAULT_TAB_KEYBOARD_CONFIG: Required<BTabKeyboardConfig> = {
  enabled: true,
  navigationKeys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
  activationKeys: ['Enter', ' '],
  deletionKeys: ['Delete', 'Backspace'],
  boundaryKeys: ['Home', 'End'],
  preventDefault: true,
  stopPropagation: false,
  customHandlers: {},
  enableReordering: false,
  reorderKeys: ['Control+ArrowLeft', 'Control+ArrowRight'],
};

export const DEFAULT_TAB_ACCESSIBILITY_CONFIG: Required<BTabAccessibilityProps> = {
  ariaLabel: 'Tab navigation',
  ariaDescribedBy: '',
  orientation: 'horizontal',
  activationMode: 'automatic',
  enableTabDeletion: false,
  announceChanges: true,
  announcePosition: true,
  announceClosures: true,
  announcementDelay: 0,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Use arrow keys to navigate tabs, Enter or Space to activate, Delete to close',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  supportReordering: false,
  announceReordering: true,
  showKeyboardShortcuts: false,
  contextDescription: '',
};

export const DEFAULT_TAB_ANNOUNCEMENTS: Required<BTabAnnouncementTemplates> = {
  tabChange: 'Selected {label} tab, {position} of {total}',
  tabFocus: 'Focused on {label} tab, {position} of {total}',
  tabClose: 'Closed {label} tab',
  tabAdd: 'Added {label} tab',
  tabDisabled: '{label} tab is disabled',
  tabLoading: '{label} tab is loading',
  tabPosition: 'Tab {position} of {total}',
  keyboardInstructions: 'Use arrow keys to navigate, Enter to activate, Delete to close tabs',
  orientationChange: 'Tab orientation changed to {orientation}',
  activationModeChange: 'Tab activation mode changed to {mode}',
};

/**
 * Tab interaction patterns
 */
export const TAB_INTERACTION_PATTERNS = {
  /** Standard tab pattern */
  STANDARD: 'standard',
  /** Accordion-style tabs */
  ACCORDION: 'accordion',
  /** Wizard/stepper tabs */
  WIZARD: 'wizard',
  /** Closable tabs */
  CLOSABLE: 'closable',
  /** Reorderable tabs */
  REORDERABLE: 'reorderable',
} as const;

/**
 * Keyboard navigation key mappings
 */
export const TAB_KEY_MAPPINGS: Record<string, {
  action: string;
  description: string;
  orientation?: BTabOrientation;
}> = {
  ArrowRight: { action: 'next', description: 'Move to next tab', orientation: 'horizontal' },
  ArrowLeft: { action: 'previous', description: 'Move to previous tab', orientation: 'horizontal' },
  ArrowDown: { action: 'next', description: 'Move to next tab', orientation: 'vertical' },
  ArrowUp: { action: 'previous', description: 'Move to previous tab', orientation: 'vertical' },
  Home: { action: 'first', description: 'Move to first tab' },
  End: { action: 'last', description: 'Move to last tab' },
  Enter: { action: 'activate', description: 'Activate focused tab' },
  Space: { action: 'activate', description: 'Activate focused tab' },
  Delete: { action: 'close', description: 'Close focused tab' },
  Backspace: { action: 'close', description: 'Close focused tab' },
};

/**
 * Tab size configurations with accessibility considerations
 */
export const TAB_SIZE_CONFIG: Record<BTabSize, {
  minHeight: string;
  padding: string;
  fontSize: string;
  iconSize: string;
  closeButtonSize: string;
  minTouchTarget: boolean;
}> = {
  small: {
    minHeight: '2rem',
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    iconSize: '1rem',
    closeButtonSize: '1.25rem',
    minTouchTarget: true,
  },
  medium: {
    minHeight: '2.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    iconSize: '1.25rem',
    closeButtonSize: '1.5rem',
    minTouchTarget: false,
  },
  large: {
    minHeight: '3rem',
    padding: '0.75rem 1rem',
    fontSize: '1.125rem',
    iconSize: '1.5rem',
    closeButtonSize: '1.75rem',
    minTouchTarget: false,
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BTabAccessibilityProps as AccessibilityProps,
  BTabProps as Props,
  BTabState as State,
  BTabAriaAttributes as AriaAttributes,
  BTabListAriaAttributes as ListAriaAttributes,
  BTabPanelAriaAttributes as PanelAriaAttributes,
  BTabKeyboardConfig as KeyboardConfig,
  BTabItem as Item,
  BTabEnhancedItem as EnhancedItem,
  BTabChangeEvent as ChangeEvent,
  BTabCloseEvent as CloseEvent,
  BTabFocusEvent as FocusEvent,
  BTabAccessibilityConfig as AccessibilityConfig,
  BTabEmits as Emits,
  BTabValidationResult as ValidationResult,
  BTabAnnouncementTemplates as AnnouncementTemplates,
  BTabThemeConfig as ThemeConfig,
  BTabAccessibilityHelpers as AccessibilityHelpers,
};
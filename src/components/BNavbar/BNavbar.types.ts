/**
 * BNavbar accessibility props interface
 * Implements WCAG 2.1 AA standards for navbar components
 */
export interface BNavbarAccessibilityProps {
  /** ARIA label for the main navigation */
  navigationLabel?: string;
  /** ARIA label for the mobile menu toggle button */
  menuButtonLabel?: string;
  /** ARIA label for the notifications button */
  notificationsLabel?: string;
  /** ARIA label for the user profile button */
  profileLabel?: string;
  /** Skip link text for keyboard navigation */
  skipLinkText?: string;
  /** Screen reader announcement when mobile menu opens */
  menuOpenAnnouncement?: string;
  /** Screen reader announcement when mobile menu closes */
  menuCloseAnnouncement?: string;
  /** ARIA label for logo/brand section */
  logoAriaLabel?: string;
  /** Whether to announce navigation changes */
  announceNavigationChanges?: boolean;
  /** Whether to announce responsive breakpoint changes */
  announceResponsiveChanges?: boolean;
  /** High contrast mode support */
  highContrast?: boolean;
  /** Reduced motion support */
  reduceMotion?: boolean;
  /** Whether to use enhanced focus management */
  enhancedFocus?: boolean;
  /** Minimum touch target size (default 44px) */
  minTouchTarget?: boolean;
  /** Screen reader instructions for navigation */
  screenReaderInstructions?: string;
  /** Live region politeness level for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Whether navbar supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Custom landmark role for the navigation */
  landmarkRole?: string;
}

/**
 * Profile information for the navbar user avatar
 */
export interface BNavbarProfile {
  /** User's display name */
  name: string;
  /** Optional avatar image source URL */
  src?: string;
  /** Custom aria-label for the profile */
  ariaLabel?: string;
  /** Whether profile is interactive */
  interactive?: boolean;
  /** Profile status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
}

/**
 * Navigation item with accessibility support
 */
export interface BNavbarNavigationItem {
  /** Unique identifier for the item */
  value: string | number;
  /** Display label for the item */
  label: string;
  /** Optional icon identifier */
  icon?: string;
  /** Whether this item represents the current page/section */
  current?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Custom aria-label for the navigation item */
  ariaLabel?: string;
  /** URL or route for the navigation item */
  href?: string;
  /** Target for the link (e.g., '_blank') */
  target?: string;
  /** Additional data for the item */
  data?: Record<string, any>;
  /** Keyboard shortcut for the item */
  shortcut?: string;
  /** Whether item requires authentication */
  requiresAuth?: boolean;
  /** Badge count for the item */
  badgeCount?: number;
  /** Custom CSS classes */
  customClass?: string;
}

/**
 * Navbar responsive breakpoint configuration
 */
export interface BNavbarResponsiveConfig {
  /** Mobile breakpoint in pixels */
  mobileBreakpoint?: number;
  /** Whether to show mobile menu on tablet */
  showMobileOnTablet?: boolean;
  /** Whether to collapse navigation items */
  collapseNavigation?: boolean;
  /** Priority order for navigation items on mobile */
  mobilePriority?: string[];
}

/**
 * Navbar notification configuration
 */
export interface BNavbarNotificationConfig {
  /** Whether notifications are enabled */
  enabled?: boolean;
  /** Badge count for notifications */
  badgeCount?: number;
  /** Maximum visible badge count */
  maxBadgeCount?: number;
  /** Notification dropdown position */
  dropdownPosition?: 'left' | 'right' | 'center';
  /** Whether to auto-close on outside click */
  autoClose?: boolean;
  /** Auto-close delay in milliseconds */
  autoCloseDelay?: number;
}

/**
 * Navbar state interface for accessibility
 */
export interface BNavbarState {
  /** Whether mobile menu is open */
  isMobileMenuOpen: boolean;
  /** Whether notifications are open */
  isNotificationsOpen: boolean;
  /** Whether navbar is in mobile view */
  isMobile: boolean;
  /** Currently focused navigation item index */
  focusedItemIndex: number;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Current navigation context */
  navigationContext: 'desktop' | 'mobile';
  /** Whether navbar is sticky positioned */
  isSticky: boolean;
  /** Current scroll position */
  scrollPosition: number;
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
}

/**
 * Navbar ARIA attributes interface
 */
export interface BNavbarAriaAttributes {
  /** ARIA label for main navigation */
  'aria-label'?: string;
  /** ARIA labelledby for navigation */
  'aria-labelledby'?: string;
  /** ARIA expanded for mobile menu */
  'aria-expanded'?: boolean;
  /** ARIA hidden for collapsed elements */
  'aria-hidden'?: boolean;
  /** ARIA current for active navigation items */
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
  /** ARIA controls for dropdown elements */
  'aria-controls'?: string;
  /** ARIA live region for announcements */
  'aria-live'?: 'polite' | 'assertive' | 'off';
  /** ARIA atomic for live regions */
  'aria-atomic'?: boolean;
  /** Tab index for keyboard navigation */
  tabindex?: number;
  /** Role for navigation elements */
  role?: string;
}

/**
 * Navbar keyboard configuration
 */
export interface BNavbarKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for opening mobile menu */
  menuToggleKeys?: string[];
  /** Keys for closing mobile menu */
  menuCloseKeys?: string[];
  /** Keys for navigating between items */
  navigationKeys?: string[];
  /** Keys for activating items */
  activationKeys?: string[];
  /** Keys for notifications toggle */
  notificationKeys?: string[];
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom keyboard shortcuts */
  shortcuts?: Record<string, () => void>;
}

/**
 * Complete BNavbar props interface
 */
export interface BNavbarProps extends BNavbarAccessibilityProps {
  /** Selected navbar items (v-model) */
  modelValue?: BNavbarNavigationItem[];
  /** Title displayed in the navbar */
  title?: string;
  /** Navigation items */
  items?: BNavbarNavigationItem[];
  /** User profile information */
  profile?: BNavbarProfile;
  /** Whether the navbar is sticky */
  sticky?: boolean;
  /** Custom logo alt text */
  logoAlt?: string;
  /** Current page/route for accessibility */
  currentPage?: string;
  /** Responsive configuration */
  responsiveConfig?: BNavbarResponsiveConfig;
  /** Notification configuration */
  notificationConfig?: BNavbarNotificationConfig;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BNavbarKeyboardConfig;
  /** Custom click handlers */
  onNavigate?: (item: BNavbarNavigationItem, event: MouseEvent | KeyboardEvent) => void;
  onMenuToggle?: (isOpen: boolean) => void;
  onNotificationToggle?: (isOpen: boolean) => void;
  /** Theme variant */
  variant?: 'default' | 'compact' | 'elevated' | 'transparent';
  /** Brand logo source */
  logoSrc?: string;
  /** Whether to show branding */
  showBranding?: boolean;
  /** Whether to show search functionality */
  showSearch?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
}

/**
 * BNavbar emits interface
 */
export interface BNavbarEmits {
  /** Model value updated */
  'update:modelValue': [value: BNavbarNavigationItem[]];
  /** Navigation item selected */
  'navigate': [item: BNavbarNavigationItem, event: MouseEvent | KeyboardEvent];
  /** Mobile menu opened */
  'menu-opened': [];
  /** Mobile menu closed */
  'menu-closed': [];
  /** Notifications toggled */
  'notifications-toggled': [isOpen: boolean];
  /** Profile clicked */
  'profile-click': [profile: BNavbarProfile, event: MouseEvent | KeyboardEvent];
  /** Logo clicked */
  'logo-click': [event: MouseEvent | KeyboardEvent];
  /** Search submitted */
  'search': [query: string];
  /** Responsive breakpoint changed */
  'breakpoint-change': [isMobile: boolean];
  /** Navigation focus changed */
  'focus-change': [item: BNavbarNavigationItem | null, index: number];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Keyboard shortcut activated */
  'shortcut': [shortcut: string, item: BNavbarNavigationItem];
}

/**
 * Navbar validation result
 */
export interface BNavbarValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Navbar configuration */
  config?: BNavbarProps;
}

/**
 * Navbar announcement templates
 */
export interface BNavbarAnnouncementTemplates {
  /** Template for navigation change announcement */
  navigationChange: string;
  /** Template for mobile menu open announcement */
  mobileMenuOpen: string;
  /** Template for mobile menu close announcement */
  mobileMenuClose: string;
  /** Template for notifications open announcement */
  notificationsOpen: string;
  /** Template for notifications close announcement */
  notificationsClose: string;
  /** Template for responsive mode change announcement */
  responsiveModeChange: string;
  /** Template for navigation focus announcement */
  navigationFocus: string;
  /** Template for skip link activation */
  skipLinkActivated: string;
  /** Template for keyboard navigation help */
  keyboardNavigationHelp: string;
}

/**
 * Navbar theme configuration
 */
export interface BNavbarThemeConfig {
  /** Primary background color */
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
  /** Logo filter for theme adaptation */
  logoFilter?: string;
}

/**
 * Navbar accessibility helpers
 */
export interface BNavbarAccessibilityHelpers {
  /** Get ARIA attributes for navigation */
  getNavigationAriaAttributes: (state: BNavbarState, config: BNavbarProps) => BNavbarAriaAttributes;
  /** Get appropriate role for navigation item */
  getNavigationItemRole: (item: BNavbarNavigationItem) => string;
  /** Announce navigation change */
  announceNavigationChange: (item: BNavbarNavigationItem, message?: string) => void;
  /** Get skip link target */
  getSkipLinkTarget: () => HTMLElement | null;
  /** Handle responsive announcement */
  announceResponsiveChange: (isMobile: boolean) => void;
}

/**
 * Default configurations
 */
export const DEFAULT_NAVBAR_KEYBOARD_CONFIG: Required<BNavbarKeyboardConfig> = {
  enabled: true,
  menuToggleKeys: ['Enter', ' '],
  menuCloseKeys: ['Escape'],
  navigationKeys: ['ArrowLeft', 'ArrowRight', 'Home', 'End'],
  activationKeys: ['Enter', ' '],
  notificationKeys: ['Enter', ' '],
  preventDefault: true,
  stopPropagation: false,
  shortcuts: {},
};

export const DEFAULT_NAVBAR_ACCESSIBILITY_CONFIG: Required<BNavbarAccessibilityProps> = {
  navigationLabel: 'Main navigation',
  menuButtonLabel: 'Toggle navigation menu',
  notificationsLabel: 'View notifications',
  profileLabel: 'User profile',
  skipLinkText: 'Skip to main content',
  menuOpenAnnouncement: 'Navigation menu opened',
  menuCloseAnnouncement: 'Navigation menu closed',
  logoAriaLabel: 'Home',
  announceNavigationChanges: true,
  announceResponsiveChanges: false,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Use arrow keys to navigate, Enter or Space to activate',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  landmarkRole: 'navigation',
};

export const DEFAULT_NAVBAR_RESPONSIVE_CONFIG: Required<BNavbarResponsiveConfig> = {
  mobileBreakpoint: 768,
  showMobileOnTablet: false,
  collapseNavigation: true,
  mobilePriority: [],
};

export const DEFAULT_NAVBAR_NOTIFICATION_CONFIG: Required<BNavbarNotificationConfig> = {
  enabled: true,
  badgeCount: 0,
  maxBadgeCount: 99,
  dropdownPosition: 'right',
  autoClose: true,
  autoCloseDelay: 5000,
};

export const DEFAULT_NAVBAR_ANNOUNCEMENTS: Required<BNavbarAnnouncementTemplates> = {
  navigationChange: 'Navigated to {label}',
  mobileMenuOpen: 'Navigation menu opened',
  mobileMenuClose: 'Navigation menu closed',
  notificationsOpen: 'Notifications opened',
  notificationsClose: 'Notifications closed',
  responsiveModeChange: 'Navigation switched to {mode} mode',
  navigationFocus: 'Focused on {label}',
  skipLinkActivated: 'Skipped to main content',
  keyboardNavigationHelp: 'Press Tab to navigate, Enter or Space to activate, Escape to close menus',
};

/**
 * Navbar breakpoint configurations
 */
export const NAVBAR_BREAKPOINTS: Record<string, {
  minWidth: number;
  maxWidth?: number;
  showMobileMenu: boolean;
  compactMode: boolean;
}> = {
  mobile: {
    minWidth: 0,
    maxWidth: 767,
    showMobileMenu: true,
    compactMode: true,
  },
  tablet: {
    minWidth: 768,
    maxWidth: 1023,
    showMobileMenu: false,
    compactMode: false,
  },
  desktop: {
    minWidth: 1024,
    showMobileMenu: false,
    compactMode: false,
  },
};

/**
 * Navigation item priority levels for mobile
 */
export const NAVBAR_ITEM_PRIORITIES: Record<string, number> = {
  critical: 1,    // Always visible
  high: 2,        // Visible in expanded menu
  medium: 3,      // Visible in overflow menu
  low: 4,         // Hidden on mobile
};

/**
 * Export all types for easy importing
 */
export type {
  BNavbarAccessibilityProps as AccessibilityProps,
  BNavbarProps as Props,
  BNavbarState as State,
  BNavbarAriaAttributes as AriaAttributes,
  BNavbarKeyboardConfig as KeyboardConfig,
  BNavbarProfile as Profile,
  BNavbarNavigationItem as NavigationItem,
  BNavbarResponsiveConfig as ResponsiveConfig,
  BNavbarNotificationConfig as NotificationConfig,
  BNavbarEmits as Emits,
  BNavbarValidationResult as ValidationResult,
  BNavbarAnnouncementTemplates as AnnouncementTemplates,
  BNavbarThemeConfig as ThemeConfig,
  BNavbarAccessibilityHelpers as AccessibilityHelpers,
};
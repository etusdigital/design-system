/**
 * Interface for breadcrumb items that can be objects with label/value or primitives
 */
export interface BBreadcrumbItem<T = unknown> {
	[key: string]: T;
}

/**
 * Item type that can be either an object or primitive value
 */
export type BreadcrumbItemType<T = unknown> = BBreadcrumbItem<T> | string | number | boolean;

/**
 * Internal item structure for "more" buttons
 */
export interface MoreOptionsItem<T = unknown> {
	icon: string;
	items: BreadcrumbItemType<T>[];
	[key: string]: unknown;
}

/**
 * Combined item type for internal use
 */
export type ParsedBreadcrumbItem<T = unknown> = BreadcrumbItemType<T> | MoreOptionsItem<T>;

/**
 * Accessibility configuration for breadcrumb navigation
 */
export interface BBreadcrumbAccessibilityProps {
	/** Unique identifier for the breadcrumb navigation */
	id?: string;
	/** Accessible label for the breadcrumb navigation landmark */
	ariaLabel?: string;
	/** Reference to element that describes the breadcrumb */
	ariaDescribedBy?: string;
	/** Reference to element that labels the breadcrumb */
	ariaLabelledBy?: string;
	/** Whether to include structured data markup for SEO */
	includeStructuredData?: boolean;
	/** Custom separator text for screen readers (visually hidden) */
	separatorText?: string;
	/** Whether to announce navigation changes to screen readers */
	announceNavigation?: boolean;
	/** Custom announcement format for navigation changes */
	navigationAnnouncementFormat?: string;
	/** Whether to show focus indicators */
	showFocusRing?: boolean;
	/** Whether to respect reduced motion preferences */
	respectReducedMotion?: boolean;
	/** High contrast mode support */
	supportHighContrast?: boolean;
	/** Custom keyboard navigation configuration */
	keyboardNavigation?: BBreadcrumbKeyboardConfig;
}

/**
 * Keyboard navigation configuration
 */
export interface BBreadcrumbKeyboardConfig {
	/** Whether to enable keyboard navigation */
	enabled?: boolean;
	/** Keys that activate breadcrumb items */
	activationKeys?: string[];
	/** Whether to loop navigation at the ends */
	loop?: boolean;
	/** Direction of navigation */
	direction?: "horizontal" | "vertical";
	/** Whether to skip disabled items */
	skipDisabled?: boolean;
}

/**
 * Structured data configuration for search engine optimization
 */
export interface BBreadcrumbStructuredData {
	/** Whether to include JSON-LD structured data */
	includeJsonLd?: boolean;
	/** Base URL for breadcrumb items */
	baseUrl?: string;
	/** Custom structured data properties */
	customProperties?: Record<string, unknown>;
}

/**
 * Navigation item configuration
 */
export interface BBreadcrumbNavigationProps {
	/** Current page indication - which item is the current page */
	currentPage?: unknown;
	/** Whether links should be navigable (clickable) */
	navigable?: boolean;
	/** Whether the current page should be a link */
	currentPageIsLink?: boolean;
	/** Custom navigation handler */
	onNavigate?: (item: BreadcrumbItemType, index: number) => void | Promise<void>;
	/** Whether navigation is asynchronous */
	asyncNavigation?: boolean;
	/** Loading state during navigation */
	navigationLoading?: boolean;
}

/**
 * Visual configuration for breadcrumb display
 */
export interface BBreadcrumbDisplayProps {
	/** Maximum number of items to show before collapsing */
	maxItems?: number;
	/** Whether to show separators */
	showSeparators?: boolean;
	/** Custom separator content */
	separator?: string;
	/** Whether separators are decorative (aria-hidden) */
	separatorsDecorative?: boolean;
	/** Size variant of the breadcrumb */
	size?: "small" | "medium" | "large";
	/** Whether to truncate long item labels */
	truncateLabels?: boolean;
	/** Maximum character length for truncated labels */
	maxLabelLength?: number;
}

/**
 * More options dropdown configuration
 */
export interface BBreadcrumbMoreOptionsProps {
	/** Whether to enable more options dropdown for collapsed items */
	enableMoreOptions?: boolean;
	/** Maximum items to show in more options dropdown */
	maxMoreItems?: number;
	/** Accessible label for more options button */
	moreOptionsLabel?: string;
	/** Whether to show item count in more options button */
	showMoreItemsCount?: boolean;
	/** Dropdown positioning strategy */
	dropdownPosition?: "bottom" | "top" | "auto";
	/** Whether dropdown should be portal to body */
	portalDropdown?: boolean;
}

/**
 * Comprehensive props interface for the BBreadcrumb component
 */
export interface BBreadcrumbProps extends 
	BBreadcrumbAccessibilityProps,
	BBreadcrumbNavigationProps,
	BBreadcrumbDisplayProps,
	BBreadcrumbMoreOptionsProps {
	/** Current selected value */
	modelValue?: unknown;
	/** Array of breadcrumb items */
	items?: BreadcrumbItemType[];
	/** Key to use for label when items are objects */
	labelKey?: string;
	/** Key to use for value when items are objects */
	valueKey?: string;
	/** Key to use for URL when items are objects */
	urlKey?: string;
	/** Whether to return the full object instead of just the value */
	getObject?: boolean;
	/** Whether the breadcrumb is disabled */
	disabled?: boolean;
	/** Custom CSS classes */
	class?: string | string[] | Record<string, boolean>;
}

/**
 * Events emitted by the BBreadcrumb component
 */
export interface BBreadcrumbEmits {
	"update:modelValue": [value: unknown];
	"navigate": [item: BreadcrumbItemType, index: number, event: Event];
	"more-options-open": [items: BreadcrumbItemType[], index: number];
	"more-options-close": [index: number];
	"item-focus": [item: BreadcrumbItemType, index: number];
	"item-blur": [item: BreadcrumbItemType, index: number];
	"navigation-complete": [item: BreadcrumbItemType];
	"navigation-error": [error: Error, item: BreadcrumbItemType];
}

/**
 * Breadcrumb navigation context
 */
export interface BBreadcrumbNavigationContext {
	/** Current navigation index */
	currentIndex: number;
	/** Total navigation items */
	totalItems: number;
	/** Whether navigation is in progress */
	navigating: boolean;
	/** Active more options dropdown index */
	activeDropdownIndex?: number;
	/** Navigation history stack */
	navigationHistory: BreadcrumbItemType[];
}

/**
 * Screen reader announcement templates
 */
export interface BBreadcrumbAnnouncementTemplates {
	/** Template for navigation announcements */
	navigation?: string;
	/** Template for current page announcements */
	currentPage?: string;
	/** Template for dropdown opened announcements */
	dropdownOpened?: string;
	/** Template for dropdown closed announcements */
	dropdownClosed?: string;
	/** Template for item count announcements */
	itemCount?: string;
}

/**
 * Focus management configuration
 */
export interface BBreadcrumbFocusConfig {
	/** Focus trap within more options dropdown */
	trapFocusInDropdown?: boolean;
	/** Return focus to trigger after dropdown closes */
	returnFocusOnClose?: boolean;
	/** Auto-focus first item on mount */
	autoFocusFirst?: boolean;
	/** Custom focus management strategy */
	focusStrategy?: "linear" | "circular" | "grid";
}

/**
 * Link generation configuration
 */
export interface BBreadcrumbLinkConfig {
	/** Generate actual links (<a> tags) instead of buttons */
	generateLinks?: boolean;
	/** Base URL for generating links */
	baseUrl?: string;
	/** Link target attribute */
	linkTarget?: "_blank" | "_self" | "_parent" | "_top";
	/** Link rel attribute */
	linkRel?: string;
	/** Custom link URL generator function */
	generateUrl?: (item: BreadcrumbItemType, index: number) => string;
}

/**
 * Type guards and utility types
 */
export type BBreadcrumbSize = "small" | "medium" | "large";
export type BBreadcrumbDirection = "horizontal" | "vertical";
export type BBreadcrumbDropdownPosition = "bottom" | "top" | "auto";
export type BBreadcrumbFocusStrategy = "linear" | "circular" | "grid";
export type BBreadcrumbLinkTarget = "_blank" | "_self" | "_parent" | "_top";

/**
 * Constants for breadcrumb behavior
 */
export const BREADCRUMB_CONSTANTS = {
	DEFAULT_MAX_ITEMS: 5,
	DEFAULT_MAX_LABEL_LENGTH: 30,
	DEFAULT_SEPARATOR: "chevron_right",
	DEFAULT_SEPARATOR_TEXT: "Navigate to",
	DEFAULT_MORE_LABEL: "Show more navigation options",
	ACTIVATION_KEYS: ["Enter", " ", "Space"],
	NAVIGATION_KEYS: ["ArrowLeft", "ArrowRight", "Home", "End"],
	ESCAPE_KEYS: ["Escape"],
	MIN_TOUCH_TARGET: 44, // 44px minimum touch target
} as const;

/**
 * Accessibility roles and ARIA properties
 */
export const BREADCRUMB_ARIA = {
	NAVIGATION_ROLE: "navigation",
	LIST_ROLE: "none", // ol has implicit role, but we can override if needed
	LISTITEM_ROLE: "none", // li has implicit role, but we can override if needed  
	BUTTON_ROLE: "button",
	LINK_ROLE: "link",
	MENU_ROLE: "menu",
	MENUITEM_ROLE: "menuitem",
	CURRENT_PAGE: "page",
	SEPARATOR_HIDDEN: true,
} as const;
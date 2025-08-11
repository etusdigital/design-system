export interface BButtonAccessibilityProps {
	/** Unique identifier for the button */
	id?: string;
	/** Name attribute for form handling */
	name?: string;
	/** ARIA label for the button */
	ariaLabel?: string;
	/** ARIA describedby reference */
	ariaDescribedBy?: string;
	/** ARIA labelledby reference */
	ariaLabelledBy?: string;
	/** Whether the button is pressed (for toggle buttons) */
	pressed?: boolean;
	/** Whether this is a toggle button */
	toggle?: boolean;
	/** Expanded state for buttons that control collapsible content */
	expanded?: boolean;
	/** ID of element controlled by this button */
	controls?: string;
	/** Popup type if button opens a popup */
	hasPopup?: "true" | "false" | "menu" | "listbox" | "tree" | "grid" | "dialog";
	/** Whether to show keyboard focus indicators */
	showFocusRing?: boolean;
	/** Auto-focus the button when mounted */
	autoFocus?: boolean;
	/** Whether to announce state changes */
	announceChanges?: boolean;
	/** Custom role for the button (defaults to 'button') */
	role?: "button" | "link" | "menuitem" | "tab" | "option";
	/** Tab index for focus management */
	tabIndex?: number;
	/** Whether this is a destructive action requiring confirmation */
	destructive?: boolean;
	/** Confirmation message for destructive actions */
	confirmationMessage?: string;
	/** Whether to respect reduced motion preferences */
	respectReducedMotion?: boolean;
	/** Minimum touch target size enforcement */
	enforceMinimumTouchTarget?: boolean;
	/** High contrast mode support */
	supportHighContrast?: boolean;
	/** Custom keyboard shortcuts */
	keyboardShortcut?: string;
	/** ARIA current state for navigation buttons */
	current?: "page" | "step" | "location" | "date" | "time" | "true" | "false";
	/** ARIA owns relationship */
	owns?: string;
	/** ARIA details relationship */
	details?: string;
}

export interface BButtonLoadingProps {
	/** Whether the button is in loading state */
	loading?: boolean;
	/** Progress value for progress indication (0-1) */
	progress?: number;
	/** Accessible label for loading state */
	loadingLabel?: string;
	/** Complete label for completion state */
	completeLabel?: string;
	/** Loading announcement frequency in seconds */
	loadingAnnouncementInterval?: number;
	/** Whether to show progress percentage */
	showProgressPercentage?: boolean;
}

export interface BButtonIconProps {
	/** Custom icon slot content */
	icon?: string;
	/** Icon position relative to text */
	iconPosition?: "left" | "right" | "top" | "bottom";
	/** Whether this is an icon-only button */
	iconOnly?: boolean;
	/** Alternative text for icon (for icon-only buttons) */
	iconAlt?: string;
	/** Whether icon is decorative only */
	iconDecorative?: boolean;
}

export interface BButtonInteractionProps {
	/** Prevent click event propagation */
	stopPropagation?: boolean;
	/** Debounce time for rapid clicks */
	debounceTime?: number;
	/** Whether button responds to double-click */
	doubleClick?: boolean;
	/** Long press duration in milliseconds */
	longPressDuration?: number;
	/** Whether to prevent form submission on enter */
	preventEnterSubmit?: boolean;
}

export interface BButtonGroupProps {
	/** Group role for button groups */
	groupRole?: "group" | "radiogroup" | "toolbar";
	/** Group label */
	groupLabel?: string;
	/** Position in group (1-based) */
	positionInGroup?: number;
	/** Total items in group */
	groupSize?: number;
	/** Whether this is part of an exclusive selection group */
	exclusive?: boolean;
}

/**
 * Comprehensive props interface for the BButton component
 */
export interface BButtonProps extends 
	BButtonAccessibilityProps,
	BButtonLoadingProps,
	BButtonIconProps,
	BButtonInteractionProps,
	BButtonGroupProps {
	/** HTML button type */
	type?: "button" | "reset" | "submit";
	/** Color variant of the button */
	color?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
	/** Size of the button */
	size?: "small" | "medium" | "large";
	/** Visual style variant */
	variant?: "default" | "secondary" | "plain" | "reverse";
	/** Whether the button is disabled */
	disabled?: boolean;
}

/**
 * Events emitted by the BButton component
 */
export interface BButtonEmits {
	"click": [event: MouseEvent];
	"double-click": [event: MouseEvent];
	"long-press": [event: MouseEvent | TouchEvent];
	"focus": [event: FocusEvent];
	"blur": [event: FocusEvent];
	"keydown": [event: KeyboardEvent];
	"keyup": [event: KeyboardEvent];
	"toggle": [pressed: boolean];
	"progress-complete": [];
	"loading-start": [];
	"loading-end": [];
	"confirmation-required": [message: string];
	"confirmation-accepted": [];
	"confirmation-cancelled": [];
}

/**
 * Keyboard navigation context for button groups
 */
export interface BButtonKeyboardContext {
	/** Current focus index in group */
	focusIndex: number;
	/** Total buttons in group */
	totalButtons: number;
	/** Navigation direction */
	direction: "horizontal" | "vertical";
	/** Whether to loop navigation */
	loop: boolean;
}

/**
 * Touch interaction context
 */
export interface BButtonTouchContext {
	/** Touch start timestamp */
	touchStart: number;
	/** Touch position */
	touchPosition: { x: number; y: number };
	/** Whether touch is active */
	touchActive: boolean;
}

/**
 * Accessibility announcement context
 */
export interface BButtonAnnouncementContext {
	/** Last announcement timestamp */
	lastAnnouncement: number;
	/** Pending announcements queue */
	pendingAnnouncements: string[];
	/** Announcement debounce time */
	debounceTime: number;
}

export type BButtonSize = "small" | "medium" | "large";
export type BButtonColor = "primary" | "info" | "success" | "warning" | "danger" | "neutral";
export type BButtonVariant = "default" | "secondary" | "plain" | "reverse";
export type BButtonType = "button" | "reset" | "submit";
export type BButtonIconPosition = "left" | "right" | "top" | "bottom";
export type BButtonRole = "button" | "link" | "menuitem" | "tab" | "option";
export type BButtonPopupType = "true" | "false" | "menu" | "listbox" | "tree" | "grid" | "dialog";
export type BButtonCurrent = "page" | "step" | "location" | "date" | "time" | "true" | "false";
export type BButtonGroupRole = "group" | "radiogroup" | "toolbar";
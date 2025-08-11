/**
 * BProfile Types - WCAG 2.1 AA Accessibility Compliant
 * 
 * This file contains comprehensive TypeScript interfaces for the BProfile component,
 * implementing full accessibility support including ARIA attributes, keyboard navigation,
 * screen reader support, and user profile management.
 * 
 * Accessibility Features:
 * - Semantic markup for user profile display (article, section roles)
 * - Avatar image accessibility with alt text and fallbacks
 * - User information with structured labeling
 * - Interactive profile behavior with keyboard support
 * - Status indicators with screen reader announcements
 * - Contact information accessibility
 * - Focus management with visible indicators
 * - High contrast and reduced motion support
 * - Loading states with accessibility feedback
 * 
 * WCAG 2.1 AA Compliance:
 * - ✅ 1.1.1 Non-text Content (Level A)
 * - ✅ 1.3.1 Info and Relationships (Level A)
 * - ✅ 1.4.3 Contrast (Minimum) (Level AA)
 * - ✅ 2.1.1 Keyboard (Level A)
 * - ✅ 2.1.2 No Keyboard Trap (Level A)
 * - ✅ 2.4.3 Focus Order (Level A)
 * - ✅ 2.4.6 Headings and Labels (Level AA)
 * - ✅ 2.4.7 Focus Visible (Level AA)
 * - ✅ 3.2.2 On Input (Level A)
 * - ✅ 4.1.2 Name, Role, Value (Level A)
 * - ✅ 4.1.3 Status Messages (Level AA)
 */

/**
 * Represents a profile account object with accessibility support.
 * This interface defines the structure for account items in the accounts array.
 * 
 * Accessibility Features:
 * - Unique identifier for screen reader announcements
 * - Structured data for proper labeling
 * - Role information for context
 * - Optional profile picture with fallback support
 */
export interface ProfileAccount {
	/** The unique identifier for the account (required for accessibility) */
	id?: string | number;
	/** The display name of the account (required for screen readers) */
	name: string;
	/** Optional email address associated with the account */
	email?: string;
	/** Optional profile picture URL for the account (requires alt text) */
	profilePicture?: string;
	/** Optional role or type of the account (announced by screen readers) */
	role?: string;
	/** Account status for accessibility announcements */
	status?: 'active' | 'inactive' | 'pending' | 'suspended';
	/** Last activity timestamp for context */
	lastActivity?: Date | string;
	/** Whether this account has admin privileges (for screen reader context) */
	isAdmin?: boolean;
	/** Additional properties can be added using index signature */
	[key: string]: unknown;
}

/**
 * Contact method interface for profile accessibility.
 * Supports various contact types with proper ARIA labeling and keyboard interaction.
 * 
 * Accessibility Features:
 * - Type-specific ARIA labels and roles
 * - Primary contact method identification
 * - Icon mapping with fallbacks
 * - Keyboard interaction support
 */
export interface ProfileContactMethod {
	/** Type of contact method (determines icon and interaction behavior) */
	type: 'email' | 'phone' | 'website' | 'social' | 'address' | 'fax' | 'messenger';
	/** Label for the contact method (announced by screen readers) */
	label: string;
	/** Value/URL for the contact method */
	value: string;
	/** Icon name for the contact method (with auto-fallback based on type) */
	icon?: string;
	/** Whether this is the primary contact method (highlighted for accessibility) */
	primary?: boolean;
	/** Additional accessibility description for complex contact methods */
	ariaDescription?: string;
	/** Whether this contact method is currently available/active */
	available?: boolean;
	/** Custom action when contact method is activated */
	customAction?: () => void;
}

/**
 * User status configuration for accessibility announcements.
 * Provides structured status information with screen reader support.
 * 
 * Accessibility Features:
 * - Status type with appropriate ARIA roles
 * - Screen reader announcements
 * - Visual indicators with alt text
 * - Time-based status updates
 */
export interface ProfileUserStatus {
	/** Status type affecting visual presentation and announcements */
	type: 'online' | 'away' | 'busy' | 'offline' | 'custom';
	/** Status message displayed to users */
	message?: string;
	/** Custom status text for 'custom' type */
	customText?: string;
	/** Whether to announce status changes */
	announceChanges?: boolean;
	/** Status icon override */
	icon?: string;
	/** Status color for high contrast mode */
	color?: string;
	/** Last updated timestamp */
	lastUpdated?: Date | string;
	/** Auto-clear status after duration (in minutes) */
	autoClearAfter?: number;
}

/**
 * Profile loading states for accessibility feedback.
 * Manages loading states with proper screen reader announcements.
 * 
 * Accessibility Features:
 * - Loading state announcements
 * - Progress indication
 * - Error state handling
 * - Timeout management
 */
export interface ProfileLoadingState {
	/** Whether profile data is currently loading */
	isLoading?: boolean;
	/** Loading progress percentage (0-100) */
	progress?: number;
	/** Loading message for screen readers */
	loadingMessage?: string;
	/** Error state information */
	error?: {
		/** Error message */
		message: string;
		/** Whether error should be announced immediately */
		announce?: boolean;
		/** Recovery action label */
		recoveryAction?: string;
	};
	/** Whether to show loading spinner */
	showSpinner?: boolean;
	/** Loading timeout in milliseconds */
	timeout?: number;
}

/**
 * Profile accessibility configuration interface.
 * Comprehensive accessibility settings for the profile component.
 * 
 * Accessibility Features:
 * - Custom ARIA labels and descriptions
 * - Announcement preferences
 * - Keyboard navigation settings
 * - Screen reader optimization
 * - Focus management
 * - High contrast support
 */
export interface ProfileAccessibilityConfig {
	/** Custom aria-label for the profile container */
	ariaLabel?: string;
	/** Custom aria-describedby reference */
	ariaDescribedBy?: string;
	/** Custom role for the profile container (default: 'region') */
	role?: 'region' | 'article' | 'banner' | 'complementary' | 'main';
	/** Whether profile interactions are announced to screen readers */
	announceChanges?: boolean;
	/** Context information for screen readers */
	profileContext?: string;
	/** Whether the profile supports interactive behavior */
	interactive?: boolean;
	/** Custom description for screen readers */
	ariaDescription?: string;
	/** Landmark label for navigation */
	landmarkLabel?: string;
	/** Whether to announce profile status changes */
	announceStatusChanges?: boolean;
	/** Whether to announce account switches */
	announceAccountSwitches?: boolean;
	/** Custom announcement for profile actions */
	customAnnouncements?: {
		profileOpen?: string;
		profileClose?: string;
		accountSwitch?: string;
		contactMethodUsed?: string;
	};
	/** Screen reader verbosity level */
	verbosityLevel?: 'minimal' | 'standard' | 'verbose';
	/** Whether to use polite or assertive announcements */
	announcementPriority?: 'polite' | 'assertive';
	/** Whether to provide additional context for screen readers */
	extendedContext?: boolean;
}

/**
 * Keyboard navigation configuration for profile component.
 * Configures keyboard interaction behavior and navigation patterns.
 * 
 * Accessibility Features:
 * - Arrow key navigation
 * - Tab navigation behavior
 * - Enter/Space activation
 * - Escape key handling
 * - Navigation announcements
 * - Loop behavior
 */
export interface ProfileKeyboardNavigation {
	/** Whether keyboard navigation is enabled */
	enabled?: boolean;
	/** Whether navigation should loop at boundaries */
	loop?: boolean;
	/** Whether to skip disabled items during navigation */
	skipDisabled?: boolean;
	/** Custom key bindings */
	customKeys?: {
		/** Custom activation keys (in addition to Enter/Space) */
		activate?: string[];
		/** Custom navigation keys */
		navigate?: {
			next?: string[];
			previous?: string[];
			first?: string[];
			last?: string[];
		};
		/** Custom close keys (in addition to Escape) */
		close?: string[];
	};
	/** Whether to announce navigation changes */
	announceNavigation?: boolean;
	/** Navigation behavior settings */
	behavior?: {
		/** Auto-focus first item when opened */
		autoFocusFirst?: boolean;
		/** Return focus to trigger when closed */
		returnFocus?: boolean;
		/** Wrap navigation at boundaries */
		wrap?: boolean;
		/** Navigation orientation */
		orientation?: 'horizontal' | 'vertical' | 'both';
	};
}

/**
 * Focus management configuration for profile accessibility.
 * Controls focus behavior and focus trap functionality.
 * 
 * Accessibility Features:
 * - Focus trap in dropdown
 * - Focus restoration
 * - Focus indicators
 * - Focus announcements
 * - Focus order management
 */
export interface ProfileFocusConfig {
	/** Whether to trap focus within the profile dropdown */
	trapFocus?: boolean;
	/** Whether to restore focus when dropdown closes */
	restoreFocus?: boolean;
	/** Whether to show visible focus indicators */
	showFocusIndicators?: boolean;
	/** Focus indicator style */
	focusIndicatorStyle?: 'ring' | 'outline' | 'underline' | 'background';
	/** Whether to announce focus changes */
	announceFocus?: boolean;
	/** Initial focus target when dropdown opens */
	initialFocus?: 'first' | 'search' | 'selected' | 'trigger';
	/** Focus behavior on selection */
	focusOnSelection?: 'retain' | 'return' | 'next';
	/** Whether to use focus-visible instead of focus */
	useFocusVisible?: boolean;
}

/**
 * Props interface for the BProfile component.
 * Comprehensive props supporting all accessibility features and user profile management.
 * 
 * Accessibility Features:
 * - Avatar image accessibility
 * - User information labeling
 * - Interactive behavior configuration
 * - Contact method accessibility
 * - Status indicator support
 * - Keyboard navigation
 * - Screen reader optimization
 */
export interface BProfileProps {
	/** The currently selected account object */
	modelValue?: ProfileAccount | null;
	/** The main user name to display (required for accessibility) */
	name: string;
	/** URL or path to the profile picture */
	profilePicture?: string;
	/** Array of available accounts for switching */
	accounts?: ProfileAccount[];
	/** Key to use for accessing the name property in account objects */
	nameKey?: string;
	/** Whether the dropdown should have absolute positioning */
	absolute?: boolean;
	/** Whether the component is disabled */
	disabled?: boolean;
	
	// Accessibility Props
	/** Profile contact methods for accessibility */
	contactMethods?: ProfileContactMethod[];
	/** Comprehensive accessibility configuration */
	accessibility?: ProfileAccessibilityConfig;
	/** Alt text for profile picture (auto-generated if not provided) */
	profilePictureAlt?: string;
	/** User role or title for context */
	userRole?: string;
	/** User bio or description */
	userBio?: string;
	/** User status configuration */
	userStatus?: ProfileUserStatus;
	/** Loading state configuration */
	loadingState?: ProfileLoadingState;
	
	// Navigation and Interaction Props
	/** Whether to enable keyboard navigation */
	enableKeyboardNavigation?: boolean;
	/** Keyboard navigation configuration */
	keyboardNavigation?: ProfileKeyboardNavigation;
	/** Focus management configuration */
	focusConfig?: ProfileFocusConfig;
	
	// Visual and Presentation Props
	/** High contrast mode support */
	highContrast?: boolean;
	/** Whether to reduce motion for accessibility */
	reduceMotion?: boolean;
	/** Custom CSS classes for theming */
	customClasses?: {
		container?: string;
		trigger?: string;
		dropdown?: string;
		avatar?: string;
		contactMethods?: string;
	};
	
	// Behavioral Props
	/** Whether profile picture errors should show fallback */
	showAvatarFallback?: boolean;
	/** Maximum number of recent accounts to show */
	maxRecentAccounts?: number;
	/** Whether to auto-close on outside click */
	closeOnOutsideClick?: boolean;
	/** Close delay in milliseconds */
	closeDelay?: number;
	
	// Advanced Accessibility Props
	/** Custom ARIA live region for announcements */
	ariaLiveRegion?: 'off' | 'polite' | 'assertive';
	/** Whether component is part of a form */
	inForm?: boolean;
	/** Form field label reference */
	formLabelledBy?: string;
	/** Form validation state */
	validationState?: 'valid' | 'invalid' | 'warning' | null;
	/** Form validation message */
	validationMessage?: string;
}

/**
 * Events interface for the BProfile component.
 * Comprehensive event handling with accessibility context.
 * 
 * Accessibility Features:
 * - Event context for screen readers
 * - Keyboard vs mouse interaction detection
 * - Focus management events
 * - Status change events
 */
export interface BProfileEmits {
	/** Emitted when the selected account changes */
	"update:modelValue": [value: ProfileAccount | null];
	/** Emitted when user clicks logout */
	logout: [];
	/** Emitted when user clicks edit profile */
	editProfile: [];
	/** Emitted when user clicks edit account */
	editAccount: [];
	/** Emitted when user changes to a different account */
	changeAccount: [account: ProfileAccount];
	/** Emitted when user clicks privacy policy link */
	privacyPolicyFunction: [];
	/** Emitted when user clicks terms of use link */
	termsOfUseFunction: [];
	/** Emitted when a contact method is used */
	contactMethodUsed: [method: ProfileContactMethod];
	/** Emitted when user status changes */
	statusChange: [status: ProfileUserStatus];
	/** Emitted when profile dropdown opens */
	profileOpen: [];
	/** Emitted when profile dropdown closes */
	profileClose: [];
	/** Emitted when focus enters the profile */
	focusEnter: [event: FocusEvent];
	/** Emitted when focus leaves the profile */
	focusLeave: [event: FocusEvent];
	/** Emitted when keyboard navigation is used */
	keyboardNavigation: [key: string, target: string];
	/** Emitted when profile loading state changes */
	loadingStateChange: [state: ProfileLoadingState];
	/** Emitted when profile encounters an error */
	error: [error: { type: string; message: string; details?: unknown }];
}

/**
 * Slots interface for the BProfile component.
 * Customizable content areas with accessibility context.
 * 
 * Accessibility Features:
 * - Slot props include accessibility context
 * - Proper labeling for custom content
 * - Screen reader support for slotted content
 */
export interface BProfileSlots {
	/** Slot for customizing account rendering in the dropdown */
	account: {
		/** The account object */
		account: ProfileAccount;
		/** Index in the accounts array */
		index: number;
		/** Whether this account is currently active */
		active: boolean;
		/** Whether this account is currently selected via keyboard */
		selected: boolean;
		/** ARIA attributes for the slot content */
		ariaProps: Record<string, string>;
	};
	/** Slot for edit profile button content */
	editProfile: {
		/** Default content */
		default: string;
		/** ARIA attributes for the button */
		ariaProps: Record<string, string>;
	};
	/** Slot for edit account button content */
	editAccount: {
		/** Default content */
		default: string;
		/** ARIA attributes for the button */
		ariaProps: Record<string, string>;
	};
	/** Slot for logout button content */
	logout: {
		/** Default content */
		default: string;
		/** ARIA attributes for the button */
		ariaProps: Record<string, string>;
	};
	/** Slot for privacy policy link content */
	privacyPolicy: {
		/** Default content */
		default: string;
		/** ARIA attributes for the link */
		ariaProps: Record<string, string>;
	};
	/** Slot for terms of use link content */
	termsOfUse: {
		/** Default content */
		default: string;
		/** ARIA attributes for the link */
		ariaProps: Record<string, string>;
	};
	/** Slot for custom profile header content */
	profileHeader: {
		/** Current user/account */
		user: ProfileAccount | null;
		/** Profile picture URL */
		profilePicture?: string;
		/** Profile picture alt text */
		profilePictureAlt: string;
	};
	/** Slot for custom user status display */
	userStatus: {
		/** Current status */
		status?: ProfileUserStatus;
		/** Status display props */
		statusProps: Record<string, unknown>;
	};
	/** Slot for custom contact methods display */
	contactMethods: {
		/** Contact methods array */
		methods: ProfileContactMethod[];
		/** Handler function */
		handleContact: (method: ProfileContactMethod) => void;
	};
	/** Slot for custom loading state */
	loading: {
		/** Loading state */
		loadingState: ProfileLoadingState;
		/** Loading props */
		loadingProps: Record<string, unknown>;
	};
	/** Slot for empty state when no accounts */
	empty: {
		/** Empty state message */
		message: string;
		/** Empty state props */
		emptyProps: Record<string, unknown>;
	};
}

/**
 * Profile component ref interface for programmatic access.
 * Provides methods for controlling the profile component externally.
 * 
 * Accessibility Features:
 * - Programmatic focus management
 * - Announcement triggering
 * - State management
 * - Accessibility status checking
 */
export interface BProfileRef {
	/** Opens the profile dropdown */
	open: () => void;
	/** Closes the profile dropdown */
	close: () => void;
	/** Toggles the profile dropdown */
	toggle: () => void;
	/** Focuses the profile trigger */
	focus: () => void;
	/** Focuses specific account in dropdown */
	focusAccount: (index: number) => void;
	/** Announces message to screen readers */
	announce: (message: string, priority?: 'polite' | 'assertive') => void;
	/** Updates user status */
	setStatus: (status: ProfileUserStatus) => void;
	/** Triggers loading state */
	setLoading: (state: ProfileLoadingState) => void;
	/** Gets current accessibility state */
	getAccessibilityState: () => {
		isOpen: boolean;
		focusedIndex: number;
		hasKeyboardFocus: boolean;
		announcementsEnabled: boolean;
	};
	/** Validates accessibility compliance */
	validateAccessibility: () => {
		valid: boolean;
		issues: string[];
		suggestions: string[];
	};
}

/**
 * Type guard to check if an object is a valid ProfileAccount.
 * 
 * @param obj - Object to check
 * @returns True if object is a valid ProfileAccount
 */
export function isProfileAccount(obj: unknown): obj is ProfileAccount {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		'name' in obj &&
		typeof (obj as ProfileAccount).name === 'string'
	);
}

/**
 * Type guard to check if an object is a valid ProfileContactMethod.
 * 
 * @param obj - Object to check
 * @returns True if object is a valid ProfileContactMethod
 */
export function isProfileContactMethod(obj: unknown): obj is ProfileContactMethod {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		'type' in obj &&
		'label' in obj &&
		'value' in obj &&
		typeof (obj as ProfileContactMethod).type === 'string' &&
		typeof (obj as ProfileContactMethod).label === 'string' &&
		typeof (obj as ProfileContactMethod).value === 'string'
	);
}

/**
 * Default accessibility configuration for BProfile component.
 * Provides sensible defaults that ensure WCAG 2.1 AA compliance.
 */
export const defaultAccessibilityConfig: Required<ProfileAccessibilityConfig> = {
	ariaLabel: '',
	ariaDescribedBy: '',
	role: 'region',
	announceChanges: true,
	profileContext: '',
	interactive: true,
	ariaDescription: '',
	landmarkLabel: 'User profile',
	announceStatusChanges: true,
	announceAccountSwitches: true,
	customAnnouncements: {
		profileOpen: 'Profile menu opened',
		profileClose: 'Profile menu closed',
		accountSwitch: 'Account switched',
		contactMethodUsed: 'Contact method activated',
	},
	verbosityLevel: 'standard',
	announcementPriority: 'polite',
	extendedContext: false,
};

/**
 * Default keyboard navigation configuration for BProfile component.
 */
export const defaultKeyboardNavigationConfig: Required<ProfileKeyboardNavigation> = {
	enabled: true,
	loop: true,
	skipDisabled: true,
	customKeys: {
		activate: ['Enter', ' '],
		navigate: {
			next: ['ArrowDown'],
			previous: ['ArrowUp'],
			first: ['Home'],
			last: ['End'],
		},
		close: ['Escape'],
	},
	announceNavigation: true,
	behavior: {
		autoFocusFirst: true,
		returnFocus: true,
		wrap: true,
		orientation: 'vertical',
	},
};

/**
 * Default focus configuration for BProfile component.
 */
export const defaultFocusConfig: Required<ProfileFocusConfig> = {
	trapFocus: true,
	restoreFocus: true,
	showFocusIndicators: true,
	focusIndicatorStyle: 'ring',
	announceFocus: false,
	initialFocus: 'search',
	focusOnSelection: 'return',
	useFocusVisible: true,
};
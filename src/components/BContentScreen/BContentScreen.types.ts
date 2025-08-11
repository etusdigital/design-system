import type { Ref } from 'vue';

/**
 * Landmark configuration for content screen structure
 */
export interface BContentScreenLandmark {
	/** Landmark role */
	role?: 'main' | 'complementary' | 'banner' | 'navigation' | 'contentinfo' | 'region';
	/** ARIA label for the landmark */
	label?: string;
	/** ARIA labelledby reference */
	labelledBy?: string;
	/** Custom landmark class */
	class?: string;
}

/**
 * Skip link configuration for keyboard navigation
 */
export interface BContentScreenSkipLink {
	/** Skip link target ID */
	target: string;
	/** Skip link text */
	text: string;
	/** Skip link position */
	position?: 'top' | 'bottom';
	/** Whether to show skip link visually */
	visible?: boolean;
}

/**
 * Loading state configuration
 */
export interface BContentScreenLoadingState {
	/** Whether content is loading */
	isLoading?: boolean;
	/** Loading message */
	loadingMessage?: string;
	/** Loading completion message */
	loadedMessage?: string;
	/** Loading progress (0-1) */
	progress?: number;
	/** Whether to announce loading state changes */
	announceChanges?: boolean;
}

/**
 * Page structure configuration
 */
export interface BContentScreenPageStructure {
	/** Page title */
	pageTitle?: string;
	/** Page description */
	pageDescription?: string;
	/** Whether to announce page changes */
	announcePageChanges?: boolean;
	/** Focus target on page change */
	focusTargetOnChange?: string;
}

/**
 * Focus management configuration
 */
export interface BContentScreenFocusManagement {
	/** Whether to enable focus trap in content area */
	trapFocus?: boolean;
	/** Initial focus target selector */
	initialFocusTarget?: string;
	/** Whether to restore focus on unmount */
	restoreFocus?: boolean;
	/** Whether to skip focus management */
	skipFocusManagement?: boolean;
}

/**
 * Responsive accessibility configuration
 */
export interface BContentScreenResponsive {
	/** Whether to respect reduced motion */
	respectReducedMotion?: boolean;
	/** Whether to support high contrast */
	supportHighContrast?: boolean;
	/** Mobile breakpoint for responsive behavior */
	mobileBreakpoint?: number;
	/** Whether to adjust for mobile accessibility */
	mobileAccessibilityAdjustments?: boolean;
}

/**
 * Accessibility props for BContentScreen component
 */
export interface BContentScreenAccessibilityProps {
	/** Unique identifier for the content screen */
	id?: string;
	/** Left side (background) landmark configuration */
	backgroundLandmark?: BContentScreenLandmark;
	/** Right side (content) landmark configuration */
	contentLandmark?: BContentScreenLandmark;
	/** Skip links configuration */
	skipLinks?: BContentScreenSkipLink[];
	/** Loading state configuration */
	loadingState?: BContentScreenLoadingState;
	/** Page structure configuration */
	pageStructure?: BContentScreenPageStructure;
	/** Focus management configuration */
	focusManagement?: BContentScreenFocusManagement;
	/** Responsive accessibility configuration */
	responsive?: BContentScreenResponsive;
	/** Whether to enable enhanced accessibility features */
	enhancedAccessibility?: boolean;
	/** Custom ARIA live region ID */
	liveRegionId?: string;
	/** Content change announcements */
	announceContentChanges?: boolean;
}

/**
 * Layout configuration props
 */
export interface BContentScreenLayoutProps {
	/** Progress value for the progress bar */
	progression?: number;
	/** Number of steps for progress calculation */
	steps?: number;
	/** Whether to reverse the layout (image on right) */
	isImgRight?: boolean;
	/** Whether to animate the logo */
	isAnimatedLogo?: boolean;
}

/**
 * Content configuration props
 */
export interface BContentScreenContentProps {
	/** Custom background logo source */
	backgroundLogoSrc?: string;
	/** Background logo alt text */
	backgroundLogoAlt?: string;
	/** Custom logo source */
	logoSrc?: string;
	/** Logo alt text */
	logoAlt?: string;
	/** Whether background logo is decorative */
	backgroundLogoDecorative?: boolean;
	/** Whether main logo is decorative */
	logoDecorative?: boolean;
}

/**
 * Interaction props
 */
export interface BContentScreenInteractionProps {
	/** Whether to prevent scroll when mounted */
	preventScroll?: boolean;
	/** Whether to handle escape key */
	handleEscapeKey?: boolean;
	/** Escape key handler */
	onEscape?: () => void;
	/** Custom keyboard shortcuts */
	keyboardShortcuts?: Record<string, () => void>;
}

/**
 * Complete props interface for BContentScreen component
 */
export interface BContentScreenProps extends 
	BContentScreenAccessibilityProps,
	BContentScreenLayoutProps,
	BContentScreenContentProps,
	BContentScreenInteractionProps {}

/**
 * Events emitted by BContentScreen component
 */
export interface BContentScreenEmits {
	"update:progression": [value: number];
	"page-change": [newPage: string];
	"content-loaded": [];
	"content-loading": [];
	"skip-link-activated": [target: string];
	"focus-trapped": [element: HTMLElement];
	"focus-restored": [element: HTMLElement];
	"accessibility-error": [error: string];
}

/**
 * Content screen navigation context
 */
export interface BContentScreenNavigationContext {
	/** Current step/page index */
	currentStep: number;
	/** Total steps */
	totalSteps: number;
	/** Navigation history */
	history: string[];
	/** Whether navigation is available */
	canNavigate: boolean;
}

/**
 * Accessibility announcement context
 */
export interface BContentScreenAnnouncementContext {
	/** Last announcement timestamp */
	lastAnnouncement: number;
	/** Pending announcements */
	pendingAnnouncements: string[];
	/** Current live region */
	liveRegion: Ref<HTMLElement | null>;
}

/**
 * Content screen layout dimensions
 */
export interface BContentScreenDimensions {
	/** Background section width percentage */
	backgroundWidth: number;
	/** Content section width percentage */
	contentWidth: number;
	/** Minimum content width in pixels */
	minContentWidth: number;
	/** Mobile breakpoint */
	mobileBreakpoint: number;
}

/**
 * Type definitions for component configuration
 */
export type BContentScreenLandmarkRole = 'main' | 'complementary' | 'banner' | 'navigation' | 'contentinfo' | 'region';
export type BContentScreenSkipLinkPosition = 'top' | 'bottom';
export type BContentScreenFocusTarget = 'auto' | 'first-focusable' | 'main-content' | 'progress-bar' | string;

/**
 * Configuration for content screen themes
 */
export interface BContentScreenThemeConfig {
	/** Whether to support dark mode */
	supportDarkMode?: boolean;
	/** Whether to support high contrast mode */
	supportHighContrast?: boolean;
	/** Custom theme class */
	themeClass?: string;
	/** Whether to respect user's color scheme preference */
	respectColorScheme?: boolean;
}

/**
 * Animation configuration
 */
export interface BContentScreenAnimationConfig {
	/** Whether to respect reduced motion preference */
	respectReducedMotion?: boolean;
	/** Animation duration in milliseconds */
	animationDuration?: number;
	/** Whether to disable all animations */
	disableAnimations?: boolean;
	/** Custom animation classes */
	animationClasses?: Record<string, string>;
}
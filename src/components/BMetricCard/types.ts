/**
 * Comprehensive accessibility interfaces and types for BMetricCard component
 */

export type MetricType = "default" | "success" | "danger" | "sample" | "card";
export type MetricSize = "small" | "medium" | "large";
export type InfoType = 
	| "default"
	| "sample"
	| "primary"
	| "info"
	| "success"
	| "danger"
	| "warning";

export type TrendDirection = "up" | "down" | "stable" | "neutral";
export type MetricRole = "region" | "article" | "status" | "figure";

/**
 * Trend information for accessibility announcements
 */
export interface TrendInfo {
	/** Direction of the trend */
	direction: TrendDirection;
	/** Percentage or numeric change */
	change?: string | number;
	/** Period for the change (e.g., "from last month") */
	period?: string;
	/** Icon to display for the trend */
	icon?: string;
	/** Color for trend indication */
	color?: string;
}

/**
 * Chart/Graph accessibility configuration
 */
export interface ChartAccessibility {
	/** Chart type for screen reader context */
	type: "line" | "bar" | "pie" | "area" | "gauge";
	/** Textual description of the chart data */
	dataDescription: string;
	/** Alternative text for complex visualizations */
	altText?: string;
	/** Summary of key insights from the chart */
	summary?: string;
}

/**
 * Comprehensive accessibility props for metric cards
 */
export interface MetricCardAccessibility {
	/** ARIA label for the metric card */
	ariaLabel?: string;
	/** ARIA description for additional context */
	ariaDescription?: string;
	/** Whether the card is interactive (clickable) */
	interactive?: boolean;
	/** Announce changes to screen readers */
	announceChanges?: boolean;
	/** Context for the metric (e.g., "Sales Dashboard", "KPI Overview") */
	metricContext?: string;
	/** Semantic role for the metric card */
	role?: MetricRole;
	/** Heading level if used as a section header */
	headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
	/** Trend information for accessibility */
	trend?: TrendInfo;
	/** Chart accessibility configuration */
	chart?: ChartAccessibility;
	/** Custom keyboard shortcut description */
	keyboardShortcut?: string;
	/** Whether to use high contrast mode */
	highContrast?: boolean;
	/** Live region politeness level */
	liveRegion?: "off" | "polite" | "assertive";
}

/**
 * Complete BMetricCard props interface
 */
export interface BMetricCardProps extends MetricCardAccessibility {
	/** Card title */
	title?: string;
	/** Card description or secondary value */
	description?: string | number;
	/** Primary metric value */
	value?: string | number;
	/** Icon name */
	icon?: string;
	/** Custom color for value (card type only) */
	color?: string;
	/** Visual type/theme of the card */
	type?: MetricType;
	/** Size variant */
	size?: MetricSize;
	/** Info message for tooltip or display */
	infoMessage?: string;
	/** Info message type/color */
	infoType?: InfoType;
	/** Minimum width for tooltip */
	tooltipMinWidth?: string;
	/** Loading state */
	loading?: boolean;
	/** Disable tooltip for info message */
	noTooltip?: boolean;
	/** Make title bold */
	boldTitle?: boolean;
	/** Accessible label for loading state */
	loadingLabel?: string;
}

/**
 * Screen reader announcement messages
 */
export interface ScreenReaderMessages {
	/** Message when metric value changes */
	valueChanged: (title: string, newValue: string | number, oldValue?: string | number) => string;
	/** Message for trend changes */
	trendChanged: (title: string, trend: TrendInfo) => string;
	/** Message for loading state */
	loading: (title: string) => string;
	/** Message for interactive card */
	interactive: (title: string) => string;
	/** Message for metric context */
	context: (title: string, context: string) => string;
}

/**
 * Default screen reader messages
 */
export const defaultScreenReaderMessages: ScreenReaderMessages = {
	valueChanged: (title, newValue, oldValue) => 
		oldValue 
			? `${title} metric updated from ${oldValue} to ${newValue}`
			: `${title} metric is ${newValue}`,
	
	trendChanged: (title, trend) => {
		const direction = trend.direction === 'up' ? 'increased' : 
						 trend.direction === 'down' ? 'decreased' : 
						 trend.direction === 'stable' ? 'remained stable' : 'changed';
		const change = trend.change ? ` by ${trend.change}` : '';
		const period = trend.period ? ` ${trend.period}` : '';
		return `${title} has ${direction}${change}${period}`;
	},
	
	loading: (title) => `Loading ${title} metric data`,
	
	interactive: (title) => `${title} metric card. Press Enter or Space to interact`,
	
	context: (title, context) => `${title} metric from ${context}`
};

/**
 * Keyboard navigation constants
 */
export const KEYBOARD_KEYS = {
	ENTER: 'Enter',
	SPACE: ' ',
	ARROW_UP: 'ArrowUp',
	ARROW_DOWN: 'ArrowDown',
	ARROW_LEFT: 'ArrowLeft',
	ARROW_RIGHT: 'ArrowRight',
	TAB: 'Tab',
	ESCAPE: 'Escape'
} as const;

/**
 * High contrast color mappings for accessibility
 */
export const HIGH_CONTRAST_COLORS = {
	success: {
		background: '#004d00',
		foreground: '#ffffff',
		border: '#00ff00'
	},
	danger: {
		background: '#660000',
		foreground: '#ffffff', 
		border: '#ff0000'
	},
	warning: {
		background: '#664400',
		foreground: '#ffffff',
		border: '#ffaa00'
	},
	info: {
		background: '#000066',
		foreground: '#ffffff',
		border: '#0066ff'
	},
	default: {
		background: '#333333',
		foreground: '#ffffff',
		border: '#cccccc'
	}
} as const;
import type { App, Plugin } from 'vue';
import BToast from './BToast.vue';

/**
 * Toast type variants
 */
export type BToastType = "info" | "success" | "warning" | "danger" | "neutral";

/**
 * Toast position configuration
 */
export interface BToastPosition {
	top?: boolean;
	bottom?: boolean;
	left?: boolean;
	right?: boolean;
}

/**
 * Accessibility options for toast notifications
 */
export interface BToastAccessibilityOptions {
	/** ARIA live region priority: 'polite' | 'assertive' | 'off' */
	ariaLive?: 'polite' | 'assertive' | 'off';
	/** ARIA role override */
	role?: 'alert' | 'status' | 'log';
	/** Custom ARIA label */
	ariaLabel?: string;
	/** Screen reader announcement text override */
	announcement?: string;
	/** Whether to announce the toast content */
	announceContent?: boolean;
	/** Focus management option */
	focusManagement?: 'none' | 'trap' | 'auto';
	/** Auto-dismiss behavior */
	autoDismiss?: boolean;
	/** Timeout for auto-dismiss (milliseconds) */
	dismissTimeout?: number;
}

/**
 * Enhanced toast options with comprehensive accessibility features
 */
export interface BToastOptions extends BToastPosition, BToastAccessibilityOptions {
	id: string;
	title?: string;
	message?: string;
	type?: BToastType;
	button?: string;
	action?: () => void;
	timeout?: number;
	/** Prevent auto-dismiss on hover/focus */
	persistOnHover?: boolean;
	/** Allow manual dismiss via keyboard */
	dismissible?: boolean;
	/** Custom icon for the toast */
	icon?: string;
	/** Progress indicator for timed toasts */
	showProgress?: boolean;
}

export default {
    install(Vue: App) {
        Vue.component('BToast', BToast);
    },
} as Plugin;

export {
    BToast,
}

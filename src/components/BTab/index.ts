import type { App, Plugin } from 'vue';
import BTab from './BTab.vue';

/**
 * Tab item interface for object-based tabs with accessibility support
 */
export interface BTabItem {
	value: string;
	label?: string;
	icon?: string;
	disabled?: boolean;
	closable?: boolean;
	ariaLabel?: string;
	ariaDescription?: string;
}

/**
 * Tab item type - can be a simple string or TabItem object
 */
export type BTabItemType = string | BTabItem;

/**
 * Accessibility configuration for the tab component
 */
export interface BTabAccessibilityConfig {
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
	/** Custom screen reader announcements */
	customAnnouncements?: {
		tabChange?: (label: string, position: number, total: number) => string;
		tabClosed?: (label: string) => string;
		tabAdded?: (label: string) => string;
	};
}

/**
 * Enhanced tab item with computed accessibility information
 */
export interface BTabEnhancedItem {
	original: BTabItemType;
	value: string;
	label: string;
	icon?: string;
	disabled: boolean;
	closable: boolean;
	ariaLabel?: string;
	ariaDescription?: string;
	tabId: string;
	panelId: string;
	position: number;
	total: number;
}

/**
 * Event payloads for tab component events
 */
export interface BTabChangeEvent {
	newTab: BTabItemType;
	previousTab?: BTabItemType;
	newIndex: number;
	previousIndex: number;
}

export interface BTabCloseEvent {
	tab: BTabItemType;
	index: number;
}

export interface BTabFocusEvent {
	tab: BTabItemType;
	index: number;
}

export interface BTabBeforeChangeEvent extends BTabChangeEvent {
	cancel: () => void;
}

export default {
    install(Vue: App) {
        Vue.component('BTab', BTab);
    },
} as Plugin;

export {
    BTab,
}

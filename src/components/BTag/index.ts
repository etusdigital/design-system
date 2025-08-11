import type { App, Plugin } from 'vue';
import BTag from './BTag.vue';

/**
 * Tag semantic roles for accessibility
 */
export type BTagSemanticRole = 'generic' | 'button' | 'link' | 'status' | 'group' | 'listitem';

/**
 * Tag interaction types for accessibility
 */
export type BTagInteractionType = 'static' | 'removable' | 'clickable' | 'selectable';

/**
 * Tag color variants with semantic meaning
 */
export type BTagColor = 'primary' | 'informative' | 'success' | 'warning' | 'danger' | 'neutral';

/**
 * Tag size variants
 */
export type BTagSize = 'small' | 'medium' | 'large';

/**
 * Tag visual variants
 */
export type BTagVariant = 'default' | 'secondary' | 'heavy' | 'outline';

/**
 * Accessibility properties for tags
 */
export interface BTagAccessibilityProps {
	/** ARIA label for the tag */
	ariaLabel?: string;
	/** ARIA description for complex tags */
	ariaDescription?: string;
	/** Semantic role of the tag */
	role?: BTagSemanticRole;
	/** Whether the tag is currently selected/active */
	selected?: boolean;
	/** Whether the tag is disabled */
	disabled?: boolean;
	/** ARIA described-by reference */
	ariaDescribedBy?: string;
	/** Custom close button label for screen readers */
	closeLabel?: string;
	/** Whether to announce state changes */
	announceChanges?: boolean;
	/** Category/group for related tags */
	category?: string;
	/** Value for selectable tags */
	value?: string | number;
}

/**
 * Enhanced tag properties with comprehensive accessibility
 */
export interface BTagProps extends BTagAccessibilityProps {
	/** Tag text content */
	text?: string;
	/** Tag color variant with semantic meaning */
	color?: BTagColor;
	/** Tag size */
	size?: BTagSize;
	/** Visual variant */
	variant?: BTagVariant;
	/** Loading state */
	loading?: boolean;
	/** Whether the tag can be removed */
	closeable?: boolean;
	/** Icon name */
	icon?: string;
	/** Whether icon appears after text */
	isAppendedIcon?: boolean;
	/** Interaction behavior */
	interaction?: BTagInteractionType;
	/** Whether tag is clickable */
	clickable?: boolean;
	/** Maximum width before truncation */
	maxWidth?: string;
	/** Truncate long text */
	truncate?: boolean;
	/** Custom CSS classes */
	customClass?: string;
}

export default {
    install(Vue: App) {
        Vue.component('BTag', BTag);
    },
} as Plugin;

export {
    BTag,
}

import type { App, Plugin } from 'vue';
import BAvatar from './BAvatar.vue';

/**
 * Avatar semantic roles for accessibility
 */
export type BAvatarSemanticRole = 'img' | 'button' | 'presentation';

/**
 * Avatar status indicators for user presence
 */
export type BAvatarStatus = 'online' | 'offline' | 'away' | 'busy' | 'none';

/**
 * Avatar size variants with accessibility considerations
 */
export type BAvatarSize = 'small' | 'medium' | 'large' | 'xl';

/**
 * Avatar shape variants
 */
export type BAvatarShape = 'circle' | 'square' | 'rounded';

/**
 * Accessibility properties for avatars
 */
export interface BAvatarAccessibilityProps {
	/** Alternative text for the avatar image */
	alt?: string;
	/** ARIA label override */
	ariaLabel?: string;
	/** Whether avatar is interactive (clickable) */
	interactive?: boolean;
	/** Semantic role of the avatar */
	role?: BAvatarSemanticRole;
	/** ARIA described-by reference */
	ariaDescribedBy?: string;
	/** Whether to announce status changes */
	announceStatusChanges?: boolean;
}

/**
 * Enhanced avatar properties with comprehensive accessibility
 */
export interface BAvatarProps extends BAvatarAccessibilityProps {
	/** User's full name for initials generation */
	name?: string;
	/** Avatar image source URL */
	src?: string;
	/** Avatar size variant */
	size?: BAvatarSize;
	/** User's status indicator */
	status?: BAvatarStatus;
	/** Loading state for async image loading */
	loading?: boolean;
	/** Custom initials override */
	initials?: string;
	/** Avatar shape variant */
	shape?: BAvatarShape;
	/** Border styling */
	border?: boolean;
	/** High contrast mode enhancement */
	highContrast?: boolean;
}

export default {
    install(Vue: App) {
        Vue.component('BAvatar', BAvatar);
    },
} as Plugin;

export {
    BAvatar,
}

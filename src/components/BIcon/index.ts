import type { App, Plugin } from 'vue';
import BIcon from './BIcon.vue';

/**
 * Icon semantic types for accessibility
 */
export type BIconSemanticType = 'decorative' | 'informative' | 'interactive' | 'status';

/**
 * Color variants for theming
 */
export type BIconColorVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Animation types for enhanced UX
 */
export type BIconAnimationType = 'none' | 'spin' | 'pulse' | 'bounce' | 'fade';

/**
 * Accessibility properties for icons
 */
export interface BIconAccessibilityProps {
    /** Alternative text for screen readers */
    alt?: string;
    /** ARIA label override */
    ariaLabel?: string;
    /** Icon semantic purpose */
    semantic?: BIconSemanticType;
    /** Whether icon is purely decorative */
    decorative?: boolean;
    /** ARIA role override */
    role?: string;
    /** ARIA describedby reference */
    ariaDescribedBy?: string;
    /** Whether to announce status changes */
    announceChanges?: boolean;
}

/**
 * Enhanced icon properties with comprehensive accessibility
 */
export interface BIconProps extends BIconAccessibilityProps {
    /** Material icon name */
    name?: string;
    /** Icon size (CSS units) */
    size?: string;
    /** Whether to use filled variant */
    filled?: boolean;
    /** Color theme variant */
    color?: BIconColorVariant;
    /** Animation type */
    animation?: BIconAnimationType;
    /** Whether icon is clickable/interactive */
    clickable?: boolean;
    /** Loading state for status icons */
    loading?: boolean;
    /** Custom CSS class */
    customClass?: string;
    /** Icon rotation in degrees */
    rotation?: number;
}

export default {
    install(Vue: App) {
        Vue.component('BIcon', BIcon);
    },
} as Plugin;

export {
    BIcon,
}

import type { App, Plugin } from 'vue';
import BSwitch from './BSwitch.vue';

// Export types for TypeScript users
export type { 
	BSwitchProps, 
	BSwitchAccessibilityProps, 
	BSwitchEmits, 
	BSwitchState,
	BSwitchSize,
	BSwitchVariant,
	BSwitchValidationState,
	BSwitchAnimationType,
	BSwitchInteractionMode,
	BSwitchRole,
	BSwitchChangeEvent,
	BSwitchFocusEvent,
	BSwitchValidationEvent,
	BSwitchKeyboardEvent,
	BSwitchAnimationEvent,
	BSwitchValidationResult,
	BSwitchKeyboardConfig,
	BSwitchGroupConfig,
	BSwitchValidationConfig,
	BSwitchAnimationConfig,
	BSwitchThemeConfig,
	BSwitchItem,
	BSwitchAriaAttributes,
	BSwitchAnnouncementTemplates,
	BSwitchAccessibilityHelpers
} from './BSwitch.types';

export default {
    install(Vue: App) {
        Vue.component('BSwitch', BSwitch);
    },
} as Plugin;

export {
    BSwitch,
}
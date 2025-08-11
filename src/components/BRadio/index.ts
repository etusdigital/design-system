import type { App, Plugin } from 'vue';
import BRadio from './BRadio.vue';
import BRadioGroup from './BRadioGroup.vue';
// Import component props from types file instead of vue files
import type { BRadioProps, BRadioGroupProps } from './BRadio.types';
import type { BRadioGroupValue, BRadioGroupContext } from './BRadio.vue';

// Import all types from the comprehensive types file
import type {
	BRadioVariant,
	BRadioOrientation,
	BRadioNavigationDirection,
	BRadioAriaAttributes,
	BRadioGroupAriaAttributes,
	BRadioAccessibilityConfig,
	BRadioGroupAccessibilityConfig,
	BRadioKeyboardNavigation,
	BRadioScreenReaderConfig,
	BRadioValidationState,
	BRadioEvents,
	BRadioGroupEvents,
	BRadioSlots,
	BRadioGroupSlots,
	BRadioTestingUtils,
	BRadioTestSelectors,
	BRadioAccessibilityChecklist,
	BRadioCompositionUtils,
} from './BRadio.types';

// Legacy type aliases for backward compatibility
type RadioAccessibilityConfig = BRadioAccessibilityConfig;
type RadioGroupAccessibilityConfig = BRadioGroupAccessibilityConfig;
type RadioKeyboardNavigation = BRadioKeyboardNavigation;

export default {
    install(Vue: App) {
        Vue.component('BRadio', BRadio);
        Vue.component('BRadioGroup', BRadioGroup);
    },
} as Plugin;

export {
    BRadio,
    BRadioGroup,
    type BRadioProps,
    type BRadioGroupProps,
    type BRadioGroupValue,
    type BRadioGroupContext,
}

// Export all comprehensive types
export type {
    BRadioVariant,
    BRadioOrientation,
    BRadioNavigationDirection,
    BRadioAriaAttributes,
    BRadioGroupAriaAttributes,
    BRadioAccessibilityConfig,
    BRadioGroupAccessibilityConfig,
    BRadioKeyboardNavigation,
    BRadioScreenReaderConfig,
    BRadioValidationState,
    BRadioEvents,
    BRadioGroupEvents,
    BRadioSlots,
    BRadioGroupSlots,
    BRadioTestingUtils,
    BRadioTestSelectors,
    BRadioAccessibilityChecklist,
    BRadioCompositionUtils,
    // Legacy aliases
    RadioAccessibilityConfig,
    RadioGroupAccessibilityConfig,
    RadioKeyboardNavigation,
}

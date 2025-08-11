import type { App, Plugin } from 'vue';
import BRoundButton from './BRoundButton.vue';

export default {
    install(Vue: App) {
        Vue.component('BRoundButton', BRoundButton);
    },
} as Plugin;

export {
    BRoundButton,
};

// Export types for TypeScript users
export type {
    BRoundButtonProps,
    BRoundButtonEmits,
    BRoundButtonSlots,
    BRoundButtonInstance,
    AccessibilityFeatures,
    KeyboardInteractionHandlers,
    TouchTargetValidation,
    ScreenReaderAnnouncements,
    ARIAStateMapping,
    FocusManagement,
    IconLabeling,
} from './BRoundButton.types';

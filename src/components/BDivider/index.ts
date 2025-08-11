import type { App, Plugin } from 'vue';
import BDivider from './BDivider.vue';

export default {
    install(Vue: App) {
        Vue.component('BDivider', BDivider);
    },
} as Plugin;

export {
    BDivider,
};

// Re-export types for convenience
export type {
    BDividerProps,
    BDividerAriaAttributes,
    BDividerAccessibilityConfig,
    BDividerEvents,
    BDividerSlots,
    BDividerInstance,
    BDividerPositioning,
    BDividerStyling,
} from './BDivider.types';

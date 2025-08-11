import type { App, Plugin } from 'vue';
import BDropdown from './BDropdown.vue';

export default {
    install(Vue: App) {
        Vue.component('BDropdown', BDropdown);
    },
} as Plugin;

export {
    BDropdown,
}

// Export TypeScript interfaces for consumer use
export type {
    BDropdownValue,
} from './BDropdown.vue';

export type {
    DropdownAccessibilityConfig,
    DropdownFocusConfig,
    DropdownAccessibilityMessages,
    AccessibleDropdownItem,
    DropdownNavigationState,
    WCAGLevel,
    BDropdownAccessibilityProps,
} from './BDropdown.types';

import type { App, Plugin } from 'vue';
import BSelect from './BSelect.vue';

export default {
    install(Vue: App) {
        Vue.component('BSelect', BSelect);
    },
} as Plugin;

export {
    BSelect,
}

// Export TypeScript interfaces for consumer use
export type {
    BSelectExpandedExtra,
    BSelectItem,
    BSelectItemType,
} from './BSelect.vue';

export type {
    BSelectAccessibilityConfig,
    BSelectAccessibilityProps,
    BSelectKeyboardNavigation,
    BSelectScreenReaderConfig,
    BSelectFocusManagement,
    BSelectTypeAheadConfig,
    BSelectEmits,
    BSelectSlots,
    BSelectExpose,
} from './BSelect.types';

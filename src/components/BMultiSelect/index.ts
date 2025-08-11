import type { App, Plugin } from 'vue';
import BMultiSelect from './BMultiSelect.vue';

export default {
    install(Vue: App) {
        Vue.component('BMultiSelect', BMultiSelect);
    },
} as Plugin;

export {
    BMultiSelect,
}

// Export TypeScript interfaces for consumer use
export type {
    BMultiSelectModelExtra,
    BMultiSelectExpandedExtra,
    BMultiSelectItem,
    BMultiSelectItemType,
} from './BMultiSelect.types';

// Export comprehensive accessibility types
export type {
    BMultiSelectProps,
    BMultiSelectEmits,
    BMultiSelectSlots,
    BMultiSelectAccessibilityProps,
    BMultiSelectKeyboardConfig,
    BMultiSelectScreenReaderConfig,
    BMultiSelectSelectedItemConfig,
    BMultiSelectItemState,
    BMultiSelectInstance,
} from './BMultiSelect.types';

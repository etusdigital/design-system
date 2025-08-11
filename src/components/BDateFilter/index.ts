import type { App, Plugin } from 'vue';
import BDateFilter from './BDateFilter.vue';
import type { BDateFilterModelValue, BDateFilterOption } from './BDateFilter.vue';
import type {
    BDateFilterProps,
    BDateFilterAccessibilityProps,
    BDateFilterEmits,
    KeyboardNavigationConfig,
    ScreenReaderConfig,
    AriaConfig,
    FocusConfig,
    AccessibilityAttributes,
    DateFormattingUtils,
    FilterState,
    ValidationUtils
} from './BDateFilter.types';

export default {
    install(Vue: App) {
        Vue.component('BDateFilter', BDateFilter);
    },
} as Plugin;

export {
    BDateFilter,
    type BDateFilterProps,
    type BDateFilterModelValue,
    type BDateFilterOption,
    type BDateFilterAccessibilityProps,
    type BDateFilterEmits,
    type KeyboardNavigationConfig,
    type ScreenReaderConfig,
    type AriaConfig,
    type FocusConfig,
    type AccessibilityAttributes,
    type DateFormattingUtils,
    type FilterState,
    type ValidationUtils,
}

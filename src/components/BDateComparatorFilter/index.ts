import type { App, Plugin } from 'vue';
import BDateComparatorFilter from './BDateComparatorFilter.vue';
import type { 
    BDateComparatorFilterProps,
    BDateComparatorFilterEmits,
    BDateComparatorFilterModelValue,
    DateOption,
    DateTemplate,
    FilterLoadingState,
    FilterResultInfo,
    BDateComparatorFilterAccessibilityConfig,
    KeyboardNavigationConfig,
    UseDateComparatorFilterAccessibility
} from './BDateComparatorFilter.types';

export default {
    install(Vue: App) {
        Vue.component('BDateComparatorFilter', BDateComparatorFilter);
    },
} as Plugin;

export {
    BDateComparatorFilter,
    type BDateComparatorFilterProps,
    type BDateComparatorFilterEmits,
    type BDateComparatorFilterModelValue,
    type DateOption,
    type DateTemplate,
    type FilterLoadingState,
    type FilterResultInfo,
    type BDateComparatorFilterAccessibilityConfig,
    type KeyboardNavigationConfig,
    type UseDateComparatorFilterAccessibility,
}

import type { App, Plugin } from 'vue';
import BAutoComplete from './BAutoComplete.vue';

export default {
    install(Vue: App) {
        Vue.component('BAutoComplete', BAutoComplete);
    },
} as Plugin;

export {
    BAutoComplete,
}

// Export TypeScript interfaces for consumer use
export type {
    BAutoCompleteItem,
    BAutoCompleteItemType,
} from './BAutoComplete.vue';

// Export comprehensive accessibility types
export type {
    BAutoCompleteAccessibilityProps,
    ComboboxAriaConfig,
    AutoCompleteKeyboardConfig,
    AutoCompleteKeyboardContext,
    SearchResultAnnouncement,
    ScreenReaderConfig,
    MultiSelectConfig,
    AsyncSearchConfig,
    BAutoCompleteEvents,
    UseAutoCompleteAccessibilityReturn,
} from './BAutoComplete.types';

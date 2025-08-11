import type { App, Plugin } from 'vue';
import BFilter from './BFilter.vue';

export default {
    install(Vue: App) {
        Vue.component('BFilter', BFilter);
    },
} as Plugin;

export {
    BFilter,
}

// Export TypeScript interfaces for consumer use
export type {
    BFilterItem,
    BFilterModelValue,
    BFilterModelExtra,
} from './BFilter.vue';

// Export comprehensive TypeScript interfaces
export type {
    BFilterProps,
    BFilterEvents,
    BFilterAccessibility,
    BFilterMode,
    BFilterLandmarkRole,
    DEFAULT_FILTER_ACCESSIBILITY,
} from './BFilter.types';

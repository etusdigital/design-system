import type { App, Plugin } from 'vue';
import DateComparatorFilter from './DateComparatorFilter.vue';

export default {
    install(Vue: App) {
        Vue.component('DateComparatorFilter', DateComparatorFilter);
    },
} as Plugin;

export {
    DateComparatorFilter,
}

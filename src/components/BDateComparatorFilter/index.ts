import type { App, Plugin } from 'vue';
import BDateComparatorFilter from './BDateComparatorFilter.vue';

export default {
    install(Vue: App) {
        Vue.component('BDateComparatorFilter', BDateComparatorFilter);
    },
} as Plugin;

export {
    BDateComparatorFilter,
}

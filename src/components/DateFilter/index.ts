import type { App, Plugin } from 'vue';
import DateFilter from './DateFilter.vue';

export default {
    install(Vue: App) {
        Vue.component('DateFilter', DateFilter);
    },
} as Plugin;

export {
    DateFilter,
}

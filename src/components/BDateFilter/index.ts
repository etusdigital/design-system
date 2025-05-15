import type { App, Plugin } from 'vue';
import BDateFilter from './BDateFilter.vue';

export default {
    install(Vue: App) {
        Vue.component('BDateFilter', BDateFilter);
    },
} as Plugin;

export {
    BDateFilter,
}

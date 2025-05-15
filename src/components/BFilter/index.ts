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

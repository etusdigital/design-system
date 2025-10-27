import type { App, Plugin } from 'vue';
import Filter from './Filter.vue';

export default {
    install(Vue: App) {
        Vue.component('Filter', Filter);
    },
} as Plugin;

export {
    Filter,
}

import type { App, Plugin } from 'vue';
import BPagination from './BPagination.vue';

export default {
    install(Vue: App) {
        Vue.component('BPagination', BPagination);
    },
} as Plugin;

export {
    BPagination,
}

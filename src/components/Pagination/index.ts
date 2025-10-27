import type { App, Plugin } from 'vue';
import Pagination from './Pagination.vue';

export default {
    install(Vue: App) {
        Vue.component('Pagination', Pagination);
    },
} as Plugin;

export {
    Pagination,
}

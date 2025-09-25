import type { App, Plugin } from 'vue';
import Table from './Table.vue';

export default {
    install(Vue: App) {
        Vue.component('Table', Table);
    },
} as Plugin;

export {
    Table,
}

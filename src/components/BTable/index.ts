import type { App, Plugin } from 'vue';
import BTable from './BTable.vue';

export default {
    install(Vue: App) {
        Vue.component('BTable', BTable);
    },
} as Plugin;

export {
    BTable,
}

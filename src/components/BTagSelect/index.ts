import type { App, Plugin } from 'vue';
import BTagSelect from './BTagSelect.vue';

export default {
    install(Vue: App) {
        Vue.component('BTagSelect', BTagSelect);
    },
} as Plugin;

export {
    BTagSelect,
}
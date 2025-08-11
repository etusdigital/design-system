import type { App, Plugin } from 'vue';
import BTagSelect from './BTagSelect.vue';
import type { BTagSelectProps, BTagSelectItem, BTagSelectModelValue } from './BTagSelect.vue';

export default {
    install(Vue: App) {
        Vue.component('BTagSelect', BTagSelect);
    },
} as Plugin;

export {
    BTagSelect,
    type BTagSelectProps,
    type BTagSelectItem,
    type BTagSelectModelValue,
}
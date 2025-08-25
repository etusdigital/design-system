import type { App, Plugin } from 'vue';
import BMultiSelect from './BMultiSelect.vue';

export default {
    install(Vue: App) {
        Vue.component('BMultiSelect', BMultiSelect);
    },
} as Plugin;

export {
    BMultiSelect,
}

import type { App, Plugin } from 'vue';
import BSmartSelect from './BSmartSelect.vue';

export default {
    install(Vue: App) {
        Vue.component('BSmartSelect', BSmartSelect);
    },
} as Plugin;

export {
    BSmartSelect,
}

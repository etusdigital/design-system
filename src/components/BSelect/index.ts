import type { App, Plugin } from 'vue';
import BSelect from './BSelect.vue';

export default {
    install(Vue: App) {
        Vue.component('BSelect', BSelect);
    },
} as Plugin;

export {
    BSelect,
}

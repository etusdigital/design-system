import type { App, Plugin } from 'vue';
import BDropdown from './BDropdown.vue';

export default {
    install(Vue: App) {
        Vue.component('BDropdown', BDropdown);
    },
} as Plugin;

export {
    BDropdown,
}

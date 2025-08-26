import type { App, Plugin } from 'vue';
import BCheckbox from './BCheckbox.vue';

export default {
    install(Vue: App) {
        Vue.component('BCheckbox', BCheckbox);
    },
} as Plugin;

export {
    BCheckbox,
}

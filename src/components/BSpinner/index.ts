import type { App, Plugin } from 'vue';
import BSpinner from './BSpinner.vue';

export default {
    install(Vue: App) {
        Vue.component('BSpinner', BSpinner);
    },
} as Plugin;

export {
    BSpinner,
}

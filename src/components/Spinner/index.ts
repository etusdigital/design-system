import type { App, Plugin } from 'vue';
import Spinner from './Spinner.vue';

export default {
    install(Vue: App) {
        Vue.component('Spinner', Spinner);
    },
} as Plugin;

export {
    Spinner,
}

import type { App, Plugin } from 'vue';
import BToast from './BToast.vue';

export default {
    install(Vue: App) {
        Vue.component('BToast', BToast);
    },
} as Plugin;

export {
    BToast,
}

import type { App, Plugin } from 'vue';
import BConfirm from './BConfirm.vue';

export default {
    install(Vue: App) {
        Vue.component('BConfirm', BConfirm);
    },
} as Plugin;

export {
    BConfirm,
}

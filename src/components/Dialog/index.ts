import type { App, Plugin } from 'vue';
import Dialog from './Dialog.vue';

export default {
    install(Vue: App) {
        Vue.component('Dialog', Dialog);
    },
} as Plugin;

export {
    Dialog,
}

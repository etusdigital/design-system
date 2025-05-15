import type { App, Plugin } from 'vue';
import BDialog from './BDialog.vue';

export default {
    install(Vue: App) {
        Vue.component('BDialog', BDialog);
    },
} as Plugin;

export {
    BDialog,
}

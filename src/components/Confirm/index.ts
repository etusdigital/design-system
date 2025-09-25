import type { App, Plugin } from 'vue';
import Confirm from './Confirm.vue';

export default {
    install(Vue: App) {
        Vue.component('Confirm', Confirm);
    },
} as Plugin;

export {
    Confirm,
}

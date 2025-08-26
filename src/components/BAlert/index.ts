import type { App, Plugin } from 'vue';
import BAlert from './BAlert.vue';

export default {
    install(Vue: App) {
        Vue.component('BAlert', BAlert);
    },
} as Plugin;

export {
    BAlert,
}

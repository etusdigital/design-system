import type { App, Plugin } from 'vue';
import BRadio from './BRadio.vue';

export default {
    install(Vue: App) {
        Vue.component('BRadio', BRadio);
    },
} as Plugin;

export {
    BRadio,
}

import type { App, Plugin } from 'vue';
import BCrop from './BCrop.vue';

export default {
    install(Vue: App) {
        Vue.component('BCrop', BCrop);
    },
} as Plugin;

export {
    BCrop,
}

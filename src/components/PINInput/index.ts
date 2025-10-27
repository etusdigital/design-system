import type { App, Plugin } from 'vue';
import PINInput from './PINInput.vue';

export default {
    install(Vue: App) {
        Vue.component('PINInput', PINInput);
    },
} as Plugin;

export {
    PINInput,
}
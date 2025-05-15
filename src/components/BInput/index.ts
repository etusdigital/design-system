import type { App, Plugin } from 'vue';
import BInput from './BInput.vue';

export default {
    install(Vue: App) {
        Vue.component('BInput', BInput);
    },
} as Plugin;

export {
    BInput,
}

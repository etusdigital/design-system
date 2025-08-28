import type { App, Plugin } from 'vue';
import Input from './Input.vue';

export default {
    install(Vue: App) {
        Vue.component('Input', Input);
    },
} as Plugin;

export {
    Input,
}

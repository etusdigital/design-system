import type { App, Plugin } from 'vue';
import Textarea from './Textarea.vue';

export default {
    install(Vue: App) {
        Vue.component('Textarea', Textarea);
    },
} as Plugin;

export {
    Textarea,
}

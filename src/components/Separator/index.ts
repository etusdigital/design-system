import type { App, Plugin } from 'vue';
import Separator from './Separator.vue';

export default {
    install(Vue: App) {
        Vue.component('Separator', Separator);
    },
} as Plugin;

export {
    Separator,
}

import type { App, Plugin } from 'vue';
import Conector from './Conector.vue';

export default {
    install(Vue: App) {
        Vue.component('Conector', Conector);
    },
} as Plugin;

export {
    Conector,
}

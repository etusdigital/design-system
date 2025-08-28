import type { App, Plugin } from 'vue';
import Divider from './Divider.vue';

export default {
    install(Vue: App) {
        Vue.component('Divider', Divider);
    },
} as Plugin;

export {
    Divider,
}

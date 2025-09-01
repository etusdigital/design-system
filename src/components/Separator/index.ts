import type { App, Plugin } from 'vue';
import Divider from './Separator.vue';

export default {
    install(Vue: App) {
        Vue.component('Divider', Divider);
    },
} as Plugin;

export {
    Divider,
}

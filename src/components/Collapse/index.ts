import type { App, Plugin } from 'vue';
import Collapse from './Collapse.vue';

export default {
    install(Vue: App) {
        Vue.component('Collapse', Collapse);
    },
} as Plugin;

export {
    Collapse,
}

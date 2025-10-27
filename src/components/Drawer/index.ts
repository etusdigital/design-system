import type { App, Plugin } from 'vue';
import Drawer from './Drawer.vue';

export default {
    install(Vue: App) {
        Vue.component('Drawer', Drawer);
    },
} as Plugin;

export {
    Drawer,
}

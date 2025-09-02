import type { App, Plugin } from 'vue';
import Sidebar from './Sidebar.vue';

export default {
    install(Vue: App) {
        Vue.component('Sidebar', Sidebar);
    },
} as Plugin;

export {
    Sidebar,
}

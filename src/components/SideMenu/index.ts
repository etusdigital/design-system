import type { App, Plugin } from 'vue';
import SideMenu from './SideMenu.vue';

export default {
    install(Vue: App) {
        Vue.component('SideMenu', SideMenu);
    },
} as Plugin;

export {
    SideMenu,
}

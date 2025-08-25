import type { App, Plugin } from 'vue';
import BSideMenu from './BSideMenu.vue';

export default {
    install(Vue: App) {
        Vue.component('BSideMenu', BSideMenu);
    },
} as Plugin;

export {
    BSideMenu,
}

import type { App, Plugin } from 'vue';
import Menu from './Menu.vue';

export default {
    install(Vue: App) {
        Vue.component('Menu', Menu);
    },
} as Plugin;

export {
    Menu,
}

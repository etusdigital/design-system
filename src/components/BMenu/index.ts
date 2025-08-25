import type { App, Plugin } from 'vue';
import BMenu from './BMenu.vue';

export default {
    install(Vue: App) {
        Vue.component('BMenu', BMenu);
    },
} as Plugin;

export {
    BMenu,
}

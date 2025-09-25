import type { App, Plugin } from 'vue';
import RoundMenu from './RoundMenu.vue';

export default {
    install(Vue: App) {
        Vue.component('RoundMenu', RoundMenu);
    },
} as Plugin;

export {
    RoundMenu,
}

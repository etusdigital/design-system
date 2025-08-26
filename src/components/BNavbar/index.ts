import type {App, Plugin} from 'vue';
import BNavbar from './BNavbar.vue';

export default {
    install(Vue: App) {
        Vue.component('BNavbar', BNavbar);
    },
} as Plugin;

export {
    BNavbar,
}
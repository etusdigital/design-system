import type {App, Plugin} from 'vue';
import Navbar from './Navbar.vue';

export default {
    install(Vue: App) {
        Vue.component('Navbar', Navbar);
    },
} as Plugin;

export {
    Navbar,
}
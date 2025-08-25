import type { App, Plugin } from 'vue';
import BSidebar from './BSidebar.vue';

export default {
    install(Vue: App) {
        Vue.component('BSidebar', BSidebar);
    },
} as Plugin;

export {
    BSidebar,
}

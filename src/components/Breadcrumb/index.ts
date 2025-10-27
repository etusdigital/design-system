import type { App, Plugin } from 'vue';
import Breadcrumb from './Breadcrumb.vue';

export default {
    install(Vue: App) {
        Vue.component('Breadcrumb', Breadcrumb);
    },
} as Plugin;

export {
    Breadcrumb,
}

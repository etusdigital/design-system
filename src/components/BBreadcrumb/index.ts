import type { App, Plugin } from 'vue';
import BBreadcrumb from './BBreadcrumb.vue';

export default {
    install(Vue: App) {
        Vue.component('BBreadcrumb', BBreadcrumb);
    },
} as Plugin;

export {
    BBreadcrumb,
}

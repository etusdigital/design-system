import type { App, Plugin } from 'vue';
import BCollapse from './BCollapse.vue';

export default {
    install(Vue: App) {
        Vue.component('BCollapse', BCollapse);
    },
} as Plugin;

export {
    BCollapse,
}

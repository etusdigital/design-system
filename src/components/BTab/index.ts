import type { App, Plugin } from 'vue';
import BTab from './BTab.vue';

export default {
    install(Vue: App) {
        Vue.component('BTab', BTab);
    },
} as Plugin;

export {
    BTab,
}

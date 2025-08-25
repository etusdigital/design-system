import type { App, Plugin } from 'vue';
import BHistory from './BHistory.vue';

export default {
    install(Vue: App) {
        Vue.component('BHistory', BHistory);
    },
} as Plugin;

export {
    BHistory,
}

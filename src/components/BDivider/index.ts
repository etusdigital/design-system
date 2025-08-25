import type { App, Plugin } from 'vue';
import BDivider from './BDivider.vue';

export default {
    install(Vue: App) {
        Vue.component('BDivider', BDivider);
    },
} as Plugin;

export {
    BDivider,
}

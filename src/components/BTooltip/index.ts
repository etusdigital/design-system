import type { App, Plugin } from 'vue';
import BTooltip from './BTooltip.vue';

export default {
    install(Vue: App) {
        Vue.component('BTooltip', BTooltip);
    },
} as Plugin;

export {
    BTooltip,
}

import type { App, Plugin } from 'vue';
import Tooltip from './Tooltip.vue';

export default {
    install(Vue: App) {
        Vue.component('Tooltip', Tooltip);
    },
} as Plugin;

export {
    Tooltip,
}

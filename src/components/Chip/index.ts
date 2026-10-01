import type { App, Plugin } from 'vue';
import Chip from './Chip.vue';

export default {
    install(Vue: App) {
        Vue.component('Chip', Chip);
    },
} as Plugin;

export {
    Chip,
}

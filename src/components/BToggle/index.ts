import type { App, Plugin } from 'vue';
import BToggle from './BToggle.vue';

export default {
    install(Vue: App) {
        Vue.component('BToggle', BToggle);
    },
} as Plugin;

export {
    BToggle,
}

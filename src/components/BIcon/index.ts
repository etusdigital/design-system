import type { App, Plugin } from 'vue';
import BIcon from './BIcon.vue';

export default {
    install(Vue: App) {
        Vue.component('BIcon', BIcon);
    },
} as Plugin;

export {
    BIcon,
}

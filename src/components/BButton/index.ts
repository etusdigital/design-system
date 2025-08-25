import type { App, Plugin } from 'vue';
import BButton from './BButton.vue';

export default {
    install(Vue: App) {
        Vue.component('BButton', BButton);
    },
} as Plugin;

export {
    BButton,
}

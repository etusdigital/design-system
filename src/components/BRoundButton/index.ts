import type { App, Plugin } from 'vue';
import BRoundButton from './BRoundButton.vue';

export default {
    install(Vue: App) {
        Vue.component('BRoundButton', BRoundButton);
    },
} as Plugin;

export {
    BRoundButton,
}

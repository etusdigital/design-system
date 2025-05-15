import type { App, Plugin } from 'vue';
import BRadioButton from './BRadioButton.vue';

export default {
    install(Vue: App) {
        Vue.component('BRadioButton', BRadioButton);
    },
} as Plugin;

export {
    BRadioButton,
}

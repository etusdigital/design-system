import type { App, Plugin } from 'vue';
import RoundButton from './RoundButton.vue';

export default {
    install(Vue: App) {
        Vue.component('RoundButton', RoundButton);
    },
} as Plugin;

export {
    RoundButton,
}

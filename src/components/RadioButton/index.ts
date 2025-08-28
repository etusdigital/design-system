import type { App, Plugin } from 'vue';
import RadioButton from './RadioButton.vue';

export default {
    install(Vue: App) {
        Vue.component('RadioButton', RadioButton);
    },
} as Plugin;

export {
    RadioButton,
}

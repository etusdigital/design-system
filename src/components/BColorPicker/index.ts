import type { App, Plugin } from 'vue';
import BColorPicker from './BColorPicker.vue';

export default {
    install(Vue: App) {
        Vue.component('BColorPicker', BColorPicker);
    },
} as Plugin;

export {
    BColorPicker,
}

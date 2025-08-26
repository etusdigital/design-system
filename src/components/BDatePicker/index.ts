import type { App, Plugin } from 'vue';
import BDatePicker from './BDatePicker.vue';

export default {
    install(Vue: App) {
        Vue.component('BDatePicker', BDatePicker);
    },
} as Plugin;

export {
    BDatePicker,
}

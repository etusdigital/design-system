import type { App, Plugin } from 'vue';
import DatePicker from './DatePicker.vue';

export default {
    install(Vue: App) {
        Vue.component('DatePicker', DatePicker);
    },
} as Plugin;

export {
    DatePicker,
}

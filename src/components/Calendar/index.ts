import type { App, Plugin } from 'vue';
import Calendar from './Calendar.vue';

export default {
    install(Vue: App) {
        Vue.component('Calendar', Calendar);
    },
} as Plugin;

export {
    Calendar,
}

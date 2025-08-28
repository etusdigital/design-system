import type { App, Plugin } from 'vue';
import Date from './Date.vue';

export default {
    install(Vue: App) {
        Vue.component('Date', Date);
    },
} as Plugin;

export {
    Date,
}

import type { App, Plugin } from 'vue';
import BDate from './BDate.vue';

export default {
    install(Vue: App) {
        Vue.component('BDate', BDate);
    },
} as Plugin;

export {
    BDate,
}

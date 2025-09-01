import type { App, Plugin } from 'vue';
import Accordion from './Accordion.vue';

export default {
    install(Vue: App) {
        Vue.component('Accordion', Accordion);
    },
} as Plugin;

export {
    Accordion,
}

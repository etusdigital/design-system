import type { App, Plugin } from 'vue';
import Radio from './Radio.vue';

export default {
    install(Vue: App) {
        Vue.component('Radio', Radio);
    },
} as Plugin;

export {
    Radio,
}

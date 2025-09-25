import type { App, Plugin } from 'vue';
import History from './History.vue';

export default {
    install(Vue: App) {
        Vue.component('History', History);
    },
} as Plugin;

export {
    History,
}

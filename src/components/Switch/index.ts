import type { App, Plugin } from 'vue';
import Switch from './Switch.vue';

export default {
    install(Vue: App) {
        Vue.component('Switch', Switch);
    },
} as Plugin;

export {
    Switch,
}

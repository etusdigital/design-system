import type { App, Plugin } from 'vue';
import Tab from './Tab.vue';

export default {
    install(Vue: App) {
        Vue.component('Tab', Tab);
    },
} as Plugin;

export {
    Tab,
}

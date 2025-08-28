import type { App, Plugin } from 'vue';
import Toggle from './Toggle.vue';

export default {
    install(Vue: App) {
        Vue.component('Toggle', Toggle);
    },
} as Plugin;

export {
    Toggle,
}

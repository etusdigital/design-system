import type { App, Plugin } from 'vue';
import Icon from './Icon.vue';

export default {
    install(Vue: App) {
        Vue.component('Icon', Icon);
    },
} as Plugin;

export {
    Icon,
}

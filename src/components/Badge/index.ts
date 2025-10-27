import type { App, Plugin } from 'vue';
import Badge from './Badge.vue';

export default {
    install(Vue: App) {
        Vue.component('Badge', Badge);
    },
} as Plugin;

export {
    Badge,
}

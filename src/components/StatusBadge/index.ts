import type { App, Plugin } from 'vue';
import StatusBadge from './StatusBadge.vue';

export default {
    install(Vue: App) {
        Vue.component('StatusBadge', StatusBadge);
    },
} as Plugin;

export {
    StatusBadge,
}

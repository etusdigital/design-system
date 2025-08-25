import type { App, Plugin } from 'vue';
import BAvatar from './BAvatar.vue';

export default {
    install(Vue: App) {
        Vue.component('BAvatar', BAvatar);
    },
} as Plugin;

export {
    BAvatar,
}

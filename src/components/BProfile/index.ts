import type { App, Plugin } from 'vue';
import BProfile from './BProfile.vue';

export default {
    install(Vue: App) {
        Vue.component('BProfile', BProfile);
    },
} as Plugin;

export {
    BProfile,
}

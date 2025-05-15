import type { App, Plugin } from 'vue';
import BTag from './BTag.vue';

export default {
    install(Vue: App) {
        Vue.component('BTag', BTag);
    },
} as Plugin;

export {
    BTag,
}

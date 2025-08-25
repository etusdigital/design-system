import type { App, Plugin } from 'vue';
import BSkeleton from './BSkeleton.vue';

export default {
    install(Vue: App) {
        Vue.component('BSkeleton', BSkeleton);
    },
} as Plugin;

export {
    BSkeleton,
}

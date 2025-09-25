import type { App, Plugin } from 'vue';
import Skeleton from './Skeleton.vue';

export default {
    install(Vue: App) {
        Vue.component('Skeleton', Skeleton);
    },
} as Plugin;

export {
    Skeleton,
}

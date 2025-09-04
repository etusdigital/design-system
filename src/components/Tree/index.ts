import type { App, Plugin } from 'vue';
import Tree from './Tree.vue';

export default {
    install(Vue: App) {
        Vue.component('Tree', Tree);
    },
} as Plugin;

export {
    Tree,
}

import type { App, Plugin } from 'vue';
import BExpandableContainer from './BExpandableContainer.vue';

export default {
    install(Vue: App) {
        Vue.component('BExpandableContainer', BExpandableContainer);
    },
} as Plugin;

export {
    BExpandableContainer,
}

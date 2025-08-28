import type { App, Plugin } from 'vue';
import ExpandableContainer from './ExpandableContainer.vue';

export default {
    install(Vue: App) {
        Vue.component('ExpandableContainer', ExpandableContainer);
    },
} as Plugin;

export {
    ExpandableContainer,
}

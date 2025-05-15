import type { App, Plugin } from 'vue';
import BSelectContainer from './BSelectContainer.vue';

export * from '../../utils/components/BContainerModelExtra.types';

export default {
    install(Vue: App) {
        Vue.component('BSelectContainer', BSelectContainer);
    },
} as Plugin;

export {
    BSelectContainer,
}

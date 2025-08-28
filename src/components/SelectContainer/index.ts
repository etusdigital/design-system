import type { App, Plugin } from 'vue';
import SelectContainer from './SelectContainer.vue';

export * from '../../utils/components/ContainerModelExtra.types';

export default {
    install(Vue: App) {
        Vue.component('SelectContainer', SelectContainer);
    },
} as Plugin;

export {
    SelectContainer,
}

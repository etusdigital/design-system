import type { App, Plugin } from 'vue';
import BGroup from './BGroup.vue';
import type { BGroupProps } from './BGroup.vue';

export * from './BGroup.types';

export default {
    install(Vue: App) {
        Vue.component('BGroup', BGroup);
    },
} as Plugin;

export {
    BGroup,
    type BGroupProps,
}

import type { App, Plugin } from 'vue';
import BMenu from './BMenu.vue';
import type { BMenuProps, BMenuModelValue, BMenuItemAccessible } from './BMenu.vue';
import type * as BMenuTypes from './BMenu.types';

export default {
    install(Vue: App) {
        Vue.component('BMenu', BMenu);
    },
} as Plugin;

export {
    BMenu,
    type BMenuProps,
    type BMenuModelValue,
    type BMenuItemAccessible,
    type BMenuTypes,
};

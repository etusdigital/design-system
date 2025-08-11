import type { App, Plugin } from 'vue';
import BRoundMenu from './BRoundMenu.vue';

export default {
    install(Vue: App) {
        Vue.component('BRoundMenu', BRoundMenu);
    },
} as Plugin;

export {
    BRoundMenu,
};

export type {
    RadialNavigationItem,
    RoundMenuItem,
    RoundMenuTrigger,
    RoundMenuProps,
    RadialMenuKey,
    ClockPosition,
    MenuState,
    AccessibilityOptions,
    AnnouncementMessages,
} from './BRoundMenu.types';

import type { App, Plugin } from 'vue';
import BActionCard from './BActionCard.vue';

export default {
    install(Vue: App) {
        Vue.component('BActionCard', BActionCard);
    },
} as Plugin;

export {
    BActionCard,
};

export type {
    BActionCardAccessibilityProps,
    BActionCardInteractionProps,
    BActionCardEmits,
    BActionCardSlots,
    BActionCardProps,
} from './BActionCard.types';

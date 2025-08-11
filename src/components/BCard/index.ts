import type { App, Plugin } from 'vue';
import BCard from './BCard.vue';

export default {
    install(Vue: App) {
        Vue.component('BCard', BCard);
    },
} as Plugin;

export {
    BCard,
};

// Export types for external use
export type {
    BCardProps,
    BCardEmits,
    BCardSlots,
    BCardContext,
    BCardRole,
    BCardVariant,
    BCardSize,
    BCardLoadingState,
    BCardGroupConfig,
    BCardInteractionConfig,
    BCardMediaConfig,
    BCardSkipLinksConfig,
    BCardAriaAttributes,
    BCardNavigationKey,
    BCardA11yHelpers,
} from './BCard.types';

export { CARD_NAVIGATION_KEYS } from './BCard.types';

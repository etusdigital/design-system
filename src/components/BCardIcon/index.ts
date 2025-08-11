import type { App, Plugin } from 'vue';
import BCardIcon from './BCardIcon.vue';

// Export types for external use
export type {
    BCardIconProps,
    BCardIconEmits,
    BCardIconSlots,
    BCardIconContext,
    BCardIconSemantic,
    BCardIconInteractionType,
    BCardIconSize,
    BCardIconVariant,
    BCardIconLoadingState,
    BCardIconNavigationKey,
    BCardIconIconConfig,
    BCardIconGroupConfig,
    BCardIconInteractionConfig,
    BCardIconAccessibilityConfig,
    BCardIconLoadingConfig,
    BCardIconA11yHelpers
} from './BCardIcon.types';

export {
    CARD_ICON_NAVIGATION_KEYS,
    CARD_ICON_DEFAULTS,
    cardIconA11yUtils
} from './BCardIcon.types';

export default {
    install(Vue: App) {
        Vue.component('BCardIcon', BCardIcon);
    },
} as Plugin;

export {
    BCardIcon,
}

import type { App, Plugin } from 'vue';
import BButton from './BButton.vue';

// Export types for TypeScript users
export type {
    BButtonProps,
    BButtonEmits,
    BButtonAccessibilityProps,
    BButtonLoadingProps,
    BButtonIconProps,
    BButtonInteractionProps,
    BButtonGroupProps,
    BButtonKeyboardContext,
    BButtonTouchContext,
    BButtonAnnouncementContext,
    BButtonSize,
    BButtonColor,
    BButtonVariant,
    BButtonType,
    BButtonIconPosition,
    BButtonRole,
    BButtonPopupType,
    BButtonCurrent,
    BButtonGroupRole
} from './BButton.types';

// Plugin installation
export default {
    install(Vue: App) {
        Vue.component('BButton', BButton);
    },
} as Plugin;

// Component export
export {
    BButton,
};

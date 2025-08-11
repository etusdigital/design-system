import type { App, Plugin } from 'vue';
import BProfile from './BProfile.vue';

export default {
    install(Vue: App) {
        Vue.component('BProfile', BProfile);
    },
} as Plugin;

export {
    BProfile,
};

// Export TypeScript interfaces for consumer use
export type {
    ProfileAccount,
    BProfileProps,
    BProfileEmits,
    ProfileContactMethod,
    ProfileAccessibilityConfig,
    ProfileUserStatus,
    ProfileLoadingState,
    ProfileKeyboardNavigation,
    ProfileFocusConfig,
    BProfileRef,
    BProfileSlots,
    defaultAccessibilityConfig,
    defaultKeyboardNavigationConfig,
    defaultFocusConfig,
    isProfileAccount,
    isProfileContactMethod,
} from './BProfile.types';

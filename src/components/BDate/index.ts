import type { App, Plugin } from 'vue';
import BDate from './BDate.vue';

// Export types for TypeScript users
export type {
    BDateProps,
    BDateEmits,
    BDateFormat,
    BDateSelectionEvent,
    BDateKeyboardEvent,
    BDateSelectionMode,
    RelativeTimeUnit,
    BDateAccessibilityConfig,
    BDateAnnouncementConfig,
    BDateTimezoneConfig,
    BDateLocaleConfig,
    BDateKeyboardConfig,
    UseDateAccessibilityReturn,
    defaultBDateAccessibilityConfig,
    defaultBDateKeyboardConfig,
    defaultBDateAnnouncementConfig,
} from './BDate.types';

export default {
    install(Vue: App) {
        Vue.component('BDate', BDate);
    },
} as Plugin;

export {
    BDate,
};

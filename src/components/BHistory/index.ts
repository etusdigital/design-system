import type { App, Plugin } from 'vue';
import BHistory from './BHistory.vue';

export default {
    install(Vue: App) {
        Vue.component('BHistory', BHistory);
    },
} as Plugin;

export {
    BHistory,
};

// Export types for consumer use
export type {
    BHistoryItem,
    BHistorySelectionEvent,
} from './BHistory.vue';

export type {
    BHistoryProps,
    BHistoryEmits,
    BHistoryAccessibilityProps,
    BHistoryNavigationOptions,
    BHistoryItemContext,
    BHistoryTimelineMetadata,
    BHistoryPaginationContext,
    BHistoryAnnouncementTemplates,
    BHistoryFocusConfig,
    BHistoryA11yConfig,
} from './BHistory.types';

import type { App, Plugin } from 'vue';
import BBreadcrumb from './BBreadcrumb.vue';

export default {
    install(Vue: App) {
        Vue.component('BBreadcrumb', BBreadcrumb);
    },
} as Plugin;

export {
    BBreadcrumb,
}

// Export TypeScript interfaces for consumer use
export type {
    BBreadcrumbItem,
    BreadcrumbItemType,
    MoreOptionsItem,
    ParsedBreadcrumbItem,
    BBreadcrumbAccessibilityProps,
    BBreadcrumbKeyboardConfig,
    BBreadcrumbStructuredData,
    BBreadcrumbNavigationProps,
    BBreadcrumbDisplayProps,
    BBreadcrumbMoreOptionsProps,
    BBreadcrumbProps,
    BBreadcrumbEmits,
    BBreadcrumbNavigationContext,
    BBreadcrumbAnnouncementTemplates,
    BBreadcrumbFocusConfig,
    BBreadcrumbLinkConfig,
    BBreadcrumbSize,
    BBreadcrumbDirection,
    BBreadcrumbDropdownPosition,
    BBreadcrumbFocusStrategy,
    BBreadcrumbLinkTarget,
} from './BBreadcrumb.types';

import type { App, Plugin } from 'vue';
import BDialog from './BDialog.vue';
import BDialogEnhanced from './BDialogEnhanced.vue';
import EnhancedBackdrop from './EnhancedBackdrop.vue';
import LoadingOverlay from './LoadingOverlay.vue';

/**
 * Dialog plugin configuration
 */
export interface BDialogPluginConfig {
  /** Whether to use enhanced version by default */
  useEnhanced?: boolean;
  /** Component name to register */
  componentName?: string;
  /** Whether to register sub-components */
  registerSubComponents?: boolean;
}

/**
 * Default dialog plugin (backward compatible)
 */
export default {
    install(Vue: App) {
        Vue.component('BDialog', BDialog);
    },
} as Plugin;

/**
 * Enhanced dialog plugin
 */
export const BDialogEnhancedPlugin: Plugin = {
    install(Vue: App, config: BDialogPluginConfig = {}) {
        const {
            useEnhanced = true,
            componentName = 'BDialog',
            registerSubComponents = true,
        } = config;
        
        // Register main component
        const component = useEnhanced ? BDialogEnhanced : BDialog;
        Vue.component(componentName, component);
        
        // Register sub-components if requested
        if (registerSubComponents) {
            Vue.component('BDialogEnhanced', BDialogEnhanced);
            Vue.component('EnhancedBackdrop', EnhancedBackdrop);
            Vue.component('LoadingOverlay', LoadingOverlay);
        }
    },
};

export {
    // Components
    BDialog,
    BDialogEnhanced,
    EnhancedBackdrop,
    LoadingOverlay,
};

// Export all types
export type * from './BDialog.types';

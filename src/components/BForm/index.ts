import type { App, Plugin } from 'vue';
import BForm from './BForm.vue';

/**
 * BForm plugin configuration
 */
export interface BFormPluginConfig {
  /** Component name to register */
  componentName?: string;
}

/**
 * BForm Vue plugin
 */
export default {
  install(Vue: App, config: BFormPluginConfig = {}) {
    const { componentName = 'BForm' } = config;
    Vue.component(componentName, BForm);
  },
} as Plugin;

export { BForm };

// Export all types
export type * from './BForm.types';
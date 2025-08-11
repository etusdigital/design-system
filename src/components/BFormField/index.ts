import type { App, Plugin } from 'vue';
import BFormField from './BFormField.vue';

/**
 * BFormField plugin configuration
 */
export interface BFormFieldPluginConfig {
  /** Component name to register */
  componentName?: string;
}

/**
 * BFormField Vue plugin
 */
export default {
  install(Vue: App, config: BFormFieldPluginConfig = {}) {
    const { componentName = 'BFormField' } = config;
    Vue.component(componentName, BFormField);
  },
} as Plugin;

export { BFormField };

// Export all types
export type * from './BFormField.types';
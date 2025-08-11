import type { App, Plugin } from 'vue';
import BToast from './BToast.vue';
import BToastModern from './BToastModern.vue';
import { ToastLegacyPlugin } from '#composables/useToastLegacy';
import { toast as modernToast } from '#composables/useToast';

// Export legacy types for backward compatibility
export type { BToastType, BToastPosition, BToastOptions } from './index';

// Export modern types
export type * from './BToastModern.types';

/**
 * Toast plugin configuration
 */
export interface BToastPluginConfig {
  /** Whether to use modern component (default: false for backward compatibility) */
  useModern?: boolean;
  /** Whether to setup legacy event bus handlers */
  setupLegacyEventBus?: boolean;
  /** Whether to provide global $toast instance */
  provideGlobalInstance?: boolean;
  /** Component name to register */
  componentName?: string;
  /** Modern toast system configuration */
  modernConfig?: {
    maxVisible?: number;
    maxInMemory?: number;
    defaultPosition?: string;
    defaultDuration?: number;
  };
}

/**
 * Default plugin configuration
 */
const DEFAULT_CONFIG: Required<BToastPluginConfig> = {
  useModern: false, // Default to legacy for backward compatibility
  setupLegacyEventBus: true,
  provideGlobalInstance: true,
  componentName: 'BToast',
  modernConfig: {
    maxVisible: 5,
    maxInMemory: 50,
    defaultPosition: 'top-right',
    defaultDuration: 5000,
  },
};

/**
 * Enhanced BToast plugin that supports both legacy and modern implementations
 */
export const BToastPlugin: Plugin = {
  install(app: App, userConfig: BToastPluginConfig = {}) {
    const config = { ...DEFAULT_CONFIG, ...userConfig };
    
    // Register the appropriate component
    const component = config.useModern ? BToastModern : BToast;
    app.component(config.componentName, component);
    
    // Setup legacy compatibility if requested
    if (config.setupLegacyEventBus) {
      ToastLegacyPlugin.install(app, {
        setupEventBus: true,
      });
    }
    
    // Provide modern toast instance regardless of component choice
    if (config.provideGlobalInstance) {
      // Configure modern toast system
      if (config.modernConfig && config.useModern) {
        modernToast.updateConfig(config.modernConfig);
      }
      
      // Provide modern instance
      app.config.globalProperties.$toastModern = modernToast;
      app.provide('toastModern', modernToast);
    }
  },
};

/**
 * Legacy plugin for backward compatibility
 */
export const BToastLegacyPlugin: Plugin = {
  install(app: App) {
    return BToastPlugin.install(app, {
      useModern: false,
      setupLegacyEventBus: true,
      provideGlobalInstance: true,
      componentName: 'BToast',
    });
  },
};

/**
 * Modern plugin for new projects
 */
export const BToastModernPlugin: Plugin = {
  install(app: App, config: Omit<BToastPluginConfig, 'useModern'> = {}) {
    return BToastPlugin.install(app, {
      ...config,
      useModern: true,
      setupLegacyEventBus: config.setupLegacyEventBus ?? false, // Don't setup legacy by default for modern
      componentName: config.componentName || 'BToast',
    });
  },
};

/**
 * Default export maintains backward compatibility
 */
export default BToastLegacyPlugin;

/**
 * Named exports for different use cases
 */
export {
  // Components
  BToast,
  BToastModern,
  
  // Composables (re-exported from composables)
  modernToast as toast,
  
  // Legacy compatibility
  ToastLegacyPlugin,
};
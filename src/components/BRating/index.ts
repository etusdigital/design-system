import type { App, Plugin } from 'vue';
import BRating from './BRating.vue';

// Export component types for TypeScript users
export type {
  BRatingProps,
  BRatingEmits,
  BRatingState,
  BRatingAriaAttributes,
  BRatingKeyboardConfig,
  BRatingValidationConfig,
  BRatingThemeConfig,
  BRatingTooltipConfig,
  BRatingValidationResult,
  BRatingAnnouncementTemplates,
  BRatingAccessibilityHelpers,
  BRatingAccessibilityProps,
  // Type aliases for easier importing
  AccessibilityProps,
  Props,
  State,
  AriaAttributes,
  KeyboardConfig,
  ValidationConfig,
  ThemeConfig,
  TooltipConfig,
  Emits,
  ValidationResult,
  AnnouncementTemplates,
  AccessibilityHelpers,
} from './BRating.types';

// Export enum-like types
export type {
  BRatingIcon,
  BRatingSize,
  BRatingValidationState,
  BRatingColorTheme,
  BRatingDisplayMode,
  BRatingPrecision,
  BRatingInteractionMode,
  BRatingValue,
} from './BRating.types';

// Export default configurations
export {
  DEFAULT_RATING_KEYBOARD_CONFIG,
  DEFAULT_RATING_ACCESSIBILITY_CONFIG,
  DEFAULT_RATING_VALIDATION_CONFIG,
  DEFAULT_RATING_THEME_CONFIG,
  DEFAULT_RATING_TOOLTIP_CONFIG,
  DEFAULT_RATING_ANNOUNCEMENTS,
  RATING_ICON_CONFIG,
  RATING_SIZE_CONFIG,
  RATING_PRECISION_CONFIG,
} from './BRating.types';

/**
 * BRating Vue Plugin
 * 
 * Installs the BRating component globally in your Vue application.
 * 
 * @example
 * ```typescript
 * import { createApp } from 'vue'
 * import BRating from '@brius/design-system/BRating'
 * 
 * const app = createApp({})
 * app.use(BRating)
 * ```
 */
export default {
  install(Vue: App) {
    Vue.component('BRating', BRating);
  },
} as Plugin;

/**
 * BRating Component Export
 * 
 * Use this for direct component imports without the plugin.
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { BRating } from '@brius/design-system/BRating'
 * import { ref } from 'vue'
 * 
 * const rating = ref(4)
 * </script>
 * 
 * <template>
 *   <BRating v-model="rating" :max="5" show-value />
 * </template>
 * ```
 */
export {
  BRating,
};

/**
 * Component Information
 */
export const BRatingInfo = {
  name: 'BRating',
  version: '1.0.0',
  description: 'A comprehensive star rating component with full accessibility support',
  features: [
    'Star rating system with customizable maximum rating',
    'Half-star and quarter-star precision support',
    'Custom icons (stars, hearts, thumbs up, etc.)',
    'Full keyboard navigation support',
    'WCAG 2.1 AA accessibility compliance',
    'Screen reader announcements',
    'Multiple display modes (interactive, readonly, display)',
    'Built-in validation with custom messages',
    'Multiple color themes and custom styling',
    'Touch-friendly with minimum target enforcement',
    'High contrast and reduced motion support',
    'Loading and error states',
    'Customizable tooltips and labels',
  ],
  accessibility: {
    wcag: '2.1 AA',
    screenReader: 'Full support with announcements',
    keyboard: 'Complete navigation with arrow keys, numbers, shortcuts',
    focus: 'Visible focus indicators and management',
    color: 'High contrast mode available',
    motion: 'Reduced motion support',
    touch: 'Minimum 44px touch targets',
  },
  keyboard: {
    'Arrow Left/Down': 'Decrease rating',
    'Arrow Right/Up': 'Increase rating',
    '1-9': 'Set rating directly',
    'Enter/Space': 'Confirm rating',
    'Delete/Backspace': 'Clear rating (if clearable)',
    'Home': 'Set to minimum rating',
    'End': 'Set to maximum rating',
  },
} as const;
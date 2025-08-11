import type { App, Plugin } from 'vue';
import BDateComparator from './BDateComparator.vue';
import type { 
  BDateComparatorProps, 
  BDateComparatorEmits,
  BDateComparatorModelValue,
  ComparisonOperator,
  ValidationState,
  ComparisonResult,
  OperatorOption,
  AccessibilityConfig,
  KeyboardNavigationState,
  FocusManagement,
  BDateComparatorAccessibilityProps,
  BDateComparatorAccessibility
} from './BDateComparator.types';

export default {
    install(Vue: App) {
        Vue.component('BDateComparator', BDateComparator);
    },
} as Plugin;

export {
    BDateComparator,
    type BDateComparatorProps,
    type BDateComparatorEmits,
    type BDateComparatorModelValue,
    type ComparisonOperator,
    type ValidationState,
    type ComparisonResult,
    type OperatorOption,
    type AccessibilityConfig,
    type KeyboardNavigationState,
    type FocusManagement,
    type BDateComparatorAccessibilityProps,
    type BDateComparatorAccessibility,
}

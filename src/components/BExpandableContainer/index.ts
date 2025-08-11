import type { App, Plugin } from 'vue';
import BExpandableContainer from './BExpandableContainer.vue';

export default {
    install(Vue: App) {
        Vue.component('BExpandableContainer', BExpandableContainer);
    },
} as Plugin;

export {
    BExpandableContainer,
};

export type {
    BExpandableContainerProps,
    BExpandableContainerEmits,
    ExpandableAccessibilityConfig,
    DisclosureAccessibilityConfig,
    ExpandableKeyboardConfig,
    ExpandableFocusConfig,
    ExpandableAnimationConfig,
    ExpandableLoadingConfig,
    ProgressiveDisclosureConfig,
    ExpandableState,
    UseExpandableContainerReturn,
    ExpandableContainerSize,
    ContentAlignment,
    AnimationTimingFunction,
} from './BExpandableContainer.types';

import type { App, Plugin } from 'vue';
import BRangeSlider from './BRangeSlider.vue';

export default {
    install(Vue: App) {
        Vue.component('BRangeSlider', BRangeSlider);
    },
} as Plugin;

export {
    BRangeSlider,
};

// Export types for external use
export type {
    BRangeSliderProps,
    BRangeSliderEmits,
    SliderStep,
    SliderFillColor,
    RangeSliderValue,
    RangeSliderAccessibilityConfig,
} from './BRangeSlider.vue';

// Export accessibility types from Slider component
export type {
    SliderAccessibilityConfig,
} from '../../utils/components/Slider.vue';

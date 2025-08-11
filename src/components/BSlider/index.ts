import type { App, Plugin } from 'vue';
import BSlider from './BSlider.vue';
import type { BSliderProps, BSliderAccessibilityConfig, BSliderEmits } from './BSlider.vue';

/**
 * Slider size options
 */
export type BSliderSize = 'small' | 'medium' | 'large';

/**
 * Fill color configuration for gradient fills
 */
export interface BSliderFillColor {
	color: string;
	percentage: number;
}

/**
 * Step configuration for discrete slider values
 */
export interface BSliderStep {
	value: number;
	label?: string;
}

/**
 * Comprehensive accessibility configuration for BSlider
 * Provides WCAG 2.1 AA compliant options for screen readers and keyboard navigation
 */
export interface BSliderAccessibilityOptions {
	/** ARIA label for the slider */
	ariaLabel?: string;
	/** Additional description for screen readers */
	ariaDescription?: string;
	/** Custom value text format function for screen readers */
	ariaValueText?: (value: number) => string;
	/** Whether to announce value changes immediately to screen readers */
	announceValueChanges?: boolean;
	/** Custom keyboard step size for fine-grained control */
	keyboardStep?: number;
	/** Error message for invalid values */
	errorMessage?: string;
	/** Whether the slider is required in a form */
	required?: boolean;
	/** Form field name for accessibility announcements */
	fieldName?: string;
	/** Whether the slider value is currently invalid */
	invalid?: boolean;
}

/**
 * Keyboard navigation keys supported by BSlider
 */
export const SLIDER_KEYBOARD_KEYS = {
	/** Increase value by one step */
	INCREASE: ['ArrowRight', 'ArrowUp'],
	/** Decrease value by one step */
	DECREASE: ['ArrowLeft', 'ArrowDown'],
	/** Jump to minimum value */
	MINIMUM: ['Home'],
	/** Jump to maximum value */
	MAXIMUM: ['End'],
	/** Increase value by large step */
	LARGE_INCREASE: ['PageUp'],
	/** Decrease value by large step */
	LARGE_DECREASE: ['PageDown']
} as const;

export default {
    install(Vue: App) {
        Vue.component('BSlider', BSlider);
    },
} as Plugin;

export {
    BSlider,
    type BSliderProps,
    type BSliderAccessibilityConfig,
    type BSliderEmits,
}

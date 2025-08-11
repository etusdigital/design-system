import type { App, Plugin } from 'vue';
import BColorPicker from './BColorPicker.vue';
import type { 
    BColorPickerProps, 
    BColorPickerEmits,
    ColorType, 
    RgbaColor, 
    HsvaColor, 
    GenericColor, 
    HslaColor,
    HwbColor,
    Position, 
    PositionEvent,
    ColorContrastInfo,
    PresetColor,
    ColorValidationResult,
    ColorPickerAccessibilityConfig,
    ColorPickerKeyboardConfig,
    ColorAnnouncements,
    ColorPickerAccessibilityState,
    ColorSpaceUtils,
    ColorPickerKeyboardHandlers,
    ColorPickerAriaAttributes
} from './BColorPicker.types';

export default {
    install(Vue: App) {
        Vue.component('BColorPicker', BColorPicker);
    },
} as Plugin;

export {
    BColorPicker,
    type BColorPickerProps,
    type BColorPickerEmits,
    type ColorType,
    type RgbaColor,
    type HsvaColor,
    type GenericColor,
    type HslaColor,
    type HwbColor,
    type Position,
    type PositionEvent,
    type ColorContrastInfo,
    type PresetColor,
    type ColorValidationResult,
    type ColorPickerAccessibilityConfig,
    type ColorPickerKeyboardConfig,
    type ColorAnnouncements,
    type ColorPickerAccessibilityState,
    type ColorSpaceUtils,
    type ColorPickerKeyboardHandlers,
    type ColorPickerAriaAttributes,
}

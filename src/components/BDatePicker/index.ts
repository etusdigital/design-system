import type { App, Plugin } from 'vue';
import BDatePicker from './BDatePicker.vue';

export default {
    install(Vue: App) {
        Vue.component('BDatePicker', BDatePicker);
    },
} as Plugin;

export {
    BDatePicker,
};

export type {
    BDatePickerProps,
    BDatePickerEmits,
    BDatePickerInputConfig,
    BDatePickerCalendarConfig,
    BDatePickerKeyboardConfig,
    BDatePickerAnnouncementConfig,
    BDatePickerAccessibilityConfig,
    BDatePickerValidationConfig,
    BDatePickerDisplayConfig,
    BDatePickerSelectionEvent,
    BDatePickerNavigationEvent,
    BDatePickerKeyboardEvent,
    BDatePickerFocusEvent,
    BDatePickerValidationResult,
    UseDatePickerAccessibilityReturn,
} from './BDatePicker.types';

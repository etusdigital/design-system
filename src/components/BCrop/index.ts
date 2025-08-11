import type { App, Plugin } from 'vue';
import BCrop from './BCrop.vue';
import type { BCropProps } from './BCrop.types';
import type { 
    BCropEvents, 
    BCropArea, 
    BCropPreset, 
    BCropMethods,
    BCropAccessibilityProps,
    BCropKeyboardConfig,
    BCropLoadingState,
    BCropFocusConfig
} from './BCrop.types';

export default {
    install(Vue: App) {
        Vue.component('BCrop', BCrop);
    },
} as Plugin;

export {
    BCrop,
    type BCropProps,
    type BCropEvents,
    type BCropArea,
    type BCropPreset,
    type BCropMethods,
    type BCropAccessibilityProps,
    type BCropKeyboardConfig,
    type BCropLoadingState,
    type BCropFocusConfig,
}

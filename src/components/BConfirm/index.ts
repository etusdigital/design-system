import type { App, Plugin } from 'vue';
import BConfirm from './BConfirm.vue';
import type { 
    BConfirmOptions,
    BConfirmProps,
    BConfirmEmits,
    BConfirmCancelReason,
    BConfirmUrgency,
    BConfirmFocusTarget,
    BConfirmRole,
    BConfirmAccessibilityConfig,
    BConfirmButtonConfig,
    BConfirmInstance
} from './BConfirm.types';

export default {
    install(Vue: App) {
        Vue.component('BConfirm', BConfirm);
    },
} as Plugin;

export {
    BConfirm,
    type BConfirmOptions,
    type BConfirmProps,
    type BConfirmEmits,
    type BConfirmCancelReason,
    type BConfirmUrgency,
    type BConfirmFocusTarget,
    type BConfirmRole,
    type BConfirmAccessibilityConfig,
    type BConfirmButtonConfig,
    type BConfirmInstance,
}

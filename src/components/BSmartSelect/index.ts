import type { App, Plugin } from 'vue';
import BSmartSelect from './BSmartSelect.vue';
import type { 
    BSmartSelectProps, 
    BSmartSelectItem, 
    BSmartSelectModelValue,
    BSmartSelectMultiValue,
    BSmartSelectSingleValue
} from './BSmartSelect.vue';

export default {
    install(Vue: App) {
        Vue.component('BSmartSelect', BSmartSelect);
    },
} as Plugin;

export {
    BSmartSelect,
    type BSmartSelectProps,
    type BSmartSelectItem,
    type BSmartSelectModelValue,
    type BSmartSelectMultiValue,
    type BSmartSelectSingleValue,
}

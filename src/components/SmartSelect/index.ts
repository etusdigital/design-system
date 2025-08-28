import type { App, Plugin } from 'vue';
import SmartSelect from './SmartSelect.vue';

export default {
    install(Vue: App) {
        Vue.component('SmartSelect', SmartSelect);
    },
} as Plugin;

export {
    SmartSelect,
}

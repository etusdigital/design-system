import type { App, Plugin } from 'vue';
import Select from './Select.vue';

export default {
    install(Vue: App) {
        Vue.component('Select', Select);
    },
} as Plugin;

export {
    Select,
}

import type { App, Plugin } from 'vue';
import MultiSelect from './MultiSelect.vue';

export default {
    install(Vue: App) {
        Vue.component('MultiSelect', MultiSelect);
    },
} as Plugin;

export {
    MultiSelect,
}

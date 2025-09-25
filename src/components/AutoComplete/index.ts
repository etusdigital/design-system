import type { App, Plugin } from 'vue';
import AutoComplete from './AutoComplete.vue';

export default {
    install(Vue: App) {
        Vue.component('AutoComplete', AutoComplete);
    },
} as Plugin;

export {
    AutoComplete,
}

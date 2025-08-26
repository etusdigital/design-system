import type { App, Plugin } from 'vue';
import BAutoComplete from './BAutoComplete.vue';

export default {
    install(Vue: App) {
        Vue.component('BAutoComplete', BAutoComplete);
    },
} as Plugin;

export {
    BAutoComplete,
}

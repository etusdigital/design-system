import type { App, Plugin } from 'vue';
import Checkbox from './Checkbox.vue';

export default {
    install(Vue: App) {
        Vue.component('Checkbox', Checkbox);
    },
} as Plugin;

export {
    Checkbox,
}

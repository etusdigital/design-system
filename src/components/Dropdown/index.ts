import type { App, Plugin } from 'vue';
import Dropdown from './Dropdown.vue';

export default {
    install(Vue: App) {
        Vue.component('Dropdown', Dropdown);
    },
} as Plugin;

export {
    Dropdown,
}

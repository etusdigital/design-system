import type { App, Plugin } from 'vue';
import BCardIcon from './BCardIcon.vue';

export default {
    install(Vue: App) {
        Vue.component('BCardIcon', BCardIcon);
    },
} as Plugin;

export {
    BCardIcon,
}

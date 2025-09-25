import type { App, Plugin } from 'vue';
import Stepper from './Stepper.vue';

export default {
    install(Vue: App) {
        Vue.component('Stepper', Stepper);
    },
} as Plugin;

export {
    Stepper,
}

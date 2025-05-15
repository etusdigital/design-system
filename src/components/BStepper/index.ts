import type { App, Plugin } from 'vue';
import BStepper from './BStepper.vue';

export default {
    install(Vue: App) {
        Vue.component('BStepper', BStepper);
    },
} as Plugin;

export {
    BStepper,
}

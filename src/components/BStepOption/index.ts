import type { App, Plugin } from 'vue';
import BStepOption from './BStepOption.vue';

export default {
    install(Vue: App) {
        Vue.component('BStepOption', BStepOption);
    },
} as Plugin;

export {
    BStepOption,
}

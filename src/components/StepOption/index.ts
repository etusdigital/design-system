import type { App, Plugin } from 'vue';
import StepOption from './StepOption.vue';

export default {
    install(Vue: App) {
        Vue.component('StepOption', StepOption);
    },
} as Plugin;

export {
    StepOption,
}

import type {App, Plugin } from 'vue';
import BProgressBar from './BProgressBar.vue';
import type { BProgressBarAccessibilityConfig } from './BProgressBar.vue';

export default {
    install(Vue: App){
        Vue.component('BProgressBar', BProgressBar);
    }
} as Plugin;

export {
    BProgressBar,
    type BProgressBarAccessibilityConfig,
}
import type { App, Plugin } from 'vue';
import BRangeSlider from './BRangeSlider.vue';

export default {
    install(Vue: App) {
        Vue.component('BRangeSlider', BRangeSlider);
    },
} as Plugin;

export {
    BRangeSlider,
}

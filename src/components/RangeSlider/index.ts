import type { App, Plugin } from 'vue';
import RangeSlider from './RangeSlider.vue';

export default {
    install(Vue: App) {
        Vue.component('RangeSlider', RangeSlider);
    },
} as Plugin;

export {
    RangeSlider,
}

import type { App, Plugin } from 'vue';
import Slider from './Slider.vue';

export default {
    install(Vue: App) {
        Vue.component('Slider', Slider);
    },
} as Plugin;

export {
    Slider,
}

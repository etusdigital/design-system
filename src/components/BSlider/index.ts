import type { App, Plugin } from 'vue';
import BSlider from './BSlider.vue';

export default {
    install(Vue: App) {
        Vue.component('BSlider', BSlider);
    },
} as Plugin;

export {
    BSlider,
}

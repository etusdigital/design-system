import type { App, Plugin } from 'vue';
import Carousel from './Carousel.vue';

export default {
    install(Vue: App) {
        Vue.component('Carousel', Carousel);
    },
} as Plugin;

export {
    Carousel,
}

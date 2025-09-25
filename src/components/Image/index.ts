import type { App, Plugin } from 'vue';
import Image from './Image.vue';

export default {
    install(Vue: App) {
        Vue.component('Image', Image);
    },
} as Plugin;

export {
    Image,
}

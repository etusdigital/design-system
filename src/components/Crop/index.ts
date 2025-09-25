import type { App, Plugin } from 'vue';
import Crop from './Crop.vue';

export default {
    install(Vue: App) {
        Vue.component('Crop', Crop);
    },
} as Plugin;

export {
    Crop,
}

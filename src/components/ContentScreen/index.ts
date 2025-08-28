import type { App, Plugin } from 'vue';
import ContentScreen from './ContentScreen.vue';

export default {
    install(Vue: App) {
        Vue.component('ContentScreen', ContentScreen);
    },
} as Plugin;

export {
    ContentScreen,
}

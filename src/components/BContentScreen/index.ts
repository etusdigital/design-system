import type { App, Plugin } from 'vue';
import BContentScreen from './BContentScreen.vue';

export default {
    install(Vue: App) {
        Vue.component('BContentScreen', BContentScreen);
    },
} as Plugin;

export {
    BContentScreen,
}

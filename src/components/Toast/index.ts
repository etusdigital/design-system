import type { App, Plugin } from 'vue';
import Toast from './Toast.vue';

export default {
    install(Vue: App) {
        Vue.component('Toast', Toast);
    },
} as Plugin;

export {
    Toast,
}

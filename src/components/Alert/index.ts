import type { App, Plugin } from 'vue';
import Alert from './Alert.vue';

export default {
    install(Vue: App) {
        Vue.component('Alert', Alert);
    },
} as Plugin;

export {
    Alert,
}

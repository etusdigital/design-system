import type {App, Plugin } from 'vue';
import ProgressBar from './ProgressBar.vue';

export default {
    install(Vue: App){
        Vue.component('ProgressBar', ProgressBar);
    }
} as Plugin;

export {
    ProgressBar,
}
import type { App, Plugin } from 'vue';
import FileUpload from './FileUpload.vue';

export default {
    install(Vue: App) {
        Vue.component('FileUpload', FileUpload);
    },
} as Plugin;

export {
    FileUpload,
}

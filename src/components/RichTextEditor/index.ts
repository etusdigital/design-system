import type { App, Plugin } from 'vue';
import RichTextEditor from './RichTextEditor.vue';

export default {
    install(Vue: App) {
        Vue.component('RichTextEditor', RichTextEditor);
    },
} as Plugin;

export {
    RichTextEditor,
}

import type {App, Plugin} from 'vue';
import TagInput from './TagInput.vue';

export default {
    install(Vue: App) {
        Vue.component('TagInput', TagInput);
    },
} as Plugin;

export {
    TagInput,
}
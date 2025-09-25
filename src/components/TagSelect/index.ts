import type { App, Plugin } from 'vue';
import TagSelect from './TagSelect.vue';

export default {
    install(Vue: App) {
        Vue.component('TagSelect', TagSelect);
    },
} as Plugin;

export {
    TagSelect,
}
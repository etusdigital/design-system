import type { App, Plugin } from 'vue';
import Tag from './Tag.vue';

export default {
    install(Vue: App) {
        Vue.component('Tag', Tag);
    },
} as Plugin;

export {
    Tag,
}

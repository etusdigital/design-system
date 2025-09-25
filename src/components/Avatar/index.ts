import type { App, Plugin } from 'vue';
import Avatar from './Avatar.vue';

export default {
    install(Vue: App) {
        Vue.component('Avatar', Avatar);
    },
} as Plugin;

export {
    Avatar,
}

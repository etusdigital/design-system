import type { App, Plugin } from 'vue';
import Profile from './Profile.vue';

export default {
    install(Vue: App) {
        Vue.component('Profile', Profile);
    },
} as Plugin;

export {
    Profile,
}

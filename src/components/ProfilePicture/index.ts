import type { App, Plugin } from 'vue';
import ProfilePicture from './ProfilePicture.vue';

export default {
    install(Vue: App) {
        Vue.component('ProfilePicture', ProfilePicture);
    },
} as Plugin;

export {
    ProfilePicture,
}

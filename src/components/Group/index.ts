import type { App, Plugin } from 'vue';
import Group from './Group.vue';

export * from './Group.types';

export default {
    install(Vue: App) {
        Vue.component('Group', Group);
    },
} as Plugin;

export {
    Group,
}

import type { App, Plugin } from 'vue';
import Card from './Card.vue';

export default {
    install(Vue: App) {
        Vue.component('Card', Card);
    },
} as Plugin;

export {
    Card,
}

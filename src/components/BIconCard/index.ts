import type { App, Plugin } from 'vue';
import BIconCard from './BIconCard.vue';

export default {
    install(Vue: App) {
        Vue.component('BIconCard', BIconCard);
    },
} as Plugin;

export {
    BIconCard,
}

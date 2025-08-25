import type { App, Plugin } from 'vue';
import BCard from './BCard.vue';

export default {
    install(Vue: App) {
        Vue.component('BCard', BCard);
    },
} as Plugin;

export {
    BCard,
}

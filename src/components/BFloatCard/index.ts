import type { App, Plugin } from 'vue';
import BFloatCard from './BFloatCard.vue';

export default {
    install(Vue: App) {
        Vue.component('BFloatCard', BFloatCard);
    },
} as Plugin;

export {
    BFloatCard,
}

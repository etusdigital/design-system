import type { App, Plugin } from 'vue';
import FloatCard from './FloatCard.vue';

export default {
    install(Vue: App) {
        Vue.component('FloatCard', FloatCard);
    },
} as Plugin;

export {
    FloatCard,
}

import type { App, Plugin } from 'vue';
import ActionCard from './ActionCard.vue';

export default {
    install(Vue: App) {
        Vue.component('ActionCard', ActionCard);
    },
} as Plugin;

export {
    ActionCard,
}

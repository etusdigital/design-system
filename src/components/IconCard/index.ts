import type { App, Plugin } from 'vue';
import IconCard from './IconCard.vue';

export default {
    install(Vue: App) {
        Vue.component('IconCard', IconCard);
    },
} as Plugin;

export {
    IconCard,
}

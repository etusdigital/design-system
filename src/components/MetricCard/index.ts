import type { App, Plugin } from 'vue';
import MetricCard from './MetricCard.vue';

export default {
    install(Vue: App) {
        Vue.component('MetricCard', MetricCard);
    },
} as Plugin;

export {
    MetricCard,
}

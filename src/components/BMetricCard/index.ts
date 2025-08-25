import type { App, Plugin } from 'vue';
import BMetricCard from './BMetricCard.vue';

export default {
    install(Vue: App) {
        Vue.component('BMetricCard', BMetricCard);
    },
} as Plugin;

export {
    BMetricCard,
}

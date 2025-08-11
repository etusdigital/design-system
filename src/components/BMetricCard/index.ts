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

// Export accessibility types and interfaces
export type {
    BMetricCardProps,
    MetricType,
    MetricSize,
    InfoType,
    TrendDirection,
    MetricRole,
    TrendInfo,
    ChartAccessibility,
    MetricCardAccessibility,
    ScreenReaderMessages
} from './types';

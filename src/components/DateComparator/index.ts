import type { App, Plugin } from 'vue';
import DateComparator from './DateComparator.vue';

export default {
    install(Vue: App) {
        Vue.component('DateComparator', DateComparator);
    },
} as Plugin;

export {
    DateComparator,
}

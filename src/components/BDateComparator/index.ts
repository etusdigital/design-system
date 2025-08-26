import type { App, Plugin } from 'vue';
import BDateComparator from './BDateComparator.vue';

export default {
    install(Vue: App) {
        Vue.component('BDateComparator', BDateComparator);
    },
} as Plugin;

export {
    BDateComparator,
}

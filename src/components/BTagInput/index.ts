import type {App, Plugin} from 'vue';
import BTagInput from './BTagInput.vue';

export default {
    install(Vue: App) {
        Vue.component('BTagInput', BTagInput);
    },
} as Plugin;

export {
    BTagInput,
}

// Export TypeScript interfaces for consumer use
export type {
    BTagInputMask,
} from './BTagInput.vue';
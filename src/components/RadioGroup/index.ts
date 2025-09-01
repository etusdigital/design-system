import type { App, Plugin } from "vue";
import RadioGroup from "./RadioGroup.vue";

export default {
  install(Vue: App) {
    Vue.component("RadioGroup", RadioGroup);
  },
} as Plugin;

export { RadioGroup };

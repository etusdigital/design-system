import type { App, Plugin } from "vue";
import ToggleGroup from "./ToggleGroup.vue";

export default {
  install(Vue: App) {
    Vue.component("ToggleGroup", ToggleGroup);
  },
} as Plugin;

export { ToggleGroup };

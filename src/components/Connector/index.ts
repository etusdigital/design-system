import type { App, Plugin } from "vue";
import Connector from "./Connector.vue";

export default {
  install(Vue: App) {
    Vue.component("Connector", Connector);
  },
} as Plugin;

export { Connector };

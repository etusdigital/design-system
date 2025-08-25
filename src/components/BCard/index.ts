import type { App, Plugin } from "vue";
import BCard from "./BCard.vue";

export default {
	install(Vue: App) {
		Vue.component("BCard", BCard);
	},
} as Plugin;

export { BCard };

export { default as BCardHeader } from "./BCardHeader.vue";
export { default as BCardTitle } from "./BCardTitle.vue";
export { default as BCardSubtitle } from "./BCardSubtitle.vue";
export { default as BCardContent } from "./BCardContent.vue";
export { default as BCardFooter } from "./BCardFooter.vue";

import { setup, Preview } from "@storybook/vue3";
import { addons } from "@storybook/manager-api";
import { provide } from "vue";
import Sute from "../src/index";
import "../src/assets/main.css";
import { briusTheme, etusTheme } from "./themes";

const withTheme = (story: any, context: any) => {
	const theme = context.parameters.theme || context.globals.theme;
	const storyTheme = theme === "etus" ? etusTheme : briusTheme;

	// Aplicar classe do tema ao body para garantir que as variáveis CSS sejam aplicadas
	if (typeof document !== "undefined") {
		document.body.classList.remove("etus-theme", "brius-theme");
		document.body.classList.add(`${theme}-theme`);
	}

	addons.setConfig({
		theme: storyTheme,
	});

	return {
		setup() {
			provide("theme", storyTheme);
			const storyResult = story();
			return { storyResult };
		},
		template: `<div class="${theme}-theme"><story /></div>`,
	};
};

setup((app) => {
	app.use(Sute);
});

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		designToken: {
			tabs: [
				"FontFamily",
				"BFontFamily",
				"FontSize",
				"FontWeight",
				"LineHeight",
				"Spacing",
				"Border",
				"BorderRadius",
				"Colors",
				"BColors",
			],
		},
		options: {
			storySort: {
				method: "alphabetical",
				order: ["documentation", "Primary"],
			},
		},
	},
	globalTypes: {
		theme: {
			name: "Theme",
			description: "Global theme for components",
			defaultValue: "etus",
			toolbar: {
				icon: "circlehollow",
				items: [
					{ value: "etus", icon: "circle", title: "Etus" },
					{ value: "brius", icon: "circle", title: "Brius" },
				],
				showName: true,
				dynamicTitle: true,
			},
		},
	},
	decorators: [withTheme],
};

export default preview;

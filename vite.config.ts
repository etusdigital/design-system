import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag: string) => {
						return tag == "ion-icon";
					},
				},
			},
		}),
		dts({
			insertTypesEntry: true,
			cleanVueFileName: true,
			tsconfigPath: './tsconfig.app.json',
		}),
		tailwindcss(),
	],
	build: {
		outDir: "lib",
		cssCodeSplit: true,
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"),
			name: "DesignSystem",
			formats: ["es", "cjs", "umd"],
			fileName: (format) => `design-system.${format}.js`,
		},
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "src/index.ts"),
				'modules/core/index': path.resolve(__dirname, "src/modules/core/index.ts"),
				'modules/forms/index': path.resolve(__dirname, "src/modules/forms/index.ts"),
				'modules/data-display/index': path.resolve(__dirname, "src/modules/data-display/index.ts"),
				'modules/feedback/index': path.resolve(__dirname, "src/modules/feedback/index.ts"),
				'modules/navigation/index': path.resolve(__dirname, "src/modules/navigation/index.ts"),
				'modules/overlay/index': path.resolve(__dirname, "src/modules/overlay/index.ts"),
				'modules/layout/index': path.resolve(__dirname, "src/modules/layout/index.ts"),
				'composables/index': path.resolve(__dirname, "src/composables/index.ts"),
			},
			external: ["vue"],
			output: {
				exports: "named",
				globals: {
					vue: "Vue",
				},
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			vue: "vue/dist/vue.esm-bundler.js",
			"#": path.resolve(__dirname, "./src"),
		},
	},
});

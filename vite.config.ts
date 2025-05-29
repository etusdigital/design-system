import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
// import typescript2 from "rollup-plugin-typescript2"; // Comentado
import dts from "vite-plugin-dts";
import { nodeResolve } from "@rollup/plugin-node-resolve";
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
		/* // Comentado
		typescript2({
			check: true,
			include: ["src/** /*.ts"],
			tsconfigOverride: {
				compilerOptions: {
					outDir: "lib",
					skipLibCheck: true,
					sourceMap: true,
					declaration: true,
					declarationMap: true,
				},
			},
			exclude: ["vite.config.ts"],
		}),
		*/
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
			},
			external: ["vue"],
			output: {
				exports: "named",
				globals: {
					vue: "Vue",
				},
			},
			plugins: [
				nodeResolve({
					extensions: [".ts", ".vue"],
				}),
			],
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

import { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        rollupOptions: {
          external: ['vue'],
        },
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    });
  },
  docs: {},
};
export default config;

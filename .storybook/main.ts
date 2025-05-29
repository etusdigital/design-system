import { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      optimizeDeps: {
        include: [],
      },
    });
  },
  docs: {},
};
export default config;

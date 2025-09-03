import { provide } from 'vue';
import { addons } from '@storybook/addons';
import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3'
import '@/assets/main.css'
import DesignSystem from '../src/index'
import { briusTheme, etusTheme } from "./themes";
import favicon from './themes/imgs/favicon.svg';

const link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', favicon);
document.head.appendChild(link);

// Load Google Material Symbols font for Icon component
const materialSymbolsLink = document.createElement("link");
materialSymbolsLink.rel = "stylesheet";
materialSymbolsLink.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
document.head.appendChild(materialSymbolsLink);

const withTheme = (story: any, context: any) => {
  const theme = context.parameters.theme || context.globals.theme;
  const storyTheme = theme === "etus" ? etusTheme : briusTheme;

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

// Setup global components for Storybook
setup((app) => {
  app.use(DesignSystem)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    designToken: {
      tabs: ['FontFamily', 'BFontFamily', 'FontSize', 'FontWeight', 'LineHeight', 'Spacing', 'Border', 'BorderRadius', 'Colors', 'BColors']
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["documentation", "Primary"],
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
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
  },
};

export default preview;
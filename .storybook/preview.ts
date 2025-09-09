import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3'
import '@/assets/main.css'
import DesignSystem from '../src/index'

// Load Google Material Symbols font for Icon component
const materialSymbolsLink = document.createElement("link");
materialSymbolsLink.rel = "stylesheet";
materialSymbolsLink.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
document.head.appendChild(materialSymbolsLink);

const withTheme = (story: any, context: any) => {
  const theme = context.globals.theme || "etus";

  return {
    setup() {
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
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "etus", title: "Etus", icon: "circle" },
          { value: "brius", title: "Brius", icon: "circle" },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "etus",
  },
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
  },
  decorators: [withTheme],
};

export default preview;
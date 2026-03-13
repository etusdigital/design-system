import type { Preview } from '@storybook/react';
import '@/assets/main.css';

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
      test: 'todo'
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'etus';
      return (
        <div className={`${theme}-theme`}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;

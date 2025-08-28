import type { Preview } from '@storybook/vue3-vite'
import '@/assets/main.css'

// Load Google Material Symbols font for BIcon component
const materialSymbolsLink = document.createElement("link");
materialSymbolsLink.rel = "stylesheet";
materialSymbolsLink.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
document.head.appendChild(materialSymbolsLink);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
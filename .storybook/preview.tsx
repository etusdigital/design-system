import * as React from 'react';
import type { Preview } from '@storybook/react';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { UPDATE_GLOBALS } from 'storybook/internal/core-events';
import '@/assets/main.css';
import { etusTheme, etusThemeDark } from './themes';

// Load Google Material Symbols font for Icon component
const materialSymbolsLink = document.createElement("link");
materialSymbolsLink.rel = "stylesheet";
materialSymbolsLink.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
document.head.appendChild(materialSymbolsLink);

const applyPreviewMode = (mode?: string) => {
  const root = document.documentElement;
  if (mode === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }
};


let currentMode: string = location.search.includes('dark') ? 'dark' : 'light';
const modeListeners = new Set<(mode: string) => void>();
const setCurrentMode = (mode?: string) => {
  const next = mode === 'dark' ? 'dark' : 'light';
  applyPreviewMode(next);
  if (next === currentMode) return;
  currentMode = next;
  queueMicrotask(() => modeListeners.forEach((listener) => listener(next)));
};

const ThemedDocsContainer = ({ context, children }: any) => {
  const [mode, setMode] = React.useState<string>(currentMode);

  React.useEffect(() => {
    const listener = (next: string) => setMode(next);
    modeListeners.add(listener);
    setMode(currentMode);

    const channel = context.channel;
    const onUpdate = (payload: { globals?: Record<string, unknown> }) => {
      const next = payload?.globals?.mode as string | undefined;
      if (next) setCurrentMode(next);
    };
    channel.on(UPDATE_GLOBALS, onUpdate);

    return () => {
      modeListeners.delete(listener);
      channel.off(UPDATE_GLOBALS, onUpdate);
    };
  }, [context]);

  return (
    <DocsContainer context={context} theme={mode === 'dark' ? etusThemeDark : etusTheme}>
      {children}
    </DocsContainer>
  );
};

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
    mode: {
      description: "Light or dark color scheme",
      toolbar: {
        title: "Mode",
        icon: "sun",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "etus",
    mode: "light",
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    designToken: {
      tabs: ['FontFamily', 'BFontFamily', 'FontSize', 'FontWeight', 'LineHeight', 'Spacing', 'Border', 'BorderRadius', 'Colors', 'BColors', 'DarkColors', 'BDarkColors']
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["documentation", "Primary"],
      },
    },
    docs: {
      container: ThemedDocsContainer,
    },
    a11y: {
      test: 'todo'
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'etus';
      const isDark = context.globals.mode === 'dark';
      setCurrentMode(context.globals.mode);
      return (
        <div
          className={`${theme}-theme${isDark ? ' dark' : ''}`}
          data-theme={isDark ? 'dark' : 'light'}
          style={{
            color: 'var(--neutral-foreground-high)',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;

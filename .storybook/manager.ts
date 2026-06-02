import { addons } from '@storybook/manager-api';
import { SET_GLOBALS, GLOBALS_UPDATED } from 'storybook/internal/core-events';
import { etusTheme, etusThemeDark } from './themes';

const link = document.createElement('link');
link.setAttribute('rel', 'icon');
link.setAttribute('href', '../public/favicon.svg');
link.setAttribute('type', 'image/svg+xml');
document.head.appendChild(link);

addons.setConfig({
    theme: etusTheme,
});

addons.register('etus/theme-sync', (api) => {
    const applyMode = (mode?: string) => {
        api.setOptions({ theme: mode === 'dark' ? etusThemeDark : etusTheme });
    };

    const channel = addons.getChannel();
    const handleGlobals = ({ globals }: { globals?: Record<string, unknown> }) => {
        applyMode(globals?.mode as string | undefined);
    };

    channel.on(SET_GLOBALS, handleGlobals);
    channel.on(GLOBALS_UPDATED, handleGlobals);
});

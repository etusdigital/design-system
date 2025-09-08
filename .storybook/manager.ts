import { addons } from '@storybook/manager-api';
import { etusTheme, briusTheme } from './themes';

// Set default theme
addons.setConfig({
    theme: etusTheme,
});

// Listen for theme changes from the toolbar
addons.getChannel().on('GLOBALS_UPDATED', ({ globals }) => {
    const theme = globals.theme === 'brius' ? briusTheme : etusTheme;
    addons.setConfig({
        theme: theme,
    });
});
import { addons } from '@storybook/manager-api';
import { etusTheme } from './themes';

const link = document.createElement('link');
link.setAttribute('rel', 'icon');
link.setAttribute('href', '../public/favicon.svg');
link.setAttribute('type', 'image/svg+xml');
document.head.appendChild(link);

// Set default theme
addons.setConfig({
    theme: etusTheme,
});
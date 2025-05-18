import { addons } from '@storybook/manager-api';
import { etusTheme } from './themes';

import favicon from './themes/imgs/favicon.svg';

const link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', favicon);
document.head.appendChild(link);

addons.setConfig({
    theme: etusTheme,
});
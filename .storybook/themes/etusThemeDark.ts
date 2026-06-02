import { create } from 'storybook/theming';
import logo from './imgs/etus-logo.svg'

export default create({
  base: 'dark',
  brandTitle: 'Etus Design System',
  brandUrl: 'https://etus.digital/',
  brandImage: logo,
  brandTarget: '_blank',

  colorPrimary: '#63BA96',
  colorSecondary: '#63BA96',

  // App chrome
  appBg: '#06080f',
  appContentBg: '#090e1a',
  appPreviewBg: '#06080f',
  appBorderColor: '#1d2839',
  appBorderRadius: 8,

  // Text
  textColor: '#f0f4f8',
  textInverseColor: '#06080f',
  textMutedColor: '#a0aec0',

  // Toolbar
  barBg: '#090e1a',
  barTextColor: '#a0aec0',
  barHoverColor: '#63BA96',
  barSelectedColor: '#63BA96',

  // Form controls
  inputBg: '#131b2a',
  inputBorder: '#1d2839',
  inputTextColor: '#f0f4f8',
  inputBorderRadius: 6,
});

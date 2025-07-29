import { create } from 'storybook/theming/create';
import logo from './imgs/etus-logo.svg'

export default create({
  base: 'light',
  brandTitle: 'Etus Design Systeam',
  brandUrl: 'https://etus.digital/',
  brandImage: logo,
  brandTarget: '_blank',

  colorPrimary: '#465058',
  colorSecondary: '#63BA96',
});
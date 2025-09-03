import { create } from '@storybook/theming/create';
import logo from './imgs/brius-logo.png'

export default create({
  base: 'light',
  brandTitle: 'Brius Design Systeam',
  brandUrl: 'https://brius.com.br',
  brandImage: logo,
  brandTarget: '_blank',

  colorPrimary: '#465058',
  colorSecondary: '#004ED7',
});
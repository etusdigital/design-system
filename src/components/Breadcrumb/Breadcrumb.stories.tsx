import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  component: Breadcrumb,
  argTypes: {
    labelKey: {
      table: { defaultValue: { summary: 'label' } },
      description: 'Key for the label in option objects.',
    },
    valueKey: {
      table: { defaultValue: { summary: 'value' } },
      description: 'Key for the value in option objects.',
    },
    getObject: {
      table: { defaultValue: { summary: 'false' } },
      description: 'If true, selected value is the full object.',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Primary: Story = {
  args: {
    defaultValue: 'Home',
    options: ['Home', 'Dashboard', 'Profile', 'Settings'],
  },
};

export const ManyItems: Story = {
  args: {
    defaultValue: 'Page 5',
    options: ['Home', 'Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5', 'Page 6', 'Page 7', 'Current'],
  },
};

export const WithObjects: Story = {
  args: {
    defaultValue: { label: 'Home', value: 'home' },
    options: [
      { label: 'Home', value: 'home' },
      { label: 'Products', value: 'products' },
      { label: 'Details', value: 'details' },
    ],
    getObject: true,
  },
};

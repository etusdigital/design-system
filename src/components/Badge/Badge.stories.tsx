import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  component: Badge,
  argTypes: {
    color: { description: 'Custom CSS color value.' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    type: {
      control: 'select',
      options: ['default', 'secondary', 'heavy'],
      table: { defaultValue: { summary: 'default' } },
    },
    loading: { table: { defaultValue: { summary: 'false' } } },
    closeable: { table: { defaultValue: { summary: 'false' } } },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    labelValue: 'Badge',
    size: 'medium',
    type: 'default',
  },
};

export const WithIcon: Story = {
  args: {
    labelValue: 'Badge',
    icon: 'star',
  },
};

export const Loading: Story = {
  args: {
    labelValue: 'Badge',
    loading: true,
  },
};

export const Closeable: Story = {
  args: {
    labelValue: 'Badge',
    closeable: true,
  },
};

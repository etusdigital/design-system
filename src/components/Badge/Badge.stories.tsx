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
    color: '#000000',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Badge key={size} labelValue="Badge" size={size} color="#000000" />
      ))}
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {(['default', 'secondary', 'heavy'] as const).map((type) => (
        <Badge key={type} labelValue="Badge" type={type} color="#000000" />
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    labelValue: 'Badge',
    icon: 'star',
  },
};

export const IsAppendedIcon: Story = {
  args: {
    color: '#000000',
    labelValue: 'Badge',
    icon: 'star',
    isAppendedIcon: true,
  },
};

export const Loading: Story = {
  args: {
    labelValue: 'Badge',
    color: '#000000',
    loading: true,
  },
};

export const Closeable: Story = {
  args: {
    labelValue: 'Badge',
    color: '#000000',
    closeable: true,
  },
};

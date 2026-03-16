import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta = {
  component: StatusBadge,
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'info', 'success', 'warning', 'danger', 'neutral'],
      table: { defaultValue: { summary: 'primary' } },
    },
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
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Primary: Story = {
  args: {
    labelValue: 'Status',
    color: 'primary',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {(['primary', 'info', 'success', 'warning', 'danger', 'neutral'] as const).map(
        (color) => (
          <StatusBadge key={color} labelValue={color} color={color} />
        )
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <StatusBadge key={size} labelValue={size} size={size} />
      ))}
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {(['default', 'secondary', 'heavy'] as const).map((type) => (
        <StatusBadge key={type} labelValue={type} type={type} />
      ))}
    </div>
  ),
};

export const Loading: Story = {
  args: {
    labelValue: 'Loading',
    loading: true,
  },
};

export const WithIcon: Story = {
  args: {
    labelValue: 'With Icon',
    icon: 'star',
  },
};

export const IsAppendedIcon: Story = {
  args: {
    labelValue: 'Is Appended Icon',
    icon: 'star',
    isAppendedIcon: true,
  },
};

export const Closeable: Story = {
  args: {
    labelValue: 'Closeable',
    closeable: true,
  },
};
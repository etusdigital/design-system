import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  component: Button,
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'info', 'success', 'warning', 'danger', 'neutral'],
      table: { defaultValue: { summary: 'primary' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'plain', 'reverse'],
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    disabled: { table: { defaultValue: { summary: 'false' } } },
    loading: { table: { defaultValue: { summary: 'false' } } },
    round: { table: { defaultValue: { summary: 'false' } } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'default',
    size: 'medium',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {(['primary', 'info', 'success', 'warning', 'danger', 'neutral'] as const).map(
        (color) => (
          <Button key={color} color={color}>
            {color}
          </Button>
        )
      )}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {(['default', 'secondary', 'plain', 'reverse'] as const).map(
        (variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        )
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Loading',
    loading: true,
  },
};

export const Round: Story = {
  args: {
    round: true,
    color: 'primary',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Settings',
    icon: 'settings',
  },
};

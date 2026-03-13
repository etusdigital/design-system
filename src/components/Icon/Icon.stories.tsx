import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta = {
  component: Icon,
  argTypes: {
    name: {
      control: 'text',
      description: 'Material Symbols icon name',
    },
    size: {
      control: 'text',
      description: 'Icon font size (e.g., "24px", "32px")',
    },
    filled: {
      control: 'boolean',
      description: 'Whether to use the filled variant',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'sentiment_satisfied',
    size: '24px',
    filled: false,
  },
};

export const Filled: Story = {
  args: {
    name: 'sentiment_satisfied',
    size: '24px',
    filled: true,
  },
};

export const Large: Story = {
  args: {
    name: 'sentiment_satisfied',
    size: '48px',
    filled: false,
  },
};

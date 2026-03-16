import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta = {
  component: Icon,
  argTypes: {
    name: {
      control: 'text',
      description: 'Material Symbols icon name',
    },
    filled: {
      control: 'boolean',
      description: 'Whether to use the filled variant',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'sentiment_satisfied',
    filled: false,
  },
};

export const Filled: Story = {
  args: {
    name: 'sentiment_satisfied',
    filled: true,
  },
};
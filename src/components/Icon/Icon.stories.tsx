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

/** Small icon — used in Profile search and action rows */
export const Small: Story = {
  args: {
    name: 'search',
    size: '20px',
    filled: false,
  },
};

/** XL icon — used in Profile actions (person, logout) */
export const ExtraLarge: Story = {
  args: {
    name: 'logout',
    size: '32px',
    filled: false,
  },
};

/** Image preview controls — rotate_left, rotate_right, zoom_in, zoom_out, close */
export const ImagePreviewIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Icon name="rotate_left" size="24px" />
      <Icon name="rotate_right" size="24px" />
      <Icon name="zoom_out" size="24px" />
      <Icon name="zoom_in" size="24px" />
      <Icon name="close" size="24px" />
      <Icon name="visibility" size="24px" />
    </div>
  ),
};

/** Profile icons — person, logout, search, account_circle */
export const ProfileIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Icon name="person" size="24px" />
      <Icon name="logout" size="24px" />
      <Icon name="search" size="24px" />
      <Icon name="account_circle" size="24px" />
    </div>
  ),
};

/** Outlined vs Filled comparison */
export const OutlinedVsFilled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Icon name="star" size="32px" filled={false} />
      <Icon name="star" size="32px" filled={true} />
      <Icon name="favorite" size="32px" filled={false} />
      <Icon name="favorite" size="32px" filled={true} />
    </div>
  ),
};

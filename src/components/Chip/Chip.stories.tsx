import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta = {
  component: Chip,
  argTypes: {
    labelValue: {
      control: 'text',
      description: 'This property will be the text in the chip.',
    },
    color: {
      control: 'select',
      options: ['primary', 'info', 'success', 'warning', 'danger', 'neutral'],
      table: {
        defaultValue: { summary: 'primary' },
      },
      description: 'This property will be the chip color.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: 'small' },
      },
    },
    loading: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'Determine if the chip is loading.',
    },
    icon: {
      control: 'text',
      description: 'This property will be the icon in the chip.',
    },
    isAppendedIcon: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'Shows the icon after the text.',
    },
    closeable: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'Adds a close button that emits the close event.',
    },
    children: {
      description: 'If no text is passed, this slot will be displayed instead.',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  labelValue: 'Chip',
  color: 'primary' as const,
  size: 'small' as const,
  loading: false,
  icon: '',
  isAppendedIcon: false,
  closeable: false,
};

export const Primary: Story = {
  render: (args) => <Chip {...args} />,
  args: defaultArgs,
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex gap-xs">
      {(['primary', 'info', 'success', 'warning', 'danger', 'neutral'] as const).map(
        (color) => (
          <Chip key={color} {...args} color={color} />
        )
      )}
    </div>
  ),
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-xs">
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Chip key={size} {...args} size={size} />
      ))}
    </div>
  ),
  args: defaultArgs,
};

export const Loading: Story = {
  render: (args) => <Chip {...args} />,
  args: {
    ...defaultArgs,
    loading: true,
  },
};

export const WithIcon: Story = {
  render: (args) => <Chip {...args} />,
  args: {
    ...defaultArgs,
    icon: 'star',
  },
};

export const IsAppendedIcon: Story = {
  render: (args) => <Chip {...args} />,
  args: {
    ...defaultArgs,
    icon: 'star',
    isAppendedIcon: true,
  },
};

export const Closeable: Story = {
  render: (args) => <Chip {...args} />,
  args: {
    ...defaultArgs,
    closeable: true,
  },
};

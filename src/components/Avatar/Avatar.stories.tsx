import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import photo from './photo.svg';

const meta = {
  component: Avatar,
  argTypes: {
    name: {
      control: 'text',
      description: 'Will be the avatar name.',
    },
    src: {
      control: 'text',
      description: 'Will be the avatar image. SVG images are recommended.',
    },
    alt: {
      control: 'text',
      description: 'Will be the avatar image alt.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  name: 'John Doe',
  src: photo,
  alt: 'Avatar',
  size: 'medium' as const,
};

export const Primary: Story = {
  render: (args) => <Avatar {...args} />,
  args: defaultArgs,
};

export const noSrc: Story = {
  render: (args) => <Avatar {...args} />,
  args: {
    ...defaultArgs,
    src: undefined,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-xs">
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
  args: {
    ...defaultArgs,
    src: undefined,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';
import bannerImage from './banner.jpg';

const meta = {
  component: Image,
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    width: {
      control: 'text',
      description: 'Width of the image (string with units or number for px)',
    },
    height: {
      control: 'text',
      description: 'Height of the image (string with units or number for px)',
    },
    icon: {
      control: 'text',
      description: 'Icon name for the preview overlay',
      table: {
        defaultValue: { summary: 'visibility' },
      },
    },
    preview: {
      control: 'boolean',
      description: 'Enable image preview with zoom and rotation controls',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  src: bannerImage,
  alt: 'Sample image',
  width: '250',
  icon: 'visibility',
  preview: false,
};

export const Primary: Story = {
  args: defaultArgs,
};

export const Preview: Story = {
  args: {
    ...defaultArgs,
    preview: true,
  },
};

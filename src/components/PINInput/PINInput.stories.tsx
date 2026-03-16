import type { Meta, StoryObj } from '@storybook/react';
import { PINInput } from './PINInput';

const meta = {
  component: PINInput,
  argTypes: {
    value: {
      type: 'string',
      description: 'Controlled value of the PIN input.',
    },
    length: {
      type: 'number',
      description: 'Number of input fields to display.',
      table: { defaultValue: { summary: '6' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all input fields.',
      table: { defaultValue: { summary: 'false' } },
    },
    placeholder: {
      type: 'string',
      description: 'Placeholder text for each field.',
    },
    separator: {
      type: 'number',
      description: 'Show separator line after every N fields.',
    },
    type: {
      control: 'select',
      options: ['text', 'password'],
      table: { defaultValue: { summary: 'text' } },
      description: 'Input field type.',
    },
    otp: {
      control: 'boolean',
      description: 'Sets autocomplete="one-time-code" on fields.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof PINInput>;

export default meta;
type Story = StoryObj<typeof PINInput>;

export const Default: Story = {
  args: {
    length: 6,
  },
};

export const WithSeparator: Story = {
  args: {
    length: 6,
    separator: 3,
  },
};

export const Password: Story = {
  args: {
    length: 4,
    type: 'password',
  },
};

export const OTP: Story = {
  args: {
    length: 6,
    otp: true,
  },
};

export const Disabled: Story = {
  args: {
    length: 4,
    disabled: true,
  },
};

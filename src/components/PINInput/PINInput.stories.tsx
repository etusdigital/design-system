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
      options: ['text', 'number','password'],
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

export const Primary: Story = {
  args: {
    length: 6,
  },
};

export const Length: Story = {
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

export const Types: Story = {
  render: (args: any) => (
    <div className="flex flex-col gap-xs">
      {['text', 'number', 'password'].map((type) => (
        <PINInput key={type} {...args} type={type} />
      ))}
    </div>
  ),
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

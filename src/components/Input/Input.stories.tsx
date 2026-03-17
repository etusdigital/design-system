import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

export default {
  component: Input,
  title: 'Components/Input',
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'search', 'color', 'password', 'email', 'url', 'domain'],
      description: 'Input type variant',
    },
    mask: {
      control: 'select',
      options: ['cpf', 'cnpj', 'cep'],
      description: 'Mask applied to the input (text type only)',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Types: Story = {
  render: (args: any) => (
    <div className="flex flex-col gap-xs">
      {['text', 'number', 'search', 'color', 'password', 'email', 'url', 'domain'].map((type) => (
        <Input key={type} {...args} type={type} labelValue={type} />
      ))}
    </div>
  ),
};

export const MaxLetters: Story = {
  args: {
    labelValue: 'Max Letters',
    max: 20,
    type: 'text',
  },
};

export const IsError: Story = {
  args: {
    labelValue: 'Is Error',
    errorMessage: 'This is an error message',
    isError: true,
    type: 'text',
  },
};

export const InfoMessage: Story = {
  args: {
    labelValue: 'Info Message',
    infoMessage: 'This is an info message',
    type: 'text',
  },
};

export const Disabled: Story = {
  args: {
    labelValue: 'Disabled',
    disabled: true,
    type: 'text',
  },
};

export const Required: Story = {
  args: {
    labelValue: 'Required',
    required: true,
    type: 'text',
  },
};

export const TextAlign: Story = {
  render: (args: any) => (
    <div className="flex flex-col gap-xs">
      {['start', 'center', 'end'].map((textAlign) => (
        <Input key={textAlign} {...args} textAlign={textAlign} labelValue={textAlign} />
      ))}
    </div>
  ),
};

export const DomainType: Story = {
  args: {
    type: 'domain',
    labelValue: 'Domain',
    placeholder: 'example.com',
  },
};

export const UrlType: Story = {
  args: {
    type: 'url',
    labelValue: 'URL',
    placeholder: 'https://example.com',
  },
};
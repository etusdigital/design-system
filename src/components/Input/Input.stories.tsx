import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

export default {
  component: Input,
  title: 'Components/Input',
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'search', 'color', 'password', 'file', 'email', 'url', 'domain'],
      description: 'Input type variant',
    },
    mask: {
      control: 'select',
      options: ['cpf', 'cnpj', 'cep', 'domain', 'url'],
      description: 'Mask applied to the input (text type only)',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    labelValue: 'Email',
    placeholder: 'Enter your email',
    type: 'text',
  },
};

export const WithMask: Story = {
  args: {
    labelValue: 'CPF',
    mask: 'cpf',
    placeholder: '000.000.000-00',
    type: 'text',
  },
};

export const NumberType: Story = {
  args: {
    labelValue: 'Quantity',
    type: 'number',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: '0',
  },
};

export const PasswordType: Story = {
  args: {
    labelValue: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const SearchType: Story = {
  args: {
    labelValue: 'Search',
    type: 'search',
    placeholder: 'Search...',
  },
};

export const WithError: Story = {
  args: {
    labelValue: 'Email',
    type: 'email',
    isError: true,
    errorMessage: 'Invalid email address',
    placeholder: 'Enter email',
  },
};

export const WithCounter: Story = {
  args: {
    labelValue: 'Bio',
    type: 'text',
    max: 100,
    placeholder: 'Enter bio...',
  },
};

export const Disabled: Story = {
  args: {
    labelValue: 'Disabled Input',
    disabled: true,
    placeholder: 'Cannot type here',
  },
};

export const WithInfoMessage: Story = {
  args: {
    labelValue: 'Username',
    infoMessage: 'Must be at least 3 characters',
    placeholder: 'Enter username',
  },
};

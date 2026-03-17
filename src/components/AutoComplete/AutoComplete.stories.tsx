import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AutoComplete } from './AutoComplete';

const meta = {
  component: AutoComplete,
  argTypes: {
    labelValue: {
      type: { name: 'string' },
      description: 'Will be the select label.',
    },
    options: {
      type: { name: 'array', value: { name: 'object', value: {} } },
      description: 'Array of values to be used as options.',
    },
    placeholder: {
      type: { name: 'string' },
    },
    required: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
      description: 'Makes the select container required.',
    },
    disabled: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    isError: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
      description: 'Activate error mode.',
    },
    errorMessage: {
      type: { name: 'string' },
      description: 'Will be the error message.',
    },
    infoMessage: {
      type: { name: 'string' },
      description: 'Will be the info message.',
    },
  },
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof AutoComplete>;

const defaultOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

export const Primary: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <AutoComplete
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
        labelValue="label"
        placeholder="Placeholder"
      />
    );
  },
  args: {
    disabled: false,
    required: false,
    isError: false,
    errorMessage: '',
    infoMessage: '',
  },
};

export const Absolute: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <AutoComplete
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
        labelValue="label"
        placeholder="Placeholder"
      />
    );
  },
};

export const Required: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <AutoComplete
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
        labelValue="label"
        placeholder="Placeholder"
        required
      />
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <AutoComplete
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
        labelValue="label"
        placeholder="Placeholder"
        disabled
      />
    );
  },
};

export const IsError: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <AutoComplete
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
        labelValue="label"
        placeholder="Placeholder"
        isError
        errorMessage="Error message"
      />
    );
  },
};

export const InfoMessage: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <AutoComplete
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
        labelValue="label"
        placeholder="Placeholder"
        infoMessage="Info message"
      />
    );
  },
};

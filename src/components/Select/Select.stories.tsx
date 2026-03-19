import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  component: Select,
  argTypes: {
    labelValue: {
      type: { name: 'string' },
      description: 'Will be the select label.',
    },
    options: {
      type: { name: 'array', value: { name: 'object', value: {} } },
      description:
        'Array of values to be used as options. Can also be an array of objects, in which case you should use the prop "labelKey" to specify which key to use as a label.',
    },
    labelKey: {
      type: { name: 'string' },
      table: { defaultValue: { summary: 'label' } },
    },
    valueKey: {
      type: { name: 'string' },
      table: { defaultValue: { summary: 'value' } },
    },
    getObject: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
      description: 'If true, the selected value will be an object instead of value-key value.',
    },
    multiple: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
      description: 'If true, the selected value will be an array of the selected values.',
    },
    secondary: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    searchable: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    clearable: {
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
    required: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const defaultOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

export const Primary: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
        labelValue="label"
        options={defaultOptions}
        labelKey="label"
        valueKey="value"
      >
        Placeholder
      </Select>
    );
  },
  args: {
    searchable: false,
    clearable: false,
    multiple: false,
    getObject: false,
    disabled: false,
    required: false,
    secondary: false,
    isError: false,
    errorMessage: '',
    infoMessage: '',
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
        labelValue="label"
        options={defaultOptions}
        disabled
      >
        Placeholder
      </Select>
    );
  },
};

export const Required: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
        labelValue="label"
        options={defaultOptions}
        required
      >
        Placeholder
      </Select>
    );
  },
};

export const Searchable: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
        labelValue="label"
        options={defaultOptions}
        searchable
      >
        Placeholder
      </Select>
    );
  },
};

export const Clearable: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
        labelValue="label"
        options={defaultOptions}
        clearable
      >
        Placeholder
      </Select>
    );
  },
};

export const Multiple: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
        labelValue="label"
        options={[
          { label: 'Option 1', value: 0 },
          { label: 'Option 2', value: 1 },
          { label: 'Option 3', value: 2 },
          { label: 'Option 4', value: 3 },
        ]}
        multiple
      >
        Placeholder
      </Select>
    );
  },
};

export const Secondary: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
        labelValue="label"
        options={defaultOptions}
        secondary
      >
        Placeholder
      </Select>
    );
  },
};

export const IsError: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
        labelValue="label"
        options={defaultOptions}
        isError
        errorMessage="Error message"
      >
        Placeholder
      </Select>
    );
  },
};

export const InfoMessage: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(null);
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
        labelValue="label"
        options={defaultOptions}
        infoMessage="Info message"
      >
        Placeholder
      </Select>
    );
  },
};

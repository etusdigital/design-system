import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Filter } from './Filter';

const meta = {
  component: Filter,
  argTypes: {
    value: {
      description: 'Controls the selected filter values by category.',
    },
    options: {
      description:
        'Array of filter categories. Each category must have label, value, and an options[] array.',
    },
    labelValue: {
      control: 'text',
      description: 'Filter trigger label.',
    },
    labelKey: {
      control: 'text',
      table: { defaultValue: { summary: 'label' } },
    },
    valueKey: {
      control: 'text',
      table: { defaultValue: { summary: 'value' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    isError: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    errorMessage: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof Filter>;

const defaultOptions = [
  {
    label: 'Option 1',
    value: 'option1',
    options: [
      { label: 'Option 1', value: 0 },
      { label: 'Option 2', value: 1 },
      { label: 'Option 3', value: 2 },
      { label: 'Option 4', value: 3 },
      { label: 'Option 5', value: 4 },
    ],
  },
  {
    label: 'Option 2',
    value: 'option2',
    options: [
      { label: 'Option 1', value: 0 },
      { label: 'Option 2', value: 1 },
      { label: 'Option 3', value: 2 },
      { label: 'Option 4', value: 3 },
      { label: 'Option 5', value: 4 },
    ],
  },
];

export const Primary: Story = {
  render: (args) => {
    const [value, setValue] = useState<Record<string, any[]>>({});
    return (
      <Filter
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
        onApply={(v) => console.log('apply', v)}
      />
    );
  },
  args: {
    labelValue: 'label',
    labelKey: 'label',
    valueKey: 'value',
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<Record<string, any[]>>({});
    return (
      <Filter
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
      />
    );
  },
  args: {
    labelValue: 'label',
    disabled: true,
  },
};

export const Searchable: Story = {
  render: (args) => {
    const [value, setValue] = useState<Record<string, any[]>>({});
    return (
      <Filter
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
      />
    );
  },
  args: {
    labelValue: 'label',
    searchable: true
  },
};

export const IsError: Story = {
  render: (args) => {
    const [value, setValue] = useState<Record<string, any[]>>({});
    return (
      <Filter
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
      />
    );
  },
  args: {
    labelValue: 'label',
    isError: true,
    errorMessage: 'Error message',
  },
};

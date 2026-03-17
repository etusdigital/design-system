import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TagSelect } from './TagSelect';

const meta = {
  component: TagSelect,
  argTypes: {
    labelValue: {
      type: { name: 'string' },
      description: 'Will be the input label.',
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
    searchable: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    creatable: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
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
    required: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    placeholder: {
      type: { name: 'string' },
      description: 'Placeholder for the search input.',
    },
  },
} satisfies Meta<typeof TagSelect>;

export default meta;
type Story = StoryObj<typeof TagSelect>;

export const Primary: Story = {
  render: (args) => {
    const [value, setValue] = useState<any[]>(undefined as any);
    return (
      <TagSelect
        {...args}
        value={value}
        onChange={setValue}
        options={[]}
        labelValue="label"
        labelKey="label"
        placeholder="Search"
      />
    );
  },
  args: {
    disabled: false,
    required: false,
    searchable: false,
    creatable: false,
    isError: false,
    errorMessage: '',
    infoMessage: '',
  },
};

export const Searchable: Story = {
  render: (args) => {
    const [value, setValue] = useState<any[]>([]);
    return (
      <TagSelect
        {...args}
        value={value}
        onChange={setValue}
        options={[
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
          { label: 'Option 3', value: 3 },
        ]}
        labelValue="label"
        labelKey="label"
        placeholder="Search"
        searchable
      />
    );
  },
};

export const Creatable: Story = {
  render: (args) => {
    const [value, setValue] = useState<any[]>([]);
    return (
      <TagSelect
        {...args}
        value={value}
        onChange={setValue}
        options={[]}
        labelValue="label"
        labelKey="label"
        placeholder="Search"
        creatable
      />
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<any[]>(undefined as any);
    return (
      <TagSelect
        {...args}
        value={value}
        onChange={setValue}
        options={[]}
        labelValue="label"
        labelKey="label"
        placeholder="Search"
        disabled
      />
    );
  },
};

export const Required: Story = {
  render: (args) => {
    const [value, setValue] = useState<any[]>(undefined as any);
    return (
      <TagSelect
        {...args}
        value={value}
        onChange={setValue}
        options={[]}
        labelValue="label"
        labelKey="label"
        placeholder="Search"
        required
      />
    );
  },
};

export const IsError: Story = {
  render: (args) => {
    const [value, setValue] = useState<any[]>(undefined as any);
    return (
      <TagSelect
        {...args}
        value={value}
        onChange={setValue}
        options={[]}
        labelValue="label"
        labelKey="label"
        placeholder="Search"
        isError
        errorMessage="Error message"
      />
    );
  },
};

export const InfoMessage: Story = {
  render: (args) => {
    const [value, setValue] = useState<any[]>(undefined as any);
    return (
      <TagSelect
        {...args}
        value={value}
        onChange={setValue}
        options={[]}
        labelValue="label"
        labelKey="label"
        placeholder="Search"
        infoMessage="Info message"
      />
    );
  },
};

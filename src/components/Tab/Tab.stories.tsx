import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';

const meta = {
  component: Tab,
  argTypes: {
    value: {
      type: { name: 'number' },
      description: 'The currently active tab index.',
    },
    options: {
      type: { name: 'array', value: { name: 'object', value: {} } },
      description: 'Array of values to be used as options.',
    },
    labelKey: {
      type: { name: 'string' },
      description: 'Property name used for displaying option labels when using object arrays.',
      table: { defaultValue: { summary: 'label' } },
    },
    notCard: {
      type: { name: 'boolean' },
      description: 'No card will wrap the options.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof Tab>;

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState<number | undefined>(undefined);
    return (
      <Tab
        className="w-fit"
        value={value}
        onChange={setValue}
        options={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']}
      />
    );
  },
};

export const ObjectArray: Story = {
  render: () => {
    const [value, setValue] = useState<number | undefined>(undefined);
    return (
      <Tab
        className="w-fit"
        value={value}
        onChange={setValue}
        options={[
          { label: 'Laptop', value: 'laptop', icon: 'laptop' },
          { label: 'Smartphone', value: 'smartphone', icon: 'smartphone' },
        ]}
        labelKey="label"
      />
    );
  },
};

export const NotCard: Story = {
  render: () => {
    const [value, setValue] = useState<number | undefined>(undefined);
    return (
      <Tab
        className="w-fit"
        value={value}
        onChange={setValue}
        options={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']}
        notCard={true}
      />
    );
  },
};

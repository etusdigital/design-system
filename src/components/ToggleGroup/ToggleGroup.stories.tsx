import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
  render: (args: any) => {
    const [value, setValue] = useState(args.value);
    return <ToggleGroup {...args} value={value} onChange={setValue} />;
  },
  argTypes: {
    value: {
      type: { name: 'other', value: 'any' },
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    vertical: {
      type: { name: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      type: { name: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: 'select',
      options: ['default', 'secondary'],
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

const defaultOptions = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
];

export const Primary: Story = {
  args: {
    value: 1,
    vertical: false,
    disabled: false,
    options: defaultOptions,
    type: 'default',
  },
};

export const Secondary: Story = {
  args: {
    value: 1,
    vertical: false,
    disabled: false,
    options: defaultOptions,
    type: 'secondary',
  },
};

export const Vertical: Story = {
  args: {
    value: 1,
    vertical: true,
    disabled: false,
    options: defaultOptions,
    type: 'default',
  },
};

export const VerticalSecondary: Story = {
  args: {
    value: 1,
    vertical: true,
    disabled: false,
    options: defaultOptions,
    type: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    value: 1,
    vertical: false,
    disabled: true,
    options: defaultOptions,
    type: 'default',
  },
};

export const Types: Story = {
  render: () => {
    const [defaultValue, setDefaultValue] = useState<any>(1);
    const [secondaryValue, setSecondaryValue] = useState<any>(1);
    return (
      <div className="flex flex-col gap-xs">
        <ToggleGroup value={defaultValue} onChange={setDefaultValue} options={defaultOptions} type="default" />
        <ToggleGroup value={secondaryValue} onChange={setSecondaryValue} options={defaultOptions} type="secondary" />
      </div>
    );
  },
};

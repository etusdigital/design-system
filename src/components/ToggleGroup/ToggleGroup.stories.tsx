import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
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
  render: () => (
    <div className="flex flex-col gap-xs">
      <ToggleGroup value={1} options={defaultOptions} type="default" />
      <ToggleGroup value={1} options={defaultOptions} type="secondary" />
    </div>
  ),
};

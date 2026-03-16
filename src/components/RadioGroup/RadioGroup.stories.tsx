import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';

const meta = {
  component: RadioGroup,
  argTypes: {
    value: {
      type: { name: 'other', value: 'any' },
      table: { defaultValue: { summary: 'undefined' } },
    },
    vertical: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
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
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

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
    labelKey: 'label',
    valueKey: 'value',
    getObject: false,
  },
};

export const Vertical: Story = {
  args: {
    value: 2,
    vertical: true,
    disabled: false,
    options: defaultOptions,
  },
};

export const Disabled: Story = {
  args: {
    value: 1,
    disabled: true,
    options: defaultOptions,
  },
};

export const StringOptions: Story = {
  args: {
    value: 'apple',
    options: ['apple', 'banana', 'cherry'],
  },
};

export const WithChildren: Story = {
  render: () => (
    <RadioGroup defaultValue="a">
      <div>Children mode — Radio components are passed as children</div>
    </RadioGroup>
  ),
};

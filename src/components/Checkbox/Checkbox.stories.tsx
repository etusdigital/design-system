import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

export default {
  component: Checkbox,
  argTypes: {
    value: {
      control: { type: 'select' },
      options: [true, false, null],
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    rhs: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'Puts the label on the right-hand side (checkbox on left) or left-hand side (checkbox on right).',
    },
    allowIndeterminate: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'Allows the checkbox to cycle through true/null/false states.',
    },
    disabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  render: (args: any) => {
    const [checked, setChecked] = useState<boolean | null>(false);
    return (
      <Checkbox
        id="primary-checkbox"
        value={checked}
        onChange={setChecked}
        disabled={args.disabled}
        rhs={args.rhs}
        allowIndeterminate={args.allowIndeterminate}
      >
        Test label
      </Checkbox>
    );
  },
  args: {
    rhs: false,
    allowIndeterminate: false,
    disabled: false,
  },
};

export const RHS: Story = {
  render: (args: any) => {
    const [checked, setChecked] = useState<boolean | null>(false);
    return (
      <Checkbox
        id="rhs-checkbox"
        value={checked}
        onChange={setChecked}
        disabled={args.disabled}
        rhs={args.rhs}
        allowIndeterminate={args.allowIndeterminate}
      >
        Test label
      </Checkbox>
    );
  },
  args: {
    rhs: true,
    allowIndeterminate: false,
    disabled: false,
  },
};

export const AllowIndeterminate: Story = {
  render: (args: any) => {
    const [checked, setChecked] = useState<boolean | null>(false);
    return (
      <Checkbox
        id="indeterminate-checkbox"
        value={checked}
        onChange={setChecked}
        disabled={args.disabled}
        rhs={args.rhs}
        allowIndeterminate={args.allowIndeterminate}
      >
        Test label
      </Checkbox>
    );
  },
  args: {
    rhs: false,
    allowIndeterminate: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args: any) => (
    <Checkbox
      id="disabled-checkbox"
      defaultValue={false}
      disabled={args.disabled}
      rhs={args.rhs}
      allowIndeterminate={args.allowIndeterminate}
    >
      Test label
    </Checkbox>
  ),
  args: {
    rhs: false,
    allowIndeterminate: false,
    disabled: true,
  },
};

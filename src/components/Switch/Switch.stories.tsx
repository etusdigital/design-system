import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

export default {
  component: Switch,
  argTypes: {
    value: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    rhs: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'Puts the label on the right-hand side.',
    },
    disabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
  render: (args: any) => {
    const [on, setOn] = useState(false);
    return (
      <Switch
        id="primary-switch"
        value={on}
        onChange={setOn}
        disabled={args.disabled}
        rhs={args.rhs}
      >
        Switch Label
      </Switch>
    );
  },
  args: {
    rhs: false,
    disabled: false,
  },
};

export const RHS: Story = {
  render: (args: any) => {
    const [on, setOn] = useState(false);
    return (
      <Switch
        id="rhs-switch"
        value={on}
        onChange={setOn}
        disabled={args.disabled}
        rhs={args.rhs}
      >
        Switch Label
      </Switch>
    );
  },
  args: {
    rhs: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args: any) => (
    <Switch
      id="disabled-switch"
      value={false}
      disabled={args.disabled}
      rhs={args.rhs}
    >
      Switch Label
    </Switch>
  ),
  args: {
    rhs: false,
    disabled: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  argTypes: {
    value: {
      type: { name: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    groupValue: {
      description: 'Used by the ToggleGroup component.',
      type: { name: 'other', value: 'any' },
      table: {
        defaultValue: { summary: 'undefined' },
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

type Story = StoryObj<typeof Toggle>;

export const Primary: Story = {
  args: {
    type: 'default',
    disabled: false,
    children: 'Test toggle',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    disabled: false,
    children: 'Test toggle',
  },
};

export const Disabled: Story = {
  args: {
    type: 'default',
    disabled: true,
    children: 'Disabled',
  },
};

export const Controlled: Story = {
  render: () => {
    const [active, setActive] = useState(false);
    return (
      <div className="flex gap-xs items-center">
        <Toggle value={active} onChange={() => setActive(true)}>
          Controlled
        </Toggle>
        <button onClick={() => setActive(false)} style={{ marginLeft: 8 }}>
          Reset
        </button>
      </div>
    );
  },
};

export const Types: Story = {
  render: () => (
    <div className="flex gap-xs">
      <Toggle type="default">Default</Toggle>
      <Toggle type="secondary">Secondary</Toggle>
    </div>
  ),
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const meta = {
  component: Stepper,
  argTypes: {
    value: {
      description: 'Current step index (0-based).',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    options: {
      type: { name: 'array', value: { name: 'object', value: {} } },
      description: 'Array of step objects.',
    },
    labelKey: {
      type: { name: 'string' },
      table: {
        defaultValue: { summary: 'label' },
      },
    },
    size: {
      type: { name: 'string' },
      control: 'select',
      options: ['medium', 'large'],
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    noClick: {
      type: { name: 'boolean' },
      description: 'If true, the user will not be able to change the step by clicking.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    background: {
      type: { name: 'string' },
      description: 'This property will be the stepper background.',
      table: {
        defaultValue: { summary: '--neutral-background-default' },
      },
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof Stepper>;

const defaultOptions = [
  { label: 'Basic Info', icon: 'person' },
  { label: 'Configuration', icon: 'settings' },
  { label: 'Review', icon: 'visibility' },
  { label: 'Complete', icon: 'check_circle' },
];

export const Primary: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Stepper
        value={step}
        onChange={setStep}
        options={defaultOptions}
        size="medium"
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <div className="flex flex-col gap-base">
        <Stepper
          value={step}
          onChange={setStep}
          options={defaultOptions}
          size="medium"
        />
        <Stepper
          value={step}
          onChange={setStep}
          options={defaultOptions}
          size="large"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Stepper
        value={step}
        onChange={setStep}
        options={defaultOptions}
        noClick={true}
      />
    );
  },
};

export const AllowedSkip: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Stepper
        value={step}
        onChange={setStep}
        options={defaultOptions}
        size="medium"
      />
    );
  },
};

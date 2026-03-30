import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const meta = {
  component: Stepper,
  argTypes: {
    value: {
      description: 'Current step.',
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
    valueKey: {
      type: { name: 'string' },
      table: {
        defaultValue: { summary: 'value' },
      },
    },
    size: {
      type: { name: 'string' },
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      type: { name: 'boolean' },
      description: 'If true, the user will not be able to change the step by clicking.',
      table: {
        defaultValue: { summary: 'false' },
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
    const [step, setStep] = useState(undefined);
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
    const [step, setStep] = useState(undefined);
    return (
      <div className="flex flex-col gap-xl">
        <Stepper
          value={step}
          onChange={setStep}
          options={defaultOptions}
          size="small"
        />
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
    const [step, setStep] = useState(undefined);
    return (
      <Stepper
        value={step}
        onChange={setStep}
        options={defaultOptions}
        disabled={true}
      />
    );
  },
};

export const AllowedSkip: Story = {
  render: () => {
    const [step, setStep] = useState(undefined);
    return (
      <Stepper
        value={step}
        onChange={setStep}
        options={defaultOptions}
        size="medium"
        allowSkip
      />
    );
  },
};

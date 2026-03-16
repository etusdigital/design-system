import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta = {
  component: Radio,
  argTypes: {
    value: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    groupValue: {
      description: 'Used by RadioGroup to identify which option this Radio represents.',
      type: { name: 'other', value: 'any' },
      table: { defaultValue: { summary: 'undefined' } },
    },
    disabled: {
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'onboarding'],
      table: { defaultValue: { summary: 'default' } },
      description: 'Visual variant of the radio button.',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof Radio>;

export const Primary: Story = {
  args: {
    value: false,
    disabled: false,
    variant: 'default',
    children: 'Test radio',
  },
};

export const Selected: Story = {
  args: {
    value: true,
    variant: 'default',
    children: 'Selected radio',
  },
};

export const Disabled: Story = {
  args: {
    value: false,
    disabled: true,
    variant: 'default',
    children: 'Disabled radio',
  },
};

export const Onboarding: Story = {
  args: {
    value: false,
    variant: 'onboarding',
    children: 'Onboarding radio',
  },
};

export const OnboardingSelected: Story = {
  args: {
    value: true,
    variant: 'onboarding',
    children: 'Onboarding selected',
  },
};

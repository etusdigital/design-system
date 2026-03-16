import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

export default {
  component: Slider,
  argTypes: {
    value: {
      description:
        'Controlled value (0–1 if no max, or 0–max if max is set). For isRange, pass [number, number].',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    max: {
      control: 'number',
      description: 'If set, value scale changes from 0–1 to 0–max.',
    },
    unit: {
      control: 'text',
      description: 'Unit label shown in tooltip.',
    },
    color: {
      control: 'color',
      description: 'Custom fill and cursor color.',
    },
    showTooltip: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    vertical: {
      control: 'boolean',
    },
    isRange: {
      control: 'boolean',
    },
    neutralBackground: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Slider>;

type Story = StoryObj<typeof Slider>;

export const Primary: Story = {
  args: {
    value: 0.5,
    size: 'medium',
  },
};

export const Sizes: Story = {
  render: (args: any) => (
    <div className="flex flex-col gap-lg">
      {['small', 'medium', 'large'].map((size) => (
        <Slider key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const IsRange: Story = {
  args: {
    value: [0.2, 0.8],
    isRange: true,
  },
};

export const ShowTooltip: Story = {
  args: {
    value: 0.5,
    showTooltip: true,
    unit: '%',
  },
};

export const Disabled: Story = {
  args: {
    value: 0.5,
    disabled: true,
  },
};

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: '15em', display: 'flex', alignItems: 'stretch' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    value: 0.5,
    vertical: true,
  },
};

export const FillColors: Story = {
  args: {
    value: 0.5,
    fillColors: ['#00CEFC', '#50358A', '#FF9654'],
  },
};

export const WithSteps: Story = {
  args: {
    value: 0.5,
    steps: [
      { label: '0%', value: 0 },
      { label: '25%', value: 0.25 },
      { label: '50%', value: 0.5 },
      { label: '75%', value: 0.75 },
      { label: '100%', value: 1 },
    ],
  },
};

export const CustomColor: Story = {
  args: {
    value: 0.6,
    color: '#FF9654',
  },
};

export const NeutralBackground: Story = {
  args: {
    value: 0.4,
    neutralBackground: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 1, step: 0.01 },
      description:
        'The current progress value. If steps is not defined, it is the bar fill percentage on a 0 to 1 scale.',
      table: { defaultValue: { summary: '0' } },
    },
    color: {
      control: 'color',
      description: 'The color of the progress bar fill.',
    },
    icon: {
      control: 'text',
      description:
        'The icon shown after the loading percentage. Works only with the normal bar without animation.',
    },
    infoMessage: {
      control: 'text',
      description: 'Shown in a tooltip when the icon is hovered.',
    },
    type: {
      control: 'select',
      options: ['primary', 'info', 'success', 'warning', 'danger', 'neutral'],
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    animationType: {
      control: 'select',
      options: ['indeterminate', 'query', undefined],
      description: 'The progress bar animation type.',
      table: { defaultValue: { summary: '' } },
    },
    steps: {
      control: 'number',
      description:
        'The amount of steps used to calculate the loading percentage.',
      table: { defaultValue: { summary: '0' } },
    },
    displayPercentage: {
      control: 'select',
      options: ['center', 'bar', undefined],
      description: 'Display the percentage (bar mode only).',
      table: { defaultValue: { summary: '' } },
    },
    neutralBackground: {
      control: 'boolean',
      description: 'If true, the background will be neutral.',
      table: { defaultValue: { summary: 'false' } },
    },
    iconSlot: {
      description: 'React node to replace the icon.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

const defaultArgs = {
  value: 0.5,
  size: 'medium' as const,
  type: 'primary' as const,
  color: '',
  icon: '',
  infoMessage: '',
  steps: 0,
  animationType: undefined,
  displayPercentage: undefined,
  neutralBackground: false,
};

export const Primary: Story = {
  args: defaultArgs,
};

export const Types: Story = {
  render: (args: any) => (
    <div className="flex flex-col gap-xs">
      {(['primary', 'info', 'success', 'warning', 'danger', 'neutral'] as const).map((type) => (
        <ProgressBar key={type} {...args} type={type} />
      ))}
    </div>
  ),
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args: any) => (
    <div className="flex flex-col gap-xs">
      {(['small', 'medium', 'large'] as const).map((size) => (
        <ProgressBar key={size} {...args} size={size} />
      ))}
    </div>
  ),
  args: defaultArgs,
};

export const Steps: Story = {
  args: {
    ...defaultArgs,
    steps: 5,
    value: 3,
  },
};

export const AnimationTypes: Story = {
  render: (args: any) => (
    <div className="flex flex-col gap-xs">
      {(['indeterminate', 'query'] as const).map((animationType) => (
        <ProgressBar key={animationType} {...args} animationType={animationType} />
      ))}
    </div>
  ),
  args: defaultArgs,
};

export const DisplayPercentage: Story = {
  render: (args: any) => (
    <div className="flex flex-col gap-xs">
      {(['center', 'bar'] as const).map((displayPercentage) => (
        <ProgressBar key={displayPercentage} {...args} displayPercentage={displayPercentage} />
      ))}
    </div>
  ),
  args: defaultArgs,
};

export const WithIcon: Story = {
  args: {
    ...defaultArgs,
    icon: 'rocket_launch',
    infoMessage: 'Upload in progress',
  },
};

export const NeutralBackground: Story = {
  args: {
    ...defaultArgs,
    neutralBackground: true,
  },
};

export const IconSlot: Story = {
  render: (args: any) => (
    <ProgressBar
      {...args}
      displayPercentage="bar"
      iconSlot={<span>Slot: icon-slot</span>}
    />
  ),
  args: {
    ...defaultArgs,
    value: 0.5,
  },
};

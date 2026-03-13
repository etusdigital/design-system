import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta = {
  component: Tooltip,
  argTypes: {
    labelValue: {
      control: 'text',
      description: 'This is the text showed inside the tooltip.',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      table: {
        defaultValue: { summary: 'right' },
      },
      description: 'This is the position tooltip will be placed.',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  labelValue: 'Tooltip',
  position: 'right' as const,
};

export const Primary: Story = {
  args: defaultArgs,
  render: (args) => (
    <Tooltip {...args}>
      <span>Hover me</span>
    </Tooltip>
  ),
};

export const Positions: Story = {
  args: defaultArgs,
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Tooltip labelValue={args.labelValue} position="right">
        <span>Right</span>
      </Tooltip>
      <Tooltip labelValue={args.labelValue} position="top">
        <span>Top</span>
      </Tooltip>
      <Tooltip labelValue={args.labelValue} position="left">
        <span>Left</span>
      </Tooltip>
      <Tooltip labelValue={args.labelValue} position="bottom">
        <span>Bottom</span>
      </Tooltip>
    </div>
  ),
};

export const Label: Story = {
  args: defaultArgs,
  render: (args) => (
    <Tooltip position={args.position}>
      <span>Rich tooltip</span>
      <Tooltip.Label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>Rich content here</span>
        </div>
      </Tooltip.Label>
    </Tooltip>
  ),
};

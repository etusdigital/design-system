import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

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
  render: (args: any) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const Positions: Story = {
  args: defaultArgs,
  render: (args: any) => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Tooltip labelValue={args.labelValue} position="right">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip labelValue={args.labelValue} position="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip labelValue={args.labelValue} position="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip labelValue={args.labelValue} position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
    </div>
  ),
};

export const Label: Story = {
  args: defaultArgs,
  render: (args: any) => (
    <Tooltip position={args.position}>
      <Button>Rich tooltip</Button>
      <Tooltip.Label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>Rich content here</span>
        </div>
      </Tooltip.Label>
    </Tooltip>
  ),
};

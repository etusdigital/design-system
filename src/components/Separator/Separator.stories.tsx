import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

const meta = {
  component: Separator,
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'center', 'right'],
      table: {
        defaultValue: { summary: 'right' },
      },
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  position: 'right' as const,
};

export const Primary: Story = {
  render: (args) => <Separator {...args}>Separator</Separator>,
  args: defaultArgs,
};

export const Positions: Story = {
  render: () => (
    <div className="space-y-lg">
      <Separator position="left">Left</Separator>
      <Separator position="center">Center</Separator>
      <Separator position="right">Right</Separator>
    </div>
  ),
  args: defaultArgs,
};

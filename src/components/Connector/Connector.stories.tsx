import type { Meta, StoryObj } from '@storybook/react';
import { Connector } from './Connector';
import { Card } from '../Card/Card';

const meta = {
  component: Connector,
  argTypes: {
    vertical: {
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Connector>;

export default meta;
type Story = StoryObj<typeof Connector>;

export const Primary: Story = {
  args: {
    vertical: false,
    children: (
      <>
        <Card className="p-base">Item 1</Card>
        <Card className="p-base">Item 2</Card>
        <Card className="p-base">Item 3</Card>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    vertical: true,
    children: (
      <>
        <Card className="p-base">Item 1</Card>
        <Card className="p-base">Item 2</Card>
        <Card className="p-base">Item 3</Card>
      </>
    ),
  },
};

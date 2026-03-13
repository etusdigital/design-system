import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  component: Card,
  argTypes: {
    children: {
      description: 'This slot will be the card content.',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <Card {...args} className="w-fit p-xs">
      <h2 className="mb-xs">Welcome</h2>
      <p>This is a simple card example.</p>
    </Card>
  ),
  args: {},
};

export const Form: Story = {
  render: (args) => (
    <Card {...args} className="w-fit">
      <div className="w-fit flex flex-col p-base gap-base">
        <h1 className="font-bold text-lg m-none">Form</h1>
      </div>
    </Card>
  ),
  args: {},
};

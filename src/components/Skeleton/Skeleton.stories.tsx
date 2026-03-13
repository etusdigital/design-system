import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => <Skeleton {...args} />,
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-sm">
      <Skeleton {...args} className="h-sm" />
      <Skeleton {...args} className="h-xl" />
      <Skeleton {...args} className="h-3xl" />
      <Skeleton {...args} className="h-5xl" />
      <Skeleton {...args} className="h-7xl" />
    </div>
  ),
};

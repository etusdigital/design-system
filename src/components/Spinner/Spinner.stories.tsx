import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => <Spinner {...args} />,
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex gap-sm">
      <Spinner {...args} className="text-neutral-interaction-default" />
      <Spinner {...args} className="text-primary-interaction-default" />
      <Spinner {...args} className="text-informative-interaction-default" />
      <Spinner {...args} className="text-success-interaction-default" />
      <Spinner {...args} className="text-warning-interaction-default" />
      <Spinner {...args} className="text-danger-interaction-default" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-sm">
      <Spinner {...args} className="text-xs" />
      <Spinner {...args} className="text-xl" />
      <Spinner {...args} className="text-3xl" />
      <Spinner {...args} className="text-5xl" />
      <Spinner {...args} className="text-7xl" />
    </div>
  ),
};

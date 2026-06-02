import type { Meta, StoryObj } from '@storybook/react';
import { FloatCard } from './FloatCard';
import { Button } from '../Button/Button';

const meta = {
  component: FloatCard,
  argTypes: {
    mode: {
      control: 'select',
      options: ['click', 'hover'],
      table: { defaultValue: { summary: 'click' } },
      description: 'Interaction mode for showing/hiding the card.',
    },
  },
} satisfies Meta<typeof FloatCard>;

export default meta;
type Story = StoryObj<typeof FloatCard>;

export const Primary: Story = {
  args: {
    mode: 'click',
    children: <Button>Click to show card</Button>,
    card: (
      <div style={{ padding: '1rem' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>Floating Card</h4>
        <p style={{ fontSize: '0.875rem' }}>
          This is the content inside the floating card.
        </p>
      </div>
    ),
  },
};

export const HoverMode: Story = {
  args: {
    mode: 'hover',
    children: <Button>Hover to show card</Button>,
    card: (
      <div style={{ padding: '1rem' }}>
        <p>Hovering content</p>
      </div>
    ),
  },
};

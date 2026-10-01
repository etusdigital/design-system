import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FloatCard } from './FloatCard';
import { Button } from '../Button/Button';
import { Dialog } from '../Dialog/Dialog';

const meta = {
  component: FloatCard,
  argTypes: {
    mode: {
      control: 'select',
      options: ['click', 'hover'],
      table: { defaultValue: { summary: 'click' } },
      description: 'Interaction mode for showing/hiding the card.',
    },
    manualFocus: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description: "Doesn't move focus to the card when it opens in click mode.",
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

export const ActionItems: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [lastAction, setLastAction] = useState('');

    const handleOpenDialog = () => {
      setIsOpen(false);
      setShowDialog(true);
    };

    const handleCloseOnly = () => {
      setIsOpen(false);
      setLastAction('Closed without opening anything');
    };

    return (
      <>
        <FloatCard
          value={isOpen}
          onChange={setIsOpen}
          mode={args.mode}
          disabled={args.disabled}
          card={
            <div style={{ display: 'flex', flexDirection: 'column', padding: '0.25rem' }}>
              <Button variant="plain" color="neutral" onClick={handleOpenDialog}>
                Open dialog
              </Button>
              <Button variant="plain" color="neutral" onClick={handleCloseOnly}>
                Close only
              </Button>
            </div>
          }
        >
          <Button>Actions</Button>
        </FloatCard>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>{lastAction}</p>

        <Dialog value={showDialog} onChange={setShowDialog}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
            <h4>Dialog opened from the card</h4>
            <Button onClick={() => setShowDialog(false)}>Close</Button>
          </div>
        </Dialog>
      </>
    );
  },
  args: {
    mode: 'click',
    disabled: false,
  },
};

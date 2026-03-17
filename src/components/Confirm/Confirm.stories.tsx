import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmProvider, useConfirm } from './Confirm';
import { Button } from '../Button/Button';

const meta = {
  component: ConfirmProvider,
  decorators: [(Story) => (<ConfirmProvider><Story /></ConfirmProvider>)],
} satisfies Meta<typeof ConfirmProvider>;

export default meta;
type Story = StoryObj<typeof ConfirmProvider>;

// ── Helper Components ─────────────────────────────────────────────────────────

function ConfirmTrigger({ title, message, acceptLabel, cancelLabel }: {
  title?: string;
  message?: string;
  acceptLabel?: string;
  cancelLabel?: string;
}) {
  const { confirm } = useConfirm();
  const [result, setResult] = useState<'pending' | 'accepted' | 'cancelled'>('pending');

  async function handleClick() {
    setResult('pending');
    const accepted = await confirm({ title, message, acceptLabel, cancelLabel });
    setResult(accepted ? 'accepted' : 'cancelled');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <Button onClick={handleClick}>Show Confirm</Button>
      <p style={{ fontSize: '0.875rem', color: '#666' }}>
        Result: {result}
      </p>
    </div>
  );
}

// ── Stories ───────────────────────────────────────────────────────────────────

export const Primary: Story = {
  render: () => (
    <ConfirmTrigger
      title="Confirm Action"
      message="Are you sure you want to proceed?"
    />
  ),
};
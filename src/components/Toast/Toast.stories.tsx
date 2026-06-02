import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button/Button';

const meta = {
  component: ToastProvider,
  decorators: [(Story) => (<ToastProvider><Story /></ToastProvider>)],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof ToastProvider>;

function ToastTypesTrigger() {
  const { toast } = useToast();
  const types = ['info', 'success', 'warning', 'danger', 'neutral'] as const;
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {types.map((type) => (
        <Button
          key={type}
          onClick={() =>
            toast({
              title: `${type.charAt(0).toUpperCase() + type.slice(1)} Toast`,
              message: `This is a ${type} toast notification.`,
              type,
              top: true,
              right: true,
              timeout: 3000,
            })
          }
        >
          {type}
        </Button>
      ))}
    </div>
  );
}

function ToastPositionsTrigger() {
  const { toast } = useToast();
  const positions = [
    { label: 'Top Left', top: true, left: true, type: 'info' as const },
    { label: 'Top Right', top: true, right: true, type: 'success' as const },
    { label: 'Bottom Left', bottom: true, left: true, type: 'warning' as const },
    { label: 'Bottom Right', bottom: true, right: true, type: 'danger' as const },
  ];
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {positions.map(({ label, type, ...pos }) => (
        <Button
          key={label}
          onClick={() =>
            toast({
              title: label,
              message: `Toast appearing in the ${label.toLowerCase()} corner.`,
              type,
              timeout: 3000,
              ...pos,
            })
          }
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

function ToastPersistentTrigger() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Persistent Toast',
          message: 'This toast will not auto-dismiss.',
          type: 'warning',
          top: true,
          right: true,
          timeout: 0,
        })
      }
    >
      Show Persistent Toast
    </Button>
  );
}

function ToastWithActionTrigger() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Action Toast',
          message: 'Toast with an action button.',
          type: 'info',
          top: true,
          right: true,
          buttonLabel: 'Undo',
          timeout: 3000,
          action: () => alert('Undo clicked!'),
        })
      }
    >
      Show Toast with Action
    </Button>
  );
}

export const Types: Story = {
  render: () => <ToastTypesTrigger />,
};

export const Positions: Story = {
  render: () => <ToastPositionsTrigger />,
};

export const Persistent: Story = {
  render: () => <ToastPersistentTrigger />,
};

export const WithAction: Story = {
  render: () => <ToastWithActionTrigger />,
};

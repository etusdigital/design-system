import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  component: Alert,
  argTypes: {
    title: { description: 'Will be the alert title.' },
    message: { description: 'Will be the alert message.' },
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'neutral'],
      table: { defaultValue: { summary: 'info' } },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    icon: { description: 'Custom icon name. Defaults to type icon.' },
    iconPosition: {
      control: 'select',
      options: ['start', 'center', 'end'],
      table: { defaultValue: { summary: 'start' } },
    },
    expandable: {
      table: { defaultValue: { summary: 'false' } },
    },
    closable: {
      table: { defaultValue: { summary: 'false' } },
    },
    hideIcon: {
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

const defaultArgs = {
  title: 'Demo Title',
  message:
    'Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat.',
  type: 'info' as const,
  size: 'medium' as const,
  iconPosition: 'start' as const,
  expandable: false,
  closable: false,
  hideIcon: false,
};

export const Primary: Story = {
  args: defaultArgs,
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {(['info', 'success', 'warning', 'danger', 'neutral'] as const).map(
        (type) => (
          <Alert
            key={type}
            title={`${type} alert`}
            message="Lorem ipsum dolor sit amet dolor consectetur."
            type={type}
          />
        )
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Alert
          key={size}
          title={defaultArgs.title}
          message={defaultArgs.message}
          size={size}
        />
      ))}
    </div>
  ),
};

export const IconPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {(['start', 'center', 'end'] as const).map((iconPosition) => (
        <Alert
          key={iconPosition}
          title={defaultArgs.title}
          message={defaultArgs.message}
          iconPosition={iconPosition}
        />
      ))}
    </div>
  ),
};

export const Expandable: Story = {
  args: {
    ...defaultArgs,
    expandable: true,
  },
};

export const Closable: Story = {
  args: {
    ...defaultArgs,
    closable: true,
  },
};

export const HideIcon: Story = {
  args: {
    ...defaultArgs,
    hideIcon: true,
  },
};

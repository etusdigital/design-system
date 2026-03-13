import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './MetricCard';

const meta = {
  component: MetricCard,
  argTypes: {
    title: { description: 'Card title.' },
    value: { description: 'Card metric value.' },
    description: { description: 'Card description text.' },
    icon: { description: 'Material icon name for the title.' },
    type: {
      control: 'select',
      options: ['default', 'secondary', 'dashed'],
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'info', 'success', 'warning', 'danger', 'neutral'],
      table: { defaultValue: { summary: 'neutral' } },
    },
    infoMessage: { description: 'Info tooltip or text message.' },
    infoType: {
      control: 'select',
      options: ['primary', 'info', 'success', 'warning', 'danger', 'neutral'],
      table: { defaultValue: { summary: 'primary' } },
    },
    loading: { table: { defaultValue: { summary: 'false' } } },
    noTooltip: { table: { defaultValue: { summary: 'false' } } },
    boldTitle: { table: { defaultValue: { summary: 'false' } } },
  },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof MetricCard>;

const defaultArgs = {
  title: 'Open',
  value: '50%',
  description: '100.000.000',
  icon: 'drafts',
  color: 'neutral' as const,
  type: 'default' as const,
  size: 'medium' as const,
};

export const Primary: Story = {
  args: defaultArgs,
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {(['primary', 'info', 'success', 'warning', 'danger', 'neutral'] as const).map((color) => (
        <MetricCard key={color} {...defaultArgs} color={color} />
      ))}
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {(['default', 'secondary', 'dashed'] as const).map((type) => (
        <MetricCard key={type} {...defaultArgs} type={type} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <MetricCard key={size} {...defaultArgs} size={size} />
      ))}
    </div>
  ),
};

export const WithInfo: Story = {
  args: {
    ...defaultArgs,
    infoMessage: '30% increase from last month',
  },
};

export const Loading: Story = {
  args: {
    ...defaultArgs,
    loading: true,
  },
};

export const BoldTitle: Story = {
  args: {
    ...defaultArgs,
    boldTitle: true,
  },
};

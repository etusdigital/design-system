import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './MetricCard';
import { Tooltip } from '../Tooltip/Tooltip';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { StatusBadge } from '../StatusBadge/StatusBadge';

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

export const InfoTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
      {(['primary', 'info', 'success', 'warning', 'danger', 'neutral'] as const).map((infoType) => (
        <MetricCard key={infoType} {...defaultArgs} infoType={infoType} infoMessage="30% increase from last month" />
      ))}
    </div>
  ),
};

export const InfoMessage: Story = {
  args: {
    ...defaultArgs,
    infoMessage: '30% increase from last month',
  },
};

export const NoTooltip: Story = {
  args: {
    ...defaultArgs,
    infoMessage: '30%',
    noTooltip: true,
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

export const Slots: Story = {
  render: () => (
    <MetricCard
          className="w-fit"
          title="Your June recipe"
          value="$100,000.00"
          color="primary"
          type="secondary"
          size="large"
          boldTitle
        >
          <MetricCard.DescriptionSlot>
            <div className="flex items-center h-full pt-xs">
              <Tooltip labelValue="info">
                <Icon name="info" className="text-neutral-interaction-default" />
              </Tooltip>
            </div>
          </MetricCard.DescriptionSlot>
          <div className="flex flex-col gap-sm mt-sm">
            <div className="flex items-center gap-xs text-neutral-foreground-high">
                <Icon name="calendar_month" />
                <p className="text-sm">Payment will be made by 04/30/2024</p>
            </div>
            <div className="flex gap-xs self-end">
              <StatusBadge labelValue="Processing payment" size="small" />
              <Button variant="secondary" size="small">
                View Details
              </Button>
            </div>
          </div>
        </MetricCard>
  ),
};

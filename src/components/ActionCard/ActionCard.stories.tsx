import type { Meta, StoryObj } from '@storybook/react';
import { ActionCard } from './ActionCard';

const meta: Meta<typeof ActionCard> = {
  component: ActionCard,
  argTypes: {
    icon: {
      control: 'text',
      description: 'The card icon name (Material Symbols).',
    },
    color: {
      control: 'color',
      description: 'The title header background color.',
      table: { defaultValue: { summary: '' } },
    },
    hideDrag: {
      control: 'boolean',
      description: 'If true, the drag icon will not be shown.',
      table: { defaultValue: { summary: 'false' } },
    },
    children: {
      description: 'The header title content (default slot).',
    },
    onDragstart: { action: 'dragstart' },
    onDragging: { action: 'dragging' },
    onDragend: { action: 'dragend' },
    onDelete: { action: 'delete' },
  },
};

export default meta;
type Story = StoryObj<typeof ActionCard>;

const defaultArgs = {
  icon: 'send',
  color: '',
  hideDrag: false,
};

export const Primary: Story = {
  render: (args) => (
    <ActionCard className="w-fit" {...args}>
      Label
    </ActionCard>
  ),
  args: defaultArgs,
};

export const HideDrag: Story = {
  render: (args) => (
    <ActionCard className="w-fit" {...args}>
      Label
    </ActionCard>
  ),
  args: {
    ...defaultArgs,
    hideDrag: true,
  },
};

export const Card: Story = {
  render: (args) => (
    <ActionCard className="w-fit" icon="mail" color={args.color} hideDrag={args.hideDrag}>
      <div className="flex justify-between items-center text-white w-full">
        <div className="flex flex-col text-sm">
          <p>Send Message:</p>
          <p className="font-bold">cartaofeito-d-fluxo-cc-dia-05-e12</p>
        </div>
      </div>
      <ActionCard.Card>
        <div className="flex flex-col gap-sm">
          <div className="flex flex-col gap-xxs">
            <h4 className="text-neutral-foreground-high text-sm font-bold">Subject: %Email Subject%</h4>
            <p className="text-xs text-neutral-foreground-high">
              Links:{' '}
              <a className="lowercase cursor-pointer">https://cartaofeito.com/cartao-santander-sx-p1/</a>
            </p>
          </div>
        </div>
      </ActionCard.Card>
    </ActionCard>
  ),
  args: defaultArgs,
};

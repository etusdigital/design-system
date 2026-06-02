import type { Meta, StoryObj } from '@storybook/react';
import { IconCard } from './IconCard';

const meta: Meta<typeof IconCard> = {
  component: IconCard,
  argTypes: {
    title: {
      control: 'text',
      description: 'The card title.',
    },
    icon: {
      control: 'text',
      description: 'The card icon name (Material Symbols).',
    },
    color: {
      control: 'color',
      description: 'The icon and title color.',
      table: { defaultValue: { summary: '' } },
    },
    isIconRound: {
      control: 'boolean',
      description:
        'If true, the icon will not be surrounded by a circle with the card color.',
      table: { defaultValue: { summary: 'false' } },
    },
    children: {
      description: 'The card body content.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconCard>;

const defaultArgs = {
  title: 'Send Message: Message Name',
  icon: 'send',
  color: '',
  isIconRound: false,
};

export const Primary: Story = {
  render: (args: any) => (
    <IconCard className="w-fit" {...args}>
      <IconCard.TitleActions>
        <span className="text-neutral-interaction-default cursor-pointer hover:text-neutral-interaction-hover material-symbols-rounded icon">
          visibility
        </span>
      </IconCard.TitleActions>
      <div className="flex flex-col gap-sm mt-sm">
        <div className="flex flex-col gap-xxs">
          <h4 className="text-neutral-foreground-high text-sm font-bold">Subject: %Email Subject%</h4>
          <p className="text-xs text-neutral-foreground-high">
            Links:{' '}
            <a className="lowercase cursor-pointer">https://cartaofeito.com/cartao-santander-sx-p1/</a>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold text-neutral-foreground-high">Total delivered: 200.000.000</p>
        </div>
      </div>
    </IconCard>
  ),
  args: defaultArgs,
};

export const Default: Story = {
  render: (args: any) => (
    <IconCard {...args}>
      <IconCard.TitleActions>
        <span className="material-symbols-rounded icon cursor-pointer">visibility</span>
      </IconCard.TitleActions>
      <div className="mt-sm">
        <p>Card content goes here</p>
      </div>
    </IconCard>
  ),
  args: defaultArgs,
};

export const IsIconRound: Story = {
  render: (args: any) => (
    <IconCard {...args}>
      <IconCard.TitleActions>
        <span className="material-symbols-rounded icon cursor-pointer">visibility</span>
      </IconCard.TitleActions>
      <div className="mt-sm">
        <p>Card content goes here</p>
      </div>
    </IconCard>
  ),
  args: {
    ...defaultArgs,
    icon: 'info',
    isIconRound: true,
  },
};

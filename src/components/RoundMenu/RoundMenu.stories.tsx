import type { Meta, StoryObj } from '@storybook/react';
import { RoundMenu } from './RoundMenu';

const meta = {
  component: RoundMenu,
  argTypes: {
    options: {
      type: { name: 'array', value: { name: 'object', value: {} } },
      table: {
        defaultValue: { summary: '[]' },
      },
      description:
        'This property will be options in menu. Props(label: string, icon: string, onClick: ()=>{void})',
    },
  },
} satisfies Meta<typeof RoundMenu>;

export default meta;
type Story = StoryObj<typeof RoundMenu>;

export const Primary: Story = {
  render: () => (
    <div className="px-[3em] py-[4em]">
      <RoundMenu
        options={[
          { icon: 'email', label: 'Send email', background: "#0057F4", onClick: () => {} },
          { icon: 'stop', label: 'Finish Automation', background: "#F03232", onClick: () => {} },
          { icon: 'schedule', label: 'Wait', background: "#5C5C5C", onClick: () => {} },
          { icon: 'history', label: 'Time condition', background: "#FF9654", onClick: () => {} },
          { icon: 'add', label: 'Conditional', background: "#4A004F", onClick: () => {} },
          { icon: 'new_label', label: 'Add tag', background: "#009BE4", onClick: () => {} },
          { icon: 'label_off', label: 'Remove tag', background: "#F06158", onClick: () => {} },
          { icon: 'add_circle', label: 'Trigger', background: "#7B61FF", onClick: () => {} },
          { icon: 'call_split', label: 'Split', background: "#FFC500", onClick: () => {} },
        ]}
      />
    </div>
  ),
};

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
          { icon: 'email', label: 'Send email', onClick: () => {} },
          { icon: 'stop', label: 'Finish Automation', onClick: () => {} },
          { icon: 'schedule', label: 'Wait', onClick: () => {} },
          { icon: 'history', label: 'Time condition', onClick: () => {} },
          { icon: 'add', label: 'Conditional', onClick: () => {} },
          { icon: 'new_label', label: 'Add tag', onClick: () => {} },
          { icon: 'label_off', label: 'Remove tag', onClick: () => {} },
          { icon: 'add_circle', label: 'Trigger', onClick: () => {} },
          { icon: 'call_split', label: 'Split', onClick: () => {} },
        ]}
      />
    </div>
  ),
};

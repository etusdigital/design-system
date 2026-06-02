import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta = {
  component: Pagination,
  argTypes: {
    value: {
      type: { name: 'number' },
      table: {
        defaultValue: { summary: '1' },
      },
      description: 'This property will be the selected page.',
    },
    length: {
      type: { name: 'number' },
      table: {
        defaultValue: { summary: '1' },
      },
      description: 'This property will be the number of pages.',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination value={page} onChange={setPage} length={10} />
    );
  },
};

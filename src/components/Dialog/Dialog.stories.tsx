import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';

const meta = {
  component: Dialog,
  argTypes: {
    value: { description: 'Controls dialog open state.' },
    width: { control: 'text', table: { defaultValue: { summary: 'fit-content' } } },
    height: { control: 'text', table: { defaultValue: { summary: 'fit-content' } } },
    noOutsideClose: { table: { defaultValue: { summary: 'false' } } },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Primary: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Dialog</Button>
        <Dialog value={open} onChange={setOpen} width="60%">
          <div className="flex flex-col p-xl gap-sm">
            <h2 className="font-bold text-lg">Dialog</h2>
            <p className="text-sm text-neutral-foreground-low">
              Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
              amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
              massa praesent ultricies.
            </p>
            <div className="flex justify-end w-full gap-xs">
              <Button variant="plain" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const NoOutsideClose: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Dialog</Button>
        <Dialog value={open} onChange={setOpen} width="60%" noOutsideClose>
          <div className="flex flex-col p-xl gap-sm">
            <h2 className="font-bold text-lg">Dialog</h2>
            <p className="text-sm text-neutral-foreground-low">
              Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
              amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
              massa praesent ultricies.
            </p>
            <p className="text-xs text-neutral-foreground-low">
              Click outside the dialog to see the shake animation. Only the buttons below will close it.
            </p>
            <div className="flex justify-end w-full gap-xs">
              <Button variant="plain" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

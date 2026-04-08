import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Button } from '../Button/Button';

const meta = {
  component: Drawer,
  argTypes: {
    value: {
      control: { type: 'boolean' },
      description: 'Determine if the drawer is displayed or not.',
    },
    size: {
      control: { type: 'text' },
      table: { defaultValue: { summary: 'fit-content' } },
      description: 'Width (for left/right positions) or height (for top/bottom positions) of the drawer.',
    },
    noOutsideClose: {
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
      description: 'Determine if the drawer will not close when the user clicks outside it.',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      table: { defaultValue: { summary: 'right' } },
      description: 'Position where the drawer will slide from.',
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Primary: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Drawer</Button>
        <Drawer value={open} onChange={setOpen} position="right" size="40%" noOutsideClose={false}>
          <div className="flex flex-col justify-between h-full p-xl">
            <div className="flex flex-col gap-sm">
              <h2 className="font-bold text-lg">Drawer</h2>
              <p className="text-sm text-neutral-foreground-low">
                Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
                amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
                massa praesent ultricies.
              </p>
            </div>
            <div className="flex justify-end w-full gap-xs">
              <Button variant="plain" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </div>
          </div>
        </Drawer>
      </>
    );
  },
};

export const NoOutsideClose: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Drawer</Button>
        <Drawer value={open} onChange={setOpen} position="right" size="40%" noOutsideClose={true}>
          <div className="flex flex-col justify-between h-full p-xl">
            <div className="flex flex-col gap-sm">
              <h2 className="font-bold text-lg">Drawer</h2>
              <p className="text-sm text-neutral-foreground-low">
                Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
                amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
                massa praesent ultricies.
              </p>
              <p className="text-xs text-neutral-foreground-low">
                Click outside the drawer to see the shake animation. Only the buttons below will close it.
              </p>
            </div>
            <div className="flex justify-end w-full gap-xs">
              <Button variant="plain" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </div>
          </div>
        </Drawer>
      </>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('left');
    return (
      <>
        <div className="flex gap-xxs">
          {(['left', 'right', 'top', 'bottom'] as const).map((pos) => (
            <Button
              key={pos}
              onClick={() => {
                setPosition(pos);
                setOpen(true);
              }}
            >
              Show {pos} Drawer
            </Button>
          ))}
        </div>
        <Drawer value={open} onChange={setOpen} position={position} size="40%">
          <div className="flex flex-col justify-between h-full p-xl">
            <div className="flex flex-col gap-sm">
              <h2 className="font-bold text-lg">Drawer</h2>
              <p className="text-sm text-neutral-foreground-low">
                Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
                amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
                massa praesent ultricies.
              </p>
            </div>
            <div className="flex justify-end w-full gap-xs">
              <Button variant="plain" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </div>
          </div>
        </Drawer>
      </>
    );
  },
};

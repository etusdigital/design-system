import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta = {
  component: Accordion,
  argTypes: {
    value: {
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
      description: 'The expanded state. Optional.',
    },
    duration: {
      control: { type: 'number' },
      table: { defaultValue: { summary: '300' } },
      description: 'The duration time in milliseconds. Optional.',
    },
    noShadow: {
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
      description: 'If true, the accordion will not have a shadow. Optional.',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <Accordion
        value={expanded}
        onChange={setExpanded}
        header={<h4 className="text-neutral-foreground-high">Accordion component</h4>}
        duration={300}
        noShadow={false}
      >
        <div className="flex items-end justify-start gap-base">
          <p>
            Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
            amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
            massa praesent ultricies.
          </p>
        </div>
      </Accordion>
    );
  },
};

export const NoShadow: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <Accordion
        value={expanded}
        onChange={setExpanded}
        header={<h4 className="text-neutral-foreground-high">Accordion component</h4>}
        duration={300}
        noShadow={true}
      >
        <div className="flex items-end justify-start gap-base">
          <p>
            Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
            amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
            massa praesent ultricies.
          </p>
        </div>
      </Accordion>
    );
  },
};

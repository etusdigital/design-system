import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

const meta = {
  component: Calendar,
  argTypes: {
    value: {
      description: 'Current date or period value (controlled). Date | Date[] | Date[][]',
    },
    lang: {
      control: 'text',
      description: 'BCP 47 language tag for date formatting.',
      table: { defaultValue: { summary: 'en' } },
    },
    type: {
      control: { type: 'select' },
      options: ['date', 'period', 'compare'],
      description: 'Selection mode: single date, date range, or comparison.',
      table: { defaultValue: { summary: 'date' } },
    },
    minDate: {
      description: 'Earliest selectable date.',
    },
    maxDate: {
      description: 'Latest selectable date.',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Primary: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return (
      <Calendar
        {...args}
        value={value}
        onChange={setValue}
        lang="en-US"
        type="date"
      />
    );
  },
};

export const Lang: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return (
      <Calendar
        {...args}
        value={value}
        onChange={setValue}
        lang="pt-BR"
        type="date"
      />
    );
  },
};

export const Period: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date[] | undefined>(undefined);
    return (
      <Calendar
        {...args}
        value={value}
        onChange={setValue}
        lang="en-US"
        type="period"
      />
    );
  },
};

export const Compare: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date[][] | undefined>(undefined);
    return (
      <Calendar
        {...args}
        value={value}
        onChange={setValue}
        lang="en-US"
        type="compare"
      />
    );
  },
};

export const DoubleCalendar: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return (
      <Calendar
        {...args}
        value={value}
        onChange={setValue}
        doubleCalendar
      />
    );
  },
};

export const MinDate: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return (
      <Calendar
        {...args}
        value={value}
        onChange={setValue}
        lang="en-US"
        type="date"
        minDate={new Date()}
      />
    );
  },
};

export const MaxDate: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return (
      <Calendar
        {...args}
        value={value}
        onChange={setValue}
        lang="en-US"
        type="date"
        maxDate={new Date()}
      />
    );
  },
};

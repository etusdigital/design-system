import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { calculateDate } from '#utils/index';

const meta = {
  component: DatePicker,
  argTypes: {
    value: {
      description: 'Will be the current date or period.',
    },
    labelValue: {
      control: 'text',
      description: 'Will be the date comparator label.',
    },
    lang: {
      control: 'text',
      table: {
        defaultValue: { summary: 'en' },
      },
      description: 'Will be the date input language.',
    },
    type: {
      control: 'select',
      options: ['date', 'period', 'compare'],
      table: {
        defaultValue: { summary: 'date' },
      },
      description: 'Selection mode: single date, date range, or comparison mode.',
    },
    minDate: {
      description: 'Will be the oldest date the user can select.',
    },
    maxDate: {
      description: 'Will be the newest date the user can select.',
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isError: {
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'Activate error mode.',
    },
    errorMessage: {
      control: 'text',
      description: 'Will be the error message.',
    },
    clearLabel: {
      control: 'text',
      table: {
        defaultValue: { summary: 'Clear selection' },
      },
      description: 'Label for the clear button.',
    },
    applyLabel: {
      control: 'text',
      table: {
        defaultValue: { summary: 'Apply filters' },
      },
      description: 'Label for the apply button.',
    },
    compareLabel: {
      control: 'text',
      table: {
        defaultValue: { summary: 'Compare dates' },
      },
      description: 'Label for the compare mode toggle.',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState<Date | Date[] | [Date[], Date[]] | undefined>(undefined);
    return (
      <DatePicker
        value={value}
        onChange={setValue}
        type="date"
        labelValue="Date Filter"
        clearLabel="Clear"
        applyLabel="Apply"
        compareLabel="Compare two periods"
        lang="en"
      />
    );
  },
};

export const Lang: Story = {
  render: () => {
    const [value, setValue] = useState<Date | Date[] | [Date[], Date[]] | undefined>(undefined);
    return (
      <DatePicker
        value={value}
        onChange={setValue}
        type="date"
        labelValue="Filtro de Data"
        clearLabel="Limpar"
        applyLabel="Aplicar"
        compareLabel="Comparar dois períodos"
        lang="pt-BR"
      />
    );
  },
};

export const Period: Story = {
  render: () => {
    const [value, setValue] = useState<Date | Date[] | [Date[], Date[]] | undefined>(undefined);
    return (
      <DatePicker
        value={value}
        onChange={setValue}
        type="period"
        labelValue="Date Filter"
        clearLabel="Clear"
        applyLabel="Apply"
      />
    );
  },
};

export const Compare: Story = {
  render: () => {
    const [value, setValue] = useState<Date | Date[] | [Date[], Date[]] | undefined>(undefined);
    return (
      <DatePicker
        value={value}
        onChange={setValue}
        type="compare"
        labelValue="Date Filter"
        clearLabel="Clear"
        applyLabel="Apply"
        compareLabel="Compare two periods"
      />
    );
  },
};

export const AllowChangeType: Story = {
  render: () => {
    const [value, setValue] = useState<Date | Date[] | [Date[], Date[]] | undefined>(undefined);
    const [type, setType] = useState<'date'| 'period' | 'compare' | undefined>('period');
    return (
      <DatePicker
        value={value}
        onChange={setValue}
        type={type}
        onTypeChange={setType}
        labelValue="Date Filter"
        clearLabel="Clear"
        applyLabel="Apply"
        allowChangeType={true}
      />
    );
  },
};

export const MinDate: Story = {
  render: () => {
    const [value, setValue] = useState<Date | Date[] | [Date[], Date[]] | undefined>(undefined);
    return (
      <DatePicker
        value={value}
        onChange={setValue}
        type="date"
        labelValue="Date Filter"
        minDate={new Date()}
        clearLabel="Clear"
        applyLabel="Apply"
      />
    );
  },
};

export const MaxDate: Story = {
  render: () => {
    const [value, setValue] = useState<Date | Date[] | [Date[], Date[]] | undefined>(undefined);
    return (
      <DatePicker
        value={value}
        onChange={setValue}
        type="date"
        labelValue="Date Filter"
        maxDate={new Date()}
        clearLabel="Clear"
        applyLabel="Apply"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DatePicker
      type="date"
      labelValue="Date Filter"
      disabled={true}
      clearLabel="Clear"
      applyLabel="Apply"
    />
  ),
};

export const InfoMessage: Story = {
  render: () => (
    <DatePicker
      type="date"
      labelValue="Date Filter"
      infoMessage="Info message"
      clearLabel="Clear"
      applyLabel="Apply"
    />
  ),
};

export const IsError: Story = {
  render: () => (
    <DatePicker
      type="date"
      labelValue="Date Filter"
      isError={true}
      errorMessage="Error message"
      clearLabel="Clear"
      applyLabel="Apply"
    />
  ),
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState<Date | Date[] | [Date[], Date[]] | undefined>(undefined);
    return (
      <DatePicker
        value={value}
        onChange={setValue}
        type="date"
        labelValue="Date Filter"
        required={true}
        clearLabel="Clear"
        applyLabel="Apply"
      />
    );
  },
};

export const Separator: Story = {
  render: () => {
    const [value, setValue] = useState<Date | Date[] | [Date[], Date[]] | undefined>(undefined);
    return (
      <DatePicker
        value={value}
        onChange={setValue}
        type="compare"
        labelValue="Date Filter"
        separator="e"
        clearLabel="Clear"
        applyLabel="Apply"
      />
    );
  },
};

export const Options: Story = {
  render: () => {
    const [value, setValue] = useState<Date | Date[] | [Date[], Date[]] | undefined>(undefined);
    return (
      <DatePicker
        value={value}
        onChange={setValue}
        type="date"
        labelValue="Date Filter"
        clearLabel="Clear"
        applyLabel="Apply"
        options={[
          {
            selected: true,
            value: "today",
            label: "Today",
            calculate: () => {
              return calculateDate("today");
            },
          },
          {
            value: "yesterday",
            label: "Yesterday",
            calculate: () => {
              return calculateDate("yesterday");
            },
          },
          {
            value: "last7",
            label: "Last 7 days",
            calculate: () => {
              return calculateDate("last7");
            },
          },
          {
            value: "last15",
            label: "Last 15 days",
            calculate: () => {
              return calculateDate("last15");
            },
          },
          {
            value: "last30",
            label: "Last 30 days",
            calculate: () => {
              return calculateDate("last30");
            },
          },
          {
            value: "lastMonth",
            label: "Last month",
            calculate: () => {
              return calculateDate("lastMonth");
            },
          },
        ]}
      />
    );
  },
};
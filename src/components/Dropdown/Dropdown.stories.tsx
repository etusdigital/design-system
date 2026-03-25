import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import type { DropdownOptionItem } from './Dropdown';
import { Button } from '../Button/Button';

const meta = {
  component: Dropdown,
  argTypes: {
    value: {
      description: 'The selected value (controlled).',
    },
    defaultValue: {
      description: 'The default selected value (uncontrolled).',
    },
    labelValue: {
      control: 'text',
      description: 'Placeholder label when no value is selected.',
      table: { defaultValue: { summary: '' } },
    },
    options: {
      description:
        'Array of option objects. Each may have label, value, icon, disabled, bottom, options[] for groups.',
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    searchable: {
      control: 'boolean',
      description: 'Enables search filtering inside the dropdown.',
      table: { defaultValue: { summary: 'false' } },
    },
    isError: {
      control: 'boolean',
      description: 'Activates error mode.',
      table: { defaultValue: { summary: 'false' } },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed when isError is true.',
    },
    getObject: {
      control: 'boolean',
      description: 'When true, onChange receives the full option object instead of just the value.',
      table: { defaultValue: { summary: 'false' } },
    },
    alignRight: {
      control: 'boolean',
      description: 'Aligns the dropdown panel to the right.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof Dropdown>;

const defaultOptions: DropdownOptionItem[] = [
  {
    label: 'Home',
    value: 'home',
    icon: 'home',
  },
  {
    label: 'Publisher',
    value: 'publisher',
    icon: 'supervisor_account',
    options: [
      {
        label: 'Group Account',
        value: 'group-account',
        icon: 'account_balance',
      },
      {
        label: 'Account',
        value: 'account',
        icon: 'account_balance',
      },
    ],
  },
  {
    label: 'Errors',
    value: 'errors',
    icon: 'error',
    disabled: true,
  },
  {
    label: 'Settings',
    value: 'settings',
    icon: 'settings',
    bottom: true,
  },
];

export const Primary: Story = {
  render: (args: any) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
      />
    );
  },
  args: {
    labelValue: 'label',
    disabled: false,
    isError: false,
    errorMessage: '',
    getObject: false,
    searchable: false,
  },
};

export const Disabled: Story = {
  render: (args: any) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
      />
    );
  },
  args: {
    labelValue: 'label',
    disabled: true,
  },
};

export const Required: Story = {
  render: (args: any) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
      />
    );
  },
  args: {
    labelValue: 'label',
    required: true,
  },
};

export const Searchable: Story = {
  render: (args: any) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
      />
    );
  },
  args: {
    labelValue: 'label',
    searchable: true,
  },
};

export const IsError: Story = {
  render: (args: any) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
      />
    );
  },
  args: {
    labelValue: 'label',
    isError: true,
    errorMessage: 'Error message',
  },
};

export const InfoMessage: Story = {
  render: (args: any) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
      />
    );
  },
  args: {
    labelValue: 'label',
    infoMessage: 'Info Message',
  },
};

export const GetObject: Story = {
  render: (args: any) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
      />
    );
  },
  args: {
    labelValue: 'label',
    getObject: true,
  },
};

export const CustomTrigger: Story = {
  render: (args: any) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
        options={defaultOptions}
      >
        <Button>Custom Trigger</Button>
      </Dropdown>
    );
  },
  args: {
    labelValue: 'label',
  },
};

const groupOptions: DropdownOptionItem[] = [
  { label: 'Direct', value: 'direct', icon: 'link' },
  {
    label: 'Publisher',
    value: 'publisher',
    icon: 'supervisor_account',
    options: [
      { label: 'Group Account', value: 'group-account', icon: 'account_balance' },
      { label: 'Account', value: 'account', icon: 'account_circle' },
    ],
  },
  { label: 'Programmatic', value: 'programmatic', icon: 'code' },
];

export const WithGroups: Story = {
  render: (args: any) => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
        options={groupOptions}
      />
    );
  },
  args: {
    labelValue: 'Select channel',
  },
};

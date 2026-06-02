import type { Meta, StoryObj } from '@storybook/react';
import { Profile } from './Profile';

const meta = {
  component: Profile,
  argTypes: {
    value: {
      control: 'text',
      description: 'Controlled selected account value.',
    },
    name: {
      control: 'text',
      description: 'Main user name.',
    },
    picture: {
      control: 'text',
      description: 'User avatar image URL.',
    },
    options: {
      control: 'object',
      description: 'Array of account options. Each item has label and value keys.',
      table: {
        defaultValue: { summary: '[]' },
      },
    },
    labelKey: {
      control: 'text',
      description: 'Key used to get label from option objects.',
      table: {
        defaultValue: { summary: 'label' },
      },
    },
    valueKey: {
      control: 'text',
      description: 'Key used to get value from option objects.',
      table: {
        defaultValue: { summary: 'value' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the component.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    absolute: {
      control: 'boolean',
      description: 'Makes the dropdown use absolute positioning.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    getObject: {
      control: 'boolean',
      description: 'If true, onChange/value uses full option object instead of value key.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { label: 'Personal Account', value: 'personal-account' },
  { label: 'Work Account', value: 'work-account' },
  { label: 'Project Alpha', value: 'project-alpha' },
  { label: 'Project Beta', value: 'project-beta' },
  { label: 'Development Team', value: 'dev-team' },
];

const defaultArgs = {
  name: 'John Doe',
  picture: undefined,
  absolute: false,
  disabled: false,
  getObject: false,
  options: defaultOptions,
  labelKey: 'label',
  valueKey: 'value',
};

export const Primary: Story = {
  args: {
    ...defaultArgs,
    defaultValue: 'personal-account',
  },
};

export const Absolute: Story = {
  args: {
    ...defaultArgs,
    defaultValue: 'personal-account',
    absolute: true,
  },
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    defaultValue: 'personal-account',
    disabled: true,
  },
};

export const Options: Story = {
  args: {
    ...defaultArgs,
    defaultValue: 'personal-account',
    renderOption: ({ option, active }: { option: { label?: string; value?: string }, active: boolean }) => (
      <div className="flex items-center gap-xs">
        <span className="material-symbols-rounded icon">account_circle</span>
        <span style={{ textDecoration: active ? 'underline' : 'none' }}>{option.label}</span>
      </div>
    ),
  } as any,
};

export const NoOptions: Story = {
  args: {
    name: 'Jane Smith',
    options: [],
  },
};

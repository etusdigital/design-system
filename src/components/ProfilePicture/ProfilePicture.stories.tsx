import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ProfilePicture } from './ProfilePicture';
import type { ProfilePictureOption } from './ProfilePicture';

const meta = {
  component: ProfilePicture,
  argTypes: {
    value: {
      description:
        'Selected sub-item of each option that has `items`, keyed by the option value (e.g. `{ language: "en" }`).',
    },
    expanded: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'Controls whether the menu is open (controlled).',
    },
    name: {
      control: 'text',
      description: 'User name shown in the header and used for the avatar initials.',
    },
    description: {
      control: 'text',
      description: 'Secondary text under the name, such as the email.',
    },
    picture: {
      control: 'text',
      description: 'Avatar image URL.',
    },
    options: {
      description:
        'Menu options: `{ label, value, icon?, image?, color?, disabled?, items?, action? }`. Options with `items` open a single-choice list.',
    },
    labelKey: {
      control: 'text',
      table: {
        defaultValue: { summary: 'label' },
      },
    },
    valueKey: {
      control: 'text',
      table: {
        defaultValue: { summary: 'value' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name of the trigger and menu (defaults to the name).',
    },
  },
} satisfies Meta<typeof ProfilePicture>;

export default meta;
type Story = StoryObj<typeof meta>;

const options: ProfilePictureOption[] = [
  { label: 'My account', value: 'account', icon: 'person' },
  { label: 'Settings', value: 'settings', icon: 'settings' },
  {
    label: 'Language',
    value: 'language',
    icon: 'translate',
    items: [
      { label: 'English', value: 'en', icon: 'language' },
      { label: 'Português', value: 'pt', icon: 'language' },
    ],
  },
  {
    label: 'Theme',
    value: 'theme',
    icon: 'contrast',
    items: [
      { label: 'Light', value: 'light', icon: 'light_mode' },
      { label: 'Dark', value: 'dark', icon: 'dark_mode' },
    ],
  },
  { label: 'Logout', value: 'logout', icon: 'logout', color: 'danger' as const },
];

const defaultArgs = {
  name: 'John Doe',
  description: '[EMAIL_REDACTED]',
  picture: '',
  options,
  labelKey: 'label' as const,
  valueKey: 'value' as const,
  disabled: false,
};

function DefaultRender(args: any) {
  const [modelValue, setModelValue] = useState({ language: 'en', theme: 'light' });
  const [expandedValue, setExpandedValue] = useState(false);

  return (
    <div className="w-fit">
      <ProfilePicture
        {...args}
        value={modelValue}
        onChange={setModelValue}
        expanded={expandedValue}
        onExpandedChange={setExpandedValue}
      />
    </div>
  );
}

export const Primary: Story = {
  render: (args) => <DefaultRender {...args} />,
  args: defaultArgs,
};

export const WithPicture: Story = {
  render: (args) => <DefaultRender {...args} />,
  args: {
    ...defaultArgs,
    picture: 'https://i.pravatar.cc/150?img=47',
  },
};

export const Disabled: Story = {
  render: (args) => <DefaultRender {...args} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

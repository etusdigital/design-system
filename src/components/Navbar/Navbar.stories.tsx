import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';

const meta = {
  component: Navbar,
  argTypes: {
    title: {
      control: 'text',
      description: 'Will be the title of the navbar, can be used as a slot or as prop.',
    },
    options: {
      description:
        'Array of object to be used as menu options. Props(label: string, icon: string, options: same instruction as options)',
    },
    labelKey: {
      control: 'text',
      description: 'Will be the key of the label of the options.',
    },
    iconKey: {
      control: 'text',
      description: 'Will be the key of the icon of the options.',
    },
    logo: {
      description: 'React node rendered as the logo area of the navbar.',
    },
    profile: {
      description: 'React node rendered on the right side (profile/actions area).',
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof Navbar>;

const defaultOptions = [
  {
    label: 'Dashboard',
    value: 'dashboard',
    icon: 'dashboard',
  },
  {
    label: 'Analytics',
    value: 'analytics',
    icon: 'analytics',
    options: [
      {
        label: 'Reports',
        value: 'reports',
        icon: 'assessment',
      },
      {
        label: 'Metrics',
        value: 'metrics',
        icon: 'bar_chart',
      },
    ],
  },
  {
    label: 'Users',
    value: 'users',
    icon: 'people',
  },
  {
    label: 'Settings',
    value: 'settings',
    icon: 'settings',
    bottom: true,
  },
];

export const Primary: Story = {
  render: () => (
    <Navbar
      title="Navbar"
      options={defaultOptions}
      labelKey="label"
      iconKey="icon"
      profile={
        <div className="p-base">
          <h4 className="font-semibold mb-xs">Notifications</h4>
          <p className="text-sm text-neutral-foreground-medium">No new notifications</p>
        </div>
      }
    />
  ),
};

export const CustomSlots: Story = {
  render: () => (
    <>
      <Navbar
        title="Slot: Title"
        logo={<div>Slot: logo</div>}
        profile={<div>Slot: actions</div>}
      />
      <Navbar
        logo={<div>Slot: logo</div>}
        profile={<div>Slot: actions</div>}
        className="mt-xs"
      />
    </>
  ),
};

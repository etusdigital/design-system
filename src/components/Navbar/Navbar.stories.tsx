import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { Avatar } from '../Avatar/Avatar';

const meta = {
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    options: {
      description: 'Array of navigation options passed to the Dropdown component.',
    },
    value: {
      control: 'text',
      description: 'Currently selected navigation option value.',
    },
    logo: {
      description: 'Custom React node rendered as the logo. Defaults to the SVG circle logo.',
    },
    profile: {
      description:
        "Object to be used as profile. Props(name: string, src: string)",
    },
    notifications: {
      description: 'Content rendered inside the FloatCard popover when the notification bell is clicked.',
    },
    showNotifications: {
      control: 'boolean',
      description: 'Whether to show the notification bell icon. Defaults to true.',
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof Navbar>;

const navOptions = [
  { label: 'Dashboard', value: 'dashboard' },
  { label: 'Analytics', value: 'analytics' },
  { label: 'Users', value: 'users' },
  { label: 'Settings', value: 'settings' },
];

export const Primary: Story = {
  render: () => (
    <Navbar
      options={navOptions}
      profile={{
        name: 'John Doe'
      }}
      notifications={
        <div style={{ padding: '16px', minWidth: '200px' }}>
          <h4 style={{ marginBottom: '8px', fontWeight: 600 }}>Notifications</h4>
          <p style={{ fontSize: '14px', color: '#666' }}>No new notifications</p>
        </div>
      }
    />
  ),
};

export const WithCustomLogo: Story = {
  render: () => (
    <Navbar
      options={navOptions}
      logo={
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 14,
          }}
        >
          AC
        </div>
      }
    />
  ),
};

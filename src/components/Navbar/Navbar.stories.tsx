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
    avatar: {
      description: 'Custom React node rendered as the avatar. Defaults to Avatar component.',
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

export const Default: Story = {
  render: () => (
    <Navbar
      options={navOptions}
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

export const WithNotifications: Story = {
  render: () => (
    <Navbar
      options={navOptions}
      notifications={
        <div style={{ padding: '16px', minWidth: '280px' }}>
          <h4 style={{ marginBottom: '12px', fontWeight: 600 }}>Notifications</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #eee', fontSize: 14 }}>
              New user registered — 5m ago
            </li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #eee', fontSize: 14 }}>
              Report generated — 1h ago
            </li>
            <li style={{ padding: '8px 0', fontSize: 14 }}>
              Deployment complete — 2h ago
            </li>
          </ul>
        </div>
      }
      avatar={<Avatar name="Ana Carolina" size="small" />}
    />
  ),
};

export const NoNotifications: Story = {
  render: () => (
    <Navbar
      options={navOptions}
      showNotifications={false}
      avatar={<Avatar name="John Doe" size="small" />}
    />
  ),
};

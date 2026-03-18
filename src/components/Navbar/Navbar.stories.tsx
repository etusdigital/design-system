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
    actions: {
      description:
        'Custom React node rendered in the right section (replaces default bell+avatar layout). Use to add custom buttons, links, or other controls.',
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

const sampleNotifications = (
  <div style={{ padding: '16px', minWidth: '260px' }}>
    <h4 style={{ marginBottom: '12px', fontWeight: 600, fontSize: '14px' }}>Notifications</h4>
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <li style={{ padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '13px' }}>
        <strong>New comment</strong> on your post
        <div style={{ color: '#999', fontSize: '11px', marginTop: '2px' }}>2 minutes ago</div>
      </li>
      <li style={{ padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '13px' }}>
        <strong>User joined</strong> your workspace
        <div style={{ color: '#999', fontSize: '11px', marginTop: '2px' }}>1 hour ago</div>
      </li>
      <li style={{ padding: '8px 0', fontSize: '13px' }}>
        <strong>Report ready</strong> to download
        <div style={{ color: '#999', fontSize: '11px', marginTop: '2px' }}>Yesterday</div>
      </li>
    </ul>
  </div>
);

/**
 * Primary: default navbar with dropdown navigation, notification bell, and avatar.
 */
export const Primary: Story = {
  render: () => (
    <Navbar
      options={navOptions}
      profile={{ name: 'John Doe' }}
      notifications={sampleNotifications}
    />
  ),
};

/**
 * WithCustomLogo: demonstrates the `logo` prop — replace the default SVG circle
 * with any React node.
 */
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
      profile={{ name: 'Ana Carolina' }}
    />
  ),
};

/**
 * WithNotifications: demonstrates the `notifications` prop — pass any React node
 * to populate the FloatCard popover triggered by the bell icon.
 */
export const WithNotifications: Story = {
  render: () => (
    <Navbar
      options={navOptions}
      profile={{ name: 'Jane Smith' }}
      showNotifications
      notifications={sampleNotifications}
    />
  ),
};

/**
 * WithoutNotifications: demonstrates `showNotifications={false}` — hides the
 * notification bell entirely, leaving only the avatar in the right section.
 */
export const WithoutNotifications: Story = {
  render: () => (
    <Navbar
      options={navOptions}
      profile={{ name: 'Jane Smith' }}
      showNotifications={false}
    />
  ),
};

/**
 * WithCustomActions: demonstrates the `actions` prop — replaces the default
 * bell+avatar layout with fully custom content in the right section.
 * Use this to add custom buttons, links, or other controls.
 */
export const WithCustomActions: Story = {
  render: () => (
    <Navbar
      options={navOptions}
      actions={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            Sign in
          </button>
          <button
            type="button"
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: '#4f46e5',
              color: 'white',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            Get started
          </button>
        </div>
      }
    />
  ),
};

/**
 * Complete: shows all features together — custom logo, dropdown navigation,
 * notification bell with items, and an avatar with an image src.
 */
export const Complete: Story = {
  render: () => (
    <Navbar
      options={navOptions}
      value="analytics"
      logo={
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          DS
        </div>
      }
      profile={{
        name: 'Alice Johnson',
        src: 'https://i.pravatar.cc/150?img=47',
      }}
      showNotifications
      notifications={sampleNotifications}
    />
  ),
};

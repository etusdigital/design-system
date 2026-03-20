import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { Button } from '../Button';
import { Icon } from '../Icon/Icon';

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
      description: 'Custom React node rendered as the logo (Vue #logo slot). Defaults to the SVG circle logo.',
    },
    title: {
      control: 'text',
      description: 'Title text rendered next to the logo (Vue #title slot).',
    },
    profile: {
      description:
        'Object to be used as profile. Props(name: string, src: string)',
    },
    notifications: {
      description: 'Content rendered inside the FloatCard popover when the notification bell is clicked (Vue #notifications slot).',
    },
    showNotifications: {
      control: 'boolean',
      description: 'Whether to show the notification bell icon. Defaults to true.',
    },
    actions: {
      description:
        'Custom React node rendered in the right section (Vue #actions slot). Replaces default bell+avatar layout.',
    },
    children: {
      description:
        'Replaces the default Dropdown navigation (Vue default slot). Use to render custom navigation content.',
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

export const CustomSlots: Story = {
  render: () => (
    <Navbar
      options={navOptions}
      title="Title"
      logo={
        <>Logo</>
      }
      actions={
        <>Actions</>
      }
    >
      Default
    </Navbar>
  ),
};

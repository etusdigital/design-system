import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';

const meta = {
  component: Sidebar,
  argTypes: {
    value: {
      type: { name: 'other', value: 'any' },
      description: 'Will be name of the selected option.',
    },
    options: {
      type: { name: 'array', value: { name: 'object', value: {} } },
      description:
        'Array of object to be used as sidebar options. Props(label: string, value: string, icon: string, path: string, disabled: boolean, bottom: boolean, options: Option[])',
    },
    expanded: {
      type: { name: 'boolean' },
      description: 'If true, the sidebar will be expanded.',
    },
    getObject: {
      type: { name: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'If true, the selected value will be an object instead of value-key value.',
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof Sidebar>;

const defaultOptions = [
  {
    label: 'Dashboard',
    value: 'dashboard',
    icon: 'dashboard',
    path: '/',
  },
  {
    label: 'Projects',
    value: 'projects',
    path: '/projects',
    icon: 'folder',
    options: [
      {
        label: 'All Projects',
        value: 'rew-projects',
        path: '/all',
        options: [
          {
            label: 'All Projects',
            value: 'all-projects',
            path: '/all',
          },
          {
            label: 'Internal',
            value: 'internal',
            path: '/internal',
          },
          {
            label: 'External',
            value: 'external',
            path: '/external',
          },
        ],
      },
      {
        label: 'Internal',
        value: 'internal',
        path: '/internal',
      },
      {
        label: 'External',
        value: 'external',
        path: '/external',
      },
    ],
  },
  {
    label: 'Team',
    value: 'team',
    path: '/team',
    icon: 'group',
  },
  {
    label: 'Analytics',
    value: 'analytics',
    path: '/analytics',
    icon: 'analytics',
    disabled: true,
  },
  {
    label: 'Settings',
    value: 'settings',
    path: '/settings',
    icon: 'settings',
    bottom: true,
  },
];

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState<any>('dashboard');
    return (
      <div className="h-screen">
        <Sidebar
          value={value}
          onChange={setValue}
          expanded={false}
          options={defaultOptions}
          getObject={false}
        />
      </div>
    );
  },
};

export const Expanded: Story = {
  render: () => {
    const [value, setValue] = useState<any>('dashboard');
    return (
      <div className="h-screen">
        <Sidebar
          value={value}
          onChange={setValue}
          expanded={true}
          options={defaultOptions}
          getObject={false}
        />
      </div>
    );
  },
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tree } from './Tree';

const meta = {
  component: Tree,
  argTypes: {
    value: {
      type: { name: 'other', value: 'any' },
      description: 'Will be the selected current value.',
    },
    options: {
      type: { name: 'array', value: { name: 'object', value: {} } },
      description: 'Will be the options.',
    },
    labelKey: {
      type: { name: 'string' },
      description: 'Will be the label key.',
    },
    valueKey: {
      type: { name: 'string' },
      description: 'Will be the value key.',
    },
    getObject: {
      type: { name: 'boolean' },
      description: 'Will be the get object.',
    },
    disabled: {
      type: { name: 'boolean' },
      description: 'Will be the disabled.',
    },
    multiple: {
      type: { name: 'boolean' },
      description: 'Will be the multiple.',
    },
  },
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof Tree>;

const defaultOptions = [
  {
    label: 'Documents',
    value: 'documents',
    icon: 'inbox',
    options: [
      {
        label: 'Work',
        value: 'work',
        icon: 'settings',
        options: [
          {
            label: 'Settings.txt',
            value: 'settings.txt',
            icon: 'draft',
          },
          {
            label: 'Code.js',
            value: 'code.js',
            icon: 'draft',
          },
        ],
      },
      {
        label: 'Personal',
        value: 'personal',
        icon: 'person',
        options: [
          {
            label: 'Account.txt',
            value: 'account.txt',
            icon: 'draft',
          },
        ],
      },
    ],
  },
  {
    label: 'Downloads',
    value: 'downloads',
    icon: 'download',
    options: [
      {
        label: 'Image.jpg',
        value: 'image.jpg',
        icon: 'draft',
      },
    ],
  },
  {
    label: 'Music',
    value: 'music',
    icon: 'queue_music',
    options: [
      {
        label: 'Music.mp3',
        value: 'music.mp3',
        icon: 'music_note',
      },
    ],
  },
];

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <Tree
        value={value}
        onChange={setValue}
        options={defaultOptions}
        labelKey="label"
        valueKey="value"
        getObject={false}
        multiple={false}
        disabled={false}
      />
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<any[]>([]);
    return (
      <Tree
        value={value}
        onChange={setValue}
        options={defaultOptions}
        labelKey="label"
        valueKey="value"
        getObject={false}
        multiple={true}
        disabled={false}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<any>(undefined);
    return (
      <Tree
        value={value}
        onChange={setValue}
        options={defaultOptions}
        labelKey="label"
        valueKey="value"
        getObject={false}
        multiple={false}
        disabled={true}
      />
    );
  },
};

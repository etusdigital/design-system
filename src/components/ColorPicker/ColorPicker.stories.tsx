import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './ColorPicker';

const meta = {
  component: ColorPicker,
  argTypes: {
    value: {
      control: 'text',
      description: 'Current color value string.',
    },
    showAlpha: {
      table: {
        defaultValue: { summary: 'true' },
      },
      description: 'When true, the opacity/alpha slider is shown.',
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Primary: Story = {
  render: () => {
    const [color, setColor] = useState('');
    return (
      <ColorPicker
        value={color}
        onChange={setColor}
        showAlpha={true}
      />
    );
  },
};

export const noShadow: Story = {
  render: () => {
    const [color, setColor] = useState('');
    return (
      <ColorPicker
        value={color}
        onChange={setColor}
        noShadow={true}
      />
    );
  },
};


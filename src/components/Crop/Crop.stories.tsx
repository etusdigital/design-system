import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Crop } from './Crop';
import banner from './banner.jpg';

const meta = {
  component: Crop,
  argTypes: {
    value: {
      type: { name: 'other', value: 'string' },
      description: 'This property will be the cropped image data URL.',
    },
    src: {
      type: { name: 'other', value: 'string' },
      description: 'This property will be the image to crop.',
    },
    width: {
      type: { name: 'string' },
      table: {
        defaultValue: { summary: '360px' },
      },
      description: 'This property will be the component width.',
    },
    height: {
      type: { name: 'string' },
      table: {
        defaultValue: { summary: '200px' },
      },
      description: 'This property will be the component height.',
    },
  },
} satisfies Meta<typeof Crop>;

export default meta;
type Story = StoryObj<typeof Crop>;

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <>
        <Crop
          value={value}
          onChange={setValue}
          src={banner}
          width="360px"
          height="200px"
        />
        <span className="block mt-sm">Model value (it can have a delay):</span>
        {value && (
          <img
            className="mt-sm border-xxs border-neutral-background-negative border-solid"
            src={value}
            alt="Cropped output"
          />
        )}
      </>
    );
  },
};

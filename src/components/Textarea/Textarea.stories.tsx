import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  component: Textarea,
  argTypes: {
    value: {
      description: 'Controlled value of the textarea.',
    },
    labelValue: {
      description: 'Label text displayed above the textarea.',
    },
    max: {
      description: 'Maximum number of characters allowed.',
    },
    errorMessage: {
      description: 'Error message displayed below the textarea.',
    },
    infoMessage: {
      description: 'Info message shown in the label tooltip.',
    },
    placeholder: {
      description: 'Placeholder text for the textarea.',
    },
    isError: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description: 'Activates error styling.',
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      table: { defaultValue: { summary: 'left' } },
      description: 'Text alignment inside the textarea.',
    },
    tooltipMinWidth: {
      description: 'Min-width (px) of the info tooltip.',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Primary: Story = {
  args: {
    labelValue: 'Textarea Label',
    placeholder: 'Enter your text here...',
  },
};

export const MaxCharacters: Story = {
  args: {
    labelValue: 'Textarea with Character Limit',
    max: 100,
    placeholder: 'Type your message... (max 100 characters)',
  },
};

export const IsError: Story = {
  args: {
    labelValue: 'Textarea with Error',
    isError: true,
    errorMessage: 'This field contains an error',
  },
};

export const InfoMessage: Story = {
  args: {
    labelValue: 'Textarea with Info',
    infoMessage: 'This is helpful information about this field',
  },
};

export const Disabled: Story = {
  args: {
    labelValue: 'Disabled Textarea',
    disabled: true,
    value: 'This textarea is disabled',
  },
};

export const Required: Story = {
  args: {
    labelValue: 'Required Textarea',
    required: true,
  },
};

export const TextAlign: Story = {
  render: (args: any) => (
    <div className="flex gap-xs">
      {['left', 'center', 'right'].map((textAlign) => (
        <Textarea key={textAlign} {...args} textAlign={textAlign} labelValue={textAlign} />
      ))}
    </div>
  ),
};

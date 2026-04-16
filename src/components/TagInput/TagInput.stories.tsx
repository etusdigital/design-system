import type { Meta, StoryObj } from '@storybook/react';
import { TagInput } from './TagInput';

const meta = {
  component: TagInput,
  argTypes: {
    value: {
      description: 'Controlled array of tag values.',
    },
    labelValue: {
      type: 'string',
      description: 'Label text for the input.',
    },
    errorMessage: {
      type: 'string',
      description: 'Error message displayed below the input.',
    },
    infoMessage: {
      type: 'string',
      description: 'Info message shown in label tooltip.',
    },
    placeholder: {
      type: 'string',
      description: 'Placeholder text when no tags are present.',
    },
    isError: {
      control: 'boolean',
      description: 'Activates the error state.',
      table: { defaultValue: { summary: 'false' } },
    },
    allowDuplicate: {
      control: 'boolean',
      description: 'Allow duplicate tag values.',
      table: { defaultValue: { summary: 'false' } },
    },
    max: {
      type: 'number',
      description: 'Maximum number of tags allowed.',
    },
    required: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    mask: {
      control: 'select',
      options: ['cpf', 'cnpj', 'cep', 'domain', 'url', 'email'],
      description: 'Mask applied to the input before adding as tag.',
      table: { defaultValue: { summary: 'undefined' } },
    },
    icon: {
      type: 'string',
      description: 'Material Symbol icon name.',
    },
    appendIcon: {
      control: 'boolean',
      description: 'When true, icon renders on the right side.',
    },
  },
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof TagInput>;

export const Primary: Story = {
  args: {
    labelValue: 'Tags',
    placeholder: 'Press Enter to add a tag',
  },
};

export const WithHint: Story = {
  args: {
    labelValue: 'Tags',
    placeholder: 'Press Enter to add a tag',
    children: (
      <TagInput.Hint>Press enter to add a new tag</TagInput.Hint>
    ),
  },
};

export const IsError: Story = {
  args: {
    labelValue: 'Tags',
    isError: true,
    errorMessage: 'This field has an error',
  },
};

export const InfoMessage: Story = {
  args: {
    labelValue: 'Tags',
    infoMessage: 'You can add multiple tags by pressing Enter.',
  },
};

export const Disabled: Story = {
  args: {
    labelValue: 'Tags',
    value: ['tag 1', 'tag 2'],
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    labelValue: 'Tags',
    required: true,
  },
};

export const AllowDuplicate: Story = {
  args: {
    labelValue: 'Tags',
    allowDuplicate: true,
  },
};

export const Max: Story = {
  args: {
    labelValue: 'Tags',
    max: 5,
    placeholder: 'Max 5 tags',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const meta = {
  component: FileUpload,
  argTypes: {
    value: {
      description: 'Controlled file value. Can be a File or File[] when multiple is true.',
    },
    labelValue: {
      type: 'string',
      description: 'Label text for the file upload.',
    },
    errorMessage: {
      type: 'string',
      description: 'Error message displayed below the drop zone.',
    },
    infoMessage: {
      type: 'string',
      description: 'Info message displayed below the drop zone.',
    },
    placeholder: {
      type: 'string',
      description: 'Placeholder text shown below the label in empty state.',
    },
    isError: {
      control: 'boolean',
      description: 'Activates the error state.',
      table: { defaultValue: { summary: 'false' } },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the drop zone.',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the file upload.',
      table: { defaultValue: { summary: 'false' } },
    },
    accept: {
      type: 'string',
      description: 'Accepted file types, e.g. ".jpg,.png,.pdf".',
    },
    multiple: {
      control: 'boolean',
      description: 'Allows multiple file selection.',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    labelValue: 'Upload File',
    placeholder: 'or drag and drop it here',
  },
};

export const Accept: Story = {
  args: {
    labelValue: 'Upload Image',
    accept: '.jpg,.jpeg,.png,.gif',
    infoMessage: 'Only image files allowed',
  },
};

export const Multiple: Story = {
  args: {
    labelValue: 'Upload Multiple Files',
    multiple: true,
    infoMessage: 'Select multiple files or drag them here',
  },
};

export const InfoMessage: Story = {
  args: {
    labelValue: 'Upload with Info',
    infoMessage: 'Maximum file size: 10MB. Supported formats: PDF, DOC, DOCX',
  },
};

export const IsError: Story = {
  args: {
    labelValue: 'Upload with Error',
    isError: true,
    errorMessage: 'File upload failed. Please try again.',
  },
};

export const Disabled: Story = {
  args: {
    labelValue: 'Disabled Upload',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    labelValue: 'Required Upload',
    required: true,
  },
};

export const ExtraSmall: Story = {
  args: {
    labelValue: 'Extra Small',
    size: 'xs',
  },
};

export const Large: Story = {
  args: {
    labelValue: 'Large Upload',
    size: 'lg',
  },
};

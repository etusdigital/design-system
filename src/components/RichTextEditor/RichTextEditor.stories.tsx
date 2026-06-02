import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RichTextEditor } from './RichTextEditor';

const meta = {
  component: RichTextEditor,
  argTypes: {
    value: {
      description: 'HTML content of the rich text editor.',
    },
    labelValue: {
      description: 'Label for the rich text editor.',
    },
    hasError: {
      table: { defaultValue: { summary: 'false' } },
      description: 'Activate error state.',
    },
    errorMessage: {
      description: 'Error message to display.',
    },
    infoMessage: {
      description: 'Info message for the label tooltip.',
    },
    placeholder: {
      description: 'Placeholder text when editor is empty.',
    },
    disabled: {
      table: { defaultValue: { summary: 'false' } },
      description: 'Disable the editor.',
    },
    required: {
      table: { defaultValue: { summary: 'false' } },
      description: 'Mark the field as required.',
    },
    noBorder: {
      table: { defaultValue: { summary: 'false' } },
      description: 'Remove border from editor.',
    },
    minHeight: {
      table: { defaultValue: { summary: '200px' } },
      description: 'Minimum height of editor content area.',
    },
    maxHeight: {
      table: { defaultValue: { summary: '400px' } },
      description: 'Maximum height of editor content area.',
    },
  },
} satisfies Meta<typeof RichTextEditor>;

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

const defaultHtml = `<div style="font-size: 24px;">Welcome to the Rich Text Editor!</div><div>You can format text with <strong>bold</strong>, <em>italic</em>, and <u>underline</u>.</div><ul><li>Create lists</li><li>Add <a href="https://example.com" target="_blank" rel="noopener noreferrer">links with new interface</a></li><li>Upload images with FileUpload component</li><li>Format text with different sizes</li></ul><blockquote style="border-left: var(--border-width-sm) solid var(--primary-border-default); padding: var(--spacing-base); margin: var(--spacing-xxs) 0; font-style: italic; background-color: var(--primary-surface-default); border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;">This is a quote example</blockquote>`;

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState(defaultHtml);
    return (
      <RichTextEditor
        className="w-full"
        value={value}
        onChange={setValue}
        labelValue="Rich Text Editor"
        errorMessage=""
        infoMessage=""
        placeholder="Type your text..."
        hasError={false}
        disabled={false}
        required={false}
        noBorder={false}
        minHeight="200px"
        maxHeight="400px"
      />
    );
  },
};

export const IsError: Story = {
  render: () => {
    const [value, setValue] = useState(defaultHtml);
    return (
      <RichTextEditor
        className="w-full"
        value={value}
        onChange={setValue}
        labelValue="Rich Text Editor"
        errorMessage="Please enter valid content"
        infoMessage=""
        placeholder="Type your text..."
        hasError={true}
        disabled={false}
        required={false}
        noBorder={false}
        minHeight="200px"
        maxHeight="400px"
      />
    );
  },
};

export const InfoMessage: Story = {
  render: () => {
    const [value, setValue] = useState(defaultHtml);
    return (
      <RichTextEditor
        className="w-full"
        value={value}
        onChange={setValue}
        labelValue="Rich Text Editor"
        errorMessage=""
        infoMessage="Use the toolbar to format your text. You can add headings, lists, links, and more!"
        placeholder="Type your text..."
        hasError={false}
        disabled={false}
        required={false}
        noBorder={false}
        minHeight="200px"
        maxHeight="400px"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState(defaultHtml);
    return (
      <RichTextEditor
        className="w-full"
        value={value}
        onChange={setValue}
        labelValue="Rich Text Editor"
        errorMessage=""
        infoMessage=""
        placeholder="Type your text..."
        hasError={false}
        disabled={true}
        required={false}
        noBorder={false}
        minHeight="200px"
        maxHeight="400px"
      />
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState(defaultHtml);
    return (
      <RichTextEditor
        className="w-full"
        value={value}
        onChange={setValue}
        labelValue="Rich Text Editor"
        errorMessage=""
        infoMessage=""
        placeholder="Type your text..."
        hasError={false}
        disabled={false}
        required={true}
        noBorder={false}
        minHeight="200px"
        maxHeight="400px"
      />
    );
  },
};

export const NoBorder: Story = {
  render: () => {
    const [value, setValue] = useState(defaultHtml);
    return (
      <RichTextEditor
        className="w-full"
        value={value}
        onChange={setValue}
        labelValue="Rich Text Editor"
        errorMessage=""
        infoMessage=""
        placeholder="Type your text..."
        hasError={false}
        disabled={false}
        required={false}
        noBorder={true}
        minHeight="200px"
        maxHeight="400px"
      />
    );
  },
};

import type { Meta, StoryObj } from "@storybook/vue3";
import RichTextEditor from "./RichTextEditor.vue";

export default {
  component: RichTextEditor,
  argTypes: {
    modelValue: {
      description: "HTML content of the rich text editor.",
    },
    labelValue: {
      description: "Label for the rich text editor.",
    },
    errorMessage: {
      description: "Error message to display.",
    },
    infoMessage: {
      description: "Info message for the label tooltip.",
    },
    placeholder: {
      description: "Placeholder text when editor is empty.",
    },
    isError: {
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Activate error state.",
    },
    disabled: {
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Disable the editor.",
    },
    compact: {
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Use compact toolbar style.",
    },
    noBorder: {
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Remove border from editor.",
    },
    minHeight: {
      table: {
        defaultValue: { summary: "200px" },
      },
      description: "Minimum height of editor content area.",
    },
    maxHeight: {
      table: {
        defaultValue: { summary: "400px" },
      },
      description: "Maximum height of editor content area.",
    },
  },
} satisfies Meta<typeof RichTextEditor>;

type Story = StoryObj<typeof RichTextEditor>;

const defaultArgs = {
  modelValue: "",
  labelValue: "Rich Text Editor",
  errorMessage: "",
  infoMessage: "",
  placeholder: "Digite seu texto...",
  isError: false,
  disabled: false,
  required: false,
  compact: false,
  noBorder: false,
  minHeight: "200px",
  maxHeight: "400px",
};

const defaultHtml = `
	<RichTextEditor
		class="w-full"
		v-model="args.modelValue"
		:label-value="args.labelValue"
		:error-message="args.errorMessage"
		:info-message="args.infoMessage"
		:is-error="args.isError"
		:disabled="args.disabled"
		:required="args.required"
		:placeholder="args.placeholder"
		:compact="args.compact"
		:no-border="args.noBorder"
		:min-height="args.minHeight"
		:max-height="args.maxHeight"
	/>`;

const defaultRender = (args: any) => ({
  components: { RichTextEditor },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: `<div style="font-size: 24px;">Welcome to the Rich Text Editor!</div><div>You can format text with <strong>bold</strong>, <em>italic</em>, and <u>underline</u>.</div><ul><li>Create lists</li><li>Add <a href="https://example.com" target="_blank" rel="noopener noreferrer">links with new interface</a></li><li>Upload images with FileUpload component</li><li>Format text with different sizes</li></ul><blockquote style="border-left: var(--border-width-sm) solid var(--primary-border-default); padding: var(--spacing-base); font-style: italic; background-color: var(--primary-surface-default); border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;">This is a quote example</blockquote>`,
  },
};

export const CompactTheme: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Compact Rich Text Editor",
    compact: true,
    modelValue:
      "<div>This editor uses the compact theme with smaller toolbar.</div>",
  },
};

export const NoBorder: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Rich Text Editor without Border",
    noBorder: true,
    modelValue: "<div>This editor has no borders.</div>",
  },
};

export const WithError: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Rich Text Editor with Error",
    isError: true,
    errorMessage: "Please enter valid content",
    modelValue: "<div>This editor shows an error state.</div>",
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Disabled Rich Text Editor",
    disabled: true,
    modelValue:
      '<div style="font-size: 20px;">Disabled Editor</div><div>This content cannot be edited.</div>',
  },
};

export const WithInfoTooltip: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Rich Text Editor with Info",
    infoMessage:
      "Use the toolbar to format your text. You can add headings, lists, links, and more!",
    required: true,
  },
};

export const CustomSize: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Large Rich Text Editor",
    minHeight: "300px",
    maxHeight: "600px",
    modelValue:
      '<div style="font-size: 32px;">Large Editor</div><div>This editor has custom height settings.</div><div>It can contain more content and has a larger editing area.</div>',
  },
};

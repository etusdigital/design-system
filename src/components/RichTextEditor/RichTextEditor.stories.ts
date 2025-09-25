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
    isError: {
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Activate error state.",
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
    disabled: {
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Disable the editor.",
    },
    required: {
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Mark the field as required.",
    },
    tooltipMinWidth: {
      description: "Minimum width of the tooltip.",
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
  modelValue: `<div style="font-size: 24px;">Welcome to the Rich Text Editor!</div><div>You can format text with <strong>bold</strong>, <em>italic</em>, and <u>underline</u>.</div><ul><li>Create lists</li><li>Add <a href="https://example.com" target="_blank" rel="noopener noreferrer">links with new interface</a></li><li>Upload images with FileUpload component</li><li>Format text with different sizes</li></ul><blockquote style="border-left: var(--border-width-sm) solid var(--primary-border-default); padding: var(--spacing-base); margin: var(--spacing-xxs) 0; font-style: italic; background-color: var(--primary-surface-default); border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;">This is a quote example</blockquote>`,
  labelValue: "Rich Text Editor",
  errorMessage: "",
  infoMessage: "",
  placeholder: "Type your text...",
  tooltipMinWidth: "none",
  isError: false,
  disabled: false,
  required: false,
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
		:tooltip-min-width="args.tooltipMinWidth"
		:is-error="args.isError"
		:disabled="args.disabled"
		:required="args.required"
		:placeholder="args.placeholder"
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
  args: defaultArgs,
};

export const IsError: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Please enter valid content",
  },
};

export const InfoMessage: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage:
      "Use the toolbar to format your text. You can add headings, lists, links, and more!",
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const Required: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true,
  },
};

export const NoBorder: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    noBorder: true,
  },
};

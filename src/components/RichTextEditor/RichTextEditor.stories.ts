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
    colorOptions: {
      description: "Array of color options for text and background.",
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
  colorOptions: [
    '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
    '#ff0000', '#ff6600', '#ffaa00', '#ffff00', '#99ff00', '#00ff00',
    '#00ffaa', '#00ffff', '#0099ff', '#0000ff', '#6600ff', '#ff00ff',
    '#ff0099', '#990099', '#660066', '#330066', '#003366', '#006666'
  ],
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
		:color-options="args.colorOptions"
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
    modelValue: '<div style="font-size: 24px;">Welcome to the Rich Text Editor!</div><div>You can format text with <strong>bold</strong>, <em>italic</em>, and <u>underline</u>.</div><ul><li>Create lists</li><li>Add <a href="https://example.com" target="_blank" rel="noopener noreferrer">links with new interface</a></li><li>Upload images with FileUpload component</li><li>Format text with different sizes</li></ul><blockquote style="border-left: 4px solid #3b82f6; padding: 1rem; font-style: italic; background-color: #f8fafc;">This is a quote example</blockquote>',
  },
};

export const WithCustomColors: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Rich Text Editor with Custom Colors",
    colorOptions: [
      '#000000', '#ffffff', '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
      '#9b59b6', '#1abc9c', '#34495e', '#95a5a6', '#f1c40f', '#e67e22'
    ],
    modelValue: '<div style="color: #e74c3c;">Texto em vermelho!</div><div style="background-color: #f1c40f; color: #2c3e50;">Background amarelo com texto azul!</div><div style="color: #2ecc71;"><strong>Texto verde em negrito</strong></div>',
  },
};

export const CompactTheme: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Compact Rich Text Editor",
    compact: true,
    modelValue: "<div>This editor uses the compact theme with smaller toolbar.</div>",
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
    modelValue: '<div style="font-size: 20px;">Disabled Editor</div><div>This content cannot be edited.</div>',
  },
};

export const WithInfoTooltip: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Rich Text Editor with Info",
    infoMessage: "Use the toolbar to format your text. You can add headings, lists, links, and more!",
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
    modelValue: '<div style="font-size: 32px;">Large Editor</div><div>This editor has custom height settings.</div><div>It can contain more content and has a larger editing area.</div>',
  },
};

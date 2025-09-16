import type { Meta, StoryObj } from "@storybook/vue3";
import FileUpload from "./FileUpload.vue";

export default {
  component: FileUpload,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "File | File[] | undefined" },
      description:
        "Will be the uploaded file(s). Can be a single File or File[] if multiple is true.",
    },
    labelValue: {
      type: { name: "string" },
      description: "Will be the file upload label.",
    },
    errorMessage: {
      type: { name: "string" },
      description: "Will be the file upload error message.",
    },
    placeholder: {
      type: { name: "string" },
      description: "Will be the file upload placeholder text.",
    },
    isError: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Ative error mode.",
    },
    size: {
      type: { name: "string" },
      description: "Will be file upload size.",
      control: "select",
      options: ["extra-small", "small", "medium", "large", "extra-large"],
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    disabled: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Disables the file upload functionality.",
    },
    accept: {
      description:
        'Specifies the types of files that the server accepts. E.g., ".jpg,.png,.pdf"',
    },
    multiple: {
      table: {
        defaultValue: { summary: "(value)=>{void}" },
      },
      description: "Allows multiple file selection.",
    },
    "uploaded-file": {
      description: "Custom slot for displaying uploaded file information",
    },
  },
} satisfies Meta<typeof FileUpload>;

type Story = StoryObj<typeof FileUpload>;

const defaultArgs = {
  modelValue: undefined,
  labelValue: "Upload File",
  errorMessage: "",
  placeholder: "or drag and drop it here",
  isError: false,
  size: "medium" as const,
  disabled: false,
  infoMessage: "",
  accept: undefined,
  multiple: false,
};

const defaultHtml = `
    <FileUpload
		class="h-fit"
         v-model="args.modelValue"
         :label-value="args.labelValue"
         :error-message="args.errorMessage"
		 :info-message="args.infoMessage"
         :is-error="args.isError"
         :size="args.size"
         :disabled="args.disabled"
         :placeholder="args.placeholder"
         :accept="args.accept"
         :multiple="args.multiple"
    />`;

const defaultRender = (args: any) => ({
  components: { FileUpload },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Accept: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Upload Image",
    accept: ".jpg,.jpeg,.png,.gif",
    infoMessage: "Only image files allowed",
  },
};

export const Multiple: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Upload Multiple Files",
    multiple: true,
    infoMessage: "Select multiple files or drag them here",
  },
};

export const InfoMessage: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Upload with Info",
    infoMessage: "Maximum file size: 10MB. Supported formats: PDF, DOC, DOCX",
  },
};

export const IsError: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Upload with Error",
    isError: true,
    errorMessage: "File upload failed. Please try again.",
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Disabled Upload",
    disabled: true,
  },
};

export const Required: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Required Upload",
    required: true,
  },
};

export const Sizes: Story = {
  render: (args) => ({
    components: { FileUpload },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-xs">
        ${["extra-small", "small", "medium", "large", "extra-large"]
        .map((type) => {
          return defaultHtml.replace(/args\.size/g, `'${type}'`).replace(/args\.labelValue/g, `'${type}'`);
        })
        .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};

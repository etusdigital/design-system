import type { Meta, StoryObj } from "@storybook/vue3";

import BTagInput from "./BTagInput.vue";

export default {
  component: BTagInput,
  argTypes: {
    modelValue: {
      type: { name: "any" },
      description: "Will be the array containing the value of the tags.",
    },
    labelValue: {
      type: { name: "string" },
      description: "Will be the input label.",
    },
    errorMessage: {
      type: { name: "string" },
      description: "Will be the input error message.",
    },
    infoMessage: {
      type: { name: "string" },
      description: "Will be the input info message.",
    },
    placeholder: {
      type: { name: "string" },
      description: "Will be the input placeholder.",
    },
    isError: {
      type: { name: "boolean" },
      table: {
        defaultValue: false,
      },
      description: "Activate error mode.",
    },
    allowDuplicate: {
      type: { name: "boolean" },
      table: {
        defaultValue: false,
      },
      description: "Disable the input of duplicated values.",
    },
    max: {
      type: { name: "number" },
      description: "Will be the max number of tags allowed on the input.",
    },
    required: {
      type: { name: "boolean" },
      table: {
        defaultValue: false,
      },
    },
    disabled: {
      type: { name: "boolean" },
      table: {
        defaultValue: false,
      },
    },
    mask: {
      type: { name: "string" },
      description:
        "Will be the masked applied to the input. Only triggered on input type text without min or max limit.",
      control: "select",
      options: ["cpf", "cnpj", "cep", "domain", "url", "email"],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    icon: {
      type: { name: "string" },
      description: "Will be the icon name.",
    },
    appendIcon: {
      type: { name: "boolean" },
    },
    "hint-message": {
      description: "This slot will be displayed in after the input.",
    },
    "icon-slot": {
      description: "Will be the icon slot.",
    },
    "appended-icon-slot": {
      description: "Will be the appended icon slot.",
    },
  },
} satisfies Meta<typeof BTagInput>;

type Story = StoryObj<typeof BTagInput>;

const defaultArgs = {
  modelValue: undefined,
  labelValue: "label",
  errorMessage: "",
  infoMessage: "",
  placeholder: "",
  isError: false,
  required: false,
  allowDuplicate: false,
      max: undefined,
  disabled: false,
      mask: undefined,
  icon: "",
  appendIcon: false,
};

const defaultRender = (args: any) => ({
  components: { BTagInput },
  setup() {
    return { args };
  },
  template: `
    <BTagInput
        v-model="args.modelValue"
        :label-value="args.labelValue"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :is-error="args.isError"
        :disabled="args.disabled"
        :allow-duplicate="args.allowDuplicate"
        :max="args.max"
        :required="args.required"
        :placeholder="args.placeholder"
        :mask="args.mask"
        :icon="args.icon"
        :append-icon="args.appendIcon"
    >
        <template #hint-message>
            Press enter to add a new tag
        </template>
    </BTagInput>

    `,
});

export const Primary: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
  },
};

export const IsError: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message",
  },
};

export const InfoMessage: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Info message",
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
    modelValue: ["tag 1", "tag 2"],
  },
};

export const Required: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true,
  },
};

export const AllowDuplicate: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    allowDuplicate: true,
  },
};

export const Max: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    max: 10,
  },
};
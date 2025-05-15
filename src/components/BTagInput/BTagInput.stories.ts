import type { Meta, StoryObj } from "@storybook/vue3";

import BTagInput from "./BTagInput.vue";

export default {
  component: BTagInput,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description: "Will be the array containing the value of the tags.",
    },
    labelValue: {
      type: { summary: "text" },
      description: "Will be the input label.",
    },
    errorMessage: {
      type: { summary: "text" },
      description: "Will be the input error message.",
    },
    infoMessage: {
      type: { summary: "text" },
      description: "Will be the input info message.",
    },
    placeholder: {
      type: { summary: "text" },
      description: "Will be the input placeholder.",
    },
    isError: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Activate error mode.",
    },
    allowDuplicate: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Disable the input of duplicated values.",
    },
    max: {
      type: { summary: "number" },
      description: "Will be the max number of tags allowed on the input.",
    },
    required: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    mask: {
      type: { summary: "text" },
      description:
        "Will be the masked applied to the input. Only triggered on input type text without min or max limit.",
      control: "select",
      options: ["cpf", "cnpj", "cep", "domain", "url", "email"],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    "info-text": {
      description: "This slot will be displayed in after the input.",
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
  max: null,
  disabled: false,
  mask: "",
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
    >
        <template #info-text>
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

export const Max: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    max: 10,
  },
};

export const Error: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message",
  },
};

export const TagList: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: ["tag 1", "tag 2", "tag 3", "tag 4", "tag 5"],
  },
};

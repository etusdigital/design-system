import type { Meta, StoryObj } from "@storybook/vue3";
import BRadioButton from "./BRadioButton.vue";

const meta = {
  component: BRadioButton,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    groupValue: {
      description: "Used by the BGroup component.",
      type: { summary: "any" },
      table: {
        defaultValue: { summary: "null" },
      },
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    isDiv: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    default: {
      description: "This slot will be content inside the radio button.",
    },
  },
} satisfies Meta<typeof BRadioButton>;
export default meta;

type Story = StoryObj<typeof BRadioButton>;

export const Primary: Story = {
  render: (args: any) => ({
    components: { BRadioButton },
    setup() {
      return { args };
    },
    template:
      '<BRadioButton v-model="args.modelValue" name="test" :group-value="args.groupValue" :disabled="args.disabled" :is-div="args.isDiv">Test radio</BRadioButton>',
  }),
  args: {
    modelValue: false,
    groupValue: null,
    disabled: false,
    isDiv: false,
  },
};

export const RadioDiv: Story = {
  render: (args: any) => ({
    components: { BRadioButton },
    setup() {
      return { args };
    },
    template:
      '<BRadioButton v-model="args.modelValue" name="test" :group-value="args.groupValue" :disabled="args.disabled" :is-div="args.isDiv">Test radio</BRadioButton>',
  }),
  args: {
    modelValue: false,
    groupValue: null,
    disabled: false,
    isDiv: true,
  },
};

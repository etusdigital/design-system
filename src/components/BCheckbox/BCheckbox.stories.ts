import type { Meta, StoryObj } from "@storybook/vue3";
import BCheckbox from "./BCheckbox.vue";

const meta = {
  component: BCheckbox,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    rhs: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Puts the button on the right-hand side.",
    },
    allowIndeterminate: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "Allows the checkbox to be in an indeterminate state. The **null** value is treated as indeterminate.",
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    default: {
      description: "This slot will be displayed next to the checkbox box.",
    },
  },
} satisfies Meta<typeof BCheckbox>;
export default meta;

type Story = StoryObj<typeof BCheckbox>;

const defaultArgs = {
  modelValue: false,
  rhs: false,
  allowIndeterminate: false,
  disabled: false,
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BCheckbox },
    setup() {
      return { args };
    },
    template:
      '<BCheckbox id="primary-checkbox" v-model="args.modelValue" :disabled="args.disabled" :rhs="args.rhs" :allowIndeterminate="args.allowIndeterminate">Test label</BCheckbox>',
  }),
  args: defaultArgs,
};

export const RHS: Story = {
  render: (args: any) => ({
    components: { BCheckbox },
    setup() {
      return { args };
    },
    template:
      '<BCheckbox id="rhs-checkbox" v-model="args.modelValue" :disabled="args.disabled" :allowIndeterminate="args.allowIndeterminate" rhs>Test label</BCheckbox>',
  }),
  args: defaultArgs,
};

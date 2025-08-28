import type { Meta, StoryObj } from "@storybook/vue3";
import Checkbox from "./Checkbox.vue";

export default {
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

const defaultArgs = {
  modelValue: false,
  rhs: false,
  allowIndeterminate: false,
  disabled: false,
};

const defaultRender = (args: any) => ({
  components: { Checkbox },
  setup() {
    return { args };
  },
  template:
    '<Checkbox id="primary-checkbox" v-model="args.modelValue" :disabled="args.disabled" :rhs="args.rhs" :allowIndeterminate="args.allowIndeterminate">Test label</Checkbox>',
})

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const RHS: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    rhs: true,
  },
};

export const AllowIndeterminate: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    allowIndeterminate: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};